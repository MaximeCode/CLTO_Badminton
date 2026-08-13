/** Champs communs à toutes les entités Strapi (Content-Types & Single-Types). */
export type Base = {
  id: number;
  documentId: string;
};

export type MediaFormat = {
  url: string;
  width?: number | null;
  height?: number | null;
  size?: number | null;
  mime?: string | null;
};

export type MediaFormats = {
  thumbnail?: MediaFormat;
  small?: MediaFormat;
  medium?: MediaFormat;
  large?: MediaFormat;
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
  formats?: MediaFormats;
};
