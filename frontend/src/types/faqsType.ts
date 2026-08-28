import type { Base } from "@/types/baseType";

export type FaqCategorieRef = Base & {
  libelle: string;
};

export type Faq = Base & {
  question: string;
  reponse: string;
  faq_categories: FaqCategorieRef[];
};

export type FaqCategorie = Base & {
  libelle: string;
};
