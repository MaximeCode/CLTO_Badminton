import { Facebook, Instagram, Youtube, MapPin, Phone, Mail } from 'lucide-react';
import logo from '@/assets/logo_clto_main.png';

export function Footer() {
  return (
    <footer className="relative bg-[#0a1f3d] text-white overflow-hidden">
      {/* Subtle shuttlecock watermark */}
      <div className="absolute inset-0 opacity-5">
        <svg className="absolute right-0 bottom-0 w-96 h-96" viewBox="0 0 200 200" fill="currentColor">
          <circle cx="100" cy="60" r="8" />
          <path d="M 100 68 L 85 150 L 100 140 L 115 150 Z" />
        </svg>
      </div>

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
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#da9619] flex items-center justify-center transition-colors duration-200"
              >
                <Facebook size={18} />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#da9619] flex items-center justify-center transition-colors duration-200"
              >
                <Instagram size={18} />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#da9619] flex items-center justify-center transition-colors duration-200"
              >
                <Youtube size={18} />
              </a>
            </div>
          </div>

          {/* Column 2: Navigation */}
          <div>
            <h4 className="font-['Bebas_Neue'] text-xl mb-4 tracking-wide">Navigation</h4>
            <ul className="space-y-3">
              {['Actualités', 'Le Club', 'Équipes', 'Interclubs'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-gray-400 hover:text-[#da9619] transition-colors duration-200">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Espaces */}
          <div>
            <h4 className="font-['Bebas_Neue'] text-xl mb-4 tracking-wide">Espaces</h4>
            <ul className="space-y-3">
              {['Espace Jeunes', 'Espace Adultes', 'Compétition', 'Loisir'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-gray-400 hover:text-[#da9619] transition-colors duration-200">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div>
            <h4 className="font-['Bebas_Neue'] text-xl mb-4 tracking-wide">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-gray-400">
                <MapPin size={18} className="mt-1 flex-shrink-0" />
                <span className="text-sm">
                  Boulevard de Québec<br />
                  45000 Orléans
                </span>
              </li>
              <li className="flex items-center gap-3 text-gray-400">
                <Phone size={18} className="flex-shrink-0" />
                <span className="text-sm">02 45 46 32 62</span>
              </li>
              <li className="flex items-center gap-3 text-gray-400">
                <Mail size={18} className="flex-shrink-0" />
                <span className="text-sm">contact@cltobadminton.fr</span>
              </li>
            </ul>
            <button className="mt-6 border-2 border-[#da9619] text-[#da9619] px-4 py-2 rounded-md hover:bg-[#da9619] hover:text-white transition-all duration-200 text-sm">
              Nous contacter
            </button>
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