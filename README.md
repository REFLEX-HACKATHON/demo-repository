# Reflex

**Pause. Question. Verify.**

Submission for the **UNESCO Youth Hackathon 2026** — Track: **AI and MIL**

---

## What is Reflex

Reflex is a web application that combines an interactive game with a practical AI-guided tool to help people build the habit of pausing and verifying information before trusting or sharing it. Rather than detecting misinformation on the user's behalf, it trains a lasting behavioral reflex: the instinct to doubt and verify.

The product is built around two connected components:

### Practice Mode

An interactive puzzle-game where users are shown a mix of real and AI-generated content and must guess whether it's authentic, then identify the manipulation technique behind it (misleading context, emotional trigger, unreliable source, AI-generated). Difficulty increases progressively, and users receive an explanation after each round.

### Think-Pause

A practical, AI-guided tool where users paste a real message, post, or AI response they've encountered, and receive a guided evaluation using the same manipulation-technique categories learned in Practice Mode. It never gives a blunt true/false verdict — instead, it returns a confidence level, detected signals, a neutral explanation, and reflective questions.

The two modules are connected: mastering a technique in Practice Mode unlocks a visible skill badge, which Think-Pause recognizes when that same technique appears in a real message — turning game progress into a tangible, applicable skill.

**Scope for this MVP:** text and image content only (no video analysis).

---

## Team

| Name   | Role                                                                                   |
| ------ | -------------------------------------------------------------------------------------- |
| Farida | Team Lead — Practice Mode (frontend) & Think-Pause (backend, AI integration) |
| Marie | Co-Lead - Build the bank of real/AI content for Practice Mode                                                                  |
| Gagan | Think_Pause frontend developemnt; Build the bank of real/AI content for Practice Mode                                                                  |
| David | Document the manipulation technique behind each piece of content                                                                  |
                                                                   

---

## Tech Stack

| Layer                | Tools                                    |
| -------------------- | ---------------------------------------- |
| Frontend             | Next.js, React, TypeScript, Tailwind CSS |
| Backend              | FastAPI, Pydantic, Python                |
| AI                   | Gemini API                               |
| Database             | Supabase (planned)                       |
| Deployment (planned) | Vercel (frontend), Render (backend)      |

---

## Project Structure

```
reflex-app/          Next.js frontend
  app/
    page.tsx           Home screen
    practice-mode/      Practice Mode screen
    think-pause/        Think-Pause screen (not started yet)
  components/
  data/
  types/
  lib/

reflex-backend/       FastAPI backend
  main.py
  routers/
    think_pause.py     Think-Pause /analyze endpoint
  requirements.txt
  .env                 Not committed — see setup below
```

---

## Setup

### Frontend (`reflex-app`)

```bash
cd reflex-app
npm install
npm run dev
```

Runs on `http://localhost:3000`

### Backend (`reflex-backend`)

```bash
cd reflex-backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

Create a `.env` file (not committed to Git) with:

```
GEMINI_API_KEY=your_key_here
```

Then run:

```bash
uvicorn main:app --reload
```

Runs on `http://localhost:8000` — interactive docs available at `http://localhost:8000/docs`

**Note:** the Gemini API key needs an associated Google Cloud account with a billing card on file to unlock the free tier quota (even if usage stays within free limits, Google requires a card for verification). Without it, requests to `/think-pause/analyze` will fail with a 429/500 quota error.

---

## Current Status

### Practice Mode — Done

- Full game loop: content display, Real / AI-generated guess, feedback with technique + explanation, running score, end screen
- Random content order on each playthrough
- Graceful handling of broken images
- Visual polish: header with logo, progress bar, icons, colored feedback border, custom feedback animation

### Practice Mode — Not yet done

- Real device / mobile testing
- Supabase connection (progress currently stored in local React state only)

### Think-Pause — Done

- System prompt designed and validated (multiple manual tests on Google AI Studio: text with manipulation signals, real image with no signal, ambiguous text, too-short text)
- Backend endpoint `POST /think-pause/analyze` implemented, with defensive JSON parsing
- CORS configured for frontend-backend communication

### Think-Pause — Not yet done

- Frontend screen (text input, Analyze button, result display) — not started
- End-to-end testing (currently blocked by Gemini API quota issue, see below)
- Skill-badge connection with Practice Mode

### Known issue

Calling `/think-pause/analyze` currently returns a 500 error due to a Gemini API quota limit (`ResourceExhausted: 429, limit: 0`) on the available API keys. This is a billing/account configuration issue, not a code bug — the backend and prompt are ready to work as soon as a valid key with active quota is available.

---

## Validated Think-Pause Prompt

The full system prompt sent to Gemini for content analysis lives in `reflex-backend/routers/think_pause.py`, as the `SYSTEM_PROMPT` constant. It defines 5 manipulation categories (misleading_context, emotional_trigger, unreliable_source, ai_generated, none), enforces a strict JSON response format, and includes explicit rules for confidence-level calibration and handling insufficient/ambiguous content.

---

## Submission

- **Deadline:** August 16, 2026, 23:59 (Paris time)
- **Submission portal:** https://tally.so/r/MePkYk
- **Required:** project proposal (PDF/Word, max 10MB) + video pitch (max 3 min)
- Late submissions and email submissions are not accepted.

---

## Next Steps

1. Unblock the Gemini API key (billing card or teammate's key)
2. Build the Think-Pause frontend screen (can start with mocked data)
3. Connect Think-Pause frontend to backend
4. Implement the Practice Mode ↔ Think-Pause skill-badge connection
5. Finalize team roles and complete team registration
6. Complete the proposal document and record the pitch video
7. Submit before the deadline
