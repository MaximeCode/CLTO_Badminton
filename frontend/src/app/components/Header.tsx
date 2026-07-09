import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router';
import { Menu, X, ChevronDown } from 'lucide-react';
import logo from '../../imports/logo_clto_main.png';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const location = useLocation();
  const headerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!isMenuOpen) return;

    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (headerRef.current && !headerRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
        setOpenDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [isMenuOpen]);

  const navItems = [
    {
      title: 'Actualités',
      path: '/actualites',
    },
    {
      title: 'Le Club',
      items: [
        { label: 'Historique', path: '/historique' },
        { label: 'Conseil d\'Administration', path: '/conseil-administration' },
        { label: 'Gymnases', path: '/gymnases' },
        { label: 'Creneaux', path: '/creneaux' },
        { label: 'Adhérer', path: '/adherer' },
        { label: 'Projet Club', path: '/projet-club' },
      ],
    },
    {
      title: 'Nos espaces',
      items: [
        { label: 'Jeunes', path: '/jeunes' },
        { label: 'Adultes', path: '/adultes' },
        { label: 'Compétition', path: '/competition' },
        { label: 'Loisir', path: '/loisir' },
        { label: 'Vétérans', path: '/veterans' },
      ],
    },
    {
      title: 'Interclubs',
      path: '/interclub',
    },
    {
      title: 'Contact',
      items: [
        { label: 'Contact', path: '/contact' },
        { label: 'FAQ', path: '/faq' },
      ],
    },
  ];

  return (
    <header ref={headerRef} className="sticky top-0 z-50 bg-white border-t-2 border-secondary shadow-sm">
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img src={logo} alt="CLTO Badminton" className="h-16 w-auto" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <div
                key={item.title}
                className="relative group"
                onMouseEnter={() => item.items && setOpenDropdown(item.title)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                {item.path ? (
                  <Link
                    to={item.path}
                    className={`relative text-gray-700 hover:text-primary cursor-pointer font-medium transition-colors duration-200 group ${location.pathname === item.path ? 'text-primary' : ''
                      }`}
                  >
                    {item.title}
                    <span
                      className={`absolute -bottom-0.5 left-0 h-0.5 bg-secondary transition-all duration-200 ${location.pathname === item.path ? 'w-full' : 'w-0 group-hover:w-full'
                        }`}
                    />
                  </Link>
                ) : (
                  <>
                    <button className="relative text-gray-700 hover:text-primary cursor-pointer transition-colors duration-200 flex items-center gap-1">
                      {item.title}
                      <ChevronDown size={16} className="group-hover:rotate-180 transition-transform duration-200" />
                      <span className="absolute bottom-1 left-0 w-0 h-0.5 bg-secondary transition-all duration-200 group-hover:w-full" />
                    </button>
                    {item.items && openDropdown === item.title && (
                      <div className="absolute top-full left-0 mt-0 bg-white shadow-lg rounded-md overflow-hidden min-w-[200px] animate-in fade-in slide-in-from-top-2 duration-200">
                        {item.items.map((subItem) => (
                          <Link
                            key={subItem.path}
                            to={subItem.path}
                            className={`block px-4 py-3 text-gray-700 hover:bg-primary hover:text-white transition-colors duration-150 ${location.pathname === subItem.path ? 'bg-secondary text-white' : ''
                              }`}
                          >
                            {subItem.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                )}
              </div>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="flex gap-2">
            <Link
              to="/adherer"
              className="hidden lg:block bg-primary text-white px-6 py-2.5 rounded-md hover:bg-primary/80 transition-colors duration-200"
            >
              Rejoindre le club
            </Link>

            <Link
              to="https://www.helloasso.com/associations/clto-badminton/boutiques/commandes-groupees"
              target="_blank"
              className="hidden lg:block bg-secondary text-white px-6 py-2.5 rounded-md hover:bg-secondary/80 transition-colors duration-200"
            >
              Visiter la boutique
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 text-gray-700 hover:text-primary"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="lg:hidden py-4 space-y-2 border-t">
            {navItems.map((item) => (
              <div key={item.title}>
                {item.path ? (
                  <Link
                    to={item.path}
                    className="block text-gray-700 hover:text-primary py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.title}
                  </Link>
                ) : (
                  <>
                    <button
                      onClick={() => setOpenDropdown(openDropdown === item.title ? null : item.title)}
                      className="w-full flex items-center justify-between text-gray-700 hover:text-primary py-2"
                    >
                      {item.title}
                      <ChevronDown
                        size={16}
                        className={`transition-transform duration-200 ${openDropdown === item.title ? 'rotate-180' : ''
                          }`}
                      />
                    </button>
                    {item.items && openDropdown === item.title && (
                      <div className="pl-4 space-y-2 mt-2">
                        {item.items.map((subItem) => (
                          <Link
                            key={subItem.path}
                            to={subItem.path}
                            className="block text-gray-600 hover:text-primary py-2"
                            onClick={() => setIsMenuOpen(false)}
                          >
                            {subItem.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                )}
              </div>
            ))}
            <div className="flex flex-col sm:flex-row justify-center gap-2">
              <Link
                to="/adherer"
                className="block w-full bg-primary text-white px-6 py-2.5 rounded-md hover:bg-primary-accent transition-colors duration-200 text-center"
                onClick={() => setIsMenuOpen(false)}
              >
                Rejoindre le club
              </Link>
              <Link
                to="https://www.helloasso.com/associations/clto-badminton/boutiques/commandes-groupees"
                target="_blank"
                className="block w-full bg-secondary text-white px-6 py-2.5 rounded-md hover:bg-secondary/80 transition-colors duration-200 text-center"
              >
                Visiter la boutique
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
