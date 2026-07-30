import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router";
import { ChevronDown, Menu, X } from "lucide-react";
import logo from "../../imports/logo_clto_main.png";
import { NavItem } from "@/types/headerType";
import { JoinClubIcon } from "./icons/JoinClubIcon";
import { ShopIcon } from "./icons/ShopIcon";

const NAV_ITEMS: NavItem[] = [
  {
    title: "Actualités",
    path: "/actualites",
  },
  {
    title: "Vie du Club",
    items: [
      { label: "Adhérer", path: "/adherer" },
      { label: "Agenda", path: "/agenda" },
      { label: "Organigramme", path: "/organigramme" },
      { label: "Projet Club", path: "/projet-club" },
      { label: "Palmarès", path: "/palmares" },
      { label: "Documents officiels", path: "/documents" },
      { label: "Historique", path: "/historique" },
      { label: "Galerie", path: "/galerie" },
    ],
  },
  {
    title: "Créneaux",
    items: [
      { label: "Créneaux", path: "/creneaux" },
      { label: "Gymnases", path: "/gymnases" },
    ],
  },
  {
    title: "Nos Publics",
    items: [
      { label: "Jeunes Loisirs", path: "/jeunes-loisirs" },
      { label: "Jeunes Compétiteurs", path: "/jeunes-competiteurs" },
      { label: "Adultes Loisirs", path: "/adultes-loisirs" },
      { label: "Adultes compétiteurs", path: "/adultes-competiteurs" },
      { label: "Vieilles plumes", path: "/vieilles-plumes" },
    ],
  },
  {
    title: "Interclubs",
    path: "/interclub",
  },
  {
    title: "Contact",
    items: [
      { label: "Contact", path: "/contact" },
      { label: "FAQ", path: "/faq" },
    ],
  },
];

const SHOP_URL =
  "https://www.helloasso.com/associations/clto-badminton/boutiques/commandes-groupees";

const CTA_BUTTON_BASE =
  "hidden items-center justify-center gap-1.5 rounded-md px-1.5 py-1 lg:text-white lg:hover:text-white transition-colors duration-200 md:flex lg:px-1 lg:py-2 xl:gap-2 xl:px-4";

const JOIN_CLUB_BUTTON_CLASS = `${CTA_BUTTON_BASE} text-primary hover:text-primary/80 lg:bg-primary lg:hover:bg-primary/80`;

const SHOP_BUTTON_CLASS = `${CTA_BUTTON_BASE} text-secondary hover:text-secondary/80 lg:bg-secondary lg:hover:bg-secondary/80`;

/*
 * Transforme un titre en identifiant HTML stable pour relier les boutons
 * de sous-menu à leur contenu via `aria-controls`.
 */
function createDropdownId(title: string) {
  return `dropdown-${title
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")}`;
}

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const location = useLocation();
  const headerRef = useRef<HTMLElement | null>(null);

  /*
   * Ferme le menu mobile lorsqu'un clic ou un toucher est effectué en dehors
   * du header. Les écouteurs ne sont installés que lorsque le menu est ouvert.
   */
  useEffect(() => {
    if (!isMenuOpen) return;

    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (
        headerRef.current &&
        !headerRef.current.contains(event.target as Node)
      ) {
        setIsMenuOpen(false);
        setOpenDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [isMenuOpen]);

  const closeMobileMenu = () => {
    setIsMenuOpen(false);
    setOpenDropdown(null);
  };

  const toggleDropdown = (title: string) => {
    setOpenDropdown((currentDropdown) =>
      currentDropdown === title ? null : title,
    );
  };

  return (
    <header
      ref={headerRef}
      className="sticky top-0 z-50 border-t-2 border-secondary bg-white shadow-sm"
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex h-20 items-center justify-between">
          <Link
            to="/"
            className="flex items-center"
            aria-label="Accueil du CLTO Badminton"
          >
            <img src={logo} alt="CLTO Badminton" className="h-16 w-auto" />
          </Link>

          {/* MD Devices (780px) */}
          <nav
            className="mx-4 hidden items-center gap-3 md:flex md:gap-6 xl:gap-8"
            aria-label="Navigation principale"
          >
            {NAV_ITEMS.map((item) => {
              if (item.path) {
                const isActive = location.pathname === item.path;

                return (
                  <Link
                    key={item.title}
                    to={item.path}
                    className={`group relative cursor-pointer font-medium text-gray-700 transition-colors duration-200 hover:text-primary ${isActive ? "text-primary" : ""
                      }`}
                    aria-current={isActive ? "page" : undefined}
                  >
                    {item.title}
                    <span
                      className={`absolute -bottom-0.5 left-0 h-0.5 bg-secondary transition-all duration-200 ${isActive
                        ? "w-full"
                        : "w-0 group-hover:w-full group-focus-visible:w-full"
                        }`}
                    />
                  </Link>
                );
              }

              const isOpen = openDropdown === item.title;
              const dropdownId = createDropdownId(item.title);

              return (
                <div
                  key={item.title}
                  className="group relative"
                  onMouseEnter={() => setOpenDropdown(item.title)}
                  onMouseLeave={() => setOpenDropdown(null)}
                  //  Also on focus with keyboard
                  onFocus={() => setOpenDropdown(item.title)}
                  onBlur={(event) => {
                    if (
                      !event.currentTarget.contains(
                        event.relatedTarget as Node | null,
                      )
                    ) {
                      setOpenDropdown(null);
                    }
                  }}
                >
                  <button
                    type="button"
                    className="relative flex cursor-pointer items-center gap-1 text-gray-700 transition-colors duration-200 hover:text-primary"
                    onClick={() => toggleDropdown(item.title)}
                    aria-expanded={isOpen}
                    aria-controls={dropdownId}
                  >
                    {item.title}
                    <ChevronDown
                      size={16}
                      aria-hidden="true"
                      className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                    />
                    <span className="absolute bottom-1 left-0 h-0.5 w-0 bg-secondary transition-all duration-200 group-hover:w-full group-focus-within:w-full" />
                  </button>

                  {isOpen && (
                    <div
                      id={dropdownId}
                      className="animate-in fade-in slide-in-from-top-2 absolute left-0 top-full mt-0 min-w-50 overflow-hidden rounded-md bg-white shadow-lg duration-200"
                    >
                      {item.items?.map((subItem) => {
                        const isSubItemActive =
                          location.pathname === subItem.path;

                        return (
                          <Link
                            key={subItem.path}
                            to={subItem.path}
                            className={`block px-4 py-3 text-gray-700 transition-colors duration-150 hover:bg-primary hover:text-white ${isSubItemActive ? "bg-secondary text-white" : ""
                              }`}
                            aria-current={isSubItemActive ? "page" : undefined}
                          >
                            {subItem.label}
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          {/* Text hidden between MD and LG, then displayed from LG. */}
          <div className="flex gap-1 text-sm lg:gap-2 lg:text-base">
            <Link
              to="/adherer"
              title="Rejoindre le club"
              className={JOIN_CLUB_BUTTON_CLASS}
            >
              <JoinClubIcon className="h-7 w-7 lg:h-5 lg:w-5 xl:h-7 xl:w-7" />
              <span className="sr-only">Rejoindre le club</span>
              <span className="hidden lg:block">Rejoindre le club</span>
            </Link>

            {/* No <Link> because it's an external link */}
            <a
              href={SHOP_URL}
              title="Visiter la boutique"
              target="_blank"
              rel="noopener noreferrer"
              className={SHOP_BUTTON_CLASS}
            >
              <ShopIcon className="h-8 w-8 lg:h-5 lg:w-5 xl:h-8 xl:w-8" />
              <span className="sr-only">Visiter la boutique</span>
              <span className="hidden lg:block">Visiter la boutique</span>
            </a>
          </div>

          <button
            type="button"
            onClick={() => setIsMenuOpen((currentValue) => !currentValue)}
            className="p-2 text-gray-700 hover:text-primary md:hidden"
            aria-label={isMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-navigation"
          >
            {isMenuOpen ? (
              <X size={24} aria-hidden="true" />
            ) : (
              <Menu size={24} aria-hidden="true" />
            )}
          </button>
        </div>

        {isMenuOpen && (
          <nav
            id="mobile-navigation"
            className="space-y-1 border-t pb-4 pt-2 md:hidden"
            aria-label="Navigation mobile"
          >
            {NAV_ITEMS.map((item) => {
              if (item.path) {
                const isActive = location.pathname === item.path;

                return (
                  <Link
                    key={item.title}
                    to={item.path}
                    className={`block py-1 text-gray-700 hover:text-primary ${isActive ? "text-primary" : ""
                      }`}
                    onClick={closeMobileMenu}
                    aria-current={isActive ? "page" : undefined}
                  >
                    {item.title}
                  </Link>
                );
              }

              const isOpen = openDropdown === item.title;
              const dropdownId = `mobile-${createDropdownId(item.title)}`;

              return (
                <div key={item.title}>
                  <button
                    type="button"
                    onClick={() => toggleDropdown(item.title)}
                    className="flex w-full items-center justify-between py-1 text-gray-700 hover:text-primary"
                    aria-expanded={isOpen}
                    aria-controls={dropdownId}
                  >
                    {item.title}
                    <ChevronDown
                      size={16}
                      aria-hidden="true"
                      className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                    />
                  </button>

                  {isOpen && (
                    <div id={dropdownId} className="pl-4">
                      {item.items?.map((subItem) => {
                        const isSubItemActive =
                          location.pathname === subItem.path;

                        return (
                          <Link
                            key={subItem.path}
                            to={subItem.path}
                            className={`block pb-1 text-gray-600 hover:text-primary ${isSubItemActive ? "text-primary" : ""
                              }`}
                            onClick={closeMobileMenu}
                            aria-current={isSubItemActive ? "page" : undefined}
                          >
                            {subItem.label}
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}

            <div className="flex justify-center gap-2 text-sm">
              <Link
                to="/adherer"
                className="flex w-full items-center justify-center gap-2 rounded-md bg-primary px-2 py-2 text-center text-white transition-colors duration-200 hover:bg-primary-accent"
                onClick={closeMobileMenu}
              >
                <JoinClubIcon />
                Rejoindre le club
              </Link>

              <a
                href={SHOP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full items-center justify-center gap-2 rounded-md bg-secondary px-2 py-2 text-center text-white transition-colors duration-200 hover:bg-secondary/80"
                onClick={closeMobileMenu}
              >
                <ShopIcon />
                Visiter la boutique
              </a>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
