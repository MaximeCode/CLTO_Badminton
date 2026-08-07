// Imports sorted alphabetically for clarity and maintainability
import { createBrowserRouter, Navigate } from 'react-router';
import { Layout } from './components/Layout';

// Pages brut
import { ActualitePage } from './pages/ActualitePage';
import { ActualitesPage } from './pages/ActualitesPage';
import { AgendaPage } from './pages/AgendaPage';
import { ContactPage } from './pages/ContactPage';
import { CreneauxPage } from './pages/CreneauxPage';
import { GymnasesPage } from './pages/GymnasesPage';
import { HistoriquePage } from './pages/HistoriquePage';
import { HomePage } from './pages/HomePage';
import { InterclubPage } from './pages/InterclubPage';
import { AdhererPage } from './pages/AdhererPage';
import { FAQPage } from './pages/FAQPage';
import { StagesPage } from './pages/StagesPage';
import { ProjetClub } from './pages/ProjetClub';
import { DocumentsPage } from './pages/DocumentsPage';
import { GaleriePage } from './pages/GaleriePage';
import { MentionsLegalesPage } from './pages/MentionsLegalesPage';
import { OrganigrammePage } from './pages/OrganigrammePage';
import { PalmaresPage } from './pages/PalmaresPage';
import { PolitiqueConfidentialitePage } from './pages/PolitiqueConfidentialitePage';
import { FormationsPage } from './pages/FormationsPage';
import { BenevolesPage } from './pages/BenevolesPage';

// Publics
import { AdultesCompetiteursPage } from './pages/(publics)/AdultesCompetiteursPage';
import { AdultesLoisirsPage } from './pages/(publics)/AdultesLoisirsPage';
import { EntreprisePage } from './pages/(publics)/EntreprisePage';
import { JeunesPage } from './pages/(publics)/JeunesPage';
import { VieillesPlumesPage } from './pages/(publics)/VieillesPlumesPage';
import { NotFound } from './pages/NotFound';

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
      { path: 'gymnases', Component: GymnasesPage },
      { path: 'creneaux', Component: CreneauxPage },
      { path: 'interclub', Component: InterclubPage },
      { path: 'projet-club', Component: ProjetClub },
      { path: 'documents', Component: DocumentsPage },
      { path: 'jeunes', Component: JeunesPage },
      { path: 'jeunes-loisirs', element: <Navigate to="/jeunes" replace /> },
      { path: 'jeunes-competiteurs', element: <Navigate to="/jeunes" replace /> },
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
