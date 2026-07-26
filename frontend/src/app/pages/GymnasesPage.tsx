import { useState, useEffect } from 'react';
import { PageHero } from '../components/PageHero';
import { Section } from '../components/Section';
import { motion } from 'motion/react';
import { MapPin, Copy, Check, ExternalLink } from 'lucide-react';

import type { Gymnase } from '../../types/gymnasesType';
import { getGymnases } from '../../api/strapi/gymnases';
import { GymMap } from '../components/GymMap';
import gymnaseChardon from '../../imports/gymnase_chardon.jpg';

export function GymnasesPage() {
  const [selectedGym, setSelectedGym] = useState<Gymnase | null>(null);
  const [copiedAddress, setCopiedAddress] = useState<number | null>(null);

  const [gyms, setGyms] = useState<Gymnase[]>([]);
  const gymsCount = gyms.length;
  const [loadError, setLoadError] = useState<string | null>(null);

  const equipmentStats = [
    {
      value: gymsCount,
      label: "Gymnases",
    },
    {
      value: gyms.reduce((sum, gym) => sum + gym.terrains, 0),
      label: "Nombre de terrains total",
    },
    {
      value: "57h",
      label: "Heures de créneaux total par semaine",
    },
  ];

  const copyAddress = (gym: Gymnase) => {
    navigator.clipboard.writeText(gym.adresse);
    setCopiedAddress(gym.id);
    setTimeout(() => setCopiedAddress(null), 2000);
  };

  const openInMaps = (gym: Gymnase) => {
    window.open(`https://www.google.com/maps/search/?api=1&query=${gym.latitude},${gym.longitude}`, '_blank');
  };

  // Fetch datas
  useEffect(() => {
    async function loadData() {
      try {
        setLoadError(null);
        console.log('Loading data...');
        const data = await getGymnases();
        console.log('data loaded:', data);
        setGyms(data);
      } catch (error) {
        console.error('Error loading data:', error);
        setLoadError(
          error instanceof Error ? error.message : 'Impossible de charger les données.',
        );
      }
    }
    loadData();
  }, []);

  return (
    <>
      <PageHero
        title="LES GYMNASES"
        subtitle={`Découvrez nos ${gymsCount} gymnases répartis à Orléans`}
        image={gymnaseChardon}
      />

      <Section className="bg-white">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-primary text-5xl md:text-6xl text-primary mb-4">
            NOS {gymsCount} GYMNASES
          </h2>
          <p className="text-gray-600 text-md md:text-lg max-w-2xl mx-auto">
            Le CLTO Badminton dispose de {gymsCount} gymnases dans Orléans pour vous offrir de nombreux créneaux
            d'entraînement
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-4 md:gap-8">
          {/* Gymnase List */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            {gyms.map((gym, index) => (
              <motion.div
                key={gym.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                onClick={() => setSelectedGym(gym)}
                className={`bg-gray-50 rounded-lg p-4 md:p-6 cursor-pointer transition-all duration-300 border-2 ${selectedGym?.id === gym.id
                  ? 'border-primary shadow-xl bg-blue-50'
                  : 'border-transparent shadow-md hover:shadow-lg hover:border-secondary'
                  }`}
              >
                <div className="flex items-start gap-4">
                  <div className={`p-2 md:p-3 rounded-lg transition-colors duration-300 ${selectedGym?.id === gym.id ? 'bg-primary' : 'bg-secondary'}`}>
                    <MapPin className="text-white size-5 md:size-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-primary text-2xl text-primary mb-2">
                      {gym.libelle}
                    </h3>
                    <p className="text-gray-600 mb-3 text-sm md:text-base">{gym.adresse}</p>
                    <div className="flex items-center justify-between flex-wrap gap-3">
                      <div className="flex items-center gap-2 bg-linear-to-r from-primary to-primary-accent text-white px-4 py-2 rounded-lg shadow-md">
                        <div className="text-center flex-1 flex flex-row-reverse justify-center items-center gap-2">
                          <p className="text-xs opacity-90">Terrains</p>
                          <p className="font-primary text-xl md:text-3xl">{gym.terrains}</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            copyAddress(gym);
                          }}
                          className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-accent transition-colors duration-200"
                        >
                          {copiedAddress === gym.id ? (
                            <>
                              <Check size={16} />
                              <span className="text-sm">Copié!</span>
                            </>
                          ) : (
                            <>
                              <Copy size={16} />
                              <span className="text-sm hidden sm:inline">Copier</span>
                            </>
                          )}
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            openInMaps(gym);
                          }}
                          className="flex items-center gap-2 bg-secondary text-white px-4 py-2 rounded-lg hover:bg-secondary-accent transition-colors duration-200"
                        >
                          <ExternalLink size={16} />
                          <span className="text-sm hidden sm:inline">Itinéraire</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}

            {selectedGym && (
              <motion.button
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                onClick={() => setSelectedGym(null)}
                className="w-full bg-gray-200 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-300 transition-colors duration-200 font-semibold"
              >
                Afficher tous les gymnases
              </motion.button>
            )}
          </motion.div>

          {/* Map */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="h-[600px] lg:h-full min-h-[500px] rounded-lg overflow-hidden shadow-xl sticky top-24 bg-gray-100"
          >
            <GymMap
              gyms={gyms}
              selectedGym={selectedGym}
              onSelectGym={setSelectedGym}
            />
            <div className="absolute top-4 left-4 right-4 bg-white rounded-lg shadow-lg p-4 z-[1000] pointer-events-none">
              {selectedGym ? (
                <>
                  <h3 className="font-primary text-xl text-primary mb-1">
                    {selectedGym.libelle}
                  </h3>
                  <p className="text-sm text-gray-600 mb-2">{selectedGym.adresse}</p>
                  <p className="text-sm">
                    <strong>{selectedGym.terrains}</strong> terrain{selectedGym.terrains > 1 ? 's' : ''}
                  </p>
                </>
              ) : (
                <>
                  <h3 className="font-primary text-xl text-primary mb-1">
                    Tous les gymnases
                  </h3>
                  <p className="text-sm text-gray-600">
                    Cliquez sur un gymnase ou sur la carte pour voir sa localisation détaillée
                  </p>
                </>
              )}
            </div>
          </motion.div>          </div>

        {/* Info Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-12 md:mt-16 bg-linear-to-r from-primary to-primary-accent text-white rounded-lg p-6 sm:p-8 shadow-xl"
        >
          <h3 className="font-primary text-2xl sm:text-3xl mb-5 md:mb-6 text-center md:text-left">
            Total des équipements
          </h3>
          <div className="flex flex-col divide-y divide-white/20 sm:grid sm:grid-cols-3 sm:divide-y-0 sm:gap-6">
            {equipmentStats.map((stat) => (
              <div
                key={stat.label}
                className="flex items-center justify-between gap-2 py-4 first:pt-0 last:pb-0 sm:flex-col sm:justify-center sm:text-center sm:py-0"
              >
                <p className="font-primary text-4xl md:text-5xl text-secondary leading-none">
                  {stat.value}
                </p>
                <p className="text-sm sm:text-base opacity-90 text-right sm:text-center">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </Section>
    </>
  );
}