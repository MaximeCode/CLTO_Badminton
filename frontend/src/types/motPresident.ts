import type { BlocksContent } from "./blocks";
import type { Base, Media } from "@/types/baseType";

export type MotPresident = Base & {
  discours: BlocksContent;
  portrait: Media;
};
