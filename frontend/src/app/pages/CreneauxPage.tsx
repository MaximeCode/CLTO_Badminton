import { useEffect, useMemo, useState } from "react";
import { PageHero } from "../components/PageHero";
import { useBandeauImage } from "@/hooks/useBandeauImage";
import { BANDEAU_PAGES } from "@/constants/bandeauPages";
import { Section } from "../components/Section";
import { Seo } from '../components/Seo';
import { motion, AnimatePresence } from "motion/react";
import {
  AlertTriangle,
  Calendar,
  Clock,
  ExternalLink,
  MapPin,
  User,
  Dumbbell,
  Gamepad2,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Filter,
  X,
  Users,
} from "lucide-react";
import { format, isToday, parseISO } from "date-fns";
import { fr } from "date-fns/locale";
import { getSeances } from "@/api/gestion/seances";
import { getParametresGlobaux } from "@/api/strapi/parametre-globaux";
import { CRENEAU_PUBLICS, CRENEAU_TYPES, CRENEAU_HINT, CRENEAU_JEU_LIBRE_ITEMS, type CreneauWeek, type Seance } from "@/types/seancesType";
import {
  WEEK_DAYS,
  addDaysToWeekStart,
  formatLeader,
  formatMonthYear,
  getDayNameFromDate,
  getWeekDistance,
  groupSeancesByWeek,
  mergeEmptyWeeks,
} from "@/utils/seancesUtils";

const ALL_GYMS = "Tous";

const FILTERS_STORAGE_KEY = "clto.creneaux.filters";

const SESSION_KINDS = ["Entraînement", "Jeu libre"] as const;

const DEFAULT_FILTERS = {
  types: [...CRENEAU_TYPES] as string[],
  sessionKinds: [...SESSION_KINDS] as string[],
  publics: [] as string[],
  gym: ALL_GYMS,
};

type StoredFilters = {
  types: string[];
  sessionKinds: string[];
  publics: string[];
  gym: string;
};

function sanitizeStringList(
  value: unknown,
  allowed: readonly string[],
  fallback: string[],
): string[] {
  if (!Array.isArray(value)) return [...fallback];
  const filtered = value.filter(
    (item): item is string =>
      typeof item === "string" && allowed.includes(item),
  );
  // Liste inconnue / entièrement invalide → défaut ; [] est valide pour les publics
  if (filtered.length === 0 && value.length > 0) return [...fallback];
  return filtered;
}

function loadStoredFilters(): StoredFilters {
  try {
    const raw = localStorage.getItem(FILTERS_STORAGE_KEY);
    if (!raw) {
      return {
        types: [...DEFAULT_FILTERS.types],
        sessionKinds: [...DEFAULT_FILTERS.sessionKinds],
        publics: [...DEFAULT_FILTERS.publics],
        gym: DEFAULT_FILTERS.gym,
      };
    }
    const parsed = JSON.parse(raw) as Partial<StoredFilters>;
    const gym =
      typeof parsed.gym === "string" && parsed.gym.trim() !== ""
        ? parsed.gym
        : DEFAULT_FILTERS.gym;

    return {
      types: sanitizeStringList(
        parsed.types,
        CRENEAU_TYPES,
        DEFAULT_FILTERS.types,
      ),
      sessionKinds: sanitizeStringList(
        parsed.sessionKinds,
        SESSION_KINDS,
        DEFAULT_FILTERS.sessionKinds,
      ),
      publics: sanitizeStringList(
        parsed.publics,
        CRENEAU_PUBLICS,
        DEFAULT_FILTERS.publics,
      ),
      gym,
    };
  } catch {
    return {
      types: [...DEFAULT_FILTERS.types],
      sessionKinds: [...DEFAULT_FILTERS.sessionKinds],
      publics: [...DEFAULT_FILTERS.publics],
      gym: DEFAULT_FILTERS.gym,
    };
  }
}

/** Une seule lecture au premier montage React (4 useState). */
let initialFiltersCache: StoredFilters | null = null;
function getInitialFilters(): StoredFilters {
  if (!initialFiltersCache) {
    initialFiltersCache = loadStoredFilters();
  }
  return initialFiltersCache;
}

function saveStoredFilters(filters: StoredFilters) {
  try {
    localStorage.setItem(FILTERS_STORAGE_KEY, JSON.stringify(filters));
  } catch {
    // Quota / mode privé : on ignore silencieusement
  }
}

/** Planning Excel de transition (à jour) — août 2026. */
const EXCEL_PLANNING_URL =
  "https://docs.google.com/spreadsheets/d/1D4_LffNAUOL1-_NB9iWQAtwKcj2VJ7fxmc8iOq1oDl8/edit";

/** Semaines couvertes par le Google Sheet (pas d’affichage API). */
const EXCEL_PLANNING_WEEK_STARTS = ["2026-08-10", "2026-08-17", "2026-08-24"] as const;

type TimeSlot = {
  id: string;
  gym: string;
  gymFull: string;
  day: string;
  dateLabel: string;
  date: Date;
  startTime: string;
  endTime: string;
  leader: string;
  hasOuvreur: boolean;
  types: string[];
  primaryType: string;
  nom: string;
  publics: string[];
  comment: string | null;
  sessionKind: "Entraînement" | "Jeu libre";
};

function seanceToTimeSlot(seance: Seance): TimeSlot {
  const date = parseISO(seance.dateSeance);
  return {
    id: seance.id,
    gym: seance.gymnaseNomCourt,
    gymFull: seance.gymnaseNom,
    day: getDayNameFromDate(date),
    dateLabel: format(date, "dd/MM/yyyy"),
    date,
    startTime: seance.debut,
    endTime: seance.fin,
    leader: formatLeader(seance.entraineurs),
    hasOuvreur: seance.entraineurs.length > 0,
    types: seance.types,
    primaryType: seance.primaryType,
    nom: seance.nom,
    publics: seance.publics,
    comment: seance.commentaire,
    sessionKind: seance.sessionKind,
  };
}

const TYPE_COLORS: Record<string, string> = {
  Élite: "#0153b6",
  Perfectionnement: "#da9619",
  Débutant: "#0891b2",
  Intermédiaire: "#db2777",
  "Matchs pour tous": "#16a34a",
  "Pratique libre": "#16a34a",
  "Jeu libre": "#16a34a",
};

const TYPE_BADGE_CLASSES: Record<string, string> = {
  Élite: "bg-primary",
  Perfectionnement: "bg-secondary",
  Débutant: "bg-cyan-600",
  Intermédiaire: "bg-pink-600",
  "Matchs pour tous": "bg-green-600",
  "Pratique libre": "bg-teal-600",
  "Jeu libre": "bg-lime-600",
};

export function CreneauxPage() {
  const bandeauImage = useBandeauImage(BANDEAU_PAGES.CRENEAUX);

  const [weeks, setWeeks] = useState<CreneauWeek[]>([]);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [hoveredSlot, setHoveredSlot] = useState<string | null>(null);
  const [openDay, setOpenDay] = useState<string | null>(null);

  const [selectedTypes, setSelectedTypes] = useState<string[]>(
    () => getInitialFilters().types,
  );
  const [selectedSessionKinds, setSelectedSessionKinds] = useState<string[]>(
    () => getInitialFilters().sessionKinds,
  );
  const [selectedPublics, setSelectedPublics] = useState<string[]>(
    () => getInitialFilters().publics,
  );
  const [selectedGym, setSelectedGym] = useState<string>(
    () => getInitialFilters().gym,
  );

  useEffect(() => {
    saveStoredFilters({
      types: selectedTypes,
      sessionKinds: selectedSessionKinds,
      publics: selectedPublics,
      gym: selectedGym,
    });
  }, [selectedTypes, selectedSessionKinds, selectedPublics, selectedGym]);

  useEffect(() => {
    async function loadData() {
      try {
        setLoadError(null);
        setIsLoading(true);
        const parametres = await getParametresGlobaux();
        const saisonId = parametres?.saison_id;
        if (saisonId == null) {
          throw new Error("L'identifiant de saison n'est pas configuré.");
        }
        const seances =
          import.meta.env.VITE_ENV === "dev"
            ? await getSeances() // DEV
            : await getSeances(saisonId); // PP / PROD

        // Semaines Excel : pas de créneaux API — on injecte des semaines vides navigables
        const groupedFromApi = groupSeancesByWeek(seances).map((week) =>
          (EXCEL_PLANNING_WEEK_STARTS as readonly string[]).includes(week.weekStart)
            ? { ...week, seances: [] }
            : week,
        );
        const grouped = mergeEmptyWeeks(groupedFromApi, [
          ...EXCEL_PLANNING_WEEK_STARTS,
        ]);
        setWeeks(grouped);

        if (grouped.length > 0) {
          const today = new Date();
          const nearest = [...grouped].sort(
            (a, b) => getWeekDistance(today, a) - getWeekDistance(today, b),
          )[0];
          setSelectedDate(parseISO(nearest.weekStart));
        }
      } catch (error) {
        console.error("Error loading data seances:", error);
        setLoadError(
          error instanceof Error ? error.message : "Impossible de charger les créneaux.",
        );
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, []);

  // Gymnase disparu des données → défaut "Tous"
  useEffect(() => {
    if (weeks.length === 0 || selectedGym === ALL_GYMS) return;
    const knownGyms = new Set(
      weeks.flatMap((week) =>
        week.seances.map((seance) => seance.gymnaseNomCourt).filter(Boolean),
      ),
    );
    if (!knownGyms.has(selectedGym)) {
      setSelectedGym(ALL_GYMS);
    }
  }, [weeks, selectedGym]);

  const selectedWeek = useMemo(() => {
    if (weeks.length === 0) return null;
    return (
      [...weeks].sort(
        (a, b) => getWeekDistance(selectedDate, a) - getWeekDistance(selectedDate, b),
      )[0] ?? weeks[0]
    );
  }, [selectedDate, weeks]);

  const selectedWeekIndex = selectedWeek
    ? weeks.findIndex((week) => week.id === selectedWeek.id)
    : -1;
  const weekStart = selectedWeek?.weekStart ?? "";

  const allTimeSlots = useMemo(() => {
    if (!selectedWeek) return [];
    return selectedWeek.seances.map(seanceToTimeSlot);
  }, [selectedWeek]);

  const availableGyms = useMemo(
    () =>
      [...new Set(allTimeSlots.map((slot) => slot.gym).filter(Boolean))].sort((a, b) =>
        a.localeCompare(b, "fr"),
      ),
    [allTimeSlots],
  );

  const matchesFilters = (slot: TimeSlot) => {
    const gymMatch = selectedGym === ALL_GYMS || slot.gym === selectedGym;
    const sessionKindMatch = selectedSessionKinds.includes(slot.sessionKind);
    // Jeu libre : pas d'ENCADREMENT → le filtre type ne s'applique pas
    const typeMatch =
      slot.sessionKind === "Jeu libre"
        ? true
        : slot.types.some((type) => selectedTypes.includes(type));
    // Sans PUBLIC → toujours visible ; sinon au moins un public sélectionné
    const publicMatch =
      slot.publics.length === 0 ||
      slot.publics.some((pub) => selectedPublics.includes(pub));
    return gymMatch && sessionKindMatch && typeMatch && publicMatch;
  };

  const timeSlots = allTimeSlots.filter(matchesFilters);
  const isExcelPlanningWeek = Boolean(
    selectedWeek &&
    (EXCEL_PLANNING_WEEK_STARTS as readonly string[]).includes(
      selectedWeek.weekStart,
    ),
  );

  const toggleType = (type: string) => {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type],
    );
  };

  const toggleSessionKind = (kind: string) => {
    setSelectedSessionKinds((prev) =>
      prev.includes(kind) ? prev.filter((k) => k !== kind) : [...prev, kind],
    );
  };

  const togglePublic = (pub: string) => {
    setSelectedPublics((prev) =>
      prev.includes(pub) ? prev.filter((p) => p !== pub) : [...prev, pub],
    );
  };

  const resetFilters = () => {
    setSelectedTypes([...DEFAULT_FILTERS.types]);
    setSelectedSessionKinds([...DEFAULT_FILTERS.sessionKinds]);
    setSelectedPublics([...DEFAULT_FILTERS.publics]);
    setSelectedGym(DEFAULT_FILTERS.gym);
  };

  const toMinutes = (time: string) => {
    const [hours, minutes] = time.split(":").map(Number);
    return hours * 60 + minutes;
  };

  const weekTimedSlots = allTimeSlots.filter(matchesFilters);
  const minStartMinutes = weekTimedSlots.length
    ? Math.min(...weekTimedSlots.map((slot) => toMinutes(slot.startTime)))
    : 9 * 60;
  const maxEndMinutes = weekTimedSlots.length
    ? Math.max(...weekTimedSlots.map((slot) => toMinutes(slot.endTime)))
    : 22 * 60;

  const startHour = Math.floor(minStartMinutes / 60);
  // Dernière heure affichée = fin des créneaux (pas de ligne fantôme type 24:00)
  const endHour = Math.max(startHour, Math.ceil(maxEndMinutes / 60));
  const timeGrid = Array.from(
    { length: endHour - startHour + 1 },
    (_, index) => `${String(startHour + index).padStart(2, "0")}:00`,
  );
  const dayColumnHeight = timeGrid.length * 80;

  const getTypeColor = (type: string) => TYPE_COLORS[type] ?? "#4b5563";
  const getTypeBadgeClass = (type: string) => TYPE_BADGE_CLASSES[type] ?? "bg-gray-500";

  const timeToPosition = (time: string) => {
    const [hours, minutes] = time.split(":").map(Number);
    const totalMinutes = hours * 60 + minutes;
    return ((totalMinutes - startHour * 60) / 60) * 80;
  };

  const calculateHeight = (startTime: string, endTime: string) => {
    const [startHours, startMinutes] = startTime.split(":").map(Number);
    const [endHours, endMinutes] = endTime.split(":").map(Number);
    const durationMinutes =
      endHours * 60 + endMinutes - (startHours * 60 + startMinutes);
    return (durationMinutes / 60) * 80;
  };

  const layoutDaySlots = (slots: TimeSlot[]) => {
    const sorted = [...slots].sort((a, b) => {
      const startDiff = toMinutes(a.startTime) - toMinutes(b.startTime);
      if (startDiff !== 0) return startDiff;
      return toMinutes(b.endTime) - toMinutes(a.endTime);
    });

    const columnEnds: number[] = [];
    const laidOut = sorted.map((slot) => {
      const startMin = toMinutes(slot.startTime);
      const endMin = toMinutes(slot.endTime);
      let columnIndex = columnEnds.findIndex((endTime) => endTime <= startMin);

      if (columnIndex === -1) {
        columnIndex = columnEnds.length;
        columnEnds.push(endMin);
      } else {
        columnEnds[columnIndex] = endMin;
      }

      return { ...slot, startMin, endMin, columnIndex };
    });

    const parent = laidOut.map((_, i) => i);
    const find = (i: number): number =>
      parent[i] === i ? i : (parent[i] = find(parent[i]));
    const union = (a: number, b: number) => {
      parent[find(a)] = find(b);
    };

    for (let i = 0; i < laidOut.length; i++) {
      for (let j = i + 1; j < laidOut.length; j++) {
        if (
          laidOut[i].startMin < laidOut[j].endMin &&
          laidOut[j].startMin < laidOut[i].endMin
        ) {
          union(i, j);
        }
      }
    }

    const clusterColumns = new Map<number, number>();
    laidOut.forEach((slot, i) => {
      const root = find(i);
      clusterColumns.set(
        root,
        Math.max(clusterColumns.get(root) ?? 0, slot.columnIndex + 1),
      );
    });

    return laidOut.map((slot, i) => ({
      ...slot,
      columnCount: clusterColumns.get(find(i)) ?? 1,
    }));
  };

  const goToPreviousWeek = () => {
    if (selectedWeekIndex <= 0) return;
    setSelectedDate(parseISO(weeks[selectedWeekIndex - 1].weekStart));
  };

  const goToNextWeek = () => {
    if (selectedWeekIndex < 0 || selectedWeekIndex >= weeks.length - 1) return;
    setSelectedDate(parseISO(weeks[selectedWeekIndex + 1].weekStart));
  };

  return (
    <>
      <Seo
        title="Créneaux"
        description="Créneaux et planning d'entraînement du CLTO Badminton Orléans : horaires du club de badminton à Orléans."
      />
      <PageHero
        title="CRÉNEAUX"
        subtitle="Tous les créneaux du CLTO Badminton en un coup d'œil"
        image={bandeauImage}
      />

      <Section className="bg-gray-50" width_subdiv={2000}>
        <div className="mb-8 rounded-xl border-l-4 border-secondary bg-amber-50 p-5 md:p-6 shadow-sm">
          <p className="font-semibold text-gray-900 text-base md:text-lg">
            ⚠️ Cette page est en cours de mise à jour.
          </p>
          <p className="mt-2 text-gray-700 text-sm md:text-base">
            En attendant, consultez notre planning actualisé pour connaître les
            créneaux disponibles du 17 au 30 août 2026.
          </p>
          <p className="mt-2 text-gray-700 text-sm md:text-base">
            ❌ Attention : aucun créneau n’est disponible du 10 au 16 août, en
            raison de la fermeture annuelle des gymnases.
          </p>
          <p className="mt-3 text-sm md:text-base">
            <span className="text-gray-700">Consulter le planning à jour : </span>
            <a
              href={EXCEL_PLANNING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-semibold text-primary underline underline-offset-2 hover:text-secondary"
            >
              Disponibilité_Créneaux_CLTO
              <ExternalLink size={16} className="shrink-0" />
            </a>
          </p>
        </div>

        {loadError && (
          <p className="mb-8 text-center text-red-600">{loadError}</p>
        )}

        {isLoading && (
          <p className="mb-8 text-center text-gray-600">Chargement des créneaux…</p>
        )}

        {!isLoading && !loadError && weeks.length === 0 && (
          <p className="mb-8 text-center text-gray-600">
            Aucun créneau disponible pour cette saison.
          </p>
        )}

        {selectedWeek && (
          <>
            <p className="mb-3 text-center text-sm md:text-base font-semibold tracking-wide text-gray-600">
              Planning indicatif – Saison 2026-2027
            </p>

            {/* Calendar Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-8"
            >
              <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-primary">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                  <div className="flex items-center gap-4">
                    <Calendar className="text-primary" size={40} />
                    <div>
                      <h2 className="font-primary text-3xl text-primary">
                        {formatMonthYear(selectedWeek.weekStart)}
                      </h2>
                      <p className="text-gray-600 text-lg">{selectedWeek.period}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={goToPreviousWeek}
                      disabled={selectedWeekIndex <= 0}
                      className={`p-3 bg-gray-100 hover:bg-primary hover:text-white rounded-lg transition-colors duration-200 disabled:opacity-40 disabled:hover:bg-gray-100 disabled:hover:text-inherit ${selectedWeekIndex <= 0 && "cursor-not-allowed"}`}
                    >
                      <ChevronLeft size={24} />
                    </button>

                    <input
                      type="date"
                      value={format(selectedDate, "yyyy-MM-dd")}
                      onChange={(e) => setSelectedDate(new Date(e.target.value))}
                      className="px-4 py-3 border-2 border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary text-lg"
                    />

                    <button
                      onClick={goToNextWeek}
                      disabled={selectedWeekIndex >= weeks.length - 1}
                      className={`p-3 bg-gray-100 hover:bg-primary hover:text-white rounded-lg transition-colors duration-200 disabled:opacity-40 disabled:hover:bg-gray-100 disabled:hover:text-inherit ${selectedWeekIndex >= weeks.length - 1 && "cursor-not-allowed"}`}
                    >
                      <ChevronRight size={24} />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Filters */}
            {!isExcelPlanningWeek && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.05 }}
                className="mb-8"
              >
                <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-gray-200">
                  <div className="flex items-center gap-3 mb-4">
                    <Filter className="text-primary" size={24} />
                    <h2 className="font-primary text-2xl text-primary">FILTRES</h2>
                    <button
                      onClick={resetFilters}
                      className="ml-auto flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors duration-200 text-sm"
                    >
                      <X size={16} />
                      Réinitialiser
                    </button>
                  </div>

                  <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-3">
                        Type d'entraînement
                      </label>
                      <div className="flex flex-wrap gap-3">
                        {CRENEAU_TYPES.map((type) => {
                          const active = selectedTypes.includes(type);
                          const color = getTypeColor(type);
                          return (
                            <button
                              key={type}
                              onClick={() => toggleType(type)}
                              className={`px-4 py-2 rounded-lg font-semibold transition-all duration-200 ${active
                                ? "text-white shadow-md scale-105"
                                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                                }`}
                              style={active ? { backgroundColor: color } : undefined}
                            >
                              <div className="flex items-center gap-2">
                                <div
                                  className="w-3 h-3 rounded-full"
                                  style={{
                                    backgroundColor: active ? "#fff" : color,
                                  }}
                                />
                                {type}
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-3">
                        Type de séance
                      </label>
                      <div className="flex flex-wrap gap-3">
                        <button
                          onClick={() => toggleSessionKind("Entraînement")}
                          className={`px-4 py-2 rounded-lg font-semibold transition-all duration-200 ${selectedSessionKinds.includes("Entraînement")
                            ? "ring-2 ring-primary text-primary shadow-md scale-105"
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
                            ? "ring-2 ring-green-600 text-green-600 shadow-md scale-105"
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

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-3">
                        Public
                      </label>
                      <div className="flex flex-wrap gap-3">
                        {CRENEAU_PUBLICS.map((pub) => {
                          const active = selectedPublics.includes(pub);
                          return (
                            <button
                              key={pub}
                              onClick={() => togglePublic(pub)}
                              className={`px-4 py-2 rounded-lg font-semibold transition-all duration-200 ${active
                                ? "bg-primary text-white shadow-md scale-105"
                                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                                }`}
                            >
                              <div className="flex items-center gap-2">
                                <Users size={16} />
                                {pub}
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-3">
                        Gymnase
                      </label>
                      <select
                        value={selectedGym}
                        onChange={(e) => setSelectedGym(e.target.value)}
                        className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary text-gray-700 bg-white"
                      >
                        <option value={ALL_GYMS}>{ALL_GYMS}</option>
                        {availableGyms.map((gym) => (
                          <option key={gym} value={gym}>
                            {gym}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <p className="text-sm text-gray-600">
                      {timeSlots.length} créneau
                      {timeSlots.length > 1 ? "x" : ""} affiché
                      {timeSlots.length > 1 ? "s" : ""}
                    </p>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Semaines Excel (10–30 août) : CTA vers le planning à jour */}
            {isExcelPlanningWeek ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.08 }}
                className="bg-white rounded-xl shadow-xl overflow-hidden border-2 border-gray-200"
              >
                <div className="flex flex-col items-center justify-center text-center px-6 py-16 md:py-24 min-h-70 md:min-h-90 bg-linear-to-b from-blue-50/80 to-white">
                  <Calendar className="text-primary mb-5" size={56} />
                  <p className="font-primary text-3xl md:text-5xl text-primary leading-tight">
                    Le planning d'août 2026 est à consulter sur Excel
                  </p>
                  <p className="mt-4 text-base md:text-lg text-gray-600 max-w-lg">
                    Les créneaux de cette semaine sont disponibles et actualisés
                    dans le fichier Excel du club.
                  </p>
                  <a
                    href={EXCEL_PLANNING_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-8 inline-flex items-center gap-2 rounded-lg bg-secondary px-6 py-3 text-base md:text-lg font-semibold text-white shadow-md transition-colors hover:bg-secondary-accent"
                  >
                    Consulter le planning d'août 2026 à jour
                    <ExternalLink size={20} className="shrink-0" />
                  </a>
                </div>
              </motion.div>
            ) : (
              <>
                {/* Mobile View */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.08 }}
                  className="md:hidden space-y-4"
                >
                  {WEEK_DAYS.map((day, dayIndex) => {
                    const dayDate = addDaysToWeekStart(weekStart, dayIndex);
                    const daySlotsData = timeSlots.filter((slot) => slot.day === day);
                    const isCurrentDay = isToday(dayDate);

                    return (
                      <div
                        key={day}
                        className="bg-white rounded-xl shadow-lg border-2 border-gray-200 overflow-hidden"
                      >
                        {daySlotsData.length === 0 ? (
                          <div
                            className={`px-4 py-3 flex items-center justify-between ${isCurrentDay ? "bg-secondary" : "bg-primary"
                              }`}
                          >
                            <div>
                              <p className="font-primary text-xl text-white leading-none">
                                {day}
                              </p>
                              <p className="text-sm text-white/70">
                                {format(dayDate, "dd MMMM yyyy", { locale: fr })}
                              </p>
                            </div>
                            <span className="text-xs font-semibold text-white/80 italic">
                              Aucun créneau ce jour
                            </span>
                          </div>
                        ) : (
                          <>
                            <button
                              className={`w-full flex items-center justify-between px-4 py-3 ${isCurrentDay ? "bg-secondary" : "bg-primary"
                                }`}
                              onClick={() => setOpenDay(openDay === day ? null : day)}
                            >
                              <div className="text-left">
                                <p className="font-primary text-xl text-white leading-none">
                                  {day}
                                </p>
                                <p className="text-sm text-blue-100">
                                  {format(dayDate, "dd MMMM yyyy", { locale: fr })}
                                </p>
                              </div>
                              <ChevronDown
                                size={20}
                                className={`text-white transition-transform duration-200 ${openDay === day ? "rotate-180" : ""
                                  }`}
                              />
                            </button>

                            <AnimatePresence>
                              {openDay === day && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: "auto", opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  transition={{ duration: 0.2 }}
                                  className="overflow-hidden"
                                >
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
                                          <div className="inline-flex items-center gap-1.5">
                                            {!slot.hasOuvreur && (
                                              <span
                                                className="inline-flex items-center justify-center rounded-full bg-red-600 p-1"
                                                title="Aucun ouvreur !"
                                              >
                                                <AlertTriangle size={12} className="text-white" />
                                              </span>
                                            )}
                                            <span
                                              className={`inline-block px-2 py-1 rounded-full text-xs font-semibold text-white ${getTypeBadgeClass(
                                                slot.primaryType,
                                              )}`}
                                            >
                                              {slot.primaryType}
                                            </span>
                                          </div>
                                        </div>
                                        <p className="mt-2 text-sm text-gray-800">{slot.nom}</p>
                                        <div className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-white px-2 py-1 text-xs font-semibold text-gray-700 border border-gray-200">
                                          {slot.sessionKind === "Jeu libre" ? (
                                            <>
                                              <Gamepad2
                                                size={13}
                                                className="text-[#16a34a]"
                                              />
                                              Jeu libre
                                            </>
                                          ) : (
                                            <>
                                              <Dumbbell
                                                size={13}
                                                className="text-primary"
                                              />
                                              Entraînement
                                            </>
                                          )}
                                        </div>
                                        <div className="mt-2 text-xs text-gray-600 space-y-1">
                                          <p>📍 {slot.gymFull}</p>
                                          {slot.hasOuvreur ? (
                                            <p>👤 {slot.leader}</p>
                                          ) : (
                                            <p className="flex items-center gap-1.5 font-bold text-red-600">
                                              <AlertTriangle size={14} className="shrink-0" />
                                              Aucun ouvreur !
                                            </p>
                                          )}
                                          {slot.publics.length > 0 && (
                                            <p>👥 {slot.publics.join(", ")}</p>
                                          )}
                                        </div>
                                        {slot.comment && (
                                          <p className="mt-2 text-xs text-yellow-800 bg-yellow-50 border-l-4 border-yellow-400 p-2 rounded">
                                            ⚠️ {slot.comment}
                                          </p>
                                        )}
                                      </div>
                                    ))}
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </>
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
                  <div className="grid grid-cols-[56px_repeat(7,minmax(0,1fr))] lg:grid-cols-[64px_repeat(7,minmax(0,1fr))] bg-primary border-b-2 border-gray-300">
                    <div className="px-1 py-4 border-r border-blue-400" />
                    {WEEK_DAYS.map((day, index) => {
                      const dayDate = addDaysToWeekStart(weekStart, index);
                      const isCurrentDay = isToday(dayDate);

                      return (
                        <div
                          key={day}
                          className={`px-2 py-4 text-center border-r border-blue-400 last:border-r-0 ${isCurrentDay ? "bg-secondary" : ""
                            }`}
                        >
                          <div className="font-primary text-xl lg:text-2xl text-white">
                            {day}
                          </div>
                          <div
                            className={`text-sm ${isCurrentDay ? "text-white font-bold" : "text-blue-100"
                              }`}
                          >
                            {format(dayDate, "dd MMM", { locale: fr })}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="relative">
                    <div className="grid grid-cols-[56px_repeat(7,minmax(0,1fr))] lg:grid-cols-[64px_repeat(7,minmax(0,1fr))]">
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

                      {WEEK_DAYS.map((day, dayIndex) => {
                        const dayDate = addDaysToWeekStart(weekStart, dayIndex);
                        const isCurrentDay = isToday(dayDate);
                        const daySlotsData = layoutDaySlots(
                          timeSlots.filter((slot) => slot.day === day),
                        );

                        return (
                          <div
                            key={day}
                            className={`relative border-r border-gray-200 last:border-r-0 ${isCurrentDay ? "bg-blue-50" : "bg-white"
                              }`}
                          >
                            {timeGrid.map((time) => (
                              <div
                                key={time}
                                className="h-20 border-b border-gray-200"
                              />
                            ))}

                            <div className="absolute inset-0 pointer-events-none">
                              {daySlotsData.map((slot) => {
                                const top = timeToPosition(slot.startTime);
                                const height = calculateHeight(
                                  slot.startTime,
                                  slot.endTime,
                                );
                                const bgColor = getTypeColor(slot.primaryType);
                                const slotKey = `${slot.id}-${slot.startTime}-${slot.gym}`;
                                const isSlotHovered = hoveredSlot === slotKey;
                                const baseHeight = Math.max(height - 4, 56);
                                const expandedHeight = Math.max(
                                  baseHeight,
                                  slot.comment ? 230 : 200,
                                );
                                const maxHeightWithinColumn = Math.max(
                                  baseHeight,
                                  dayColumnHeight - top - 4,
                                );
                                const visibleHeight = isSlotHovered
                                  ? Math.min(expandedHeight, maxHeightWithinColumn)
                                  : baseHeight;
                                const columnWidth = 100 / slot.columnCount;
                                const leftStyle = isSlotHovered
                                  ? "4px"
                                  : `calc(${slot.columnIndex * columnWidth}% + 2px)`;
                                const widthStyle = isSlotHovered
                                  ? "calc(100% - 8px)"
                                  : `calc(${columnWidth}% - 4px)`;

                                return (
                                  <motion.div
                                    key={slotKey}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.3 }}
                                    className="absolute rounded-lg shadow-md pointer-events-auto overflow-hidden transition-[height,left,width,z-index] duration-200"
                                    style={{
                                      top: `${top}px`,
                                      left: leftStyle,
                                      width: widthStyle,
                                      height: `${visibleHeight}px`,
                                      backgroundColor: bgColor,
                                      zIndex: isSlotHovered ? 40 : 1 + slot.columnIndex,
                                    }}
                                    onMouseEnter={() => setHoveredSlot(slotKey)}
                                    onMouseLeave={() => setHoveredSlot(null)}
                                  >
                                    <div className="p-2 h-full flex flex-col justify-between text-white relative">
                                      <div>
                                        <div className="flex items-start justify-between gap-1.5 mb-1">
                                          <div className="font-bold text-sm leading-tight min-w-0">
                                            <span className="whitespace-nowrap">
                                              {slot.startTime}
                                            </span>
                                            <span className="opacity-80"> – </span>
                                            <span className="whitespace-nowrap">
                                              {slot.endTime}
                                            </span>
                                          </div>
                                          <div className="inline-flex items-center gap-0.5 shrink-0 -mt-0.5">
                                            {!slot.hasOuvreur && (
                                              <div
                                                className="inline-flex items-center justify-center rounded-full bg-red-600 p-0.5 shadow-sm ring-1 ring-white/40"
                                                title="Aucun ouvreur !"
                                              >
                                                <AlertTriangle
                                                  size={10}
                                                  className="text-white"
                                                />
                                              </div>
                                            )}
                                            <div className="inline-flex items-center justify-center rounded-full bg-white/20 p-0.5">
                                              {slot.sessionKind === "Jeu libre" ? (
                                                <Gamepad2 size={10} />
                                              ) : (
                                                <Dumbbell size={10} />
                                              )}
                                            </div>
                                          </div>
                                        </div>
                                        <div className="text-xs font-semibold line-clamp-1">
                                          {slot.nom}
                                        </div>
                                        <div className="text-xs opacity-90 mt-1 line-clamp-1">
                                          {slot.gym}
                                        </div>
                                      </div>

                                      {isSlotHovered && (
                                        <motion.div
                                          initial={{ opacity: 0, y: 10 }}
                                          animate={{ opacity: 1, y: 0 }}
                                          className="absolute inset-0 bg-gray-900/95 p-3 z-10 flex flex-col gap-2 text-xs overflow-auto"
                                        >
                                          <div className="font-primary text-base text-secondary mb-1 flex items-start justify-between gap-2">
                                            <span className="min-w-0">{slot.nom}</span>
                                            <div className="inline-flex items-center gap-0.5 shrink-0">
                                              {!slot.hasOuvreur && (
                                                <div
                                                  className="inline-flex items-center justify-center rounded-full bg-red-600 p-0.5 ring-1 ring-white/40"
                                                  title="Aucun ouvreur !"
                                                >
                                                  <AlertTriangle
                                                    size={10}
                                                    className="text-white"
                                                  />
                                                </div>
                                              )}
                                              <div className="inline-flex items-center justify-center rounded-full bg-white/20 p-0.5">
                                                {slot.sessionKind === "Jeu libre" ? (
                                                  <Gamepad2 size={10} />
                                                ) : (
                                                  <Dumbbell size={10} />
                                                )}
                                              </div>
                                            </div>
                                          </div>
                                          <div className="flex items-center gap-2">
                                            <Clock size={14} />
                                            <span>
                                              {slot.startTime} - {slot.endTime}
                                            </span>
                                          </div>
                                          <div className="flex items-center gap-2">
                                            <MapPin size={14} />
                                            <span className="line-clamp-2">
                                              {slot.gymFull}
                                            </span>
                                          </div>
                                          {slot.hasOuvreur ? (
                                            <div className="flex items-center gap-2">
                                              <User size={16} />
                                              <span className="line-clamp-2">
                                                {slot.leader}
                                              </span>
                                            </div>
                                          ) : (
                                            <div className="flex items-center gap-2 font-bold text-red-500">
                                              <AlertTriangle size={16} className="shrink-0" />
                                              <span>Aucun ouvreur !</span>
                                            </div>
                                          )}
                                          {slot.types.length > 0 && (
                                            <div className="flex items-center gap-2">
                                              <Dumbbell size={16} />
                                              <span>{slot.types.join(" / ")}</span>
                                            </div>
                                          )}
                                          {slot.publics.length > 0 && (
                                            <div className="flex items-center gap-2">
                                              <Users size={16} />
                                              <span>{slot.publics.join(", ")}</span>
                                            </div>
                                          )}
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
              </>
            )}

            {/* Legend */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-8 bg-white rounded-xl p-6 shadow-lg border-2 border-gray-200"
            >
              <h2 className="font-primary text-2xl text-primary mb-6">LÉGENDE</h2>

              <div className="space-y-8">
                <div>
                  <h3 className="font-primary text-xl text-primary mb-4">
                    ENTRAÎNEMENTS
                  </h3>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {CRENEAU_TYPES.map((type, index) => (
                      <div key={type} className="flex items-center gap-3">
                        <div
                          className="w-6 h-6 rounded shrink-0"
                          style={{ backgroundColor: getTypeColor(type) }}
                        />
                        <div>
                          <div className="font-semibold text-gray-900">{type}</div>
                          <div className="text-sm text-gray-600">
                            {CRENEAU_HINT[index]}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-primary text-xl text-primary mb-4 flex items-center gap-3">
                    <span
                      className="inline-block w-6 h-6 rounded shrink-0"
                      style={{ backgroundColor: getTypeColor("Jeu libre") }}
                      aria-hidden
                    />
                    JEU LIBRE
                  </h3>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {CRENEAU_JEU_LIBRE_ITEMS.map(({ type, hint }) => (
                      <div key={type}>
                        <div className="font-semibold text-gray-900">{type}</div>
                        <div className="text-sm text-gray-600">{hint}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <p className="mt-6 text-sm text-gray-600 bg-blue-50 p-3 rounded-lg border-l-4 border-primary">
                💡 <strong>Astuce:</strong> Survolez un créneau pour voir plus de détails.
              </p>
              <p className="mt-3 text-sm text-red-700 bg-red-50 p-3 rounded-lg border-l-4 border-red-600 flex items-start gap-2">
                <AlertTriangle size={18} className="shrink-0 mt-0.5" />
                <span>
                  <strong>Aucun ouvreur !</strong> Le badge rouge indique qu’aucun
                  ouvreur n’est désigné. Le créneau risque d’être annulé si personne ne
                  se propose.
                </span>
              </p>
            </motion.div>
          </>
        )}
      </Section>
    </>
  );
}
