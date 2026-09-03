import { useState } from 'react';
import { motion } from 'motion/react';
import { Send, Check, Loader2, MessageSquare } from 'lucide-react';
import { Seo } from '../components/Seo';
import { Section } from '../components/Section';
import { PageHero } from '../components/PageHero';
import { PostAPI } from '@/api/Client';

export function AvisPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await PostAPI('/api/form-avis', formData);
      setSubmitted(true);
      setFormData({
        name: '',
        email: '',
        message: '',
      });
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Impossible d'envoyer votre avis. Vérifiez que le serveur est démarré et réessayez.",
      );
    } finally {
      setLoading(false);
      setTimeout(() => {
        setSubmitted(false);
      }, 3000);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const formClasses =
    'w-full px-4 py-2 md:py-3 rounded-lg border border-gray-300 focus:border-primary focus:outline-none transition-colors';

  return (
    <>
      <Seo
        title="Votre avis nous intéresse"
        description="Partagez vos idées et suggestions pour nous aider à améliorer le site et les services du CLTO Badminton Orléans."
      />
      <PageHero
        title="VOTRE AVIS NOUS INTÉRESSE"
        subtitle="Vos retours nous aident à améliorer le site et nos services"
      />

      <Section className="bg-white">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-start gap-4 mb-8">
              <div className="bg-primary text-white p-3 rounded-lg shrink-0">
                <MessageSquare size={24} />
              </div>
              <div>
                <h2 className="font-primary text-3xl md:text-4xl text-primary mb-3">
                  PARTAGEZ VOTRE AVIS
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  Vous avez une idée d&apos;amélioration, un retour sur le site ou une suggestion
                  pour le club ? Nous serions ravis de vous lire.
                </p>
              </div>
            </div>

            <div className="bg-gray-100 rounded-lg p-5 mb-8 text-gray-600 text-sm leading-relaxed">
              <strong className="text-gray-800">Confidentialité :</strong> vos avis sont privés et ne
              seront pas publiés sur le site. Ils sont transmis uniquement à notre équipe
              afin d&apos;améliorer nos services. Vous pouvez rester anonyme en ne renseignant ni
              votre nom ni votre email.
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
              <div>
                <label htmlFor="name" className="block text-gray-700 mb-2">
                  Nom et prénom
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  autoComplete="name"
                  className={formClasses}
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  autoComplete="email"
                  className={formClasses}
                />
                <p className="text-gray-500 text-sm mt-1">
                  Facultatif — pour vous remercier et, si besoin, échanger avec vous sur votre
                  suggestion : demander des précisions, ou vous tenir informé lors de sa mise en
                  place.
                </p>
              </div>

              <div>
                <label htmlFor="message" className="block text-gray-700 mb-2">
                  Votre avis / suggestions *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={8}
                  className={formClasses + ' resize-none'}
                  placeholder="Décrivez votre avis, vos idées d'amélioration pour le site..."
                />
              </div>

              <button
                type="submit"
                disabled={submitted || loading}
                className={`w-full px-8 py-3 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 cursor-pointer ${submitted
                  ? 'bg-green-600 text-white'
                  : 'bg-secondary text-white hover:bg-secondary-accent'
                  }`}
              >
                {submitted ? (
                  <>
                    <Check className="animate-bounce" size={20} />
                    Avis envoyé !
                  </>
                ) : (
                  <>
                    {loading ? (
                      <Loader2 className="animate-spin" size={20} />
                    ) : (
                      <Send size={20} />
                    )}
                    Envoyer mon avis
                  </>
                )}
              </button>

              {error && (
                <p className="text-center text-red-600 text-sm">{error}</p>
              )}
            </form>
          </motion.div>
        </div>
      </Section>
    </>
  );
}
