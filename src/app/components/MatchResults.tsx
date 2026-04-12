import { motion } from 'motion/react';

export function MatchResults() {
  return (
    <section className="py-20 bg-[#f5f7fa]">
      <div className="max-w-[1280px] mx-auto px-6">
        {/* Section Title */}
        <div className="flex items-center gap-4 mb-12">
          <div className="w-1 h-16 bg-[#da9619]" />
          <h2 className="font-['Bebas_Neue'] text-5xl text-[#0153b6] tracking-wide">
            RÉSULTATS INTERCLUBS
          </h2>
        </div>

        {/* Match Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-lg shadow-lg overflow-hidden max-w-3xl mx-auto mb-8"
        >
          <div className="bg-gradient-to-r from-[#0153b6] to-[#013d87] text-white p-4 text-center">
            <div className="text-sm uppercase tracking-wider mb-1">Championnat Régional - Division 1</div>
            <div className="text-xs opacity-80">Dimanche 2 mars 2026</div>
          </div>

          <div className="p-8">
            <div className="flex items-center justify-between">
              {/* Home Team */}
              <div className="flex-1 text-center">
                <div className="w-20 h-20 mx-auto mb-3 rounded-full bg-gradient-to-br from-[#0153b6] to-[#da9619] flex items-center justify-center">
                  <span className="text-white font-bold text-2xl">C</span>
                </div>
                <div className="font-['Bebas_Neue'] text-2xl text-gray-900">CLTO BADMINTON</div>
                <div className="text-sm text-gray-500">Orléans</div>
              </div>

              {/* Score */}
              <div className="px-8">
                <div className="flex items-center gap-4">
                  <div className="font-['Bebas_Neue'] text-6xl text-[#0153b6]">6</div>
                  <div className="text-2xl text-gray-400">-</div>
                  <div className="font-['Bebas_Neue'] text-6xl text-gray-400">2</div>
                </div>
                <div className="mt-2 text-center">
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                    Victoire
                  </span>
                </div>
              </div>

              {/* Away Team */}
              <div className="flex-1 text-center">
                <div className="w-20 h-20 mx-auto mb-3 rounded-full bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-600 font-bold text-2xl">BC</span>
                </div>
                <div className="font-['Bebas_Neue'] text-2xl text-gray-900">BC TOURS</div>
                <div className="text-sm text-gray-500">Tours</div>
              </div>
            </div>

            {/* Match Details */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="grid grid-cols-3 gap-4 text-center text-sm">
                <div>
                  <div className="text-gray-500 mb-1">Simples</div>
                  <div className="font-bold text-[#0153b6]">4 - 0</div>
                </div>
                <div>
                  <div className="text-gray-500 mb-1">Doubles</div>
                  <div className="font-bold text-[#0153b6]">2 - 1</div>
                </div>
                <div>
                  <div className="text-gray-500 mb-1">Mixtes</div>
                  <div className="font-bold text-[#0153b6]">0 - 1</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* CTA Button */}
        <div className="text-center">
          <button className="bg-[#0153b6] text-white px-10 py-4 rounded-full hover:bg-[#da9619] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
            Voir tous les résultats
          </button>
        </div>
      </div>
    </section>
  );
}
