import { createBrowserRouter } from 'react-router';
import { Layout } from './components/Layout';
import { HomePage } from './pages/HomePage';
import { ActualitesPage } from './pages/ActualitesPage';
import { ArchivesPage } from './pages/ArchivesPage';
import { HistoriquePage } from './pages/HistoriquePage';
import { BureauPage } from './pages/BureauPage';
import { InfrastructuresPage } from './pages/InfrastructuresPage';
import { PartenairesPage } from './pages/PartenairesPage';
import { NosEquipesPage } from './pages/NosEquipesPage';
import { InterclubPage } from './pages/InterclubPage';
import { EcoleDeBadPage } from './pages/EcoleDeBadPage';
import { CompetitionsJeunesPage } from './pages/CompetitionsJeunesPage';
import { LoisirPage } from './pages/LoisirPage';
import { CompetitionsAdultesPage } from './pages/CompetitionsAdultesPage';
import { ContactPage } from './pages/ContactPage';
import { NotFound } from './pages/NotFound';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Layout,
    children: [
      { index: true, Component: HomePage },
      { path: 'actualites', Component: ActualitesPage },
      { path: 'archives', Component: ArchivesPage },
      { path: 'historique', Component: HistoriquePage },
      { path: 'bureau', Component: BureauPage },
      { path: 'infrastructures', Component: InfrastructuresPage },
      { path: 'partenaires', Component: PartenairesPage },
      { path: 'nos-equipes', Component: NosEquipesPage },
      { path: 'interclub', Component: InterclubPage },
      { path: 'ecole-de-bad', Component: EcoleDeBadPage },
      { path: 'competitions-jeunes', Component: CompetitionsJeunesPage },
      { path: 'loisir', Component: LoisirPage },
      { path: 'competitions-adultes', Component: CompetitionsAdultesPage },
      { path: 'contact', Component: ContactPage },
      { path: '*', Component: NotFound },
    ],
  },
]);
