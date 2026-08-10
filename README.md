# Practice Mode — Reflex

This branch (`farida/PracticeMode_Frontend`) contains the frontend implementation of **Practice Mode**, one of the two modules of the Reflex project (see the main `README.md` on `main` for the full project overview).

## What Practice Mode does

An interactive puzzle-game where users are shown a mix of real and AI-generated content and must guess whether it's authentic, then identify the manipulation technique behind it (misleading context, emotional trigger, unreliable source, AI-generated). Difficulty increases progressively, and users receive an explanation after each round.

## How to run it

```bash
cd reflex-app
npm install
npm run dev
```

Runs on `http://localhost:3000` — click "Start" on the home screen to reach Practice Mode.

## Project structure (this branch)

```
app/
  page.tsx                          Home screen
  practice-mode/
    page.tsx                        Practice Mode screen (main logic)
components/
  practice-mode/
    AnswerFX.tsx                    Feedback animation + sound component
data/
  mockContent.ts                    Mock content bank (to be replaced — see below)
types/
  content.ts                        ContentItem type definition
lib/
  gameLogic.ts                      Shuffle logic (Fisher-Yates)
```

## Current status

### Done and functional
- Full game loop: content display, Real / AI-generated guess, feedback with technique + explanation, running score, end screen
- Random content order on each playthrough (shuffle logic in `lib/gameLogic.ts`)
- Graceful handling of broken images (loading state + fallback message)
- Visual polish: header with logo, progress bar, icons on buttons, colored feedback border
- Custom feedback animation (`AnswerFX`)

### Not yet done
- Real device / mobile testing
- Supabase connection for storing progress (currently local React state only)

## Mock data — to be replaced

`data/mockContent.ts` currently contains placeholder content, following this structure (see `types/content.ts`):

```ts
{
  id: number,
  type: "text" | "image",
  contentText?: string,
  contentUrl?: string,
  correctAnswer: "real" | "ai_generated",
  technique: "misleading_context" | "emotional_trigger" | "unreliable_source" | "ai_generated",
  explanation: string,
  difficulty: "easy" | "medium" | "hard"
}
```

Once the real content bank and technique documentation are ready (Marie, Gagan, David), they should be loaded into `data/mockContent.ts` following this exact structure, replacing the current mock entries. No other file should need to change for this swap.

## Notes
- This README covers Practice Mode only. For the full project (concept, team, Think-Pause, tech stack, submission info), see `README.md` on `main`.
