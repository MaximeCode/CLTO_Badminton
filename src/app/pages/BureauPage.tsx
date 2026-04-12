import { PageHero } from '../components/PageHero';
import { motion } from 'motion/react';
import { Mail, Phone } from 'lucide-react';

const bureauMembers = [
  {
    name: 'Jean Dupont',
    role: 'Président',
    email: 'president@cltobadminton.fr',
    phone: '06 12 34 56 78',
    image: 'https://images.unsplash.com/photo-1688380692117-63178554d76d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHBlb3BsZSUyMG1lZXRpbmclMjBvZmZpY2V8ZW58MXx8fHwxNzc1OTI5Njk3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  },
  {
    name: 'Marie Martin',
    role: 'Vice-Présidente',
    email: 'vicepresident@cltobadminton.fr',
    phone: '06 23 45 67 89',
    image: 'https://images.unsplash.com/photo-1688380692117-63178554d76d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHBlb3BsZSUyMG1lZXRpbmclMjBvZmZpY2V8ZW58MXx8fHwxNzc1OTI5Njk3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  },
  {
    name: 'Pierre Dubois',
    role: 'Trésorier',
    email: 'tresorier@cltobadminton.fr',
    phone: '06 34 56 78 90',
    image: 'https://images.unsplash.com/photo-1688380692117-63178554d76d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHBlb3BsZSUyMG1lZXRpbmclMjBvZmZpY2V8ZW58MXx8fHwxNzc1OTI5Njk3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  },
  {
    name: 'Sophie Bernard',
    role: 'Secrétaire',
    email: 'secretaire@cltobadminton.fr',
    phone: '06 45 67 89 01',
    image: 'https://images.unsplash.com/photo-1688380692117-63178554d76d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHBlb3BsZSUyMG1lZXRpbmclMjBvZmZpY2V8ZW58MXx8fHwxNzc1OTI5Njk3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  },
  {
    name: 'Luc Moreau',
    role: 'Responsable Jeunes',
    email: 'jeunes@cltobadminton.fr',
    phone: '06 56 78 90 12',
    image: 'https://images.unsplash.com/photo-1688380692117-63178554d76d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHBlb3BsZSUyMG1lZXRpbmclMjBvZmZpY2V8ZW58MXx8fHwxNzc1OTI5Njk3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  },
  {
    name: 'Anne Petit',
    role: 'Responsable Adultes',
    email: 'adultes@cltobadminton.fr',
    phone: '06 67 89 01 23',
    image: 'https://images.unsplash.com/photo-1688380692117-63178554d76d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHBlb3BsZSUyMG1lZXRpbmclMjBvZmZpY2V8ZW58MXx8fHwxNzc1OTI5Njk3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  },
];

export function BureauPage() {
  return (
    <>
      <PageHero
        title="LE BUREAU"
        subtitle="L'équipe qui anime votre club"
        image="https://images.unsplash.com/photo-1688380692117-63178554d76d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHBlb3BsZSUyMG1lZXRpbmclMjBvZmZpY2V8ZW58MXx8fHwxNzc1OTI5Njk3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
      />

      <section className="py-20 bg-gray-50">
        <div className="max-w-[1280px] mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="font-['Bebas_Neue'] text-5xl md:text-6xl text-[#0153b6] mb-4">
              LES MEMBRES DU BUREAU
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Une équipe dynamique et passionnée au service des adhérents du club
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {bureauMembers.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="relative h-64 bg-gradient-to-br from-[#0153b6] to-[#013d87] flex items-center justify-center">
                  <div className="text-white text-6xl font-bold">
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-['Bebas_Neue'] text-2xl text-[#0153b6] mb-2">
                    {member.name}
                  </h3>
                  <p className="text-[#da9619] mb-4">{member.role}</p>
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <Mail size={16} className="text-[#0153b6]" />
                      <a href={`mailto:${member.email}`} className="hover:text-[#0153b6] transition-colors">
                        {member.email}
                      </a>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone size={16} className="text-[#0153b6]" />
                      <a href={`tel:${member.phone.replace(/\s/g, '')}`} className="hover:text-[#0153b6] transition-colors">
                        {member.phone}
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}