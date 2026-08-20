# Reflex

**Pause. Question. Verify.**


Submission for the **UNESCO Youth Hackathon 2026**  Track: **AI and MIL**

---

## What is Reflex

Reflex is a web application that combines an interactive game with a practical AI-guided tool to help people build the habit of pausing and verifying information before trusting or sharing it. Rather than detecting misinformation on the user's behalf, it trains a lasting behavioral reflex: the instinct to doubt and verify.

Problem statement

Misinformation and manipulated content spread today at an unprecedented speed across social media and messaging apps like WhatsApp, Facebook, or TikTok. An alarming message, an image taken out of context, or a false claim can reach thousands of people within minutes, long before anyone has had the chance to verify it.

This phenomenon particularly affects young people, who are both the most active users of these platforms and the least often trained to critically evaluate what they see and share. The problem is compounded by the rise of AI-generated content — synthetic images, videos, or testimonials that have become so realistic they are increasingly difficult to distinguish from authentic content, even for a careful eye.

Reflex addresses this by teaching a simple, repeatable reflex: pause before reacting, question what you see, and verify before sharing.

The product is built around two connected components:

### Practice Mode

An interactive puzzle-game where users are shown a mix of real and AI-generated content and must guess whether it's authentic, then identify the manipulation technique behind it (misleading context, emotional trigger, unreliable source, AI-generated). Difficulty increases progressively, and users receive an explanation after each round.

### Think-Pause

A practical, AI-guided tool where users paste a real message, post, or AI response they've encountered, and receive a guided evaluation using the same manipulation-technique categories learned in Practice Mode. It never gives a blunt true/false verdict — instead, it returns a confidence level, detected signals, a neutral explanation, and reflective questions.

The two modules are connected: mastering a technique in Practice Mode unlocks a visible skill badge, which Think-Pause recognizes when that same technique appears in a real message — making the game's progress tangibly useful rather than an abstract score.

**Scope for this MVP:** text and image content only (no video analysis).

---

## Team
main
| Name   | Role                                                        |
| ------ | ----------------------------------------------------------- |
| Farida | Team Lead — Practice Mode integration, Think-Pause backend & AI integration, Content documentation (manipulation techniques, explanations) |
| Gagan  | Practice Mode & Think-Pause frontend (Vite/React)            |
| Marie  | Content bank (real/AI content, Supabase storage)              |
                                      
 Updated upstream

| Name   | Role                                                                                  |
| ------ | ------------------------------------------------------------------------------------- |
| Farida | Team Lead — Practice Mode (frontend) & Think-Pause (backend, AI integration)          |
| Marie  | Co-Lead - Build the bank of real/AI content for Practice Mode                         |
| Gagan  | Think_Pause frontend developemnt; Build the bank of real/AI content for Practice Mode |
|  |
Stashed changes
Complete-Reflex-Application

---

## Tech Stack

| Layer                 | Tools                                                        |
| ---------------------- | ------------------------------------------------------------- |
| Frontend               | Vite, React, TypeScript, Tailwind CSS, React Router            |
| Backend                | FastAPI, Pydantic, Python                                     |
| AI                     | Groq API (Llama models)                                       |
| Database               | Supabase (Postgres, Auth, Storage)                             |
| Versioning              | Git / GitHub                                                   |
| Deployment              | Vercel (frontend), Render (backend, planned)                    |
| Project tracking         | Notion                                                         |
| Team documentation        | Google Docs                                                    |
| Content bank & docs       | Google Drive, Google Sheets                                     |
| Content sourcing          | Kaggle, Wikimedia Commons                                        |

---

## Project Structure

```
REFLEX/
  reflex-app/          Vite + React frontend
    src/
      pages/
        PracticeMode.tsx    Practice Mode screen
        ThinkPause.tsx      Think-Pause screen
      components/
        Navbar.tsx
        Toast.tsx
    index.html
    package.json

reflex-backend/         FastAPI backend
  main.py
  routers/
    think_pause.py       Think-Pause /analyze endpoint
  requirements.txt
  .env                   Not committed — see setup below
```

---

## Setup

### Frontend (`reflex-app`)

```bash
cd REFLEX/reflex-app
npm install
npm run dev
```

Runs on `http://localhost:5173` (Vite default)

### Backend (`reflex-backend`)

```bash
cd reflex-backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

Create a `.env` file (not committed to Git) with:

```
GROQ_API_KEY=your_key_here
```

Then run:

```bash
uvicorn main:app --reload
```

Runs on `http://localhost:8000` — interactive docs available at `http://localhost:8000/docs`

**Note:** the backend originally used the Gemini API, but the team switched to the Groq API (Llama models) after running into a Gemini free-tier quota issue tied to billing account verification. Groq's free tier does not require a billing card, which made it a faster path to an unblocked, testable backend.

---

## Current Status

### Practice Mode — Done

- Full game loop: content display, real/AI-generated guess, manipulation-technique tagging, feedback with explanation, running score, end screen
- Visual design with glassmorphism UI, ambient effects, progress bar, toast notifications

### Think-Pause — Done

- System prompt designed and iteratively validated (multiple manual tests: text with manipulation signals, real image with no signal, ambiguous text, too-short text, links requiring verification)
- Prompt covers 7 manipulation categories: misleading_context, emotional_trigger, unreliable_source, fabricated_statistic, fabricated_quote, ai_generated, none
- FastAPI endpoint `POST /think-pause/analyze` implemented, supporting both text and base64-encoded images, with defensive JSON parsing and structured `response_format`
- Input validation: requests with neither text nor image are rejected with a clear error

### Database (Supabase) — Done

- Full schema implemented: `profiles`, `content_items`, `levels`, `level_content`, `game_attempts`, `skill_progress`, `think_pause_queries`, `badges`
- Row Level Security policies configured so users can only access their own progress and queries
- Content bank populated via CSV import from the team's tracking spreadsheet into `content_items`

### Not yet done / in progress

- Connecting the frontend to Supabase (currently the content bank import is being finalized; some entries were still being corrected for enum-value consistency at submission time)
- Full skill-badge connection between Practice Mode and Think-Pause (schema is ready, frontend/backend wiring is the remaining step)
- Deployment: frontend deploy via Vercel initiated; backend deploy via Render planned as a next step
- Real device / mobile testing

---

## Validated Think-Pause Prompt

The full system prompt sent to the Groq API for content analysis lives in `reflex-backend/routers/think_pause.py`, as the `SYSTEM_PROMPT` constant. It defines 7 manipulation categories, enforces a strict JSON response format (confidence level, detected signals, explanation, reflective questions, and a link-verification flag), and includes explicit rules for confidence-level calibration and handling insufficient or ambiguous content.

---

## Submission

- **Deadline:** August 16, 2026, 23:59 (Paris time)
- **Submission portal:** https://tally.so/r/MePkYk
- **Repository:** https://github.com/REFLEX-HACKATHON/demo-repository/tree/ReflexApp
- **Required:** project proposal (PDF/Word, max 10MB) + video pitch (max 3 min)

---

## Next Steps (post-submission)
 main

3. Implement the Practice Mode <-> Think-Pause skill-badge connection end to end
4. Complete backend deployment (Render) and link it to the deployed frontend
5. Real device / mobile testing

Team

Built for the UNESCO Youth Hackathon 2026.

3. Implement the Practice Mode <-> Think-Pause skill-badge connection end to end
4. Complete backend deployment (Render) and link it to the deployed frontend
5. Real device / mobile testing
 Complete-Reflex-Application
