// Imports sorted alphabetically for clarity and maintainability
import { createBrowserRouter } from 'react-router';
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

import { PalmaresPage } from './pages/PalmaresPage';

// Espaces
import { CompetiteursPage } from './pages/(espaces)/CompetiteursPage';
import { AdultesPage } from './pages/(espaces)/AdultesPage';
import { JeunesPage } from './pages/(espaces)/JeunesPage';
import { LoisirsPage } from './pages/(espaces)/LoisirsPage';
import { NotFound } from './pages/NotFound';
import { VeteransPage } from './pages/(espaces)/VeteransPage';

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
      { path: 'agenda', Component: AgendaPage },
      { path: 'gymnases', Component: GymnasesPage },
      { path: 'creneaux', Component: CreneauxPage },
      { path: 'interclub', Component: InterclubPage },
      { path: 'projet-club', Component: ProjetClub },
      { path: 'documents', Component: DocumentsPage },
      { path: 'jeunes-loisirs', Component: JeunesPage },
      { path: 'jeunes-competiteurs', Component: CompetiteursPage },
      { path: 'adultes-loisirs', Component: LoisirsPage },
      { path: 'adultes-competiteurs', Component: AdultesPage },
      { path: 'vieilles-plumes', Component: VeteransPage },
      { path: 'contact', Component: ContactPage },
      { path: 'faq', Component: FAQPage },
      { path: 'stages', Component: StagesPage },
      { path: 'adherer', Component: AdhererPage },
      { path: '*', Component: NotFound },
    ],
  },
]);