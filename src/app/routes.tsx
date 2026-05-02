// Imports sorted alphabetically for clarity and maintainability
import { createBrowserRouter } from 'react-router';
import { Layout } from './components/Layout';

// Pages brut
import { ActualitePage } from './pages/ActualitePage';
import { ActualitesPage } from './pages/ActualitesPage';
import { ArchivesPage } from './pages/ArchivesPage';
import { BureauPage } from './pages/BureauPage';
import { ContactPage } from './pages/ContactPage';
import { CreneauxPage } from './pages/CreneauxPage';
import { GymnasesPage } from './pages/GymnasesPage';
import { HistoriquePage } from './pages/HistoriquePage';
import { HomePage } from './pages/HomePage';
import { InterclubPage } from './pages/InterclubPage';
import { NosEquipesPage } from './pages/NosEquipesPage';
import { AdhererPage } from './pages/AdhererPage';

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
      { path: 'actualite/:id', Component: ActualitePage },
      { path: 'archives', Component: ArchivesPage },
      { path: 'historique', Component: HistoriquePage },
      { path: 'bureau', Component: BureauPage },
      { path: 'gymnases', Component: GymnasesPage },
      { path: 'creneaux', Component: CreneauxPage },
      { path: 'nos-equipes', Component: NosEquipesPage },
      { path: 'interclub', Component: InterclubPage },
      { path: 'interclubs', Component: InterclubPage },
      { path: 'adultes', Component: AdultesPage },
      { path: 'jeunes', Component: JeunesPage },
      { path: 'loisir', Component: LoisirsPage },
      { path: 'competitions', Component: CompetiteursPage },
      { path: 'competition', Component: CompetiteursPage },
      { path: 'veterans', Component: VeteransPage },
      { path: 'contact', Component: ContactPage },
      { path: 'adherer', Component: AdhererPage },
      { path: '*', Component: NotFound },
    ],
  },
]);