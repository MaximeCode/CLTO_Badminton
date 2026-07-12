import { PageHero } from '../components/PageHero';
import { Section } from '../components/Section';
import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Send, Check, Loader2 } from 'lucide-react';
import { useState, useContext } from 'react';
import type { Contact } from '@/types/contactType';
import { ContactContext } from '../contexts/ContactContext';
import { formatTime, joinDays } from '@/utils/showHoraires';
import { PostAPI } from '@/api/Client';

const mailSubjects = {
  inscription: "Inscription",
  renseignement: "Renseignement",
  partenariat: "Partenariat",
  jeune: "Jeune",
  adulte: "Adulte",
  veteran: "Vétéran",
  competition: "Compétition",
  loisir: "Loisir",
  autre: "Autre",
};

const mailSubjectGroups = [
  {
    label: "Général",
    keys: ["inscription", "renseignement", "partenariat"] as const,
  },
  {
    label: "Espaces",
    keys: ["jeune", "adulte", "veteran", "competition", "loisir"] as const,
  },
];


export function ContactPage() {
  const contact = useContext<Contact | null>(ContactContext);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
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
      await PostAPI('/api/form-contact', formData);
      setSubmitted(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
      });
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Impossible d\'envoyer votre demande. Vérifiez que le serveur est démarré et réessayez.',
      );
    } finally {
      setLoading(false);
      setTimeout(() => {
        setSubmitted(false);
      }, 3000);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <PageHero
        title="CONTACT"
        subtitle="Rejoignez-nous ou posez-nous vos questions"
        image=""
      />

      <Section className="bg-white">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-primary text-4xl text-primary mb-8">
              NOS COORDONNÉES
            </h2>

            {contact ? (
              <>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-primary text-white p-3 rounded-lg">
                      <MapPin size={24} />
                    </div>
                    <div>
                      <h3 className="text-primary text-2xl mb-1">Siège social</h3>
                      <p className="text-gray-600">
                        {contact?.adresse ?? '—'}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-primary text-white p-3 rounded-lg">
                      <Mail size={24} />
                    </div>
                    <div>
                      <h3 className="text-primary text-2xl mb-1">Email</h3>
                      <a href={`mailto:${contact?.email}`} className="text-primary hover:text-secondary transition-colors">
                        {contact?.email ?? '—'}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-primary text-white p-3 rounded-lg">
                      <Phone size={24} />
                    </div>
                    <div>
                      <h3 className="text-primary text-2xl mb-1">Téléphone</h3>
                      <a href={`tel:${contact?.telephone?.replace(/\s/g, '')}`} className="text-primary hover:text-secondary transition-colors">
                        {contact?.telephone ?? '—'}
                      </a>
                    </div>
                  </div>
                </div>

                <div className="mt-12 bg-gray-100 rounded-lg p-6">
                  <h2 className="font-primary text-4xl text-primary mb-8">
                    HORAIRES DU SECRÉTARIAT
                  </h2>
                  <div className="space-y-2 text-gray-600">
                    <p>
                      <strong>{contact ? joinDays(contact.jour_accueils_physique) : '—'}&nbsp;:</strong>{' '}
                      {contact ? `${formatTime(contact.heure_debut_accueils_physique)} à ${formatTime(contact.heure_fin_accueils_physique)}` : '—'} — accueil physique au siège social
                    </p>
                    <p>
                      <strong>{contact ? joinDays(contact.jour_accueils_a_distance) : '—'}&nbsp;:</strong>{' '}
                      {contact ? `${formatTime(contact.heure_debut_accueils_a_distance)} à ${formatTime(contact.heure_fin_accueils_a_distance)}` : '—'} — uniquement par téléphone, SMS, WhatsApp au{' '}
                      <a href={`tel:${contact?.telephone?.replace(/\s/g, '')}`} className="text-primary hover:text-secondary transition-colors">
                        {contact?.telephone ?? '—'}
                      </a>{' '}ou par mail
                    </p>
                  </div>
                </div>
              </>
            ) : (
              <div>Chargement des coordonnées...</div>
            )}
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-primary text-4xl text-primary mb-8">
              ENVOYEZ-NOUS UN MESSAGE
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-gray-700 mb-2">
                  Nom et prénom *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-gray-700 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-gray-700 mb-2">
                  Téléphone
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-gray-700 mb-2">
                  Sujet *
                </label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary focus:outline-none transition-colors"
                >
                  <option value="">Sélectionnez un sujet</option>
                  {mailSubjectGroups.map((group) => (
                    <optgroup key={group.label} label={group.label}>
                      {group.keys.map((key) => (
                        <option key={key} value={key}>
                          {mailSubjects[key]}
                        </option>
                      ))}
                    </optgroup>
                  ))}
                  <option value="autre">{mailSubjects.autre}</option>

                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-gray-700 mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary focus:outline-none transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={submitted || loading}
                className={`w-full bg-secondary text-white px-8 py-3 rounded-lg hover:bg-secondary-accent transition-colors duration-200 flex items-center justify-center gap-2 cursor-pointer ${submitted
                  ? 'bg-green-600 text-white'
                  : 'bg-secondary text-white hover:bg-secondary-accent'
                  }`}
              >
                {submitted ? (
                  <>
                    <Check className="animate-bounce" size={20} />
                    Message envoyé !
                  </>
                ) : (
                  <>
                    {loading ? (
                      <Loader2 className="animate-spin" size={20} />
                    ) : (
                      <Send size={20} />
                    )}
                    Envoyer le message
                  </>
                )}
              </button>

              {error && (
                <p className="text-center text-red-600 text-sm">
                  {error}
                </p>
              )}

            </form>
          </motion.div>
        </div>
      </Section>

      {/* Map Section */}
      <Section className="bg-gray-50">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-primary text-4xl text-primary mb-8 text-center">
            LOCALISER LE SIÈGE SOCIAL
          </h2>
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="h-96 bg-gray-200 flex items-center justify-center">
              <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2604.795614571111!2d1.909339176549044!3d47.90425207613338!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47f7751546555555%3A0x47f7751546555555!2s1%20Boulevard%20de%20Qu%C3%A9bec%2C%2045000%20Orl%C3%A9ans!5e0!3m2!1sfr!2sfr!4v1719787200000!5m2!1sfr!2sfr" width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="Position xsur une carte Google Maps de la CLTO Badminton"></iframe>
            </div>
          </div>
        </motion.div>
      </Section>
    </>
  );
}