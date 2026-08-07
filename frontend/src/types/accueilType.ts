export type StatsClub = {
  id: number;
  chiffre: number;
  desc: string;
};

export type LabelNomEtLogo = {
  id: number;
  label: string;
  logo: {
    url: string;
  };
};

export type Accueil = {
  id: number;
  documentId: string;
  stats_club: StatsClub[];
  labels: LabelNomEtLogo[];
};
