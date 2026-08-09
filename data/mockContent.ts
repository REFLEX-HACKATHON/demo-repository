import { ContentItem } from "@/types/content";

export const mockContent: ContentItem[] = [
  {
    id: 1,
    type: "text",
    contentText:
      "URGENT : Ce médicament vient d'être interdit dans plusieurs pays, partagez avant qu'ils ne suppriment cette info !",
    correctAnswer: "real",
    technique: "emotional_trigger",
    explanation:
      "Ce message utilise l'urgence artificielle et la peur pour pousser au partage rapide, sans laisser le temps de vérifier la source.",
    difficulty: "easy",
  },
  {
    id: 2,
    type: "image",
    contentUrl: "/mock/face1.jpg",
    correctAnswer: "ai_generated",
    technique: "ai_generated",
    explanation:
      "Ce visage n'existe pas : il a été généré par une IA. Regarde les détails autour des oreilles et des dents, souvent imparfaits sur ce type de génération.",
    difficulty: "medium",
  },
  {
    id: 3,
    type: "image",
    contentUrl: "/mock/event1.jpg",
    correctAnswer: "real",
    technique: "misleading_context",
    explanation:
      "This file is authentique, mais elle date de plusieurs années et a été repartagée récemment avec une légende qui la fait passer pour un événement actuel.",
    difficulty: "medium",
  },
  {
    id: 4,
    type: "text",
    contentText:
      "Selon une étude, boire de l'eau chaude le matin guérirait 90% des maladies.",
    correctAnswer: "real",
    technique: "unreliable_source",
    explanation:
      "Ce message circule réellement, mais il ne cite aucune étude vérifiable. Une affirmation médicale sans source fiable doit toujours être questionnée.",
    difficulty: "easy",
  },
  {
    id: 5,
    type: "image",
    contentUrl: "/mock/landscape1.jpg",
    correctAnswer: "ai_generated",
    technique: "ai_generated",
    explanation:
      "Cette image a été générée par IA. Observe les incohérences dans les textures et les ombres, souvent un indice révélateur.",
    difficulty: "hard",
  },
  {
    id: 6,
    type: "text",
    contentText: "Une source proche du gouvernement affirme que...",
    correctAnswer: "real",
    technique: "unreliable_source",
    explanation:
      "Une 'source proche de' sans nom ni fonction précise est un classique de la désinformation : impossible de vérifier qui parle réellement.",
    difficulty: "hard",
  },
];
