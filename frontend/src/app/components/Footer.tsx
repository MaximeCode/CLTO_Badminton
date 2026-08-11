import { useContext, useState, type ReactNode } from 'react';
import { Facebook, Instagram, Youtube, MapPin, Phone, Mail, Linkedin, ChevronDown, Clock } from 'lucide-react';
import { Link } from 'react-router';
import logo from '../../imports/logo_clto_main.png';
import { ContactContext } from '../contexts/ContactContext';
import type { Contact } from '@/types/contactType';
import { formatTime, joinDays } from '@/utils/showHoraires';

type FooterMobileSectionId = 'navigation' | 'espaces' | 'contact';

function FooterMobileSection({
  id,
  title,
  openSection,
  onToggle,
  children,
}: {
  id: FooterMobileSectionId;
  title: string;
  openSection: FooterMobileSectionId | null;
  onToggle: (id: FooterMobileSectionId) => void;
  children: ReactNode;
}) {
  const open = openSection === id;

  return (
    <div className="border-b border-white/10">
      <button
        type="button"
        onClick={() => onToggle(id)}
        aria-expanded={open}
        className="flex w-full items-center justify-between py-3 text-left"
      >
        <h4 className="font-primary text-lg tracking-wide">{title}</h4>
        <ChevronDown
          size={18}
          className={`shrink-0 text-gray-400 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        />
      </button>
      {open && <div className="pb-3">{children}</div>}
    </div>
  );
}

const socialLinks = [
  { href: 'https://www.facebook.com/cltoBadminton', icon: Facebook, label: 'Facebook' },
  { href: 'https://www.instagram.com/cltobadminton/', icon: Instagram, label: 'Instagram' },
  { href: 'https://www.linkedin.com/company/clto-badminton/', icon: Linkedin, label: 'LinkedIn' },
] as const;

export function Footer() {
  const contact = useContext<Contact | null>(ContactContext);
  // console.log('contact', contact);
  const [openSection, setOpenSection] = useState<FooterMobileSectionId | null>(null);

  const toggleSection = (id: FooterMobileSectionId) => {
    setOpenSection((current) => (current === id ? null : id));
  };

  return (
    <footer className="relative bg-footer text-white overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-6 py-4 sm:pt-10 sm:pb-6">
        {/* Mobile */}
        <div className="sm:hidden">
          <div className="flex items-center gap-4 mb-5">
            <img src={logo} alt="CLTO Badminton" className="h-14 w-auto shrink-0" />
            <div className="min-w-0 flex-1">
              <div className="flex gap-2">
                {socialLinks.map(({ href, icon: Icon, label }) => (
                  <a
                    key={label}
                    href={href}
                    target={href.startsWith('http') ? '_blank' : undefined}
                    rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    aria-label={label}
                    className="w-9 h-9 rounded-full bg-white/10 hover:bg-secondary flex items-center justify-center transition-colors duration-200"
                  >
                    <Icon size={16} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          <FooterMobileSection
            id="navigation"
            title="Navigation"
            openSection={openSection}
            onToggle={toggleSection}
          >
            <ul className="space-y-2">
              <li>
                <Link to="/actualites" className="text-gray-400 hover:text-secondary transition-colors text-xs">
                  Nos Actualités
                </Link>
              </li>
              <li>
                <Link to="/historique" className="text-gray-400 hover:text-secondary transition-colors text-xs">
                  Notre Histoire
                </Link>
              </li>
              <li>
                <Link to="/interclub" className="text-gray-400 hover:text-secondary transition-colors text-xs">
                  Nos Équipes d'interclubs
                </Link>
              </li>
              <li>
                <Link to="/documents" className="text-gray-400 hover:text-secondary transition-colors text-xs">
                  Documents officiels
                </Link>
              </li>
              <li>
                <Link to="/galerie" className="text-gray-400 hover:text-secondary transition-colors text-xs">
                  Galerie
                </Link>
              </li>
            </ul>
          </FooterMobileSection>

          <FooterMobileSection
            id="espaces"
            title="Nos Publics"
            openSection={openSection}
            onToggle={toggleSection}
          >
            <ul className="space-y-2">
              <li>
                <Link to="/jeunes" className="text-gray-400 hover:text-secondary transition-colors text-xs">
                  Jeunes
                </Link>
              </li>
              <li>
                <Link to="/adultes-loisirs" className="text-gray-400 hover:text-secondary transition-colors text-xs">
                  Adultes Loisirs
                </Link>
              </li>
              <li>
                <Link to="/adultes-competiteurs" className="text-gray-400 hover:text-secondary transition-colors text-xs">
                  Adultes compétiteurs
                </Link>
              </li>
              <li>
                <Link to="/vieilles-plumes" className="text-gray-400 hover:text-secondary transition-colors text-xs">
                  Vieilles Plumes Seniors 60 ans et +
                </Link>
              </li>
              <li>
                <Link to="/entreprise" className="text-gray-400 hover:text-secondary transition-colors text-xs">
                  Entreprise
                </Link>
              </li>
            </ul>
          </FooterMobileSection>

          <FooterMobileSection
            id="contact"
            title="Contact"
            openSection={openSection}
            onToggle={toggleSection}
          >
            {contact ? (
              <ul className="space-y-3">
                <li className="flex items-start gap-2 text-gray-400">
                  <MapPin size={16} className="mt-0.5 shrink-0" />
                  <span className="text-xs">
                    {contact?.adresse ?? '—'}
                  </span>
                </li>
                <li className="flex items-center gap-2 text-gray-400">
                  <Phone size={16} className="shrink-0" />
                  <a href={`tel:${contact?.telephone?.replace(/\s/g, '')}`} className="text-xs hover:text-secondary transition-colors">
                    {contact?.telephone ?? '—'}
                  </a>
                </li>
                <li className="flex items-center gap-2 text-gray-400">
                  <Mail size={16} className="shrink-0" />
                  <a href={`mailto:${contact?.email}`} className="text-xs hover:text-secondary transition-colors">
                    {contact?.email ?? '—'}
                  </a>
                </li>
                <li className="flex items-start gap-2 text-gray-400">
                  <Clock size={16} className="mt-0.5 shrink-0" />
                  <span className="text-xs space-y-1">
                    <span className="block">
                      <strong className="text-gray-300">{joinDays(contact.jour_accueils_physique) || '—'}&nbsp;:</strong>{' '}
                      {formatTime(contact.heure_debut_accueils_physique)} à {formatTime(contact.heure_fin_accueils_physique)} — accueil physique
                    </span>
                    <span className="block">
                      <strong className="text-gray-300">{joinDays(contact.jour_accueils_a_distance) || '—'}&nbsp;:</strong>{' '}
                      {formatTime(contact.heure_debut_accueils_a_distance)} à {formatTime(contact.heure_fin_accueils_a_distance)} — à distance
                    </span>
                  </span>
                </li>
              </ul>
            ) : (
              <div>Chargement des coordonnées...</div>
            )}
          </FooterMobileSection>

          <Link
            to="/contact"
            className="mt-4 flex w-full items-center justify-center border-2 border-secondary text-secondary px-4 py-2.5 rounded-md hover:bg-secondary hover:text-white transition-all duration-200 text-xs"
          >
            Nous contacter
          </Link>
        </div>

        {/* Desktop */}
        <div className="hidden sm:grid gap-4 lg:gap-10 mb-6 sm:grid-cols-[auto_repeat(6,1fr)] md:grid-cols-9">

          <div className="flex flex-row sm:flex-col items-start sm:items-center gap-3">
            <img src={logo} alt="CLTO Badminton" className="h-14 w-auto shrink-0" />
            <div className="flex flex-col gap-2">
              {socialLinks.map(({ href, icon: Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  aria-label={label}
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-secondary flex items-center justify-center transition-colors duration-200"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          <div className="sm:col-span-2">
            <h4 className="font-primary text-xl mb-4 tracking-wide">Navigation</h4>
            <ul className="space-y-2 lg:space-y-3">
              <li>
                <Link to="/actualites" className="sm:text-xs md:text-sm text-gray-400 hover:text-secondary transition-colors duration-200">
                  Nos Actualités
                </Link>
              </li>
              <li>
                <Link to="/historique" className="sm:text-xs md:text-sm text-gray-400 hover:text-secondary transition-colors duration-200">
                  Notre Histoire
                </Link>
              </li>
              <li>
                <Link to="/interclub" className="sm:text-xs md:text-sm text-gray-400 hover:text-secondary transition-colors duration-200">
                  Nos Équipes d'interclubs
                </Link>
              </li>
              <li>
                <Link to="/documents" className="sm:text-xs md:text-sm text-gray-400 hover:text-secondary transition-colors duration-200">
                  Documents officiels
                </Link>
              </li>
              <li>
                <Link to="/galerie" className="sm:text-xs md:text-sm text-gray-400 hover:text-secondary transition-colors duration-200">
                  Galerie
                </Link>
              </li>
            </ul>
          </div>

          <div className="sm:col-span-2">
            <h4 className="font-primary text-xl mb-4 tracking-wide">Nos Publics</h4>
            <ul className="space-y-2 lg:space-y-3">
              <li>
                <Link to="/jeunes" className="sm:text-xs md:text-sm text-gray-400 hover:text-secondary transition-colors duration-200">
                  Jeunes
                </Link>
              </li>
              <li>
                <Link to="/adultes-loisirs" className="sm:text-xs md:text-sm text-gray-400 hover:text-secondary transition-colors duration-200">
                  Adultes Loisirs
                </Link>
              </li>
              <li>
                <Link to="/adultes-competiteurs" className="sm:text-xs md:text-sm text-gray-400 hover:text-secondary transition-colors duration-200">
                  Adultes compétiteurs
                </Link>
              </li>
              <li>
                <Link to="/vieilles-plumes" className="sm:text-xs md:text-sm text-gray-400 hover:text-secondary transition-colors duration-200">
                  Vieilles Plumes<br />Seniors 60 ans et +
                </Link>
              </li>
              <li>
                <Link to="/entreprise" className="sm:text-xs md:text-sm text-gray-400 hover:text-secondary transition-colors duration-200">
                  Entreprise
                </Link>
              </li>
            </ul>
          </div>

          <div className="sm:col-span-2 md:col-span-4 lg:col-span-2">
            <h4 className="font-primary text-xl mb-4 tracking-wide">Contact</h4>
            {contact ? (
              <ul className="space-y-2 lg:space-y-3">
                <li className="flex items-start gap-3 text-gray-400">
                  <MapPin size={18} className="mt-1 shrink-0" />
                  <span className="sm:text-xs md:text-sm text-balance">
                    {contact?.adresse ?? '—'}
                  </span>
                </li>
                <li className="flex items-center gap-3 text-gray-400">
                  <Phone size={18} className="shrink-0" />
                  <a href={`tel:${contact?.telephone?.replace(/\s/g, '')}`} className="sm:text-xs md:text-sm hover:text-secondary transition-colors">
                    {contact?.telephone ?? '—'}
                  </a>
                </li>
                <li className="flex items-center gap-3 text-gray-400">
                  <Mail size={18} className="shrink-0" />
                  <a href={`mailto:${contact?.email}`} className="sm:text-xs md:text-sm hover:text-secondary transition-colors">
                    {contact?.email ?? '—'}
                  </a>
                </li>
                <li className="flex items-start gap-3 text-gray-400 lg:hidden">
                  <Clock size={18} className="mt-1 shrink-0" />
                  <span className="sm:text-xs md:text-sm space-y-1">
                    <span className="block">
                      <strong className="text-gray-300">{joinDays(contact.jour_accueils_physique) || '—'}&nbsp;:</strong>{' '}
                      {formatTime(contact.heure_debut_accueils_physique)} à {formatTime(contact.heure_fin_accueils_physique)} — accueil physique
                    </span>
                    <span className="block">
                      <strong className="text-gray-300">{joinDays(contact.jour_accueils_a_distance) || '—'}&nbsp;:</strong>{' '}
                      {formatTime(contact.heure_debut_accueils_a_distance)} à {formatTime(contact.heure_fin_accueils_a_distance)} — à distance
                    </span>
                  </span>
                </li>
              </ul>
            ) : (
              <div className="sm:text-xs md:text-sm">Chargement des coordonnées...</div>
            )}
            <Link
              to="/contact"
              className="inline-block mt-4 border-2 border-secondary text-secondary px-4 py-2 rounded-md hover:bg-secondary hover:text-white transition-all duration-200 sm:text-xs md:text-sm cursor-pointer"
            >
              Nous contacter
            </Link>
          </div>

          <div className="hidden lg:block md:col-span-2">
            <h4 className="font-primary text-xl mb-4 tracking-wide">Horaires</h4>
            {contact ? (
              <ul className="space-y-2 lg:space-y-3">
                <li className="flex items-start gap-3 text-gray-400">
                  <Clock size={18} className="mt-1 shrink-0" />
                  <span className="sm:text-xs md:text-sm space-y-1">
                    <span className="block">
                      <strong className="text-gray-300">{joinDays(contact.jour_accueils_physique) || '—'}&nbsp;:</strong>{' '}
                      {formatTime(contact.heure_debut_accueils_physique)} à {formatTime(contact.heure_fin_accueils_physique)} — accueil physique
                    </span>
                    <span className="block">
                      <strong className="text-gray-300">{joinDays(contact.jour_accueils_a_distance) || '—'}&nbsp;:</strong>{' '}
                      {formatTime(contact.heure_debut_accueils_a_distance)} à {formatTime(contact.heure_fin_accueils_a_distance)} — à distance
                    </span>
                  </span>
                </li>
              </ul>
            ) : (
              <div className="sm:text-xs md:text-sm">Chargement des horaires...</div>
            )}
          </div>
        </div>

        <div className="pt-4 sm:pt-6 border-t border-white/10">
          <p className="mb-4 sm:text-xs md:text-sm text-gray-400 text-center text-balance">
            Notre site vient de se refaire une beauté mais peut contenir des erreurs. Si vous rencontrez un problème, n&apos;hésitez pas à{' '}
            <Link to="/contact" className="sm:text-xs md:text-sm underline hover:text-secondary transition-colors">
              nous en faire part
            </Link>
            .
          </p>
          <div className="flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-4 sm:text-xs md:text-sm text-gray-400 text-center sm:text-left">
            <p className="sm:text-xs md:text-sm">© {new Date().getFullYear()} CLTO Badminton. Tous droits réservés.</p>
            <p className="sm:text-xs md:text-sm">
              Site réalisé avec passion pour le badminton, par <a href="https://my-portfolio-maxime-baude.vercel.app/" target="_blank" rel="noopener noreferrer" className="sm:text-xs md:text-sm hover:text-secondary transition-colors underline">Maxime BAUDE</a>
            </p>
            <nav className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 underline sm:text-xs md:text-sm" aria-label="Informations légales">
              <Link to="/mentions-legales" className="sm:text-xs md:text-sm hover:text-secondary transition-colors">
                Mentions légales
              </Link>
              <Link to="/politique-de-confidentialite" className="sm:text-xs md:text-sm hover:text-secondary transition-colors">
                Politique de confidentialité
              </Link>
              <a href="/sitemap.xml" target="_blank" rel="noopener noreferrer" className="text-xs hover:text-secondary transition-colors">Sitemap</a>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
}
