import type { Base, Media } from "@/types/baseType";

export type StatsClub = {
  id: number;
  chiffre: number;
  desc: string;
};

export type LabelNomEtLogo = {
  id: number;
  label: string;
  logo: Media;
};

export type Accueil = Base & {
  stats_club: StatsClub[];
  labels: LabelNomEtLogo[];
};
