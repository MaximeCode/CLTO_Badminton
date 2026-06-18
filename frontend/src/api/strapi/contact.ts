import { fetchAPI } from "../Client";
import type { Contact } from "../../types/contactType";

export async function getContact(): Promise<Contact> {
  const { data } = await fetchAPI(`/api/contact`);
  return {
    id: data.id,
    documentId: data.documentId,
    telephone: data.telephone,
    email: data.email,
    adresse: data.adresse,
    jour_accueils_physique: data.jour_accueils_physique,
    heure_debut_accueils_physique: data.heure_debut_accueils_physique,
    heure_fin_accueils_physique: data.heure_fin_accueils_physique,
    jour_accueils_a_distance: data.jour_accueils_a_distance,
    heure_debut_accueils_a_distance: data.heure_debut_accueils_a_distance,
    heure_fin_accueils_a_distance: data.heure_fin_accueils_a_distance,
    WhatsApp: data.WhatsApp,
  };
}
