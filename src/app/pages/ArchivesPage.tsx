import { PageHero } from '../components/PageHero';
import { motion } from 'motion/react';
import { Calendar } from 'lucide-react';

const archiveYears = [
  {
    year: '2025',
    highlights: [
      'Montée de notre équipe N3',
      'Tournoi régional - 3ème place',
      'Stage d\'été - 45 participants',
    ],
  },
  {
    year: '2024',
    highlights: [
      'Champion départemental D1',
      'Nouveau gymnase inauguré',
      'Partenariat avec Yonex',
    ],
  },
  {
    year: '2023',
    highlights: [
      'Belle saison en N2',
      'Tournoi jeunes - Record de participation',
      'Assemblée générale - 120 membres',
    ],
  },
  {
    year: '2022',
    highlights: [
      'Création de l\'équipe R2',
      'Stage de Toussaint - 30 jeunes',
      'Nouveau président élu',
    ],
  },
];

export function ArchivesPage() {
  return (
    <>
      <PageHero
        title="ARCHIVES"
        subtitle="Retour sur les moments forts du club"
        image="https://images.unsplash.com/photo-1553258223-6e8add562470?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWRtaW50b24lMjBoaXN0b3J5JTIwdmludGFnZXxlbnwxfHx8fDE3NzU5Mjk2OTZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
      />

      <section className="py-20 bg-gray-50">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="space-y-12">
            {archiveYears.map((archive, index) => (
              <motion.div
                key={archive.year}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow duration-300"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="bg-[#0153b6] text-white p-4 rounded-lg">
                    <Calendar size={32} />
                  </div>
                  <h2 className="font-primary text-5xl text-[#da9619]">
                    {archive.year}
                  </h2>
                </div>
                <div className="grid md:grid-cols-3 gap-6">
                  {archive.highlights.map((highlight, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg"
                    >
                      <div className="w-2 h-2 bg-[#da9619] rounded-full mt-2 flex-shrink-0" />
                      <p className="text-gray-700">{highlight}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}