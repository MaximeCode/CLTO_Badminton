import { PageHero } from '../components/PageHero';
import { motion } from 'motion/react';

const partners = [
  { name: 'Yonex', category: 'Équipementier' },
  { name: 'Sport2000', category: 'Magasin de sport' },
  { name: 'Ville de Paris', category: 'Institutionnel' },
  { name: 'Décathlon', category: 'Magasin de sport' },
  { name: 'Crédit Mutuel', category: 'Banque' },
  { name: 'La Poste', category: 'Services' },
  { name: 'Boulangerie Dupuis', category: 'Commerce local' },
  { name: 'Pharmacie Centrale', category: 'Commerce local' },
];

export function PartenairesPage() {
  return (
    <>
      <PageHero
        title="PARTENAIRES"
        subtitle="Ils nous font confiance et nous soutiennent"
        image="https://images.unsplash.com/photo-1764173040024-14b12d295026?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWRtaW50b24lMjBjbHViJTIwaW5kb29yJTIwY291cnR8ZW58MXx8fHwxNzc1OTI5Njk3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
      />

      <section className="py-20 bg-white">
        <div className="max-w-[1280px] mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="font-['Bebas_Neue'] text-5xl md:text-6xl text-[#0153b6] mb-4">
              NOS PARTENAIRES
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Le CLTO Badminton remercie ses partenaires pour leur soutien précieux
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {partners.map((partner, index) => (
              <motion.div
                key={partner.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-lg p-8 shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col items-center justify-center text-center border-2 border-gray-100 hover:border-[#da9619]"
              >
                <div className="w-24 h-24 bg-gradient-to-br from-[#0153b6] to-[#013d87] rounded-full flex items-center justify-center mb-4">
                  <span className="text-white text-2xl font-bold">
                    {partner.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <h3 className="font-['Bebas_Neue'] text-xl text-[#0153b6] mb-2">
                  {partner.name}
                </h3>
                <p className="text-sm text-gray-500">{partner.category}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-[1280px] mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-lg p-12 shadow-lg text-center"
          >
            <h2 className="font-['Bebas_Neue'] text-4xl text-[#0153b6] mb-6">
              DEVENEZ PARTENAIRE
            </h2>
            <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
              Vous souhaitez soutenir le CLTO Badminton et bénéficier d'une visibilité auprès de nos adhérents ?
              Contactez-nous pour découvrir nos offres de partenariat.
            </p>
            <a
              href="/contact"
              className="inline-block bg-[#da9619] text-white px-8 py-3 rounded-md hover:bg-[#c48515] transition-colors duration-200"
            >
              Nous contacter
            </a>
          </motion.div>
        </div>
      </section>
    </>
  );
}