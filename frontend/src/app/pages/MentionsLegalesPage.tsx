import { Link } from 'react-router';
import { PageHero } from '../components/PageHero';
import { Section } from '../components/Section';

function LegalSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-10">
      <h2 className="font-primary text-2xl md:text-3xl text-primary mb-4 tracking-wide">{title}</h2>
      <div className="space-y-3 text-gray-700 leading-relaxed text-sm md:text-base">{children}</div>
    </section>
  );
}

export function MentionsLegalesPage() {
  return (
    <>
      <PageHero
        title="MENTIONS LÉGALES"
        subtitle="Informations légales relatives au site du CLTO Badminton"
      />

      <Section className="bg-white">
        <div className="max-w-3xl mx-auto">
          <p className="text-gray-500 text-sm mb-10">
            Dernière mise à jour : août 2026
          </p>

          <LegalSection title="1. Éditeur du site">
            <p>
              Le présent site internet est édité par l&apos;association&nbsp;:
            </p>
            <ul className="list-none space-y-1 pl-0 border-l-2 border-secondary pl-4 my-4">
              <li>
                <strong>Dénomination :</strong> CLTO BADMINTON
              </li>
              <li>
                <strong>Forme juridique :</strong> Association déclarée (loi du 1er juillet 1901)
              </li>
              <li>
                <strong>Siège social :</strong> 1 boulevard de Québec, 45000 Orléans, France
              </li>
              <li>
                <strong>SIREN :</strong> 482 737 038
              </li>
              <li>
                <strong>SIRET (siège) :</strong> 482 737 038 00034
              </li>
              <li>
                <strong>Code APE :</strong> 9312Z — Activités de clubs de sports
              </li>
              <li>
                <strong>N° RNA :</strong> [À COMPLÉTER]
              </li>
              <li>
                <strong>N° TVA intracommunautaire :</strong> [À COMPLÉTER]
              </li>
              <li>
                <strong>Téléphone :</strong>{' '}
                <a href="tel:+33665296372" className="text-secondary hover:underline">
                  06 65 29 63 72
                </a>
              </li>
              <li>
                <strong>Email :</strong>{' '}
                <a href="mailto:contact@cltobadminton.fr" className="text-secondary hover:underline">
                  contact@cltobadminton.fr
                </a>
              </li>
            </ul>
            <p>
              L&apos;association CLTO Badminton est un club sportif dont l&apos;objet est la
              pratique, l&apos;enseignement et la promotion du badminton à Orléans et ses environs.
            </p>
          </LegalSection>

          <LegalSection title="2. Directeur de la publication">
            <p>
              Le directeur de la publication est{' '}
              <strong>Véronique MARCHET</strong>, en qualité de présidente de l&apos;association
              CLTO Badminton.
            </p>
          </LegalSection>

          <LegalSection title="3. Hébergement">
            <p>Le site est hébergé par&nbsp;:</p>
            <ul className="list-none space-y-1 pl-0 border-l-2 border-secondary pl-4 my-4">
              <li>
                <strong>Raison sociale :</strong> OVH SAS
              </li>
              <li>
                <strong>Siège social :</strong> 2 rue Kellermann, 59100 Roubaix, France
              </li>
              <li>
                <strong>RCS :</strong> Lille Métropole 424 761 419
              </li>
              <li>
                <strong>Téléphone :</strong> +33 9 72 10 10 07
              </li>
              <li>
                <strong>Site :</strong>{' '}
                <a
                  href="https://www.ovhcloud.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-secondary hover:underline"
                >
                  www.ovhcloud.com
                </a>
              </li>
            </ul>
          </LegalSection>

          <LegalSection title="4. Propriété intellectuelle">
            <p>
              L&apos;ensemble des contenus présents sur ce site (textes, photographies, logos,
              éléments graphiques, structure, charte visuelle), sauf mention contraire, est la
              propriété de l&apos;association CLTO Badminton ou fait l&apos;objet d&apos;une
              autorisation d&apos;utilisation.
            </p>
            <p>
              Toute reproduction, représentation, modification, publication ou adaptation de tout
              ou partie des éléments du site, quel que soit le moyen ou le procédé utilisé, est
              interdite sans autorisation écrite préalable de l&apos;association.
            </p>
            <p>
              Les photographies d&apos;adhérents, licenciés ou participants publiées sur le site
              le sont dans le respect du droit à l&apos;image. Pour toute demande de retrait,
              contactez-nous à l&apos;adresse indiquée ci-dessus.
            </p>
          </LegalSection>

          <LegalSection title="5. Données personnelles">
            <p>
              Les traitements de données personnelles mis en œuvre via ce site sont décrits dans
              notre{' '}
              <Link to="/politique-de-confidentialite" className="text-secondary hover:underline">
                politique de confidentialité
              </Link>
              .
            </p>
          </LegalSection>

          <LegalSection title="6. Limitation de responsabilité">
            <p>
              L&apos;association s&apos;efforce d&apos;assurer l&apos;exactitude et la mise à jour
              des informations diffusées sur ce site. Elle ne saurait toutefois garantir
              l&apos;absence d&apos;erreurs, d&apos;omissions ou de retards de mise à jour,
              notamment concernant les horaires, créneaux, tarifs, stages ou résultats sportifs.
            </p>
            <p>
              Le site peut contenir des liens vers des sites tiers (plateformes d&apos;inscription,
              de paiement ou de résultats sportifs). CLTO Badminton n&apos;exerce aucun contrôle
              sur ces sites et décline toute responsabilité quant à leur contenu ou à leurs
              pratiques.
            </p>
          </LegalSection>

          <LegalSection title="7. Droit applicable">
            <p>
              Le présent site est soumis au droit français. En cas de litige, et à défaut
              d&apos;accord amiable, les tribunaux français seront seuls compétents.
            </p>
          </LegalSection>
        </div>
      </Section>
    </>
  );
}
