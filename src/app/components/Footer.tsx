import { Facebook, Instagram, Youtube, MapPin, Phone, Mail, Linkedin } from 'lucide-react';
import { Link } from 'react-router';
import logo from '../../imports/logo_clto_main.png';

export function Footer() {
  return (
    <footer className="relative bg-footer text-white overflow-hidden">
      <div className="relative max-w-[1280px] mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Column 1: Logo & Social */}
          <div>
            <div className="mb-6">
              <img
                src={logo}
                alt="CLTO Badminton"
                className="h-20 w-auto"
              />
            </div>
            <p className="text-gray-400 text-sm mb-6">
              L'un des plus grands clubs de badminton de France
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-secondary flex items-center justify-center transition-colors duration-200"
              >
                <Facebook size={18} />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-secondary flex items-center justify-center transition-colors duration-200"
              >
                <Instagram size={18} />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-secondary flex items-center justify-center transition-colors duration-200"
              >
                <Youtube size={18} />
              </a>
              <a
                href="https://www.linkedin.com/company/clto-badminton/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-secondary flex items-center justify-center transition-colors duration-200"
              >
                <Linkedin size={18} />
              </a>
            </div>
          </div>

          {/* Column 2: Navigation */}
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

          {/* Column 3: Jeunes & Adultes */}
          <div>
            <h4 className="font-primary text-xl mb-4 tracking-wide">Nos Espaces</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/jeunes" className="text-gray-400 hover:text-secondary transition-colors duration-200">
                  Jeunes
                </Link>
              </li>
              <li>
                <Link to="/adultes" className="text-gray-400 hover:text-secondary transition-colors duration-200">
                  Adultes
                </Link>
              </li>
              <li>
                <Link to="/veterans" className="text-gray-400 hover:text-secondary transition-colors duration-200">
                  Vétérans
                </Link>
              </li>
              <li>
                <Link to="/loisir" className="text-gray-400 hover:text-secondary transition-colors duration-200">
                  Loisirs
                </Link>
              </li>
              <li>
                <Link to="/competitions" className="text-gray-400 hover:text-secondary transition-colors duration-200">
                  Compétitions
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div>
            <h4 className="font-primary text-xl mb-4 tracking-wide">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-gray-400">
                <MapPin size={18} className="mt-1 flex-shrink-0" />
                <span className="text-sm">
                  1 Boulevard de Québec<br />
                  45000 Orléans
                </span>
              </li>
              <li className="flex items-center gap-3 text-gray-400">
                <Phone size={18} className="flex-shrink-0" />
                <span className="text-sm">02 45 48 21 62</span>
              </li>
              <li className="flex items-center gap-3 text-gray-400">
                <Mail size={18} className="flex-shrink-0" />
                <span className="text-sm">contact@cltobadminton.fr</span>
              </li>
            </ul>
            <Link
              to="/contact"
              className="inline-block mt-6 border-2 border-secondary text-secondary px-4 py-2 rounded-md hover:bg-secondary hover:text-white transition-all duration-200 text-sm cursor-pointer"
            >
              Nous contacter
            </Link>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
            <p>© {new Date().getFullYear()} CLTO Badminton. All rights reserved.</p>
            <p>Site réalisé avec passion pour le badminton</p>
          </div>
        </div>
      </div>
    </footer>
  );
}