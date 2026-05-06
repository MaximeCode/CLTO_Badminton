import { useMemo, useState } from "react";
import { PageHero } from "../components/PageHero";
import { motion } from "motion/react";
import {
  Calendar,
  Clock,
  MapPin,
  User,
  ChevronDown,
  Dumbbell,
  PlayCircle,
} from "lucide-react";
import { format } from "date-fns";

interface TimeSlot {
  id: string;
  gym: string;
  day: string;
  dateLabel: string;
  time: string;
  trainer: string;
  type: "Élite" | "Perfectionnement" | "Loisirs";
  description: string;
  comment?: string;
  ferie?: boolean;
}

interface WeekData {
  id: string;
  label: string;
  period: string;
  weekStart: string;
  weekEnd: string;
  slots: TimeSlot[];
}

const WEEKS: WeekData[] = [
  {
    id: "0405-1005",
    label: "0405 au 1005",
    period: "Semaine du 04/05/2026 au 10/05/2026",
    weekStart: "2026-05-04",
    weekEnd: "2026-05-10",
    slots: [
      {
        id: "lun-1",
        day: "Lundi",
        dateLabel: "04/05/2026",
        gym: "Chardon",
        time: "21h00 - 22h00",
        trainer: "Non renseigné",
        type: "Loisirs",
        description: "Jeu libre Loisirs - Tout public",
      },
      {
        id: "lun-2",
        day: "Lundi",
        dateLabel: "04/05/2026",
        gym: "Dessaux",
        time: "18h00 - 20h00",
        trainer: "Antoine Lolive / Nassima Bouhassoun",
        type: "Loisirs",
        description: "Jeu libre Loisirs",
      },
      {
        id: "lun-3",
        day: "Lundi",
        dateLabel: "04/05/2026",
        gym: "Barthelemy",
        time: "12h00 - 13h30",
        trainer: "Ouvreur recherche",
        type: "Loisirs",
        description: "Jeu libre Senior / Entreprise",
        comment:
          "Alerte: ouvreur recherche, ce creneau peut etre annule.",
      },
      {
        id: "lun-4",
        day: "Lundi",
        dateLabel: "04/05/2026",
        gym: "Chardon",
        time: "19h30 - 21h00",
        trainer: "Yohan Henault",
        type: "Perfectionnement",
        description: "Adultes - Initiation NC/P",
      },
      {
        id: "lun-5",
        day: "Lundi",
        dateLabel: "04/05/2026",
        gym: "Chardon",
        time: "17h30 - 19h30",
        trainer: "Yohan Henault / Steve Bandou-Naitoll",
        type: "Élite",
        description: "Jeunes - Elite / Perf",
      },
      {
        id: "mar-1",
        day: "Mardi",
        dateLabel: "05/05/2026",
        gym: "Chardon",
        time: "19h30 - 22h00",
        trainer: "Florent Sautereau",
        type: "Perfectionnement",
        description: "Jeu libre Competiteurs",
      },
      {
        id: "mar-2",
        day: "Mardi",
        dateLabel: "05/05/2026",
        gym: "Dessaux",
        time: "18h00 - 20h00",
        trainer: "Vincent Serin",
        type: "Loisirs",
        description: "Jeu libre Loisirs",
      },
      {
        id: "mar-3",
        day: "Mardi",
        dateLabel: "05/05/2026",
        gym: "Barthelemy",
        time: "12h00 - 13h30",
        trainer: "Chantal Leguay",
        type: "Loisirs",
        description: "Jeu libre Senior / Entreprise",
      },
      {
        id: "mar-4",
        day: "Mardi",
        dateLabel: "05/05/2026",
        gym: "Peguy",
        time: "20h00 - 21h30",
        trainer: "Yohan Henault",
        type: "Perfectionnement",
        description: "Adultes - Initiation NC/P",
      },
      {
        id: "mar-5",
        day: "Mardi",
        dateLabel: "05/05/2026",
        gym: "Chardon",
        time: "17h30 - 19h30",
        trainer: "Thomas Huboud-Perron / Yohan Henault",
        type: "Élite",
        description: "Jeunes - Elite / Perf",
      },
      {
        id: "mer-1",
        day: "Mercredi",
        dateLabel: "06/05/2026",
        gym: "Chardon",
        time: "21h30 - 22h00",
        trainer: "Non renseigne",
        type: "Perfectionnement",
        description: "Jeu libre Competiteurs",
      },
      {
        id: "mer-2",
        day: "Mercredi",
        dateLabel: "06/05/2026",
        gym: "Lebrun",
        time: "21h30 - 22h00",
        trainer: "Non renseigne",
        type: "Perfectionnement",
        description: "Jeu libre Competiteurs",
      },
      {
        id: "mer-3",
        day: "Mercredi",
        dateLabel: "07/05/2026",
        gym: "Dessaux",
        time: "18h00 - 22h00",
        trainer: "Antoine Lolive / Anthony Clavel",
        type: "Loisirs",
        description: "Jeu libre Loisirs",
      },
      {
        id: "mer-4",
        day: "Mercredi",
        dateLabel: "07/05/2026",
        gym: "Lebrun",
        time: "19h30 - 21h30",
        trainer: "Yohan Henault",
        type: "Perfectionnement",
        description: "Adultes - Perfectionnement",
      },
      {
        id: "mer-5",
        day: "Mercredi",
        dateLabel: "07/05/2026",
        gym: "Chardon",
        time: "19h30 - 21h30",
        trainer: "Thomas Huboud-Perron",
        type: "Élite",
        description: "Adultes - Elite",
      },
      {
        id: "mer-6",
        day: "Mercredi",
        dateLabel: "07/05/2026",
        gym: "Chardon",
        time: "16h30 - 18h00",
        trainer: "Thomas Huboud-Perron / Yohan Henault",
        type: "Perfectionnement",
        description: "Jeunes - Poussins / Benjamins",
      },
      {
        id: "mer-7",
        day: "Mercredi",
        dateLabel: "07/05/2026",
        gym: "Chardon",
        time: "18h00 - 19h30",
        trainer: "Yohan Henault",
        type: "Perfectionnement",
        description: "Jeunes - Minimes / Cadets",
      },
      {
        id: "jeu-1",
        day: "Jeudi",
        dateLabel: "07/05/2026",
        gym: "Dessaux",
        time: "18h00 - 20h00",
        trainer: "Vincent Serin",
        type: "Loisirs",
        description: "Jeu libre Loisirs",
      },
      {
        id: "jeu-2",
        day: "Jeudi",
        dateLabel: "07/05/2026",
        gym: "Barthelemy",
        time: "12h00 - 13h30",
        trainer: "Chantal Leguay",
        type: "Loisirs",
        description: "Jeu libre Senior / Entreprise",
      },
      {
        id: "jeu-3",
        day: "Jeudi",
        dateLabel: "07/05/2026",
        gym: "Dessaux",
        time: "20h00 - 22h00",
        trainer: "Cedric Saccard",
        type: "Perfectionnement",
        description: "Adultes - Perfectionnement",
      },
      {
        id: "jeu-4",
        day: "Jeudi",
        dateLabel: "07/05/2026",
        gym: "Fouillade",
        time: "20h00 - 22h00",
        trainer: "Thomas Huboud-Perron",
        type: "Élite",
        description: "Adultes - Elite (2e seance)",
      },
      {
        id: "jeu-5",
        day: "Jeudi",
        dateLabel: "07/05/2026",
        gym: "Chardon",
        time: "18h00 - 20h00",
        trainer: "Thomas Huboud-Perron / Martin Lamy",
        type: "Élite",
        description: "Jeunes - Elite / Perf",
      },
      {
        id: "ven-1",
        day: "Vendredi",
        dateLabel: "08/05/2026",
        ferie: true,
        description: "Jour ferie - pas de creneaux planifies",
        gym: "",
        time: "",
        trainer: "",
        type: "Loisirs",
      },
      {
        id: "sam-1",
        day: "Samedi",
        dateLabel: "09/05/2026",
        description: "Jeu libre Loisirs - Tout public",
        gym: "Chardon",
        time: "9h30 - 12h30",
        trainer: "Yves AUSSEDAT",
        type: "Loisirs",
      },
      {
        id: "dim-1",
        day: "Dimanche",
        dateLabel: "10/05/2026",
        description: "Jeu libre Loisirs - Tout public",
        gym: "Chardon",
        time: "10h - 13h",
        trainer: "Gilles BECAVIN",
        type: "Loisirs",
      },
    ],
  },
  {
    id: "1105-1705",
    label: "1105 au 1705",
    period: "Semaine du 11/05/2026 au 17/05/2026",
    weekStart: "2026-05-11",
    weekEnd: "2026-05-17",
    slots: [
      {
        id: "lun-1",
        day: "Lundi",
        dateLabel: "11/05/2026",
        gym: "Chardon",
        time: "21h00 - 22h00",
        trainer: "Non renseigné",
        type: "Loisirs",
        description: "Jeu libre Loisirs - Tout public",
      },
      {
        id: "lun-2",
        day: "Lundi",
        dateLabel: "11/05/2026",
        gym: "Dessaux",
        time: "18h00 - 20h00",
        trainer: "Antoine Lolive / Nassima Bouhassoun",
        type: "Loisirs",
        description: "Jeu libre Loisirs",
      },
      {
        id: "lun-3",
        day: "Lundi",
        dateLabel: "11/05/2026",
        gym: "Barthelemy",
        time: "12h00 - 13h30",
        trainer: "Ouvreur recherche",
        type: "Loisirs",
        description: "Jeu libre Senior / Entreprise",
        comment:
          "Alerte: ouvreur recherche, ce creneau peut etre annule.",
      },
      {
        id: "lun-4",
        day: "Lundi",
        dateLabel: "11/05/2026",
        gym: "Chardon",
        time: "19h30 - 21h00",
        trainer: "Yohan Henault",
        type: "Perfectionnement",
        description: "Adultes - Initiation NC/P",
      },
      {
        id: "lun-5",
        day: "Lundi",
        dateLabel: "11/05/2026",
        gym: "Chardon",
        time: "17h30 - 19h30",
        trainer: "Yohan Henault / Steve Bandou-Naitoll",
        type: "Élite",
        description: "Jeunes - Elite / Perf",
      },
      {
        id: "mar-1",
        day: "Mardi",
        dateLabel: "12/05/2026",
        gym: "Chardon",
        time: "19h30 - 22h00",
        trainer: "Florent Sautereau",
        type: "Perfectionnement",
        description: "Jeu libre Competiteurs",
      },
      {
        id: "mar-2",
        day: "Mardi",
        dateLabel: "12/05/2026",
        gym: "Dessaux",
        time: "18h00 - 20h00",
        trainer: "Vincent Serin",
        type: "Loisirs",
        description: "Jeu libre Loisirs",
      },
      {
        id: "mar-3",
        day: "Mardi",
        dateLabel: "12/05/2026",
        gym: "Barthelemy",
        time: "12h00 - 13h30",
        trainer: "Chantal Leguay",
        type: "Loisirs",
        description: "Jeu libre Senior / Entreprise",
      },
      {
        id: "mar-4",
        day: "Mardi",
        dateLabel: "12/05/2026",
        gym: "Peguy",
        time: "20h00 - 21h30",
        trainer: "Yohan Henault",
        type: "Perfectionnement",
        description: "Adultes - Initiation NC/P",
      },
      {
        id: "mar-5",
        day: "Mardi",
        dateLabel: "12/05/2026",
        gym: "Chardon",
        time: "17h30 - 19h30",
        trainer: "Thomas Huboud-Perron / Yohan Henault",
        type: "Élite",
        description: "Jeunes - Elite / Perf",
      },
      {
        id: "mer-1",
        day: "Mercredi",
        dateLabel: "13/05/2026",
        gym: "Chardon",
        time: "21h30 - 22h00",
        trainer: "Non renseigne",
        type: "Perfectionnement",
        description: "Jeu libre Competiteurs",
      },
      {
        id: "mer-2",
        day: "Mercredi",
        dateLabel: "13/05/2026",
        gym: "Lebrun",
        time: "21h30 - 22h00",
        trainer: "Non renseigne",
        type: "Perfectionnement",
        description: "Jeu libre Competiteurs",
      },
      {
        id: "mer-3",
        day: "Mercredi",
        dateLabel: "13/05/2026",
        gym: "Dessaux",
        time: "18h00 - 22h00",
        trainer: "Antoine Lolive / Anthony Clavel",
        type: "Loisirs",
        description: "Jeu libre Loisirs",
      },
      {
        id: "mer-4",
        day: "Mercredi",
        dateLabel: "13/05/2026",
        gym: "Lebrun",
        time: "19h30 - 21h30",
        trainer: "Yohan Henault",
        type: "Perfectionnement",
        description: "Adultes - Perfectionnement",
      },
      {
        id: "mer-5",
        day: "Mercredi",
        dateLabel: "13/05/2026",
        gym: "Chardon",
        time: "19h30 - 21h30",
        trainer: "Thomas Huboud-Perron",
        type: "Élite",
        description: "Adultes - Elite",
      },
      {
        id: "mer-6",
        day: "Mercredi",
        dateLabel: "13/05/2026",
        gym: "Chardon",
        time: "16h30 - 18h00",
        trainer: "Thomas Huboud-Perron / Yohan Henault",
        type: "Perfectionnement",
        description: "Jeunes - Poussins / Benjamins",
      },
      {
        id: "mer-7",
        day: "Mercredi",
        dateLabel: "13/05/2026",
        gym: "Chardon",
        time: "18h00 - 19h30",
        trainer: "Yohan Henault",
        type: "Perfectionnement",
        description: "Jeunes - Minimes / Cadets",
      },
      {
        id: "jeu-1",
        day: "Jeudi",
        dateLabel: "14/05/2026",
        gym: "Dessaux",
        time: "18h00 - 20h00",
        trainer: "Vincent Serin",
        type: "Loisirs",
        description: "Jeu libre Loisirs",
      },
      {
        id: "jeu-2",
        day: "Jeudi",
        dateLabel: "14/05/2026",
        gym: "Barthelemy",
        time: "12h00 - 13h30",
        trainer: "Chantal Leguay",
        type: "Loisirs",
        description: "Jeu libre Senior / Entreprise",
      },
      {
        id: "jeu-3",
        day: "Jeudi",
        dateLabel: "14/05/2026",
        gym: "Dessaux",
        time: "20h00 - 22h00",
        trainer: "Cedric Saccard",
        type: "Perfectionnement",
        description: "Adultes - Perfectionnement",
      },
      {
        id: "jeu-4",
        day: "Jeudi",
        dateLabel: "14/05/2026",
        gym: "Fouillade",
        time: "20h00 - 22h00",
        trainer: "Thomas Huboud-Perron",
        type: "Élite",
        description: "Adultes - Elite (2e seance)",
      },
      {
        id: "jeu-5",
        day: "Jeudi",
        dateLabel: "14/05/2026",
        gym: "Chardon",
        time: "18h00 - 20h00",
        trainer: "Thomas Huboud-Perron / Martin Lamy",
        type: "Élite",
        description: "Jeunes - Elite / Perf",
      },
      {
        id: "ven-1",
        day: "Vendredi",
        dateLabel: "15/05/2026",
        gym: "Chardon",
        time: "",
        trainer: "",
        type: "",
        description: "",
      },
    ],
  },
];

// TYPE LIST
export function CreneauxPageV1() {
  const [selectedDate, setSelectedDate] = useState<Date>(
    new Date("2026-05-04"),
  );
  const [openDays, setOpenDays] = useState<Record<string, boolean>>(
    {},
  );

  const getWeekDistance = (date: Date, week: WeekData) => {
    const start = new Date(week.weekStart);
    const end = new Date(week.weekEnd);
    const dateTime = date.getTime();

    if (dateTime < start.getTime()) {
      return start.getTime() - dateTime;
    }
    if (dateTime > end.getTime()) {
      return dateTime - end.getTime();
    }
    return 0;
  };

  const selectedWeek = useMemo(
    () =>
      [...WEEKS].sort(
        (a, b) =>
          getWeekDistance(selectedDate, a) -
          getWeekDistance(selectedDate, b),
      )[0] ?? WEEKS[0],
    [selectedDate],
  );
  const timeSlots = selectedWeek.slots;

  // Group slots by day
  const slotsByDay = timeSlots.reduce(
    (acc, slot) => {
      const dayName = slot.day;
      if (!acc[dayName]) {
        acc[dayName] = [];
      }
      acc[dayName].push(slot);
      return acc;
    },
    {} as Record<string, TimeSlot[]>,
  );

  const getTypeStyles = (type: TimeSlot["type"]) => {
    switch (type) {
      case "Élite":
        return {
          border: "border-primary",
          badge: "bg-primary",
        };
      case "Perfectionnement":
        return {
          border: "border-secondary",
          badge: "bg-secondary",
        };
      case "Loisirs":
        return {
          border: "border-green-600",
          badge: "bg-green-600",
        };
      default:
        return {
          border: "border-gray-600",
          badge: "bg-gray-600",
        };
    }
  };

  return (
    <>
      <PageHero
        title="CRÉNEAUX"
        subtitle="Consultez les horaires d'entraînement du club"
        image="https://images.unsplash.com/photo-1617962529235-262e8e777e48?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWRtaW50b24lMjB0cmFpbmluZyUyMHNjaGVkdWxlfGVufDF8fHx8MTc3NjMzNzE3NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
      />

      <section className="py-20 bg-white">
        <div className="max-w-[1280px] mx-auto px-6">
          {/* Date Picker */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <div className="bg-gray-50 rounded-lg p-8 shadow-lg flex flex-col gap-6">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                  <Calendar
                    className="text-primary"
                    size={32}
                  />
                  <div>
                    <h3 className="font-primary text-2xl text-primary">Sélectionner une semaine</h3>
                    <p className="text-gray-600">
                      {selectedWeek.period}
                    </p>
                  </div>
                </div>
                <input
                  type="date"
                  value={format(selectedDate, "yyyy-MM-dd")}
                  onChange={(e) =>
                    setSelectedDate(new Date(e.target.value))
                  }
                  className="px-4 py-3 border-2 border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary text-lg"
                />
              </div>

              {/* Filtres */}
              <h4 className="font-primary text-xl text-primary">Filtrer par</h4>
              <div className="flex gap-6">
                {[
                  {
                    filtre: "Type de créneau",
                    data: [
                      "Entraînement",
                      "Jeu libre"
                    ]
                  },
                  {
                    filtre: "Gymnase",
                    data: [
                      "Chardon",
                      "Lebrun"
                    ]
                  },
                  {
                    filtre: "Jour",
                    data: [
                      "Lundi",
                      "Mardi",
                      "Mercredi",
                      "Jeudi",
                      "Vendredi",
                      "Samedi",
                      "Dimanche",
                    ]
                  },
                  {
                    filtre: "Moment de la journée",
                    data: [
                      "Matin",
                      "Midi",
                      "Soir"
                    ]
                  }
                ].map((filtre) => (
                  <select className="px-4 py-3 rounded-full text-sm font-semibold text-primary border-2 border-primary">
                    {filtre.filtre}
                    <option value="">{filtre.filtre}</option>
                    {filtre.data.map((data) => (
                      <option value={data}>{data}</option>
                    ))}
                  </select>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Time Slots by Day */}
          <div className="space-y-8">
            {[
              "Lundi",
              "Mardi",
              "Mercredi",
              "Jeudi",
              "Vendredi",
              "Samedi",
              "Dimanche",
            ].map((day, dayIndex) => {
              const daySlots = slotsByDay[day] || [];
              const dayDate = daySlots[0]?.dateLabel;
              const dayKey = `${selectedWeek.id}-${day}`;
              const isOpen = !!openDays[dayKey];
              const holidaySlot = daySlots.find((slot) => slot.ferie);
              const regularSlots = daySlots.filter(
                (slot) => !slot.ferie,
              );
              const slotCount = regularSlots.length;

              return (
                <motion.div
                  key={day}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.6,
                    delay: dayIndex * 0.05,
                  }}
                  className="bg-white border-2 border-gray-200 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
                >
                  <button
                    type="button"
                    onClick={() =>
                      setOpenDays((prev) => ({
                        ...prev,
                        [dayKey]: !prev[dayKey],
                      }))
                    }
                    className="w-full bg-primary text-white px-6 py-4 flex items-center justify-between text-left hover:bg-primary-accent transition-colors duration-200"
                  >
                    <div className="flex items-center gap-3 flex-wrap flex-1 min-w-0">
                      <h3 className="font-primary text-3xl">
                        {day} {dayDate ? dayDate : ""}
                      </h3>
                      <span
                        className="inline-flex items-center justify-center min-w-[2.25rem] rounded-full bg-secondary px-3 py-1 text-sm font-bold text-white shadow-sm"
                        aria-label={
                          slotCount === 0
                            ? "Aucun créneau"
                            : `${slotCount} créneau${slotCount > 1 ? "x" : ""}`
                        }
                      >
                        {slotCount}
                      </span>
                    </div>
                    <ChevronDown
                      size={28}
                      className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                    />
                  </button>

                  {isOpen ? (
                    holidaySlot ? (
                      <div className="p-6">
                        <div className="bg-amber-50 border-l-4 border-amber-400 rounded-lg p-5">
                          <p className="text-amber-900 font-semibold text-lg">
                            Jour ferie
                          </p>
                          <p className="text-amber-800 mt-1">
                            {holidaySlot.description}
                          </p>
                        </div>
                      </div>
                    ) : regularSlots.length > 0 ? (
                      <div className="p-6 space-y-4">
                        {regularSlots.map((slot) => (
                          <div
                            key={slot.id}
                            className={`bg-gray-50 rounded-lg p-6 hover:bg-gray-100 transition-colors duration-200 border-l-4 ${getTypeStyles(slot.type).border}`}
                          >
                            {/*
                              Le libelle depend du type de creneau:
                              jeu libre => ouvreur, entrainement => entraineur.
                            */}
                            {(() => {
                              const isJeuLibre = slot.description
                                .toLowerCase()
                                .includes("jeu libre");
                              const roleLabel = isJeuLibre
                                ? "Ouvreur"
                                : "Entraineur";
                              const SlotModeIcon = isJeuLibre
                                ? PlayCircle
                                : Dumbbell;
                              const slotModeLabel = isJeuLibre
                                ? "Jeu libre"
                                : "Entraînement";
                              return (
                                <>
                                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                                    <div className="flex items-start gap-3">
                                      <MapPin
                                        className="text-primary mt-1 flex-shrink-0"
                                        size={20}
                                      />
                                      <div>
                                        <p className="text-sm text-gray-500">
                                          Gymnase
                                        </p>
                                        <p className="font-semibold text-gray-900">
                                          {slot.gym}
                                        </p>
                                      </div>
                                    </div>

                                    <div className="flex items-start gap-3">
                                      <Clock
                                        className="text-primary mt-1 flex-shrink-0"
                                        size={20}
                                      />
                                      <div>
                                        <p className="text-sm text-gray-500">
                                          Horaire
                                        </p>
                                        <p className="font-semibold text-gray-900">
                                          {slot.time}
                                        </p>
                                      </div>
                                    </div>

                                    <div className="flex items-start gap-3 relative">
                                      <User
                                        className="text-primary mt-1 flex-shrink-0"
                                        size={20}
                                      />
                                      <div>
                                        <p className="text-sm text-gray-500">
                                          {roleLabel}
                                        </p>
                                        <p
                                          className="font-semibold text-gray-900"
                                        >
                                          {slot.trainer}
                                        </p>
                                      </div>
                                    </div>

                                    <div>
                                      <p className="text-sm text-gray-500 mb-1">
                                        Type
                                      </p>
                                      <div className="mb-2 flex items-center gap-2 text-gray-700">
                                        <SlotModeIcon
                                          className="text-primary flex-shrink-0"
                                          size={18}
                                        />
                                        <span className="text-sm font-medium">
                                          {slotModeLabel}
                                        </span>
                                      </div>
                                      <span
                                        className={`inline-block px-3 py-1 rounded-full text-sm font-semibold text-white ${getTypeStyles(slot.type).badge}`}
                                      >
                                        {slot.type}
                                      </span>
                                    </div>
                                  </div>
                                </>
                              );
                            })()}

                            <div className="mt-4 pt-4 border-t border-gray-200">
                              <p className="text-gray-700">
                                {slot.description}
                              </p>
                              {slot.comment && (
                                <div className="mt-2 bg-yellow-50 border-l-4 border-yellow-400 p-3 rounded">
                                  <p className="text-sm text-yellow-800">
                                    <strong>Alerte:</strong>{" "}
                                    {slot.comment}
                                  </p>
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="p-8 text-center text-gray-500">
                        <p>Aucun créneau prévu pour ce jour</p>
                      </div>
                    )
                  ) : null}
                </motion.div>
              );
            })}
          </div>

          {/* Legend */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-12 bg-gray-50 rounded-lg p-6 shadow-md"
          >
            <h3 className="font-primary text-2xl text-primary mb-4">
              LÉGENDE
            </h3>
            <div className="flex flex-wrap gap-6">
              <div className="flex items-center gap-2">
                <span className="inline-block px-3 py-1 rounded-full text-sm font-semibold text-white border-primary bg-primary">Élite</span>
                <span className="text-gray-700">
                  Entraînement compétition haut niveau
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-block px-3 py-1 rounded-full text-sm font-semibold text-white border-secondary bg-secondary">Perfectionnement</span>
                <span className="text-gray-700">
                  Joueurs confirmés
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-block px-3 py-1 rounded-full text-sm font-semibold text-white border-green-600 bg-green-600">Loisirs</span>
                <span className="text-gray-700">
                  Pratique détente et conviviale
                </span>
              </div>
            </div>
            <p className="mt-4 text-sm text-gray-600">
              💡 <strong>Info:</strong> Les créneaux avec avertissement sont affichés avec une alerte dédiée.
            </p>
          </motion.div>
        </div>
      </section>
    </>
  );
}