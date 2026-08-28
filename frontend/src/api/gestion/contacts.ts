import { API_GESTION_URL } from "../Client";
import type { OrgContact } from "@/types/orgContactsType";

type OrgContactApiItem = {
  id: string | number;
  nom: string;
  prenom: string;
  fonction: string;
  email: string;
  photoUrl?: string | null;
  typeCode: string;
  typeLibelle: string;
  typeGroupe: string;
  typeSousGroupe?: string;
};

function mapContact(item: OrgContactApiItem): OrgContact {
  return {
    id: String(item.id),
    nom: item.nom,
    prenom: item.prenom,
    fonction: item.fonction,
    email: item.email,
    photoUrl: item.photoUrl ?? null,
    typeCode: item.typeCode,
    typeLibelle: item.typeLibelle,
    typeGroupe: item.typeGroupe,
    typeSousGroupe: item.typeSousGroupe ?? "",
  };
}

function extractContacts(payload: unknown): OrgContactApiItem[] {
  if (Array.isArray(payload)) {
    return payload as OrgContactApiItem[];
  }
  if (payload && typeof payload === "object") {
    if ("contacts" in payload && Array.isArray((payload as { contacts: unknown }).contacts)) {
      return (payload as { contacts: OrgContactApiItem[] }).contacts;
    }
    if ("data" in payload && Array.isArray((payload as { data: unknown }).data)) {
      return (payload as { data: OrgContactApiItem[] }).data;
    }
  }
  throw new Error("Réponse contacts invalide.");
}

/**
 * Contacts organigramme depuis l'API gestion (mock /data/contacts.json en dev).
 */
export async function getOrgContacts(): Promise<OrgContact[]> {
  const response =
    import.meta.env.VITE_ENV === "dev"
      ? await fetch("/data/contacts.json")
      : await fetch(`${API_GESTION_URL}/api/contacts`);

  if (!response.ok) {
    throw new Error(`Impossible de charger les contacts (${response.status}).`);
  }

  const payload = await response.json();
  return extractContacts(payload).map(mapContact);
}
