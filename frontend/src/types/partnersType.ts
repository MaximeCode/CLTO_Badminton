import type { Base } from "@/types/baseType";

export type Partner = Base & {
  logos: {
    url: string;
  }[];
  type: string;
};
