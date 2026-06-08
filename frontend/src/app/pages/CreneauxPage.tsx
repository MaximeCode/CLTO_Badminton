import { useMemo, useState } from "react";
import { PageHero } from "../components/PageHero";
import { motion } from "motion/react";
import {
  Calendar,
  Clock,
  MapPin,
  User,
  Dumbbell,
  Gamepad2,
  ChevronLeft,
  ChevronRight,
  Filter,
  X,
} from "lucide-react";
import {
  format,
  addDays,
  isToday,
} from "date-fns";
import { fr } from "date-fns/locale";

interface TimeSlot {
  id: string;
  gym: string;
  day: string;
  dateLabel: string;
  date: Date;
  startTime: string;
  endTime: string;
  leader: string;
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
  slots: {
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
  }[];
}

const WEEKS: WeekData[] = [
  {
    id: "0405-1005",
    label: "0405 au 1005",
    period: "Semaine du 04/05/2026 au 10/05/2026",
    weekStart: "2026-05-04",
    weekEnd: "2026-05-10",
    slots: [
      { id: "lun-1", day: "Lundi", dateLabel: "04/05/2026", gym: "Chardon", time: "21h00 - 22h00", trainer: "Non renseigné", type: "Loisirs", description: "Jeu libre Loisirs - Tout public" },
      { id: "lun-2", day: "Lundi", dateLabel: "04/05/2026", gym: "Dessaux", time: "18h00 - 20h00", trainer: "Antoine Lolive / Nassima Bouhassoun", type: "Loisirs", description: "Jeu libre Loisirs" },
      { id: "lun-3", day: "Lundi", dateLabel: "04/05/2026", gym: "Barthelemy", time: "12h00 - 13h30", trainer: "Ouvreur recherche", type: "Loisirs", description: "Jeu libre Senior / Entreprise", comment: "Alerte: ouvreur recherche, ce creneau peut etre annule." },
      { id: "lun-4", day: "Lundi", dateLabel: "04/05/2026", gym: "Chardon", time: "19h30 - 21h00", trainer: "Yohan Henault", type: "Perfectionnement", description: "Adultes - Initiation NC/P" },
      { id: "lun-5", day: "Lundi", dateLabel: "04/05/2026", gym: "Chardon", time: "17h30 - 19h30", trainer: "Yohan Henault / Steve Bandou-Naitoll", type: "Élite", description: "Jeunes - Elite / Perf" },
      { id: "mar-1", day: "Mardi", dateLabel: "05/05/2026", gym: "Chardon", time: "19h30 - 22h00", trainer: "Florent Sautereau", type: "Perfectionnement", description: "Jeu libre Competiteurs" },
      { id: "mar-2", day: "Mardi", dateLabel: "05/05/2026", gym: "Dessaux", time: "18h00 - 20h00", trainer: "Vincent Serin", type: "Loisirs", description: "Jeu libre Loisirs" },
      { id: "mar-3", day: "Mardi", dateLabel: "05/05/2026", gym: "Barthelemy", time: "12h00 - 13h30", trainer: "Chantal Leguay", type: "Loisirs", description: "Jeu libre Senior / Entreprise" },
      { id: "mar-4", day: "Mardi", dateLabel: "05/05/2026", gym: "Peguy", time: "20h00 - 21h30", trainer: "Yohan Henault", type: "Perfectionnement", description: "Adultes - Initiation NC/P" },
      { id: "mar-5", day: "Mardi", dateLabel: "05/05/2026", gym: "Chardon", time: "17h30 - 19h30", trainer: "Thomas Huboud-Perron / Yohan Henault", type: "Élite", description: "Jeunes - Elite / Perf" },
      { id: "mer-1", day: "Mercredi", dateLabel: "06/05/2026", gym: "Chardon", time: "21h30 - 22h00", trainer: "Non renseigne", type: "Perfectionnement", description: "Jeu libre Competiteurs" },
      { id: "mer-2", day: "Mercredi", dateLabel: "06/05/2026", gym: "Lebrun", time: "21h30 - 22h00", trainer: "Non renseigne", type: "Perfectionnement", description: "Jeu libre Competiteurs" },
      { id: "mer-3", day: "Mercredi", dateLabel: "07/05/2026", gym: "Dessaux", time: "18h00 - 22h00", trainer: "Antoine Lolive / Anthony Clavel", type: "Loisirs", description: "Jeu libre Loisirs" },
      { id: "mer-4", day: "Mercredi", dateLabel: "07/05/2026", gym: "Lebrun", time: "19h30 - 21h30", trainer: "Yohan Henault", type: "Perfectionnement", description: "Adultes - Perfectionnement" },
      { id: "mer-5", day: "Mercredi", dateLabel: "07/05/2026", gym: "Chardon", time: "19h30 - 21h30", trainer: "Thomas Huboud-Perron", type: "Élite", description: "Adultes - Elite" },
      { id: "mer-6", day: "Mercredi", dateLabel: "07/05/2026", gym: "Chardon", time: "16h30 - 18h00", trainer: "Thomas Huboud-Perron / Yohan Henault", type: "Perfectionnement", description: "Jeunes - Poussins / Benjamins" },
      { id: "mer-7", day: "Mercredi", dateLabel: "07/05/2026", gym: "Chardon", time: "18h00 - 19h30", trainer: "Yohan Henault", type: "Perfectionnement", description: "Jeunes - Minimes / Cadets" },
      { id: "jeu-1", day: "Jeudi", dateLabel: "07/05/2026", gym: "Dessaux", time: "18h00 - 20h00", trainer: "Vincent Serin", type: "Loisirs", description: "Jeu libre Loisirs" },
      { id: "jeu-2", day: "Jeudi", dateLabel: "07/05/2026", gym: "Barthelemy", time: "12h00 - 13h30", trainer: "Chantal Leguay", type: "Loisirs", description: "Jeu libre Senior / Entreprise" },
      { id: "jeu-3", day: "Jeudi", dateLabel: "07/05/2026", gym: "Dessaux", time: "20h00 - 22h00", trainer: "Cedric Saccard", type: "Perfectionnement", description: "Adultes - Perfectionnement" },
      { id: "jeu-4", day: "Jeudi", dateLabel: "07/05/2026", gym: "Fouillade", time: "20h00 - 22h00", trainer: "Thomas Huboud-Perron", type: "Élite", description: "Adultes - Elite (2e seance)" },
      { id: "jeu-5", day: "Jeudi", dateLabel: "07/05/2026", gym: "Chardon", time: "18h00 - 20h00", trainer: "Thomas Huboud-Perron / Martin Lamy", type: "Élite", description: "Jeunes - Elite / Perf" },
      { id: "ven-1", day: "Vendredi", dateLabel: "08/05/2026", ferie: true, description: "Jour ferie - pas de creneaux planifies", gym: "", time: "", trainer: "", type: "Loisirs" },
      { id: "sam-1", day: "Samedi", dateLabel: "09/05/2026", description: "Jeu libre Loisirs - Tout public", gym: "Chardon", time: "9h30 - 12h30", trainer: "Yves AUSSEDAT", type: "Loisirs" },
      { id: "dim-1", day: "Dimanche", dateLabel: "10/05/2026", description: "Jeu libre Loisirs - Tout public", gym: "Chardon", time: "10h - 13h", trainer: "Gilles BECAVIN", type: "Loisirs" },
    ],
  },
  {
    id: "1105-1705",
    label: "1105 au 1705",
    period: "Semaine du 11/05/2026 au 17/05/2026",
    weekStart: "2026-05-11",
    weekEnd: "2026-05-17",
    slots: [
      { id: "lun-5", day: "Lundi", dateLabel: "11/05/2026", gym: "Chardon", time: "21h00 - 22h00", trainer: "Non renseigné", type: "Loisirs", description: "Jeu libre Loisirs - Tout public" },
      { id: "lun-2", day: "Lundi", dateLabel: "11/05/2026", gym: "Dessaux", time: "18h00 - 20h00", trainer: "Antoine Lolive / Nassima Bouhassoun", type: "Loisirs", description: "Jeu libre Loisirs" },
      { id: "lun-3", day: "Lundi", dateLabel: "11/05/2026", gym: "Barthelemy", time: "12h00 - 13h30", trainer: "Ouvreur recherche", type: "Loisirs", description: "Jeu libre Senior / Entreprise", comment: "Alerte: ouvreur recherche, ce creneau peut etre annule." },
      { id: "lun-4", day: "Lundi", dateLabel: "11/05/2026", gym: "Chardon", time: "19h30 - 21h00", trainer: "Yohan Henault", type: "Perfectionnement", description: "Adultes - Initiation NC/P" },
      { id: "lun-5", day: "Lundi", dateLabel: "11/05/2026", gym: "Chardon", time: "17h30 - 19h30", trainer: "Yohan Henault / Steve Bandou-Naitoll", type: "Élite", description: "Jeunes - Elite / Perf" },
      { id: "mar-1", day: "Mardi", dateLabel: "12/05/2026", gym: "Chardon", time: "19h30 - 22h00", trainer: "Florent Sautereau", type: "Perfectionnement", description: "Jeu libre Competiteurs" },
      { id: "mar-2", day: "Mardi", dateLabel: "12/05/2026", gym: "Dessaux", time: "18h00 - 20h00", trainer: "Vincent Serin", type: "Loisirs", description: "Jeu libre Loisirs" },
      { id: "mar-3", day: "Mardi", dateLabel: "12/05/2026", gym: "Barthelemy", time: "12h00 - 13h30", trainer: "Chantal Leguay", type: "Loisirs", description: "Jeu libre Senior / Entreprise" },
      { id: "mar-4", day: "Mardi", dateLabel: "12/05/2026", gym: "Peguy", time: "20h00 - 21h30", trainer: "Yohan Henault", type: "Perfectionnement", description: "Adultes - Initiation NC/P" },
      { id: "mar-5", day: "Mardi", dateLabel: "12/05/2026", gym: "Chardon", time: "17h30 - 19h30", trainer: "Thomas Huboud-Perron / Yohan Henault", type: "Élite", description: "Jeunes - Elite / Perf" },
      { id: "mer-1", day: "Mercredi", dateLabel: "13/05/2026", gym: "Chardon", time: "21h30 - 22h00", trainer: "Non renseigne", type: "Perfectionnement", description: "Jeu libre Competiteurs" },
      { id: "mer-2", day: "Mercredi", dateLabel: "13/05/2026", gym: "Lebrun", time: "21h30 - 22h00", trainer: "Non renseigne", type: "Perfectionnement", description: "Jeu libre Competiteurs" },
      { id: "mer-3", day: "Mercredi", dateLabel: "13/05/2026", gym: "Dessaux", time: "18h00 - 22h00", trainer: "Antoine Lolive / Anthony Clavel", type: "Loisirs", description: "Jeu libre Loisirs" },
      { id: "mer-4", day: "Mercredi", dateLabel: "13/05/2026", gym: "Lebrun", time: "19h30 - 21h30", trainer: "Yohan Henault", type: "Perfectionnement", description: "Adultes - Perfectionnement" },
      { id: "mer-5", day: "Mercredi", dateLabel: "13/05/2026", gym: "Chardon", time: "19h30 - 21h30", trainer: "Thomas Huboud-Perron", type: "Élite", description: "Adultes - Elite" },
      { id: "mer-6", day: "Mercredi", dateLabel: "13/05/2026", gym: "Chardon", time: "16h30 - 18h00", trainer: "Thomas Huboud-Perron / Yohan Henault", type: "Perfectionnement", description: "Jeunes - Poussins / Benjamins" },
      { id: "mer-7", day: "Mercredi", dateLabel: "13/05/2026", gym: "Chardon", time: "18h00 - 19h30", trainer: "Yohan Henault", type: "Perfectionnement", description: "Jeunes - Minimes / Cadets" },
      { id: "jeu-1", day: "Jeudi", dateLabel: "14/05/2026", gym: "Dessaux", time: "18h00 - 20h00", trainer: "Vincent Serin", type: "Loisirs", description: "Jeu libre Loisirs" },
      { id: "jeu-2", day: "Jeudi", dateLabel: "14/05/2026", gym: "Barthelemy", time: "12h00 - 13h30", trainer: "Chantal Leguay", type: "Loisirs", description: "Jeu libre Senior / Entreprise" },
      { id: "jeu-3", day: "Jeudi", dateLabel: "14/05/2026", gym: "Dessaux", time: "20h00 - 22h00", trainer: "Cedric Saccard", type: "Perfectionnement", description: "Adultes - Perfectionnement" },
      { id: "jeu-4", day: "Jeudi", dateLabel: "14/05/2026", gym: "Fouillade", time: "20h00 - 22h00", trainer: "Thomas Huboud-Perron", type: "Élite", description: "Adultes - Elite (2e seance)" },
      { id: "jeu-5", day: "Jeudi", dateLabel: "14/05/2026", gym: "Chardon", time: "18h00 - 20h00", trainer: "Thomas Huboud-Perron / Martin Lamy", type: "Élite", description: "Jeunes - Elite / Perf" },
      { id: "ven-1", day: "Vendredi", dateLabel: "15/05/2026", gym: "Chardon", time: "20h00 - 22h00", trainer: "Salma Agrebi / Benjamin Vu", type: "Loisirs", description: "Jeu libre Loisirs - Tout public" },
      { id: "ven-2", day: "Vendredi", dateLabel: "15/05/2026", gym: "Desseaux", time: "19h30 - 22h00", trainer: "Ouvreur recherche", type: "Perfectionnement", description: "Jeu libre Competiteurs", comment: "Alerte: ouvreur recherche, ce creneau peut etre annule." },
      { id: "ven-3", day: "Vendredi", dateLabel: "15/05/2026", gym: "Chardon", time: "13h00 - 14h00", trainer: "Ouvreur recherche", type: "Loisirs", description: "Jeu libre Senior / Entreprise", comment: "Alerte: ouvreur recherche, ce creneau peut etre annule." },
    ],
  },
];

const parseDateLabel = (dateLabel: string) => {
  const [day, month, year] = dateLabel.split("/").map(Number);
  return new Date(year, month - 1, day);
};

const normalizeHour = (value: string) => {
  const [h, m = "00"] = value.split("h");
  return `${h.padStart(2, "0")}:${m.padStart(2, "0")}`;
};

const parseTimeRange = (time: string) => {
  const parts = time.split("-");
  if (parts.length !== 2) return null;
  return {
    start: normalizeHour(parts[0].trim()),
    end: normalizeHour(parts[1].trim()),
  };
};

const getWeekDistance = (date: Date, week: WeekData) => {
  const start = new Date(week.weekStart);
  const end = new Date(week.weekEnd);
  const dateTime = date.getTime();

  if (dateTime < start.getTime()) return start.getTime() - dateTime;
  if (dateTime > end.getTime()) return dateTime - end.getTime();
  return 0;
};
// TYPE CALENDAR
export function CreneauxPage() {
  const [selectedDate, setSelectedDate] = useState<Date>(
    new Date(new Date()),
  );
  const [hoveredSlot, setHoveredSlot] = useState<string | null>(
    null,
  );

  // Filter states
  const [selectedTypes, setSelectedTypes] = useState<string[]>([
    "Élite",
    "Perfectionnement",
    "Loisirs",
  ]);
  const [selectedSessionKinds, setSelectedSessionKinds] = useState<string[]>([
    "Entraînement",
    "Jeu libre",
  ]);
  const [selectedGym, setSelectedGym] = useState<string>("Chardon");

  const selectedWeek = useMemo(
    () =>
      [...WEEKS].sort(
        (a, b) => getWeekDistance(selectedDate, a) - getWeekDistance(selectedDate, b),
      )[0] ?? WEEKS[0],
    [selectedDate],
  );
  const selectedWeekIndex = WEEKS.findIndex((week) => week.id === selectedWeek.id);
  const weekStart = new Date(selectedWeek.weekStart);

  const allTimeSlots = selectedWeek.slots
    .map((slot) => {
      const parsed = parseTimeRange(slot.time);
      return {
        id: slot.id,
        gym: slot.gym,
        day: slot.day,
        dateLabel: slot.dateLabel,
        date: parseDateLabel(slot.dateLabel),
        startTime: parsed?.start ?? "",
        endTime: parsed?.end ?? "",
        leader: slot.trainer || "Non renseigné",
        type: slot.type,
        description: slot.description,
        comment: slot.comment,
        ferie: slot.ferie || slot.time.toLowerCase() === "ferie",
      } satisfies TimeSlot;
    })
    .filter((slot) => slot.ferie || (slot.startTime && slot.endTime));

  const availableGyms = [
    ...Array.from(
      new Set(allTimeSlots.map((slot) => slot.gym).filter(Boolean)),
    ),
  ];

  // Filter time slots based on selected filters
  const timeSlots = allTimeSlots.filter((slot) => {
    if (slot.ferie) return false;
    const typeMatch = selectedTypes.includes(slot.type);
    const gymMatch =
      slot.gym === selectedGym;
    const sessionKind = slot.description.toLowerCase().includes("jeu libre")
      ? "Jeu libre"
      : "Entraînement";
    const sessionKindMatch = selectedSessionKinds.includes(sessionKind);
    return typeMatch && gymMatch && sessionKindMatch;
  });

  // Toggle training type filter
  const toggleType = (type: string) => {
    setSelectedTypes((prev) =>
      prev.includes(type)
        ? prev.filter((t) => t !== type)
        : [...prev, type],
    );
  };

  // Toggle session kind filter (entraînement / jeu libre)
  const toggleSessionKind = (kind: string) => {
    setSelectedSessionKinds((prev) =>
      prev.includes(kind)
        ? prev.filter((k) => k !== kind)
        : [...prev, kind],
    );
  };

  // Reset all filters
  const resetFilters = () => {
    setSelectedTypes(["Élite", "Perfectionnement", "Loisirs"]);
    setSelectedSessionKinds(["Entraînement", "Jeu libre"]);
    setSelectedGym("Chardon");
  };

  const toMinutes = (time: string) => {
    const [hours, minutes] = time.split(":").map(Number);
    return hours * 60 + minutes;
  };

  const weekTimedSlots = allTimeSlots.filter((slot) => {
    if (slot.ferie) return false;
    if (slot.gym !== selectedGym) return false;
    if (!selectedTypes.includes(slot.type)) return false;

    const sessionKind = slot.description.toLowerCase().includes("jeu libre")
      ? "Jeu libre"
      : "Entraînement";

    return selectedSessionKinds.includes(sessionKind);
  });
  const minStartMinutes = weekTimedSlots.length
    ? Math.min(...weekTimedSlots.map((slot) => toMinutes(slot.startTime)))
    : 9 * 60;
  const maxEndMinutes = weekTimedSlots.length
    ? Math.max(...weekTimedSlots.map((slot) => toMinutes(slot.endTime)))
    : 22 * 60;

  // Dynamic grid boundaries:
  // - first visible line = previous full hour before first slot
  // - last visible line = next full hour after last slot
  const startHour = Math.floor(minStartMinutes / 60);
  const endHour = Math.ceil(maxEndMinutes / 60);
  const timeGrid = Array.from(
    { length: endHour - startHour + 1 },
    (_, index) => `${String(startHour + index).padStart(2, "0")}:00`,
  );
  const dayColumnHeight = timeGrid.length * 80;

  const weekDays = [
    "Lundi",
    "Mardi",
    "Mercredi",
    "Jeudi",
    "Vendredi",
    "Samedi",
    "Dimanche",
  ];

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Élite":
        return "#0153b6";
      case "Perfectionnement":
        return "#da9619";
      case "Loisirs":
        return "#16a34a";
      default:
        return "#4b5563";
    }
  };

  const getTypeBadgeClass = (type: TimeSlot["type"]) => {
    switch (type) {
      case "Élite":
        return "bg-[#0153b6]";
      case "Perfectionnement":
        return "bg-[#da9619]";
      case "Loisirs":
        return "bg-green-600";
      default:
        return "bg-gray-500";
    }
  };

  const isFreeSession = (description: string) =>
    description.toLowerCase().includes("jeu libre");

  // Helper to convert time string to position
  const timeToPosition = (time: string) => {
    const [hours, minutes] = time.split(":").map(Number);
    const totalMinutes = hours * 60 + minutes;
    const startMinutes = startHour * 60; // 9:00
    return ((totalMinutes - startMinutes) / 60) * 80; // 80px per hour
  };

  // Helper to calculate height
  const calculateHeight = (
    startTime: string,
    endTime: string,
  ) => {
    const [startHours, startMinutes] = startTime
      .split(":")
      .map(Number);
    const [endHours, endMinutes] = endTime
      .split(":")
      .map(Number);
    const durationMinutes =
      endHours * 60 +
      endMinutes -
      (startHours * 60 + startMinutes);
    return (durationMinutes / 60) * 80; // 80px per hour
  };

  const goToPreviousWeek = () => {
    const previousWeek = WEEKS[Math.max(0, selectedWeekIndex - 1)];
    setSelectedDate(new Date(previousWeek.weekStart));
  };

  const goToNextWeek = () => {
    const nextWeek = WEEKS[Math.min(WEEKS.length - 1, selectedWeekIndex + 1)];
    setSelectedDate(new Date(nextWeek.weekStart));
  };

  return (
    <>
      <PageHero
        title="CRÉNEAUX"
        subtitle="Planning hebdomadaire des entraînements"
        image="https://images.unsplash.com/photo-1617962529235-262e8e777e48?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWRtaW50b24lMjB0cmFpbmluZyUyMHNjaGVkdWxlfGVufDF8fHx8MTc3NjMzNzE3NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
      />

      <section className="py-8 md:py-15 bg-gray-50">
        <div className="max-w-[1600px] mx-auto px-6">
          {/* Calendar Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-[#0153b6]">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                  <Calendar
                    className="text-[#0153b6]"
                    size={40}
                  />
                  <div>
                    <h3 className="font-['Bebas_Neue'] text-3xl text-[#0153b6]">
                      {format(new Date(selectedWeek.weekStart), "MMMM yyyy", {
                        locale: fr,
                      }).toUpperCase()}
                    </h3>
                    <p className="text-gray-600 text-lg">
                      {selectedWeek.period}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={goToPreviousWeek}
                    disabled={selectedWeekIndex <= 0}
                    className="p-3 bg-gray-100 hover:bg-[#0153b6] hover:text-white rounded-lg transition-colors duration-200"
                  >
                    <ChevronLeft size={24} />
                  </button>

                  <input
                    type="date"
                    value={format(selectedDate, "yyyy-MM-dd")}
                    onChange={(e) =>
                      setSelectedDate(new Date(e.target.value))
                    }
                    className="px-4 py-3 border-2 border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary text-lg"
                  />

                  <button
                    onClick={goToNextWeek}
                    disabled={selectedWeekIndex >= WEEKS.length - 1}
                    className="p-3 bg-gray-100 hover:bg-[#0153b6] hover:text-white rounded-lg transition-colors duration-200"
                  >
                    <ChevronRight size={24} />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="mb-8"
          >
            <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-gray-200">
              <div className="flex items-center gap-3 mb-4">
                <Filter className="text-[#0153b6]" size={24} />
                <h3 className="font-['Bebas_Neue'] text-2xl text-[#0153b6]">
                  FILTRES
                </h3>
                <button
                  onClick={resetFilters}
                  className="ml-auto flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors duration-200 text-sm"
                >
                  <X size={16} />
                  Réinitialiser
                </button>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                {/* Training Type Filter */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Type d'entraînement
                  </label>
                  <div className="flex flex-wrap gap-3">
                    <button
                      onClick={() => toggleType("Élite")}
                      className={`px-4 py-2 rounded-lg font-semibold transition-all duration-200 ${selectedTypes.includes("Élite")
                        ? "bg-[#0153b6] text-white shadow-md scale-105"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                        }`}
                    >
                      <div className="flex items-center gap-2">
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{
                            backgroundColor: selectedTypes.includes(
                              "Élite",
                            )
                              ? "#fff"
                              : "#0153b6",
                          }}
                        ></div>
                        Élite
                      </div>
                    </button>

                    <button
                      onClick={() =>
                        toggleType("Perfectionnement")
                      }
                      className={`px-4 py-2 rounded-lg font-semibold transition-all duration-200 ${selectedTypes.includes(
                        "Perfectionnement",
                      )
                        ? "bg-[#da9619] text-white shadow-md scale-105"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                        }`}
                    >
                      <div className="flex items-center gap-2">
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{
                            backgroundColor: selectedTypes.includes(
                              "Perfectionnement",
                            )
                              ? "#fff"
                              : "#da9619",
                          }}
                        ></div>
                        Perfectionnement
                      </div>
                    </button>

                    <button
                      onClick={() => toggleType("Loisirs")}
                      className={`px-4 py-2 rounded-lg font-semibold transition-all duration-200 ${selectedTypes.includes("Loisirs")
                        ? "bg-green-600 text-white shadow-md scale-105"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                        }`}
                    >
                      <div className="flex items-center gap-2">
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{
                            backgroundColor: selectedTypes.includes(
                              "Loisirs",
                            )
                              ? "#fff"
                              : "#16a34a",
                          }}
                        ></div>
                        Loisirs
                      </div>
                    </button>
                  </div>
                </div>

                {/* Session Kind Filter */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Type de séance
                  </label>
                  <div className="flex flex-wrap gap-3">
                    <button
                      onClick={() => toggleSessionKind("Entraînement")}
                      className={`px-4 py-2 rounded-lg font-semibold transition-all duration-200 ${selectedSessionKinds.includes("Entraînement")
                        ? "bg-[#0153b6] text-white shadow-md scale-105"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                        }`}
                    >
                      <div className="flex items-center gap-2">
                        <Dumbbell size={16} />
                        Entraînement
                      </div>
                    </button>
                    <button
                      onClick={() => toggleSessionKind("Jeu libre")}
                      className={`px-4 py-2 rounded-lg font-semibold transition-all duration-200 ${selectedSessionKinds.includes("Jeu libre")
                        ? "bg-green-600 text-white shadow-md scale-105"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                        }`}
                    >
                      <div className="flex items-center gap-2">
                        <Gamepad2 size={16} />
                        Jeu libre
                      </div>
                    </button>
                  </div>
                </div>

                {/* Gymnasium Filter */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Gymnase
                  </label>
                  <select
                    value={selectedGym}
                    onChange={(e) => setSelectedGym(e.target.value)}
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0153b6] focus:border-[#0153b6] text-gray-700 bg-white"
                  >
                    {availableGyms.map((gym) => (
                      <option key={gym} value={gym}>
                        {gym}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Active filters count */}
              <div className="mt-4 pt-4 border-t border-gray-200">
                <p className="text-sm text-gray-600">
                  {timeSlots.length} créneau
                  {timeSlots.length > 1 ? "x" : ""} affiché
                  {timeSlots.length > 1 ? "s" : ""}{" "}
                  <span className="text-[#0153b6] font-semibold">
                    • {selectedGym}
                  </span>
                  <span className="text-gray-500"> • </span>
                  <span className="font-semibold text-gray-700">
                    {selectedSessionKinds.join(" + ")}
                  </span>
                </p>
              </div>
            </div>
          </motion.div>

          {/* Mobile View */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.08 }}
            className="md:hidden space-y-4"
          >
            {weekDays.map((day, dayIndex) => {
              const dayDate = addDays(weekStart, dayIndex);
              const daySlotsData = timeSlots.filter(
                (slot) => slot.day === day,
              );
              const isCurrentDay = isToday(dayDate);

              return (
                <div
                  key={day}
                  className="bg-white rounded-xl shadow-lg border-2 border-gray-200 overflow-hidden"
                >
                  <div
                    className={`px-4 py-3 ${isCurrentDay ? "bg-[#da9619]" : "bg-[#0153b6]"}`}
                  >
                    <p className="font-['Bebas_Neue'] text-2xl text-white leading-none">
                      {day}
                    </p>
                    <p className="text-sm text-blue-100">
                      {format(dayDate, "dd MMMM yyyy", { locale: fr })}
                    </p>
                  </div>

                  {daySlotsData.length > 0 ? (
                    <div className="p-3 space-y-3">
                      {daySlotsData.map((slot) => (
                        <div
                          key={slot.id}
                          className="rounded-lg border border-gray-200 p-3 bg-gray-50"
                        >
                          <div className="flex items-center justify-between gap-3">
                            <p className="font-semibold text-gray-900">
                              {slot.startTime} - {slot.endTime}
                            </p>
                            <span
                              className={`inline-block px-2 py-1 rounded-full text-xs font-semibold text-white ${getTypeBadgeClass(slot.type)}`}
                            >
                              {slot.type}
                            </span>
                          </div>
                          <p className="mt-2 text-sm text-gray-800">
                            {slot.description}
                          </p>
                          <div className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-white px-2 py-1 text-xs font-semibold text-gray-700 border border-gray-200">
                            {isFreeSession(slot.description) ? (
                              <>
                                <Gamepad2 size={13} className="text-[#16a34a]" />
                                Jeu libre
                              </>
                            ) : (
                              <>
                                <Dumbbell size={13} className="text-[#0153b6]" />
                                Entraînement
                              </>
                            )}
                          </div>
                          <div className="mt-2 text-xs text-gray-600 space-y-1">
                            <p>📍 {slot.gym}</p>
                            <p>👤 {slot.leader}</p>
                          </div>
                          {slot.comment && (
                            <p className="mt-2 text-xs text-yellow-800 bg-yellow-50 border-l-4 border-yellow-400 p-2 rounded">
                              ⚠️ {slot.comment}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="p-4 text-sm text-gray-500">
                      Aucun créneau ce jour.
                    </p>
                  )}
                </div>
              );
            })}
          </motion.div>

          {/* Calendar Grid (desktop/tablette) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="hidden md:block bg-white rounded-xl shadow-xl overflow-hidden border-2 border-gray-200"
          >
            {/* Days Header */}
            <div className="grid grid-cols-[56px_repeat(7,minmax(0,1fr))] lg:grid-cols-[64px_repeat(7,minmax(0,1fr))] bg-[#0153b6] border-b-2 border-gray-300">
              <div className="px-1 py-4 border-r border-blue-400"></div>
              {weekDays.map((day, index) => {
                const dayDate = addDays(weekStart, index);
                const isCurrentDay = isToday(dayDate);

                return (
                  <div
                    key={day}
                    className={`px-2 py-4 text-center border-r border-blue-400 last:border-r-0 ${isCurrentDay ? "bg-[#da9619]" : ""
                      }`}
                  >
                    <div className="font-['Bebas_Neue'] text-xl lg:text-2xl text-white">
                      {day}
                    </div>
                    <div
                      className={`text-sm ${isCurrentDay ? "text-white font-bold" : "text-blue-100"}`}
                    >
                      {format(dayDate, "dd MMM", {
                        locale: fr,
                      })}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Time Grid */}
            <div className="relative">
              <div className="grid grid-cols-[56px_repeat(7,minmax(0,1fr))] lg:grid-cols-[64px_repeat(7,minmax(0,1fr))]">
                {/* Time Column */}
                <div className="border-r-2 border-gray-200 bg-gray-50">
                  {timeGrid.map((time) => (
                    <div
                      key={time}
                      className="h-20 border-b border-gray-200 px-1 py-2 text-right"
                    >
                      <span className="text-xs lg:text-sm font-semibold text-gray-600">
                        {time}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Day Columns */}
                {weekDays.map((day, dayIndex) => {
                  const dayDate = addDays(weekStart, dayIndex);
                  const isCurrentDay = isToday(dayDate);
                  const daySlotsData = timeSlots.filter(
                    (slot) => slot.day === day,
                  );

                  return (
                    <div
                      key={day}
                      className={`relative border-r border-gray-200 last:border-r-0 ${isCurrentDay ? "bg-blue-50" : "bg-white"
                        }`}
                    >
                      {/* Hour grid lines */}
                      {timeGrid.map((time) => (
                        <div
                          key={time}
                          className="h-20 border-b border-gray-200"
                        />
                      ))}

                      {/* Time slots */}
                      <div className="absolute inset-0 pointer-events-none">
                        {daySlotsData.map((slot) => {
                          const top = timeToPosition(
                            slot.startTime,
                          );
                          const height = calculateHeight(
                            slot.startTime,
                            slot.endTime,
                          );
                          const bgColor = getTypeColor(
                            slot.type,
                          );
                          const isSlotHovered = hoveredSlot === slot.id;
                          const baseHeight = Math.max(height - 4, 56);
                          const expandedHeight = Math.max(
                            baseHeight,
                            slot.comment ? 210 : 180,
                          );
                          const maxHeightWithinColumn = Math.max(
                            baseHeight,
                            dayColumnHeight - top - 4,
                          );
                          const visibleHeight = isSlotHovered
                            ? Math.min(expandedHeight, maxHeightWithinColumn)
                            : baseHeight;

                          return (
                            <motion.div
                              key={slot.id}
                              initial={{
                                opacity: 0,
                                scale: 0.8,
                              }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ duration: 0.3 }}
                              className="absolute left-1 right-1 rounded-lg shadow-md cursor-pointer pointer-events-auto overflow-hidden transition-[height,z-index] duration-200"
                              style={{
                                top: `${top}px`,
                                height: `${visibleHeight}px`,
                                backgroundColor: bgColor,
                                zIndex: isSlotHovered ? 30 : 1,
                              }}
                              onMouseEnter={() =>
                                setHoveredSlot(slot.id)
                              }
                              onMouseLeave={() =>
                                setHoveredSlot(null)
                              }
                            >
                              <div className="p-2 h-full flex flex-col justify-between text-white relative">
                                <div>
                                  <div className="font-bold text-sm mb-1">
                                    {slot.startTime} -{" "}
                                    {slot.endTime}
                                  </div>
                                  <div className="text-xs font-semibold">
                                    {slot.type}
                                  </div>
                                  <div className="mt-1 inline-flex items-center gap-1 rounded-full bg-white/20 px-1.5 py-0.5 text-[11px] font-semibold">
                                    {isFreeSession(slot.description) ? (
                                      <>
                                        <Gamepad2 size={11} />
                                        Jeu libre
                                      </>
                                    ) : (
                                      <>
                                        <Dumbbell size={11} />
                                        Entraînement
                                      </>
                                    )}
                                  </div>
                                  <div className="text-xs opacity-90 mt-1 line-clamp-1">
                                    {slot.gym}
                                  </div>
                                </div>

                                {/* Hover Details */}
                                {hoveredSlot === slot.id && (
                                  <motion.div
                                    initial={{
                                      opacity: 0,
                                      y: 10,
                                    }}
                                    animate={{
                                      opacity: 1,
                                      y: 0,
                                    }}
                                    className="absolute inset-0 bg-gray-900/95 p-3 z-10 flex flex-col gap-2 text-xs"
                                  >
                                    <div className="font-['Bebas_Neue'] text-lg text-[#da9619] mb-1">
                                      {slot.type}
                                    </div>
                                    <div className="flex items-center gap-2">
                                      <Clock size={14} />
                                      <span>
                                        {slot.startTime} -{" "}
                                        {slot.endTime}
                                      </span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                      <MapPin size={14} />
                                      <span className="line-clamp-2">
                                        {slot.gym}
                                      </span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                      <User size={14} />
                                      <span className="line-clamp-2">{slot.leader}</span>
                                    </div>
                                    {slot.comment && (
                                      <div className="mt-1 pt-2 border-t border-yellow-400 text-yellow-300 text-[10px]">
                                        ⚠️ {slot.comment}
                                      </div>
                                    )}
                                  </motion.div>
                                )}
                              </div>
                            </motion.div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>

          {/* Legend */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-8 bg-white rounded-xl p-6 shadow-lg border-2 border-gray-200"
          >
            <h3 className="font-['Bebas_Neue'] text-2xl text-[#0153b6] mb-4">
              LÉGENDE
            </h3>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="flex items-center gap-3">
                <div
                  className="w-6 h-6 rounded"
                  style={{ backgroundColor: "#0153b6" }}
                ></div>
                <div>
                  <div className="font-semibold text-gray-900">
                    Élite
                  </div>
                  <div className="text-sm text-gray-600">
                    Compétition haut niveau
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div
                  className="w-6 h-6 rounded"
                  style={{ backgroundColor: "#da9619" }}
                ></div>
                <div>
                  <div className="font-semibold text-gray-900">
                    Perfectionnement
                  </div>
                  <div className="text-sm text-gray-600">
                    Joueurs confirmés
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div
                  className="w-6 h-6 rounded"
                  style={{ backgroundColor: "#16a34a" }}
                ></div>
                <div>
                  <div className="font-semibold text-gray-900">
                    Loisirs
                  </div>
                  <div className="text-sm text-gray-600">
                    Pratique conviviale
                  </div>
                </div>
              </div>
            </div>
            <p className="mt-4 text-sm text-gray-600 bg-blue-50 p-3 rounded-lg border-l-4 border-[#0153b6]">
              💡 <strong>Astuce:</strong> Survolez un créneau
              pour voir tous les détails (responsable,
              téléphone, gymnase)
            </p>
          </motion.div>
        </div>
      </section>
    </>
  );
}