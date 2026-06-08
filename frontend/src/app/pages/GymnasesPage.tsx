import { useState } from 'react';
import { PageHero } from '../components/PageHero';
import { motion } from 'motion/react';
import { MapPin, Copy, Check, ExternalLink } from 'lucide-react';
import { GymMap } from '../components/GymMap';
import gymnaseChardon from '../../imports/gymnase_chardon.jpg';
interface Gym {
  id: number;
  name: string;
  address: string;
  courts: number;
  lat: number;
  lng: number;
}

const gyms: Gym[] = [
  {
    id: 1,
    name: 'Gymnase Georges Chardon',
    address: '15 Pl. Georges Chardon, 45100 Orléans',
    courts: 7,
    lat: 47.887067687826196,
    lng: 1.9135509424965862,
  },
  {
    id: 2,
    name: 'Gymnase Barthélémy',
    address: 'Av. Jean Zay, 45000 Orléans',
    courts: 7,
    lat: 47.9074296411878,
    lng: 1.92130587135132,
  },
  {
    id: 3,
    name: 'Gymnase Pierre Desseaux',
    address: '10 Rue des Charretiers, 45000 Orléans',
    courts: 4,
    lat: 47.89885970484325,
    lng: 1.899666794653384,
  },
  {
    id: 4,
    name: 'Gymnase Céline Lebrun',
    address: '4 Rue Georges Landré, 45000 Orléans',
    courts: 7,
    lat: 47.92154078965461,
    lng: 1.927667475626574,
  },
  {
    id: 5,
    name: 'Piscine Victor Fouillade',
    address: '1 Rue Jean Bouin, 45000 Orléans',
    courts: 4,
    lat: 47.921666832201105,
    lng: 1.8976930836604693,
  },
];

export function GymnasesPage() {
  const [selectedGym, setSelectedGym] = useState<Gym | null>(null);
  const [copiedAddress, setCopiedAddress] = useState<number | null>(null);

  const copyAddress = (gym: Gym) => {
    navigator.clipboard.writeText(gym.address);
    setCopiedAddress(gym.id);
    setTimeout(() => setCopiedAddress(null), 2000);
  };

  const openInMaps = (gym: Gym) => {
    window.open(`https://www.google.com/maps/search/?api=1&query=${gym.lat},${gym.lng}`, '_blank');
  };

  return (
    <>
      <PageHero
        title="LES GYMNASES"
        subtitle="Découvrez nos 5 gymnases répartis à Orléans"
        image={gymnaseChardon}
      />

      <section className="py-8 md:py-15 bg-white">
        <div className="max-w-[1280px] mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="font-primary text-5xl md:text-6xl text-primary mb-4">
              NOS 5 GYMNASES
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Le CLTO Badminton dispose de 5 gymnases dans Orléans pour vous offrir de nombreux créneaux
              d'entraînement
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Gym List */}
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
                  className={`bg-gray-50 rounded-lg p-6 cursor-pointer transition-all duration-300 border-2 ${selectedGym?.id === gym.id
                    ? 'border-primary shadow-xl bg-blue-50'
                    : 'border-transparent shadow-md hover:shadow-lg hover:border-secondary'
                    }`}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`p-3 rounded-lg transition-colors duration-300 ${selectedGym?.id === gym.id ? 'bg-primary' : 'bg-secondary'
                        }`}
                    >
                      <MapPin className="text-white" size={24} />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-primary text-2xl text-primary mb-2">
                        {gym.name}
                      </h3>
                      <p className="text-gray-600 mb-3">{gym.address}</p>
                      <div className="flex items-center justify-between flex-wrap gap-3">
                        <div className="flex items-center gap-2 bg-gradient-to-r from-primary to-primary-accent text-white px-4 py-2 rounded-lg shadow-md">
                          <div className="text-center flex-1">
                            <p className="text-xs opacity-90">Terrains</p>
                            <p className="font-primary text-3xl">{gym.courts}</p>
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
                      {selectedGym.name}
                    </h3>
                    <p className="text-sm text-gray-600 mb-2">{selectedGym.address}</p>
                    <p className="text-sm">
                      <strong>{selectedGym.courts}</strong> terrain{selectedGym.courts > 1 ? 's' : ''}
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
            className="mt-16 bg-gradient-to-r from-primary to-primary-accent text-white rounded-lg p-8 shadow-xl"
          >
            <h3 className="font-primary text-3xl mb-4">Total des équipements</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              <div className="text-center">
                <p className="font-primary text-5xl text-secondary">5</p>
                <p className="text-sm opacity-90">Gymnases</p>
              </div>
              <div className="text-center">
                <p className="font-primary text-5xl text-secondary">
                  {gyms.reduce((sum, gym) => sum + gym.courts, 0)}
                </p>
                <p className="text-sm opacity-90">Terrains au total</p>
              </div>
              <div className="text-center col-span-2 md:col-span-1">
                <p className="font-primary text-5xl text-secondary">57h</p>
                <p className="text-sm opacity-90">Heures de créneaux par semaine</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}