import { motion } from 'motion/react';
import { Link } from 'react-router';
import { Home, Search } from 'lucide-react';
import { Seo } from '../components/Seo';

export function NotFound() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-linear-to-br from-primary to-footer px-6">
      <Seo
        title="Page introuvable"
        description="La page demandée est introuvable sur le site du CLTO Badminton Orléans."
        noindex
      />
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          className="mb-8"
        >
          <p
            className="text-[150px] md:text-[200px] text-white/20 leading-none"
            style={{ fontFamily: 'var(--font-heading)' }}
            aria-hidden
          >
            404
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <Search className="text-secondary" size={40} />
            <h1
              className="text-4xl md:text-5xl text-white tracking-wider"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              Page Non Trouvée
            </h1>
          </div>

          <p className="text-white/80 text-lg mb-8 max-w-md mx-auto">
            Désolé, la page que vous recherchez n'existe pas ou a été déplacée.
          </p>

          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-secondary text-white px-8 py-4 rounded-lg hover:bg-secondary-accent transition-all duration-200 group"
          >
            <Home size={20} className="group-hover:-translate-x-1 transition-transform" />
            <span>Retour à l'accueil</span>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-12"
        >
          <p className="text-white/60 text-sm">
            Liens rapides:
          </p>
          <div className="flex flex-wrap justify-center gap-4 mt-4">
            <Link to="/actualites" className="text-white/80 hover:text-secondary transition-colors">
              Actualités
            </Link>
            <span className="text-white/40">•</span>
            <Link to="/interclub" className="text-white/80 hover:text-secondary transition-colors">
              Nos équipes d'interclubs
            </Link>
            <span className="text-white/40">•</span>
            <Link to="/contact" className="text-white/80 hover:text-secondary transition-colors">
              Contact
            </Link>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
