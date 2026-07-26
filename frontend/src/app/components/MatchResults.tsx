import { motion } from 'motion/react';
import { Link } from 'react-router';
import logo from '../../imports/logo_clto_main.png';
import { HomePageSectionTitle } from './homePage_SectionTitle';
import { Section } from './Section';

export function MatchResults() {
  return (
    <Section className="bg-clto-grey font-primary">
        <HomePageSectionTitle title="RÉSULTATS INTERCLUBS" />

        {/* Match Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="font-primary bg-white rounded-lg shadow-lg overflow-hidden max-w-3xl mx-auto mb-8"
        >
          <div className="bg-linear-to-r from-primary to-primary-accent text-white p-4 text-center">
            <div className="text-md uppercase tracking-wider mb-1 font-primary">J10 - Nationale 2</div>
            <div className="text-sm opacity-80 font-primary">Samedi 11 avril 2026</div>
          </div>

          <div className="p-8">
            <div className="flex items-center justify-between">
              {/* Home Team */}
              <div className="flex-1 text-center">
                <img
                  src={logo}
                  alt="CLTO Badminton"
                  className="w-20 h-auto object-contain mx-auto mb-3"
                />

                <div className="text-2xl text-gray-900">CLTO BADMINTON</div>
                <div className="text-sm text-gray-500">Orléans</div>
              </div>

              {/* Score */}
              <div className="px-8">
                <div className="flex items-center gap-4">
                  <div className="font-primary text-6xl text-primary">2</div>
                  <div className="text-2xl text-gray-400">-</div>
                  <div className="font-primary text-6xl text-gray-400">6</div>
                </div>
                <div className="mt-2 text-center">
                  <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium">
                    Défaite
                  </span>
                </div>
              </div>

              {/* Away Team */}
              <div className="flex-1 text-center">
                <div className="w-20 h-20 mx-auto mb-3 rounded-full bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-600 font-bold text-2xl">CAB</span>
                </div>
                <div className="font-primary text-2xl text-gray-900">CLUB ALENÇONNAIS BADMINTON</div>
                <div className="text-sm text-gray-500">Alençon</div>
              </div>
            </div>

            {/* Match Details */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="grid grid-cols-3 gap-4 text-center text-sm">
                <div>
                  <div className="text-gray-500 mb-1">Simples</div>
                  <div className="font-bold text-primary">2 - 2</div>
                </div>
                <div>
                  <div className="text-gray-500 mb-1">Doubles</div>
                  <div className="font-bold text-primary">0 - 2</div>
                </div>
                <div>
                  <div className="text-gray-500 mb-1">Mixtes</div>
                  <div className="font-bold text-primary">0 - 2</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* <div className="max-w-[1280px] mx-auto px-4 my-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-full rounded-lg"
          >
            <iframe
              id="interclub-iframe"
              width="100%"
              height="700px"
              className="h-[700px] w-full rounded-lg border-2 border-gray-200"
              src={`https://icbad.ffbad.org/rencontre/772074`}
            ></iframe>
          </motion.div>
        </div> */}

        {/* CTA Button */}
        <div className="text-center">
          <Link to="/interclub" className="bg-primary text-white px-10 py-4 rounded-full hover:bg-secondary transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
            Voir tous les résultats
          </Link>
        </div>
    </Section>
  );
}
