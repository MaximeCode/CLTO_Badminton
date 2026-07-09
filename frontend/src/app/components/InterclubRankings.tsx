'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Trophy, TrendingUp, TrendingDown, Minus, Medal, Loader2, AlertCircle } from 'lucide-react';
import { getInterclubTeams } from '@/api/icbad_local/interclub';
import { HomePageSectionTitle } from './homePage_SectionTitle';

// ─── Types ────────────────────────────────────────────────────────────────────

interface InterclubTeamRanking {
    position: number;
    teamName: string;
    teamCode: string;
    logoUrl: string | null;
    rowClass: string;
    played: number;
    won: number;
    draw: number;
    lost: number;
    forfeit: number;
    bonusPlus: number;
    bonusMinus: number;
    points: number;
    matchDiff: number;
    setDiff: number;
    ptsDiff: number;
    isClto: boolean;
}

interface InterclubTeamSummary {
    teamSlug: string;
    teamLabel: string;
    division: string;
    competitionName: string;
    season: string;
    cltoPosition: number | null;
    cltoPoints: number | null;
    cltoPlayed: number | null;
    cltoWon: number | null;
    cltoDraw: number | null;
    cltoLost: number | null;
    cltoBonusPlus: number | null;
    cltoBonusMinus: number | null;
    cltoMatchDiff: number | null;
    cltoSetDiff: number | null;
    cltoPtsDiff: number | null;
    lastScrapedAt: string | null;
    scrapeError: string | null;
    ranking: InterclubTeamRanking[];
}

// ─── Constantes ───────────────────────────────────────────────────────────────

// Ordre d'affichage souhaité + couleur par division
const DIVISION_CONFIG: Record<string, { label: string; color: string; order: number }> = {
    'N2': { label: 'Nationale 2', color: '#dc2626', order: 1 },
    'N3': { label: 'Nationale 3', color: '#dc2626', order: 2 },
    'R2': { label: 'Régionale 2', color: '#0153b6', order: 3 },
    'D1-A': { label: 'Départementale 1 - A', color: '#16a34a', order: 4 },
    'D1-B': { label: 'Départementale 1 - B', color: '#16a34a', order: 5 },
    'D2-A': { label: 'Départementale 2 - A', color: '#16a34a', order: 6 },
    'D2-B': { label: 'Départementale 2 - B', color: '#16a34a', order: 7 },
    'D3': { label: 'Départementale 3', color: '#16a34a', order: 8 },
};

const getDivisionConfig = (division: string) =>
    DIVISION_CONFIG[division] ?? { label: division, color: '#0153b6', order: 99 };

// ─── Composant principal ──────────────────────────────────────────────────────

export function InterclubRankings() {
    const [teams, setTeams] = useState<InterclubTeamSummary[]>([]);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchData() {
            try {
                setLoading(true);
                const data: InterclubTeamSummary[] = await getInterclubTeams();

                // Trier selon l'ordre défini dans DIVISION_CONFIG
                const sorted = [...data].sort((a, b) => {
                    const orderA = getDivisionConfig(a.division).order;
                    const orderB = getDivisionConfig(b.division).order;
                    return orderA - orderB;
                });

                setTeams(sorted);
            } catch (err) {
                setError('Impossible de charger les classements. Veuillez réessayer.');
                console.error('[InterclubRankings] Erreur fetch:', err);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, []);

    // ── État chargement ─────────────────────────────────────────────────────
    if (loading) {
        return (
            <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
                <div className="max-w-[1280px] mx-auto px-6 flex flex-col items-center justify-center min-h-64">
                    <Loader2 size={40} className="text-[#0153b6] animate-spin mb-4" />
                    <p className="text-gray-500 font-medium">Chargement des classements…</p>
                </div>
            </section>
        );
    }

    // ── État erreur ─────────────────────────────────────────────────────────
    if (error || teams.length === 0) {
        return (
            <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
                <div className="max-w-[1280px] mx-auto px-6 flex flex-col items-center justify-center min-h-64">
                    <AlertCircle size={40} className="text-red-500 mb-4" />
                    <p className="text-gray-600">{error ?? 'Aucune donnée disponible.'}</p>
                </div>
            </section>
        );
    }

    const selected = teams[selectedIndex];
    const divConfig = getDivisionConfig(selected.division);
    const accentColor = divConfig.color;

    return (
        <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
            <div className="max-w-[1280px] mx-auto px-6">

                {/* ── En-tête ────────────────────────────────────────────── */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mb-12"
                >
                    <HomePageSectionTitle
                        title="CLASSEMENTS INTERCLUB"
                        subtitle={`Nos équipes en compétition | ${selected.season}`}
                    />

                    {/* ── Sélecteur d'équipe ──────────────────────────────── */}
                    <div className="flex flex-wrap justify-center gap-3 mb-8">
                        {teams.map((team, index) => {
                            const cfg = getDivisionConfig(team.division);
                            const isActive = selectedIndex === index;
                            return (
                                <motion.button
                                    key={team.teamSlug}
                                    onClick={() => setSelectedIndex(index)}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className={`relative px-6 py-3 rounded-xl font-['Bebas_Neue'] text-xl transition-all duration-300 ${isActive
                                        ? 'text-white shadow-xl scale-105'
                                        : 'bg-white text-gray-700 shadow-md hover:shadow-lg'
                                        }`}
                                    style={{
                                        backgroundColor: isActive ? cfg.color : undefined,
                                    }}
                                >
                                    <span className="relative z-10">{team.division}</span>
                                    {isActive && (
                                        <motion.div
                                            layoutId="activeTab"
                                            className="absolute inset-0 rounded-xl"
                                            style={{ backgroundColor: cfg.color }}
                                            initial={false}
                                            transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                                        />
                                    )}
                                </motion.button>
                            );
                        })}
                    </div>

                    {/* ── Titre de la division ────────────────────────────── */}
                    <motion.h3
                        key={selected.division}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="font-['Bebas_Neue'] text-2xl md:text-3xl mb-2 text-center"
                        style={{ color: accentColor }}
                    >
                        {divConfig.label} - {selected.competitionName}
                    </motion.h3>
                </motion.div>

                {/* ── Carte des équipes ───────────────────────────────── */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={selected.teamSlug}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                        className="max-w-4xl mx-auto"
                    >
                        {selected.ranking.length > 0 ?
                            selected.ranking.map((team, index) => {
                                const isCLTO = team.teamCode?.toUpperCase().includes("CLTO");
                                return (
                                    <div
                                        key={index}
                                        className="rounded-2xl p-4 mb-6 shadow-xl border-2"
                                        style={{ borderColor: isCLTO ? accentColor : '', background: isCLTO ? `${accentColor}0f` : '' }}
                                    >
                                        {/* Single row on md+, two rows on mobile */}
                                        <div className="flex items-center gap-4">

                                            {/* Position */}
                                            <div
                                                className="flex-shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-xl flex flex-col items-center justify-center shadow-md text-white"
                                                style={{ backgroundColor: accentColor }}
                                            >
                                                <span className="font-['Bebas_Neue'] text-3xl md:text-4xl leading-none">
                                                    {team.position}
                                                </span>
                                                <span className="text-xs opacity-80 uppercase">place</span>
                                            </div>

                                            {/* Right side: stacks on mobile, single row on md+ */}
                                            <div className="flex-1 min-w-0 flex flex-col md:flex-row md:items-center md:gap-6">

                                                {/* Nom + résultats */}
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-center gap-2 mb-1">
                                                        {team.position === 1 && <Trophy style={{ color: accentColor }} size={20} />}
                                                        {team.position === 2 && <Medal style={{ color: '#9ca3af' }} size={20} />}
                                                        {team.position === 3 && <Medal style={{ color: '#d97706' }} size={20} />}
                                                        <h4 className="text-lg md:text-2xl text-gray-900 truncate">
                                                            {team.teamName}
                                                        </h4>
                                                    </div>
                                                    <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600">
                                                        <span>
                                                            <strong className="text-gray-900">{team.played}</strong> joués
                                                        </span>
                                                        <span className="text-green-600 font-semibold">{team.won}V</span>
                                                        {(team.draw ?? 0) > 0 && (
                                                            <span className="text-yellow-600 font-semibold">{team.draw}N</span>
                                                        )}
                                                        <span className="text-red-500 font-semibold">{team.lost}D</span>
                                                    </div>
                                                </div>

                                                {/* Stats détaillées */}
                                                <div className="flex items-center gap-4 md:gap-6 mt-3 md:mt-0">
                                                    <StatPill label="Bonus +" value={team.bonusPlus} color="#16a34a" />
                                                    <StatPill label="Bonus −" value={team.bonusMinus} color="#dc2626" />
                                                    <DiffPill value={team.matchDiff} />
                                                    <div className="flex-shrink-0 text-center">
                                                        <div
                                                            className="font-['Bebas_Neue'] text-4xl md:text-5xl leading-none"
                                                            style={{ color: accentColor }}
                                                        >
                                                            {team.points}
                                                        </div>
                                                        <div className="text-xs text-gray-500 uppercase tracking-wide">Pts</div>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                )
                            }
                            ) : (
                                // Pas de données CLTO pour cette équipe
                                <div className="rounded-2xl p-10 bg-white border-2 border-gray-200 shadow text-center">
                                    <AlertCircle size={32} className="text-gray-300 mx-auto mb-3" />
                                    <p className="text-gray-500">
                                        {selected.scrapeError
                                            ? `Erreur de scraping : ${selected.scrapeError}`
                                            : 'Aucune donnée disponible pour cette équipe.'}
                                    </p>
                                </div>
                            )}
                    </motion.div>
                </AnimatePresence>

                {/* ── Légende ───────────────────────────────────────────── */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                    className="mt-10 text-sm text-gray-500"
                >
                    <div className="flex flex-wrap justify-center gap-6">
                        <div className="flex items-center gap-2">
                            <span className="w-3 h-3 rounded-full bg-green-600 inline-block" />
                            <span>V = Victoire</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="w-3 h-3 rounded-full bg-yellow-500 inline-block" />
                            <span>N = Nul</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="w-3 h-3 rounded-full bg-red-500 inline-block" />
                            <span>D = Défaite</span>
                        </div>
                    </div>

                    {/* Lien IcBAD */}
                    <div className="text-center mt-4">
                        <p className="text-xs text-gray-400">
                            Données issues de icbad.ffbad.org ·{' '}
                            {selected.lastScrapedAt
                                ? `mis à jour le ${new Date(selected.lastScrapedAt).toLocaleDateString('fr-FR', {
                                    day: '2-digit', month: 'long', year: 'numeric',
                                })}`
                                : 'données non disponibles'}
                        </p>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

// ─── Sous-composants pills de stat ────────────────────────────────────────────

function DiffPill({ value }: { value: number | null }) {
    if (value === null) return null;
    const isPositive = value > 0;
    const isNeutral = value === 0;
    const color = isPositive ? '#16a34a' : isNeutral ? '#9ca3af' : '#dc2626';
    const Icon = isPositive ? TrendingUp : isNeutral ? Minus : TrendingDown;
    const display = isPositive ? `+${value}` : String(value);
    return (
        <div className="flex-shrink-0 text-center">
            <div className="flex items-center justify-center gap-0.5 font-['Bebas_Neue'] text-2xl leading-none" style={{ color }}>
                <Icon size={16} strokeWidth={2.5} />
                <span>{display}</span>
            </div>
            <div className="text-xs text-gray-500 uppercase tracking-wide">Diff. M</div>
        </div>
    );
}

function StatPill({
    label,
    value,
    color,
    showSign,
}: {
    label: string;
    value: number | null;
    color?: string;
    showSign?: boolean;
}) {
    if (value === null) return null;
    const display = showSign && value > 0 ? `+${value}` : String(value);
    return (
        <div className="flex-shrink-0 text-center">
            <div
                className="font-['Bebas_Neue'] text-2xl leading-none"
                style={{ color: color ?? '#374151' }}
            >
                {display}
            </div>
            <div className="text-xs text-gray-500 uppercase tracking-wide">{label}</div>
        </div>
    );
}
