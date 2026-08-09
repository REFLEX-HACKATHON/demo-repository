export type ManipulationTechnique =
  | "misleading_context"
  | "emotional_trigger"
  | "unreliable_source"
  | "ai_generated";

export interface ContentItem {
  id: number;
  type: "image" | "text";
  contentUrl?: string;
  contentText?: string;
  correctAnswer: "real" | "ai_generated";
  technique: ManipulationTechnique;
  explanation: string;
  difficulty: "easy" | "medium" | "hard";
}
