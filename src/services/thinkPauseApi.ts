import { supabase } from "../lib/supabase";

export interface AnalysisResult {
  confidence_level: "low" | "medium" | "high";
  detected_signals: string[];
  explanation: string;
  reflective_questions: string[];
  contains_link: boolean;
}

export async function analyzeContent(text: string): Promise<AnalysisResult> {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  console.log("SESSION DEBUG:", session);

  if (!session) {
    throw new Error("You must be signed in to analyze content.");
  }

  const response = await fetch("http://127.0.0.1:8000/think-pause/analyze", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session.access_token}`,
    },
    body: JSON.stringify({
      text,
    }),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));

    throw new Error(error.detail || "Unable to analyze the content.");
  }

  return response.json();
}
