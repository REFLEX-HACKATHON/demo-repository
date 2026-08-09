import { ContentItem } from "@/types/content";

export function shuffleContent(content: ContentItem[]): ContentItem[] {
  const shuffled = [...content];

  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return shuffled;
}
