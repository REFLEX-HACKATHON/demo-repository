import os
import json
import re

from fastapi import APIRouter, HTTPException, Header
from pydantic import BaseModel
from typing import Optional
from groq import Groq

from services.supabase_client import supabase


client = Groq(api_key=os.environ["GROQ_API_KEY"])

router = APIRouter()


SYSTEM_PROMPT = """You are an assistant that helps users evaluate the reliability of a message, post, image, or piece of content before they trust or share it.

Analyze the provided content according to these manipulation categories:
- misleading_context: true information (or a real image) presented with a false or misleading context (wrong date, wrong location, unrelated event)
- emotional_trigger: language or imagery designed to provoke fear, anger, or urgency to push immediate sharing
- unreliable_source: vague or unverifiable sourcing, no named origin
- fabricated_statistic: a number, percentage, or statistic presented as fact without a verifiable source, or that appears invented/exaggerated
- fabricated_quote: a quote attributed to a person or organization that cannot be verified, or that appears invented or misattributed
- ai_generated: signals typical of AI-generated content — for text: generic phrasing, lack of specific verifiable detail; for images: visual inconsistencies (unnatural textures, asymmetries, lighting errors, distorted hands, ears, or text)
- none: no clear manipulation signal detected

Content to analyze:
{content}

Respond ONLY in valid JSON, with this exact structure:
{{
  "confidence_level": "low" | "medium" | "high",
  "detected_signals": ["category1", "category2"],
  "explanation": "2-3 sentence explanation, neutral and factual tone",
  "reflective_questions": ["question1", "question2"],
  "contains_link": true | false
}}

Rules:
- Never give a definitive "true" or "false" verdict.
- confidence_level calibration: "high" = 0 signals detected, "medium" = exactly 1 signal detected, "low" = 2 or more signals detected.
- If no signal is detected, detected_signals should be an empty array and confidence_level should be "high".
- If the content is too short, vague, or ambiguous to analyze meaningfully, set confidence_level to "medium", detected_signals to an empty array, and explain in the explanation field that the content does not provide enough information for a meaningful analysis.
- Keep the explanation neutral — describe what was found, not a moral judgment.
- reflective_questions should help the user verify the content themselves, not provide the answer.
- If the content contains a URL or link, set "contains_link" to true, and regardless of the confidence_level or detected_signals, always include one reflective_question that advises the user to independently verify the link through the organization's official website or channel before clicking it, entering personal information, or trusting it — even if no other manipulation signal was detected. This precaution applies to every link, not only suspicious-looking ones.
- If no link is present, set "contains_link" to false.
"""


class AnalyzeRequest(BaseModel):
    text: Optional[str] = None
    image_base64: Optional[str] = None


def get_user_id(authorization: str | None) -> str:
    if not authorization:
        raise HTTPException(
            status_code=401,
            detail="Missing authorization token."
        )

    if not authorization.startswith("Bearer "):
        raise HTTPException(
            status_code=401,
            detail="Invalid authorization header."
        )

    token = authorization.replace("Bearer ", "", 1)

    try:
        user_response = supabase.auth.get_user(token)

        if not user_response.user:
            raise HTTPException(
                status_code=401,
                detail="Invalid authentication token."
            )

        return user_response.user.id

    except HTTPException:
        raise

    except Exception:
        raise HTTPException(
            status_code=401,
            detail="Unable to authenticate user."
        )


def extract_json(raw_text: str) -> dict:
    """
    Defensive parsing: extracts the JSON object even if the model
    wraps it with extra text before or after.
    """
    match = re.search(r"\{.*\}", raw_text, re.DOTALL)

    if not match:
        raise ValueError(
            "No JSON object found in the model response."
        )

    return json.loads(match.group(0))


@router.post("/analyze")
def analyze_content(
    request: AnalyzeRequest,
    authorization: str | None = Header(default=None),
):
    user_id = get_user_id(authorization)

    print("USER ID:", user_id)

    if not request.text and not request.image_base64:
        raise HTTPException(
            status_code=400,
            detail="Provide either 'text' or 'image_base64'.",
        )

    if not request.text and not request.image_base64:
        raise HTTPException(
            status_code=400,
            detail="Provide either 'text' or 'image_base64'.",
        )

    is_image = request.image_base64 is not None

    prompt_text = SYSTEM_PROMPT.format(
        content="See the attached image."
        if is_image
        else request.text
    )

    if is_image:
        user_content = [
            {
                "type": "text",
                "text": prompt_text
            },
            {
                "type": "image_url",
                "image_url": {
                    "url": (
                        f"data:image/jpeg;base64,"
                        f"{request.image_base64}"
                    )
                },
            },
        ]

        model = "qwen/qwen3.6-27b"
        reasoning_value = "none"

    else:
        user_content = prompt_text
        model = "openai/gpt-oss-120b"
        reasoning_value = "low"

    completion = client.chat.completions.create(
        model=model,
        messages=[
            {
                "role": "user",
                "content": user_content
            }
        ],
        temperature=0.3,
        max_completion_tokens=4000,
        reasoning_effort=reasoning_value,
        response_format={"type": "json_object"},
    )

    result = extract_json(
        completion.choices[0].message.content
    )

    confidence_mapping = {
        "low": 1,
        "medium": 3,
        "high": 5,
    }

    confidence_score = confidence_mapping.get(
        result.get("confidence_level"),
        3
    )

    reflective_questions = result.get(
        "reflective_questions",
        []
    )

    if isinstance(reflective_questions, str):
        try:
            reflective_questions = json.loads(
                reflective_questions
            )
        except json.JSONDecodeError:
            reflective_questions = [
                reflective_questions
            ]

    database_record = {
        "user_id": user_id,
        "input_text": request.text,
        "input_image_url": None,
        "ai_response": result,
        "reflective_questions": reflective_questions,
        "confidence_score": confidence_score,
    }

    supabase.table(
        "think_pause_queries"
    ).insert(database_record).execute()

    return result
