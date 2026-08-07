import type { BlocksContent } from "./blocks";
import type { Base } from "@/types/baseType";

export type MotPresident = Base & {
  discours: BlocksContent;
  portrait: {
    url: string;
  };
};
