import { Link } from 'react-router';
import { PageHero } from '../components/PageHero';
import { useBandeauImage } from '@/hooks/useBandeauImage';
import { BANDEAU_PAGES } from '@/constants/bandeauPages';
import { Section } from '../components/Section';

function LegalSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-10">
      <h2 className="font-primary text-2xl md:text-3xl text-primary mb-4 tracking-wide">{title}</h2>
      <div className="space-y-3 text-gray-700 leading-relaxed text-sm md:text-base">{children}</div>
    </section>
  );
}

export function PolitiqueConfidentialitePage() {
  const bandeauImage = useBandeauImage(BANDEAU_PAGES.POLITIQUE_CONFIDENTIALITE);

  return (
    <>
      <PageHero
        title="POLITIQUE DE CONFIDENTIALITÉ"
        subtitle="Protection des données personnelles — CLTO Badminton"
        image={bandeauImage}
      />

      <Section className="bg-white">
        <div className="max-w-3xl mx-auto">
          <p className="text-gray-500 text-sm mb-10">
            Dernière mise à jour : août 2026
          </p>

          <LegalSection title="1. Responsable du traitement">
            <p>
              Le responsable du traitement des données personnelles collectées via le présent site
              est l&apos;association&nbsp;:
            </p>
            <ul className="list-none space-y-1 border-l-2 border-secondary pl-4 my-4">
              <li>
                <strong>Cercle Laïque des Tourelles Orléans Badminton (CLTO BADMINTON)</strong>,
                association déclarée
              </li>
              <li>1 boulevard de Québec, 45000 Orléans</li>
              <li>RNA : W452000403 — SIRET : 482 737 038 00034</li>
              <li>
                Email :{' '}
                <a href="mailto:contact@cltobadminton.fr" className="text-secondary hover:underline">
                  contact@cltobadminton.fr
                </a>
              </li>
              <li>
                Téléphone :{' '}
                <a href="tel:+33665296372" className="text-secondary hover:underline">
                  06 65 29 63 72
                </a>
              </li>
            </ul>
            <p>
              Pour toute question relative à vos données personnelles ou pour exercer vos droits,
              vous pouvez nous écrire à l&apos;adresse ci-dessus.
            </p>
          </LegalSection>

          <LegalSection title="2. Données collectées">
            <p>Selon votre utilisation du site, nous pouvons collecter&nbsp;:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong>Via le formulaire de contact :</strong> nom, adresse email, numéro de
                téléphone (si renseigné), objet et contenu du message.
              </li>
              <li>
                <strong>Données de navigation techniques :</strong> adresse IP, type de navigateur,
                pages consultées, horodatage — dans la mesure où elles sont générées
                automatiquement par l&apos;hébergement du site.
              </li>
              <li>
                <strong>Images et photographies :</strong> portraits ou scènes de pratique sportive
                pouvant permettre d&apos;identifier des adhérents, licenciés ou participants
                (y compris mineurs), publiées dans la galerie, les actualités ou supports de
                communication du club, sous réserve des autorisations obtenues.
              </li>
            </ul>
            <p>
              L&apos;adhésion au club, la prise de licence et le paiement des cotisations ou stages
              ne sont pas traités directement sur ce site : ils s&apos;effectuent via des
              plateformes tierces (voir ci-dessous). Les données alors collectées relèvent des
              politiques de confidentialité de ces prestataires.
            </p>
          </LegalSection>

          <LegalSection title="3. Finalités et bases légales">
            <p>Les données sont traitées pour les finalités suivantes&nbsp;:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong>Répondre aux demandes</strong> adressées via le formulaire de contact
                (intérêt légitime de l&apos;association ; mesures précontractuelles à votre
                demande).
              </li>
              <li>
                <strong>Assurer le fonctionnement technique</strong> et la sécurité du site
                (intérêt légitime).
              </li>
              <li>
                <strong>Informer sur la vie du club</strong> (actualités, galerie, événements)
                dans le respect du droit à l&apos;image et, le cas échéant, sur la base du
                consentement des personnes concernées ou de leurs représentants légaux.
              </li>
              <li>
                <strong>Communiquer des informations sportives</strong> (résultats d&apos;interclubs
                notamment) provenant de plateformes spécialisées.
              </li>
            </ul>
          </LegalSection>

          <LegalSection title="4. Destinataires et sous-traitants">
            <p>
              Les données sont destinées aux membres habilités de l&apos;association (bureau,
              secrétariat, personnes en charge de la communication ou de l&apos;accueil), dans la
              limite de leurs missions.
            </p>
            <p>Elles peuvent être traitées pour notre compte par les prestataires suivants&nbsp;:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong>OVH SAS</strong> — hébergement du site et de l&apos;infrastructure
                technique (2 rue Kellermann, 59100 Roubaix).
              </li>
              <li>
                <strong>Strapi</strong> — système de gestion de contenus (CMS) utilisé pour
                administrer les contenus du site.
              </li>
              <li>
                <strong>Flickr</strong> — hébergement et diffusion de la galerie photos du club
                (albums intégrés sur le site). Lorsque vous consultez la galerie, des données de
                connexion techniques peuvent être traitées par Flickr selon sa propre politique
                de confidentialité.
              </li>
              <li>
                <strong>Google Drive</strong> — hébergement et consultation de certains documents
                mis à disposition sur le site (par exemple la charte interclubs). L&apos;accès à
                ces documents peut entraîner un traitement de données par Google selon ses
                conditions propres.
              </li>
              <li>
                <strong>OpenStreetMap</strong> — fond de carte utilisé pour localiser les
                gymnases. La consultation de la carte peut générer des requêtes techniques
                (adresse IP, etc.) auprès des serveurs de tuiles OpenStreetMap, soumis à leurs
                conditions d&apos;utilisation.
              </li>
              <li>
                <strong>HelloAsso</strong> — plateforme tierce d&apos;inscription et de paiement
                pour certains événements (ex. stages). Lorsque vous utilisez HelloAsso, vos données
                sont également traitées par HelloAsso selon sa propre politique de
                confidentialité.
              </li>
              <li>
                <strong>IcBad</strong> — plateforme de résultats d&apos;interclubs ; des données
                sportives publiques (classements, compositions d&apos;équipes) peuvent être
                affichées sur le site.
              </li>
            </ul>
            <p>
              Aucune donnée n&apos;est vendue à des tiers. Aucun transfert hors de l&apos;Union
              européenne n&apos;est effectué par l&apos;association dans le cadre de ce site, sauf
              le cas échéant via un prestataire tiers dont les conditions propres s&apos;appliquent
              alors.
            </p>
          </LegalSection>

          <LegalSection title="5. Durées de conservation">
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong>Messages du formulaire de contact :</strong> conservés le temps nécessaire
                au traitement de la demande, puis archivés au maximum 3 ans à compter du dernier
                contact, sauf obligation légale contraire.
              </li>
              <li>
                <strong>Logs techniques :</strong> selon les durées pratiquées par l&apos;hébergeur,
                généralement limitées au strict nécessaire à la sécurité et au bon fonctionnement
                du service.
              </li>
              <li>
                <strong>Photographies :</strong> conservées et diffusées tant que l&apos;autorisation
                de droit à l&apos;image demeure valable, ou jusqu&apos;à exercice du droit de
                retrait.
              </li>
            </ul>
          </LegalSection>

          <LegalSection title="6. Droit à l'image et mineurs">
            <p>
              En tant que club sportif accueillant des publics jeunes et adultes, le CLTO
              Badminton peut publier des photographies ou vidéos d&apos;activités
              (entraînements, compétitions, stages, événements).
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                Aucune image permettant d&apos;identifier une personne n&apos;est diffusée sans
                autorisation préalable, libre et éclairée.
              </li>
              <li>
                Pour les <strong>mineurs</strong>, l&apos;autorisation est recueillie auprès des
                représentants légaux (et, selon l&apos;âge et le contexte, en tenant compte de
                l&apos;avis de l&apos;enfant).
              </li>
              <li>
                Cette autorisation précise en principe les supports (site, réseaux sociaux), les
                finalités et la possibilité de retrait.
              </li>
              <li>
                Le consentement au droit à l&apos;image n&apos;est pas une condition d&apos;adhésion
                au club.
              </li>
            </ul>
            <p>
              Pour demander le retrait d&apos;une image vous concernant (ou concernant votre
              enfant), contactez-nous à{' '}
              <a href="mailto:contact@cltobadminton.fr" className="text-secondary hover:underline">
                contact@cltobadminton.fr
              </a>
              .
            </p>
          </LegalSection>

          <LegalSection title="7. Cookies">
            <p>
              À la date de mise à jour de la présente politique, le site du CLTO Badminton
              n&apos;utilise pas de cookies publicitaires ni d&apos;outils d&apos;analyse
              d&apos;audience déposant des traceurs non essentiels.
            </p>
            <p>
              Seuls des éléments techniques strictement nécessaires au fonctionnement du site
              peuvent être utilisés. Si des cookies non essentiels venaient à être déployés
              (statistiques, réseaux sociaux embarqués, etc.), un dispositif d&apos;information et
              de consentement conforme aux recommandations de la CNIL serait mis en place.
            </p>
          </LegalSection>

          <LegalSection title="8. Vos droits">
            <p>
              Conformément au Règlement général sur la protection des données (RGPD) et à la loi
              Informatique et Libertés, vous disposez des droits suivants&nbsp;:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>droit d&apos;accès</li>
              <li>droit de rectification</li>
              <li>droit à l&apos;effacement</li>
              <li>droit à la limitation du traitement</li>
              <li>droit d&apos;opposition</li>
              <li>droit à la portabilité (lorsque applicable)</li>
              <li>droit de retirer votre consentement à tout moment (lorsque le traitement est fondé sur celui-ci)</li>
            </ul>
            <p>
              Pour exercer ces droits, adressez votre demande à{' '}
              <a href="mailto:contact@cltobadminton.fr" className="text-secondary hover:underline">
                contact@cltobadminton.fr
              </a>{' '}
              en précisant l&apos;objet de votre demande et en joignant un justificatif
              d&apos;identité si nécessaire. Nous nous engageons à y répondre dans un délai
              d&apos;un mois.
            </p>
            <p>
              Vous disposez également du droit d&apos;introduire une réclamation auprès de la{' '}
              <a
                href="https://www.cnil.fr"
                target="_blank"
                rel="noopener noreferrer"
                className="text-secondary hover:underline"
              >
                Commission nationale de l&apos;informatique et des libertés (CNIL)
              </a>
              .
            </p>
          </LegalSection>

          <LegalSection title="9. Sécurité">
            <p>
              L&apos;association met en œuvre des mesures raisonnables pour protéger vos données
              (accès restreint aux personnes habilitées, hébergement sécurisé, communication via
              HTTPS). Aucun système n&apos;étant infaillible, en cas d&apos;incident affectant vos
              données, les démarches prévues par la réglementation seront appliquées.
            </p>
          </LegalSection>

          <LegalSection title="10. Modifications">
            <p>
              La présente politique peut être mise à jour pour refléter l&apos;évolution du site,
              des prestataires ou de la réglementation. La date de dernière mise à jour figure en
              tête de page.
            </p>
            <p>
              Pour les informations d&apos;identification de l&apos;éditeur, consultez également
              les{' '}
              <Link to="/mentions-legales" className="text-secondary hover:underline">
                mentions légales
              </Link>
              .
            </p>
          </LegalSection>
        </div>
      </Section>
    </>
  );
}
