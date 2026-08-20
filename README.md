# Reflex

**Pause. Question. Verify.**

Submission for the **UNESCO Youth Hackathon 2026** — Track: **AI and MIL**

---

## What is Reflex

Reflex is a web application that combines an interactive game with a practical AI-guided tool to help people build the habit of pausing and verifying information before trusting or sharing it. Rather than detecting misinformation on the user's behalf, it trains a lasting behavioral reflex: the instinct to doubt and verify.

# Reflex — Backend (Think-Pause)

FastAPI backend powering the Think-Pause feature of Reflex: it receives text or an image submitted by the user, sends it to an AI model (via Groq) for analysis, and returns a structured result indicating detected manipulation signals.

## Tech stack

- **FastAPI** — Python API framework
- **Groq** — AI inference (text analysis: `openai/gpt-oss-120b`, image analysis: `qwen/qwen3.6-27b`)
- **Supabase** — authentication (user token verification) and storage of analysis results

## Project structure

```
reflex-backend/
  main.py                  # FastAPI entry point, route mounting
  routers/
    think_pause.py         # /think-pause/analyze route
  requirements.txt         # Python dependencies
  .env                     # Environment variables (not versioned)
```

## Installation

1. Clone the repo and move into `reflex-backend`

2. Create and activate a virtual environment:
```bash
python3 -m venv venv
source venv/bin/activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Create a `.env` file at the root with:
```
GROQ_API_KEY=your_groq_key
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_key
```

## Running the server

```bash
uvicorn main:app --reload
```

The server starts on `http://127.0.0.1:8000`.

## Main endpoint

### `POST /think-pause/analyze`

Analyzes a piece of content (text or image) and returns a structured diagnosis.

**Authentication**: requires a valid Supabase Bearer token in the `Authorization` header.

**Request body** (text):
```json
{ "text": "The text to analyze" }
```

**Request body** (image):
```json
{ "image_base64": "base64_encoded_image_string" }
```

**Response**:
```json
{
  "confidence_level": "low" | "medium" | "high",
  "detected_signals": ["misleading_context", "emotional_trigger", "unreliable_source", "fabricated_statistic", "fabricated_quote", "ai_generated"],
  "explanation": "Neutral explanation of the analysis",
  "reflective_questions": ["Question 1", "Question 2"],
  "contains_link": true
}
```

## Technical notes

- The model used depends automatically on the type of content sent (text → `gpt-oss-120b`, image → `qwen3.6-27b`)
- `reasoning_effort` differs by model (`"low"` for text, `"none"` for image) — see `routers/think_pause.py` for details
- Results are returned as strict JSON (`response_format: json_object`), with defensive parsing (`extract_json`) as a safety net
