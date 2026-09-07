import type { Base } from '@/types/baseType';
import type { InformationsPublic } from '@/types/publicsType';

export type PagePartenaires = Base & {
  titre?: string | null;
  description?: string | null;
  informations: InformationsPublic[];
};
