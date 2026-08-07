import type { Base, Media } from "@/types/baseType";

export type Bandeau = Base & {
  page: string;
  image_bandeau: Media;
};
