# TUTO GET NEW CT-ST

## 1. Créer le CT-ST

Ds Strapi, créer le CT-ST dans le menu Content-Types.

## 2. Ajouter le CT-ST dans PUBLIC_CONTENT_ACTIONS

Dans le fichier `backend/src/index.js`, ajouter le CT-ST dans la variable `PUBLIC_CONTENT_ACTIONS`.

## 3. Création du type de données

Avec `Postman`, récupérer le résultat de la requête GET `/api/...` et créer le type de données dans le fichier `frontend/src/types/...Type.ts`.

## 4. Création de la fonction get...

Créer la fonction get... dans le fichier `frontend/src/api/strapi/...` (dossier api/strapi/ only si CT-ST créer ds Strapi).
Copier-collé les autres fichiers pour récupérer la base et adapter le code.

## 5. Récupération des données dans le composant

Utiliser ce code pour récupérer les données dans le composant.

Exemple :

```tsx
import { DataType } from '../../types/...Type';
import { getDatas } from '@/api/strapi/...';

export function ...Page() {
  const [datas, setdatas] = useState<DataType[]>([]);
  const [loadError, setLoadError] = useState<string | null>(null);

  // Fetch datas
  useEffect(() => {
    async function loadData() {
      try {
        setLoadError(null);
        console.log('Loading data...');
        const data = await getDatas();
        console.log('data loaded:', data);
        setdatas(data);
      } catch (error) {
        console.error('Error loading data:', error);
        setLoadError(
          error instanceof Error ? error.message : 'Impossible de charger les données.',
        );
      }
    }
    loadData();
  }, []);
}
```

---

## Code Complet d'un Template pour get, fetch et show les données

```tsx
const [articles, setArticles] = useState<Article[]>([]);
const [loadError, setLoadError] = useState<string | null>(null);
const [loading, setLoading] = useState(true);

useEffect(() => {
  async function loadData() {
    try {
      setLoadError(null);
      setLoading(true);
      const data = await getFeaturedArticles();
      setArticles(data);
    } catch (error) {
      console.error('Error loading data:', error);
      setLoadError(
        error instanceof Error ? error.message : 'Impossible de charger les données.',
      );
    } finally {
      setLoading(false);
    }
  }
  loadData();
}, []);

if (loading) {
  return (
    <Section className="bg-white">
      <div className="flex flex-col items-center justify-center min-h-64">
        <Loader2 size={40} className="text-[#0153b6] animate-spin mb-4" />
        <p className="text-gray-500 font-medium">Chargement des actualités à la Une…</p>
      </div>
    </Section>
  );
}

if (loadError) {
  return (
    <Section className="bg-white">
      <div className="flex flex-col items-center justify-center min-h-64">
        <p className="text-gray-500 font-medium">{loadError}</p>
      </div>
    </Section>
  );
}
```	