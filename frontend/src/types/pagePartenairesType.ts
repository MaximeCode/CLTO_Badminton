import type { BlocksContent } from '@/types/blocks';
import type { Base } from '@/types/baseType';
import type { InformationsPublic } from '@/types/publicsType';

export type PagePartenaires = Base & {
  titre?: string | null;
  description?: string | null;
  presentation: BlocksContent | null;
  pourquoi: BlocksContent | null;
  formes_soutien: InformationsPublic[];
  visibilite: InformationsPublic[];
};
