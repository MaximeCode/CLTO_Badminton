import { fetchAPI } from "../Client";
import type { Faq } from "@/types/faqsType";

export async function getFaqs(): Promise<Faq[]> {
  const { data } = await fetchAPI("/api/faqs?populate=*");

  return data.map(
    (item: { id: number; documentId: string; question: string; reponse: string }) => ({
      id: item.id,
      documentId: item.documentId,
      question: item.question,
      reponse: item.reponse,
    }),
  );
}
