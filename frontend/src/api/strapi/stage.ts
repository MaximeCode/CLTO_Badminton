import { BlocksContent } from "@/types/blocks";
import { fetchAPI } from "../Client";
import type { Stage } from "@/types/stageType";
import { Gymnase } from "@/types/gymnasesType";

export async function getStages(): Promise<Stage[]> {
  const { data } = await fetchAPI("/api/stages?populate=*");

  return data.map(
    (item: {
      id: number;
      documentId: string;
      titre: string;
      date_debut: Date;
      date_fin: Date;
      public: string;
      autre_infos: string;
      description: BlocksContent;
      lien: string;
      gymnase: Gymnase;
    }) => ({
      id: item.id,
      documentId: item.documentId,
      titre: item.titre,
      date_debut: item.date_debut,
      date_fin: item.date_fin,
      public: item.public,
      autre_infos: item.autre_infos,
      description: item.description,
      lien: item.lien,
      gymnase: item.gymnase,
    })
  );
}
