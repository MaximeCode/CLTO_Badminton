import { fetchAPI } from "../Client";
import type { Faq, FaqCategorie, FaqCategorieRef } from "@/types/faqsType";

type FaqApiItem = {
  id: number;
  documentId: string;
  question: string;
  reponse: string;
  faq_categories?: Array<{
    id: number;
    documentId: string;
    libelle: string;
  }>;
};

type FaqCategorieApiItem = {
  id: number;
  documentId: string;
  libelle: string;
};

function mapFaqCategories(
  categories: FaqApiItem["faq_categories"],
): FaqCategorieRef[] {
  return (categories ?? []).map((cat) => ({
    id: cat.id,
    documentId: cat.documentId,
    libelle: cat.libelle,
  }));
}

export async function getFaqs(): Promise<Faq[]> {
  const { data } = await fetchAPI("/api/faqs?populate=*");

  return (data as FaqApiItem[]).map((item) => ({
    id: item.id,
    documentId: item.documentId,
    question: item.question,
    reponse: item.reponse,
    faq_categories: mapFaqCategories(item.faq_categories),
  }));
}

export async function getFaqCategories(): Promise<FaqCategorie[]> {
  const { data } = await fetchAPI("/api/faq-categories?populate=*");

  return (data as FaqCategorieApiItem[]).map((item) => ({
    id: item.id,
    documentId: item.documentId,
    libelle: item.libelle,
  }));
}
