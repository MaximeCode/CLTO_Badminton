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
    contenu: Schema.Attribute.Blocks & Schema.Attribute.Required;
    titre: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

declare module "@strapi/strapi" {
  export module Public {
    export interface ComponentSchemas {
      "contenu-page.contenu": ContenuPageContenu;
      "contenu-page.etape-d-inscription": ContenuPageEtapeDInscription;
    }
  }
}
