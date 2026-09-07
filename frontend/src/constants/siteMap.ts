/** Structure du plan du site HTML (RGAA 12.3) — miroir de la navigation principale. */

export type SiteMapLink = {
  label: string;
  path: string;
};

export type SiteMapSection = {
  title: string;
  links: SiteMapLink[];
};

export const SITE_MAP_SECTIONS: SiteMapSection[] = [
  {
    title: 'Accueil & actualités',
    links: [
      { label: 'Accueil', path: '/' },
      { label: 'Actualités', path: '/actualites' },
    ],
  },
  {
    title: 'Le Club',
    links: [
      { label: 'Historique', path: '/historique' },
      { label: 'Projet Club', path: '/projet-club' },
      { label: 'Organigramme', path: '/organigramme' },
      { label: 'Bénévoles', path: '/benevoles' },
      { label: 'Événements', path: '/evenements' },
      { label: 'Palmarès', path: '/palmares' },
      { label: 'Documents officiels', path: '/documents' },
    ],
  },
  {
    title: 'Pratiquer',
    links: [
      { label: "S'inscrire", path: '/adherer' },
      { label: 'Créneaux', path: '/creneaux' },
      { label: 'Gymnases', path: '/gymnases' },
      { label: 'Agenda', path: '/agenda' },
      { label: 'Stages', path: '/stages' },
      { label: 'Formations', path: '/formations' },
    ],
  },
  {
    title: 'Nos Publics',
    links: [
      { label: 'Jeunes', path: '/jeunes' },
      { label: 'Adultes Loisirs', path: '/adultes-loisirs' },
      { label: 'Adultes Compétiteurs', path: '/adultes-competiteurs' },
      { label: 'Vieilles Plumes Seniors 60 ans et +', path: '/vieilles-plumes' },
      { label: 'Entreprises', path: '/entreprises' },
    ],
  },
  {
    title: 'Compétition & galerie',
    links: [
      { label: 'Interclubs', path: '/interclub' },
      { label: 'Galerie', path: '/galerie' },
    ],
  },
  {
    title: 'Contact & aide',
    links: [
      { label: 'Contact', path: '/contact' },
      { label: 'FAQ', path: '/faq' },
      { label: 'Votre avis nous intéresse', path: '/avis' },
    ],
  },
  {
    title: 'Informations légales',
    links: [
      { label: 'Mentions légales', path: '/mentions-legales' },
      { label: 'Politique de confidentialité', path: '/politique-de-confidentialite' },
      { label: 'Plan du site', path: '/plan-du-site' },
    ],
  },
];
