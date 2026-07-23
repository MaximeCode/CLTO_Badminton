import type { Schema, Struct } from "@strapi/strapi";

export interface ContenuPageContenu extends Struct.ComponentSchema {
  collectionName: "components_contenu_page_contenus";
  info: {
    displayName: "Contenu";
    icon: "pencil";
  };
  attributes: {
    contenu: Schema.Attribute.Blocks & Schema.Attribute.Required;
    sous_titre: Schema.Attribute.String;
    titre: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ContenuPageEtapeDInscription extends Struct.ComponentSchema {
  collectionName: "components_contenu_page_etape_d_inscriptions";
  info: {
    displayName: "\u00C9tape d'inscription";
    icon: "bulletList";
  };
  attributes: {
    case_key: Schema.Attribute.Enumeration<
      ["cas_0", "cas_1_1", "cas_1_2", "cas_2_1", "cas_2_2", "cas_3_1", "cas_3_2"]
    > &
      Schema.Attribute.Required;
    contenu: Schema.Attribute.Blocks & Schema.Attribute.Required;
    titre: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface DocsInscriptionDocuments extends Struct.ComponentSchema {
  collectionName: "components_docs_inscription_documents";
  info: {
    displayName: "Documents";
    icon: "attachment";
  };
  attributes: {
    document: Schema.Attribute.Media<"images" | "files" | "videos" | "audios"> &
      Schema.Attribute.Required;
    libelle: Schema.Attribute.String;
  };
}

export interface StatsStatsClub extends Struct.ComponentSchema {
  collectionName: "components_stats_stats_clubs";
  info: {
    description: "Statistique compl\u00E9mentaire affich\u00E9e sur l'accueil";
    displayName: "Stats du club";
    icon: "chartBubble";
  };
  attributes: {
    chiffre: Schema.Attribute.Integer & Schema.Attribute.Required;
    desc: Schema.Attribute.Text & Schema.Attribute.Required;
  };
}

declare module "@strapi/strapi" {
  export module Public {
    export interface ComponentSchemas {
      "contenu-page.contenu": ContenuPageContenu;
      "contenu-page.etape-d-inscription": ContenuPageEtapeDInscription;
      "docs-inscription.documents": DocsInscriptionDocuments;
      "stats.stats-club": StatsStatsClub;
    }
  }
}
