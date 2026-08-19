/** Champs communs à toutes les entités Strapi (Content-Types & Single-Types). */
export type Base = {
  id: number;
  documentId: string;
};

/** Média Strapi normalisé (URL absolue côté front). */
export type Media = {
  id: number;
  documentId: string;
  name: string;
  alternativeText?: string | null;
  url: string;
  mime?: string;
  width?: number | null;
  height?: number | null;
};

/** Bloc Avantages Strapi normalisé */
export type Avantage = {
  id: number;
  contenu: string;
};
