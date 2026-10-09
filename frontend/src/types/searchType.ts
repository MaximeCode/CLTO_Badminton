export type SearchResultType =
  | "page"
  | "article"
  | "stage"
  | "evenement"
  | "faq"
  | "galerie"
  | "historique"
  | "palmares";

export type SearchResult = {
  type: SearchResultType;
  title: string;
  excerpt?: string;
  url: string;
  group: string;
};
