import { PageHero } from '../components/PageHero';
import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { useState } from 'react';

export function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form submission logic would go here
    console.log('Form submitted:', formData);
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
        image="https://images.unsplash.com/photo-1758686254030-a6dae2f49e69?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb250YWN0JTIwc3VwcG9ydCUyMGNvbW11bmljYXRpb258ZW58MXx8fHwxNzc1OTI5Njk5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
      />

      <section className="py-10 md:py-20 bg-white">
        <div className="max-w-[1280px] mx-auto px-6">
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

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-primary text-white p-3 rounded-lg">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h3 className="text-primary text-2xl mb-1">Siège social</h3>
                    <p className="text-gray-600">
                      1 Boulevard de Québec<br />
                      45000 Orléans<br />
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-primary text-white p-3 rounded-lg">
                    <Mail size={24} />
                  </div>
                  <div>
                    <h3 className="text-primary text-2xl mb-1">Email</h3>
                    <a href="mailto:contact@cltobadminton.fr" className="text-primary hover:text-secondary transition-colors">
                      contact@cltobadminton.fr
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-primary text-white p-3 rounded-lg">
                    <Phone size={24} />
                  </div>
                  <div>
                    <h3 className="text-primary text-2xl mb-1">Téléphone</h3>
                    <a href="tel:0612345678" className="text-primary hover:text-secondary transition-colors">
                      02 45 48 21 62
                    </a>
                  </div>
                </div>
              </div>

              <div className="mt-12 bg-gray-50 rounded-lg py-6">
                <h2 className="font-primary text-4xl text-primary mb-8">
                  HORAIRES DU SECRÉTARIAT
                </h2>
                <div className="space-y-2 text-gray-600">
                  <p>
                    <strong>Lundi et mardi&nbsp;:</strong> 9h30 à 16h — accueil physique au siège social
                  </p>
                  <p>
                    <strong>Mercredi et jeudi&nbsp;:</strong> 9h30 à 16h — uniquement par téléphone, SMS, WhatsApp au <a href="tel:0665296372" className="text-primary hover:text-secondary transition-colors">06 65 29 63 72</a> ou par mail
                  </p>
                </div>

              </div>
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
                    <option value="inscription">Inscription</option>
                    <option value="renseignement">Renseignement</option>
                    <option value="partenariat">Partenariat</option>
                    <hr></hr>
                    <option value="jeune">Jeune</option>
                    <option value="adulte">Adulte</option>
                    <option value="veteran">Vétéran</option>
                    <option value="competition">Compétition</option>
                    <option value="loisir">Loisir</option>
                    <option value="autre">Autre</option>
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
                  className="w-full bg-secondary text-white px-8 py-3 rounded-lg hover:bg-secondary-accent transition-colors duration-200 flex items-center justify-center gap-2"
                >
                  <Send size={20} />
                  Envoyer le message
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-10 md:py-20 bg-gray-50">
        <div className="max-w-[1280px] mx-auto px-6">
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
        </div>
      </section>
    </>
  );
}