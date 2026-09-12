import { Link } from 'react-router';
import { PageHero } from '../components/PageHero';
import { Section } from '../components/Section';
import { Seo } from '../components/Seo';
import { SITE_MAP_SECTIONS } from '@/constants/siteMap';

export function PlanDuSitePage() {
  return (
    <>
      <Seo
        title="Plan du site"
        description="Plan du site du CLTO Badminton Orléans : accès à toutes les pages du club (pratiquer, publics, contact, informations légales)."
      />
      <PageHero
        title="PLAN DU SITE"
        subtitle="Retrouvez toutes les pages du site du CLTO Badminton Orléans"
      />

      <Section className="bg-white">
        <div className="mx-auto max-w-3xl space-y-10">
          {SITE_MAP_SECTIONS.map((section, index) => (
            <section key={section.title} aria-labelledby={`sitemap-section-${index}`}>
              <h2
                id={`sitemap-section-${index}`}
                className="font-primary text-2xl md:text-3xl text-primary mb-4 tracking-wide"
              >
                {section.title}
              </h2>
              <ul className="list-disc space-y-2 pl-5 text-gray-700">
                {section.links.map((link) => (
                  <li key={link.path}>
                    <Link
                      to={link.path}
                      className="text-primary underline-offset-2 hover:text-secondary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2 rounded-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </Section>
    </>
  );
}
