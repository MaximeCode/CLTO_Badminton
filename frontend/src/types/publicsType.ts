import type { BlocksContent } from "@/types/blocks";
import type { Avantage, Base, Media } from "@/types/baseType";

export type InformationsPublic = {
  id: number;
  titre: string;
  contenu: BlocksContent;
};

export type ContenuPublic = {
  id: number;
  titre: string;
  sous_titre?: string | null;
  contenu: BlocksContent;
};

export type PrixVolant = {
  id: number;
  volants: string;
  prix: number;
};

type PublicFields = {
  titre?: string | null;
  description?: string | null;
};

export type PublicAdultesCompetiteurs = Base &
  PublicFields & {
    prix_licence: number;
    envie_de_progresser: InformationsPublic;
    vie_du_club: InformationsPublic[];
    tournois_competitions: ContenuPublic[];
  };

export type PublicAdultesLoisirs = Base &
  PublicFields & {
    prix_licence: number;
    envie_de_progresser: InformationsPublic;
    vie_du_club: InformationsPublic[];
    les_avantages: Avantage[];
  };

export type PublicEntreprise = Base &
  PublicFields & {
    lien_dossier_partenariat?: string | null;
    flyer: Media;
    partenariat: InformationsPublic[];
    les_avantages: Avantage[];
  };

export type PublicJeunes = Base &
  PublicFields & {
    informations: InformationsPublic[];
    entrainements: InformationsPublic[];
    tournois_competitions: ContenuPublic[];
    les_avantages: Avantage[];
    prix_volants: PrixVolant[];
  };

export type PublicVieillesPlumes = Base &
  PublicFields & {
    format_simple: BlocksContent;
    tournois_competitions: InformationsPublic[];
    les_avantages: Avantage[];
  };
