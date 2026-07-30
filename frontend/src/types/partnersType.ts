export type Partner = {
  id: number;
  logos: {
    url: string;
    alternativeText?: string | null;
    name?: string | null;
  }[];
  type: "Partenaires badminton" | "Partenaires institutionnels" | "Partenaires entreprises";
};
