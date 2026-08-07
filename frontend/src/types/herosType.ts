export type Hero = {
  id: number;
  documentId: string;
  categorie: string;
  titre: string;
  description?: string;
  libelle_btn: string;
  image: {
    url: string;
  };
  lien?: string;
};
