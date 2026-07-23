import { PageHero } from "../components/PageHero";
import { Section } from "../components/Section";

/** Remplacer par l’URL d’embed du calendrier Google public du club. */
const GOOGLE_CALENDAR_EMBED_URL = "https://calendar.google.com/calendar/embed?showTitle=0&height=600&wkst=2&bgcolor=%23FFFFFF&src=cltobad%40gmail.com&color=%236B3304&src=n44aecpcs48paevkg5f8uq16lo%40group.calendar.google.com&color=%23182C57&src=0atrld7egc8t3r3p7jd3hrlonk%40group.calendar.google.com&color=%236B3304&src=dgvble7l4aa7aba52rasohufv8%40group.calendar.google.com&color=%2328754E&src=2vs9qoi2htvn2u35jkjoh23i6c%40group.calendar.google.com&color=%232F6309&src=mhru3n216kjvi8q36phb9op4hc%40group.calendar.google.com&color=%235229A3&src=kacdndlksr0bua2scaridudkro%40group.calendar.google.com&color=%232F6309&src=oo98ihl13q9jecg8tmlp5jcgg8%40group.calendar.google.com&color=%23333333&src=ipsk83qdsuur8qs5a1jb9istd0%40group.calendar.google.com&color=%231B887A&src=7j98r0qivup5n4vqh6t0shhb6s%40group.calendar.google.com&color=%23B1365F&ctz=Europe%2FParis";

export function AgendaPage() {
  return (
    <>
      <PageHero
        title="AGENDA"
        subtitle="Les événements du CLTO Badminton"
      />

      <Section className="bg-white">
        {GOOGLE_CALENDAR_EMBED_URL ? (
          <div className="overflow-hidden rounded-xl border border-gray-200 shadow-sm">
            <iframe
              title="Agenda Google du CLTO Badminton"
              src={GOOGLE_CALENDAR_EMBED_URL}
              className="h-[600px] w-full md:h-[750px]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        ) : (
          <div className="rounded-xl border border-dashed border-primary/30 bg-primary/[0.03] px-6 py-16 text-center">
            <p className="font-primary text-2xl text-primary mb-2">Calendrier à configurer</p>
            <p className="text-sm text-gray-600 max-w-md mx-auto">
              Renseignez <code className="text-secondary">GOOGLE_CALENDAR_EMBED_URL</code> dans{" "}
              <code className="text-secondary">AgendaPage.tsx</code> avec l’URL d’embed du calendrier Google.
            </p>
          </div>
        )}
      </Section>
    </>
  );
}
