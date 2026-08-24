import { lazy } from 'react';
import { createBrowserRouter } from 'react-router';
import { Layout } from './components/Layout';
import { HomePage } from './pages/HomePage';

const ActualitePage = lazy(() =>
  import('./pages/ActualitePage').then((m) => ({ default: m.ActualitePage })),
);
const ActualitesPage = lazy(() =>
  import('./pages/ActualitesPage').then((m) => ({ default: m.ActualitesPage })),
);
const AgendaPage = lazy(() =>
  import('./pages/AgendaPage').then((m) => ({ default: m.AgendaPage })),
);
const ContactPage = lazy(() =>
  import('./pages/ContactPage').then((m) => ({ default: m.ContactPage })),
);
const CreneauxPage = lazy(() =>
  import('./pages/CreneauxPage').then((m) => ({ default: m.CreneauxPage })),
);
const GymnasesPage = lazy(() =>
  import('./pages/GymnasesPage').then((m) => ({ default: m.GymnasesPage })),
);
const HistoriquePage = lazy(() =>
  import('./pages/HistoriquePage').then((m) => ({ default: m.HistoriquePage })),
);
const InterclubPage = lazy(() =>
  import('./pages/InterclubPage').then((m) => ({ default: m.InterclubPage })),
);
const AdhererPage = lazy(() =>
  import('./pages/AdhererPage').then((m) => ({ default: m.AdhererPage })),
);
const FAQPage = lazy(() =>
  import('./pages/FAQPage').then((m) => ({ default: m.FAQPage })),
);
const StagesPage = lazy(() =>
  import('./pages/StagesPage').then((m) => ({ default: m.StagesPage })),
);
const ProjetClub = lazy(() =>
  import('./pages/ProjetClub').then((m) => ({ default: m.ProjetClub })),
);
const DocumentsPage = lazy(() =>
  import('./pages/DocumentsPage').then((m) => ({ default: m.DocumentsPage })),
);
const EvenementsPage = lazy(() =>
  import('./pages/EvenementsPage').then((m) => ({ default: m.EvenementsPage })),
);
const GaleriePage = lazy(() =>
  import('./pages/GaleriePage').then((m) => ({ default: m.GaleriePage })),
);
const MentionsLegalesPage = lazy(() =>
  import('./pages/MentionsLegalesPage').then((m) => ({ default: m.MentionsLegalesPage })),
);
const OrganigrammePage = lazy(() =>
  import('./pages/OrganigrammePage').then((m) => ({ default: m.OrganigrammePage })),
);
const PalmaresPage = lazy(() =>
  import('./pages/PalmaresPage').then((m) => ({ default: m.PalmaresPage })),
);
const PolitiqueConfidentialitePage = lazy(() =>
  import('./pages/PolitiqueConfidentialitePage').then((m) => ({
    default: m.PolitiqueConfidentialitePage,
  })),
);
const FormationsPage = lazy(() =>
  import('./pages/FormationsPage').then((m) => ({ default: m.FormationsPage })),
);
const BenevolesPage = lazy(() =>
  import('./pages/BenevolesPage').then((m) => ({ default: m.BenevolesPage })),
);
const AdultesCompetiteursPage = lazy(() =>
  import('./pages/(publics)/AdultesCompetiteursPage').then((m) => ({
    default: m.AdultesCompetiteursPage,
  })),
);
const AdultesLoisirsPage = lazy(() =>
  import('./pages/(publics)/AdultesLoisirsPage').then((m) => ({
    default: m.AdultesLoisirsPage,
  })),
);
const EntreprisePage = lazy(() =>
  import('./pages/(publics)/EntreprisePage').then((m) => ({ default: m.EntreprisePage })),
);
const JeunesPage = lazy(() =>
  import('./pages/(publics)/JeunesPage').then((m) => ({ default: m.JeunesPage })),
);
const VieillesPlumesPage = lazy(() =>
  import('./pages/(publics)/VieillesPlumesPage').then((m) => ({
    default: m.VieillesPlumesPage,
  })),
);
const NotFound = lazy(() =>
  import('./pages/NotFound').then((m) => ({ default: m.NotFound })),
);

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Layout,
    children: [
      { index: true, Component: HomePage },
      { path: 'actualites', Component: ActualitesPage },
      { path: 'actualite/:documentId', Component: ActualitePage },
      { path: 'historique', Component: HistoriquePage },
      { path: 'galerie', Component: GaleriePage },
      { path: 'palmares', Component: PalmaresPage },
      { path: 'organigramme', Component: OrganigrammePage },
      { path: 'agenda', Component: AgendaPage },
      { path: 'evenements', Component: EvenementsPage },
      { path: 'gymnases', Component: GymnasesPage },
      { path: 'creneaux', Component: CreneauxPage },
      { path: 'interclub', Component: InterclubPage },
      { path: 'projet-club', Component: ProjetClub },
      { path: 'documents', Component: DocumentsPage },
      { path: 'jeunes', Component: JeunesPage },
      { path: 'adultes-loisirs', Component: AdultesLoisirsPage },
      { path: 'adultes-competiteurs', Component: AdultesCompetiteursPage },
      { path: 'vieilles-plumes', Component: VieillesPlumesPage },
      { path: 'entreprise', Component: EntreprisePage },
      { path: 'contact', Component: ContactPage },
      { path: 'faq', Component: FAQPage },
      { path: 'stages', Component: StagesPage },
      { path: 'adherer', Component: AdhererPage },
      { path: 'formations', Component: FormationsPage },
      { path: 'benevoles', Component: BenevolesPage },
      { path: 'mentions-legales', Component: MentionsLegalesPage },
      { path: 'politique-de-confidentialite', Component: PolitiqueConfidentialitePage },
      { path: '*', Component: NotFound },
    ],
  },
]);
