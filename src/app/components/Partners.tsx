import { motion } from 'motion/react';

// Mock partner logos - in real implementation these would be actual partner logos
const partners = [
  { name: 'Yonex', initials: 'YX' },
  { name: 'Victor', initials: 'VC' },
  { name: 'Li-Ning', initials: 'LN' },
  { name: 'Babolat', initials: 'BB' },
  { name: 'Forza', initials: 'FZ' },
  { name: 'Carlton', initials: 'CT' },
  { name: 'Apacs', initials: 'AP' },
  { name: 'FZ Forza', initials: 'FF' },
];

export function Partners() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-[1280px] mx-auto px-6">
        {/* Section Title */}
        <div className="text-center mb-12">
          <h2 className="font-['Bebas_Neue'] text-4xl text-gray-900 tracking-wide mb-2">
            ILS NOUS SOUTIENNENT
          </h2>
          <div className="w-24 h-1 bg-[#da9619] mx-auto" />
        </div>

        {/* Partners Grid */}
        <div className="relative">
          {/* Top Gold Line */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#da9619] to-transparent" />
          
          <div className="py-12 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-8">
            {partners.map((partner, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.05 * index }}
                className="group flex items-center justify-center"
              >
                {/* Mock Logo - Replace with actual partner logos */}
                <div className="w-24 h-24 flex items-center justify-center border-2 border-gray-200 rounded-lg grayscale group-hover:grayscale-0 transition-all duration-300 group-hover:border-[#da9619]">
                  <span className="text-2xl font-bold text-gray-400 group-hover:text-[#0153b6] transition-colors duration-300">
                    {partner.initials}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Bottom Gold Line */}
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#da9619] to-transparent" />
        </div>

        {/* Partnership CTA */}
        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">Vous souhaitez devenir partenaire ?</p>
          <button className="border-2 border-[#da9619] text-[#da9619] px-6 py-2 rounded-md hover:bg-[#da9619] hover:text-white transition-all duration-200">
            Nous contacter
          </button>
        </div>
      </div>
    </section>
  );
}
