import type { Base, Media } from "@/types/baseType";

export type Partner = Base & {
  logos: Media[];
  type: string;
  ordre: number;
};
