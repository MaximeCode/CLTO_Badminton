import { useContext, useState, type ReactNode } from 'react';
import { Facebook, Instagram, Youtube, MapPin, Phone, Mail, Linkedin, ChevronDown } from 'lucide-react';
import { Link } from 'react-router';
import logo from '../../imports/logo_clto_main.png';
import { ContactContext } from '../contexts/ContactContext';
import type { Contact } from '@/types/contactType';

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
      <div className="relative max-w-7xl mx-auto px-6 py-4 md:pt-10 md:pb-6">
        {/* Mobile */}
        <div className="lg:hidden">
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
                <Link to="/actualites" className="text-gray-400 hover:text-secondary transition-colors text-sm">
                  Nos Actualités
                </Link>
              </li>
              <li>
                <Link to="/historique" className="text-gray-400 hover:text-secondary transition-colors text-sm">
                  Notre Histoire
                </Link>
              </li>
              <li>
                <Link to="/interclub" className="text-gray-400 hover:text-secondary transition-colors text-sm">
                  Nos Équipes d'interclubs
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-secondary transition-colors text-sm">
                  Nous Contacter
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
                <Link to="/jeunes-loisirs" className="text-gray-400 hover:text-secondary transition-colors text-sm">
                  Jeunes Loisirs
                </Link>
              </li>
              <li>
                <Link to="/jeunes-competiteurs" className="text-gray-400 hover:text-secondary transition-colors text-sm">
                  Jeunes Compétiteurs
                </Link>
              </li>
              <li>
                <Link to="/adultes-loisirs" className="text-gray-400 hover:text-secondary transition-colors text-sm">
                  Adultes Loisirs
                </Link>
              </li>
              <li>
                <Link to="/adultes-competiteurs" className="text-gray-400 hover:text-secondary transition-colors text-sm">
                  Adultes compétiteurs
                </Link>
              </li>
              <li>
                <Link to="/vieilles-plumes" className="text-gray-400 hover:text-secondary transition-colors text-sm">
                  Vieilles plumes
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
                  <span className="text-sm">
                    {contact?.adresse ?? '—'}
                  </span>
                </li>
                <li className="flex items-center gap-2 text-gray-400">
                  <Phone size={16} className="shrink-0" />
                  <a href={`tel:${contact?.telephone?.replace(/\s/g, '')}`} className="text-sm hover:text-secondary transition-colors">
                    {contact?.telephone ?? '—'}
                  </a>
                </li>
                <li className="flex items-center gap-2 text-gray-400">
                  <Mail size={16} className="shrink-0" />
                  <a href={`mailto:${contact?.email}`} className="text-sm hover:text-secondary transition-colors">
                    {contact?.email ?? '—'}
                  </a>
                </li>
              </ul>
            ) : (
              <div>Chargement des coordonnées...</div>
            )}
          </FooterMobileSection>

          <Link
            to="/contact"
            className="mt-4 flex w-full items-center justify-center border-2 border-secondary text-secondary px-4 py-2.5 rounded-md hover:bg-secondary hover:text-white transition-all duration-200 text-sm"
          >
            Nous contacter
          </Link>
        </div>

        {/* Desktop */}
        <div className="hidden lg:grid lg:grid-cols-4 gap-12 mb-6">
          <div>
            <div className="mb-6">
              <img src={logo} alt="CLTO Badminton" className="h-20 w-auto" />
            </div>
            <div className="flex gap-4">
              {socialLinks.map(({ href, icon: Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  aria-label={label}
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-secondary flex items-center justify-center transition-colors duration-200"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-primary text-xl mb-4 tracking-wide">Navigation</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/actualites" className="text-gray-400 hover:text-secondary transition-colors duration-200">
                  Nos Actualités
                </Link>
              </li>
              <li>
                <Link to="/historique" className="text-gray-400 hover:text-secondary transition-colors duration-200">
                  Notre Histoire
                </Link>
              </li>
              <li>
                <Link to="/interclub" className="text-gray-400 hover:text-secondary transition-colors duration-200">
                  Nos Équipes d'interclubs
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-secondary transition-colors duration-200">
                  Nous Contacter
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-primary text-xl mb-4 tracking-wide">Nos Publics</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/jeunes-loisirs" className="text-gray-400 hover:text-secondary transition-colors duration-200">
                  Jeunes Loisirs
                </Link>
              </li>
              <li>
                <Link to="/jeunes-competiteurs" className="text-gray-400 hover:text-secondary transition-colors duration-200">
                  Jeunes Compétiteurs
                </Link>
              </li>
              <li>
                <Link to="/adultes-loisirs" className="text-gray-400 hover:text-secondary transition-colors duration-200">
                  Adultes Loisirs
                </Link>
              </li>
              <li>
                <Link to="/adultes-competiteurs" className="text-gray-400 hover:text-secondary transition-colors duration-200">
                  Adultes compétiteurs
                </Link>
              </li>
              <li>
                <Link to="/vieilles-plumes" className="text-gray-400 hover:text-secondary transition-colors duration-200">
                  Vieilles plumes
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-primary text-xl mb-4 tracking-wide">Contact</h4>
            {contact ? (
              <ul className="space-y-4">
                <li className="flex items-start gap-3 text-gray-400">
                  <MapPin size={18} className="mt-1 shrink-0" />
                  <span className="text-sm">
                    {contact?.adresse ?? '—'}
                  </span>
                </li>
                <li className="flex items-center gap-3 text-gray-400">
                  <Phone size={18} className="shrink-0" />
                  <a href={`tel:${contact?.telephone?.replace(/\s/g, '')}`} className="text-sm hover:text-secondary transition-colors">
                    {contact?.telephone ?? '—'}
                  </a>
                </li>
                <li className="flex items-center gap-3 text-gray-400">
                  <Mail size={18} className="shrink-0" />
                  <a href={`mailto:${contact?.email}`} className="text-sm hover:text-secondary transition-colors">
                    {contact?.email ?? '—'}
                  </a>
                </li>
              </ul>
            ) : (
              <div>Chargement des coordonnées...</div>
            )}
            <Link
              to="/contact"
              className="inline-block mt-6 border-2 border-secondary text-secondary px-4 py-2 rounded-md hover:bg-secondary hover:text-white transition-all duration-200 text-sm cursor-pointer"
            >
              Nous contacter
            </Link>
          </div>
        </div>

        <div className="pt-4 md:pt-6 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-2 md:gap-4 text-xs md:text-sm text-gray-400 text-center md:text-left">
            <p>© {new Date().getFullYear()} CLTO Badminton. Tous droits réservés.</p>
            <p>
              Site réalisé avec passion pour le badminton, par <a href="https://my-portfolio-maxime-baude.vercel.app/" target="_blank" rel="noopener noreferrer" className="hover:text-secondary transition-colors underline">Maxime BAUDE</a>
            </p>
            <nav className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 underline" aria-label="Informations légales">
              <Link to="/mentions-legales" className="hover:text-secondary transition-colors">
                Mentions légales
              </Link>
              <Link to="/politique-de-confidentialite" className="hover:text-secondary transition-colors">
                Politique de confidentialité
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
}
