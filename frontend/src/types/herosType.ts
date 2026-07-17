export type Hero = {
  id: number;
  documentId: string;
  categorie: string;
  titre: string;
  description?: string;
  libelle_btn: string;
  interclub: boolean;
  image: {
    url: string;
  };
};
