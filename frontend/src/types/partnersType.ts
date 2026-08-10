import type { Base } from "@/types/baseType";

export type Partner = Base & {
  logos: {
    url: string;
    alternativeText?: string | null;
    name?: string | null;
  }[];
  type: string;
};
