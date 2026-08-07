'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
    Trophy,
    TrendingUp,
    TrendingDown,
    Minus,
    Medal,
    Loader2,
    AlertCircle,
    ChevronDown,
    ChevronUp,
} from 'lucide-react';
import { getInterclubTeams } from '@/api/icbad_local/interclub';
import type { InterclubTeamRanking, InterclubTeamSummary } from '@/types/interclubType';
import {
    getDivisionAccentColor,
    getDivisionLabel,
    sortTeamsByDivision,
} from '@/utils/interclubUtils';
import { HomePageSectionTitle } from './homePage_SectionTitle';
import { Section } from './Section';
import { Button } from './Button';
import { stringifyDate } from '@/utils/formatDate';

// ─── Constantes ───────────────────────────────────────────────────────────────

const PEEK_HEIGHT_PX = 28;

const isCltoTeam = (team: InterclubTeamRanking) =>
    team.isClto || team.teamCode?.toUpperCase().includes('CLTO');

/** Opacité plus faible (= plus transparent) quand l'équipe est loin de CLTO */
const peekOpacity = (distance: number) => Math.max(0.15, 1 - distance * 0.2);

// ─── Composant principal ──────────────────────────────────────────────────────

export function InterclubRankings() {
    const [teams, setTeams] = useState<InterclubTeamSummary[]>([]);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [expanded, setExpanded] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchData() {
            try {
                setLoading(true);
                const data: InterclubTeamSummary[] = await getInterclubTeams();
                setTeams(sortTeamsByDivision(data));
            } catch (err) {
                setError('Impossible de charger les classements. Veuillez réessayer.');
                console.error('[InterclubRankings] Erreur fetch:', err);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, []);

    // Replier la pile quand on change d'équipe CLTO
    useEffect(() => {
        setExpanded(false);
    }, [selectedIndex]);

    if (loading) {
        return (
            <Section className="bg-linear-to-b from-gray-50 to-white">
                <div className="flex flex-col items-center justify-center min-h-64">
                    <Loader2 size={40} className="text-primary animate-spin mb-4" />
                    <p className="text-gray-500 font-medium">Chargement des classements…</p>
                </div>
            </Section>
        );
    }

    if (error || teams.length === 0) {
        return (
            <Section className="bg-linear-to-b from-gray-50 to-white">
                <div className="flex flex-col items-center justify-center min-h-64">
                    <AlertCircle size={40} className="text-red-500 mb-4" />
                    <p className="text-gray-600">{error ?? 'Aucune donnée disponible.'}</p>
                </div>
            </Section>
        );
    }

    const selected = teams[selectedIndex];
    const divisionLabel = getDivisionLabel(selected.divisions_interclub);
    const accentColor = getDivisionAccentColor(selected.divisions_interclub?.Nom_court);
    const ranking = selected.ranking ?? [];
    const cltoIndex = ranking.findIndex(isCltoTeam);
    const cltoPosition =
        cltoIndex >= 0 ? ranking[cltoIndex].position : (selected.cltoPosition ?? null);

    return (
        <Section className="bg-linear-to-b from-gray-50 to-white">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="mb-4 md:mb-8"
            >
                <HomePageSectionTitle
                    title="CLASSEMENTS INTERCLUB"
                    subtitle={`Nos équipes en compétition | Saison ${selected.season} | Phase de poule`}
                />

                <div className="flex flex-wrap justify-center gap-3 mb-8">
                    {teams.map((team, index) => {
                        const shortLabel = team.divisions_interclub?.Nom_court ?? team.teamLabel;
                        const color = getDivisionAccentColor(team.divisions_interclub?.Nom_court);
                        const isActive = selectedIndex === index;
                        return (
                            <motion.button
                                key={team.teamSlug}
                                onClick={() => setSelectedIndex(index)}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className={`relative px-4 md:px-6 py-2 md:py-3 rounded-xl font-primary text-xl transition-all duration-300 ${isActive
                                    ? 'text-white shadow-xl scale-105'
                                    : 'bg-white text-gray-700 shadow-md hover:shadow-lg'
                                    }`}
                                style={{
                                    backgroundColor: isActive ? color : undefined,
                                }}
                            >
                                <span className="relative z-10">{shortLabel}</span>
                                {isActive && (
                                    <motion.div
                                        layoutId="activeTab"
                                        className="absolute inset-0 rounded-xl"
                                        style={{ backgroundColor: color }}
                                        initial={false}
                                        transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                                    />
                                )}
                            </motion.button>
                        );
                    })}
                </div>

                <motion.h3
                    key={selected.teamSlug}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="font-primary text-2xl md:text-3xl mb-2 text-center"
                    style={{ color: accentColor }}
                >
                    {divisionLabel} - {selected.competitionName}
                </motion.h3>

                <div className="text-center mt-2">
                    <button
                        type="button"
                        onClick={() => setExpanded((prev) => !prev)}
                        className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-2 focus-visible:outline-offset-2"
                        style={{ outlineColor: accentColor }}
                        aria-expanded={expanded}
                    >
                        {expanded ? (
                            <>
                                <ChevronUp size={14} style={{ color: accentColor }} />
                                Réduire le classement complet
                            </>
                        ) : (
                            <>
                                <ChevronDown size={14} style={{ color: accentColor }} />
                                Afficher le classement complet
                            </>
                        )}
                    </button>
                </div>
            </motion.div>

            <AnimatePresence mode="wait">
                <motion.div
                    key={`${selected.teamSlug}-${expanded ? 'open' : 'peek'}`}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.28 }}
                    className={`max-w-${expanded ? '6xl' : '3xl'} mx-auto`}
                >
                    {ranking.length > 0 ? (
                        expanded ? (
                            // Grille 
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                {ranking.map((team) => (
                                    <RankingCard
                                        key={`${team.teamCode}-${team.position}`}
                                        team={team}
                                        accentColor={accentColor}
                                        isClto={isCltoTeam(team)}
                                        onCltoClick={() => setExpanded(false)}
                                        expanded={expanded}
                                    />
                                ))}
                            </div>
                        ) : (
                            <div className="flex flex-col items-stretch">
                                {ranking.map((team, index) => {
                                    const isCLTO = isCltoTeam(team);
                                    const distance =
                                        cltoPosition != null
                                            ? Math.abs(team.position - cltoPosition)
                                            : Math.abs(index - Math.max(cltoIndex, 0));
                                    const isAbove = cltoIndex >= 0 && index < cltoIndex;
                                    const isBelow = cltoIndex >= 0 && index > cltoIndex;

                                    if (isCLTO) {
                                        return (
                                            <motion.div
                                                key={`${team.teamCode}-${team.position}`}
                                                layout
                                                className="relative z-20"
                                            >
                                                <RankingCard
                                                    team={team}
                                                    accentColor={accentColor}
                                                    isClto
                                                    onCltoClick={() => setExpanded(true)}
                                                    expanded={expanded}
                                                />
                                            </motion.div>
                                        );
                                    }

                                    const opacity = peekOpacity(distance);

                                    return (
                                        <div
                                            key={`${team.teamCode}-${team.position}`}
                                            aria-hidden
                                            className={`relative z-10 pointer-events-none overflow-hidden rounded-2xl ${isAbove ? '-mb-1' : isBelow ? '-mt-1' : ''
                                                }`}
                                            style={{
                                                height: PEEK_HEIGHT_PX,
                                                opacity,
                                            }}
                                        >
                                            {/* Contenu réel clipé : bord haut (équipes devant) ou bas (équipes derrière) */}
                                            <div
                                                className="absolute left-0 right-0"
                                                style={
                                                    isAbove
                                                        ? { top: 0 }
                                                        : { bottom: 0 }
                                                }
                                            >
                                                <RankingCard
                                                    team={team}
                                                    accentColor={accentColor}
                                                    isClto={false}
                                                    expanded={expanded}
                                                />
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )
                    ) : (
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

                <div className="text-center mt-4">
                    <p className="text-xs text-gray-400">
                        Données issues de icbad.ffbad.org ·{' '}
                        {selected.lastScrapedAt
                            ? `mis à jour le ${stringifyDate(selected.lastScrapedAt, '2-digit', 'long', 'numeric')}`
                            : 'données non disponibles'}
                    </p>
                </div>
            </motion.div>

            <Button text="Accéder à la page Interclubs" to="/interclub" />
        </Section>
    );
}

// ─── Carte d'équipe ───────────────────────────────────────────────────────────

function RankingCard({
    team,
    accentColor,
    isClto,
    onCltoClick,
    expanded,
}: {
    team: InterclubTeamRanking;
    accentColor: string;
    isClto: boolean;
    onCltoClick?: () => void;
    expanded?: boolean;
}) {
    const interactive = isClto && !!onCltoClick;

    return (
        <div
            role={interactive ? 'button' : undefined}
            tabIndex={interactive ? 0 : undefined}
            onClick={interactive ? onCltoClick : undefined}
            onKeyDown={
                interactive
                    ? (e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            onCltoClick?.();
                        }
                    }
                    : undefined
            }
            className={`rounded-2xl p-4 shadow-xl border-2 bg-white ${interactive ? 'cursor-pointer transition-shadow hover:shadow-2xl' : ''
                }`}
            style={{
                borderColor: isClto ? accentColor : '#e5e7eb',
                background: isClto ? `${accentColor}0f` : undefined,
            }}
        >
            {(expanded || isClto) && (
                <div className="flex items-center gap-4">
                    <div
                        className="shrink-0 w-14 h-14 rounded-lg flex flex-col items-center justify-center shadow-md text-white"
                        style={{ backgroundColor: accentColor }}
                    >
                        <span className="font-primary text-2xl md:text-3xl leading-none">
                            {team.position}
                        </span>
                        <span className="text-[10px] opacity-80 uppercase">place</span>
                    </div>

                    <div className="flex-1 min-w-0 flex flex-col gap-1">
                        <div className="flex items-center gap-2">
                            {team.position === 1 && <Trophy style={{ color: accentColor }} size={20} />}
                            {team.position === 2 && <Medal style={{ color: '#9ca3af' }} size={20} />}
                            {team.position === 3 && <Medal style={{ color: '#d97706' }} size={20} />}
                            <h4 className="text-lg md:text-xl xl:text-2xl text-gray-900 truncate">{team.teamName}</h4>
                        </div>

                        <div className="flex justify-between items-center gap-4">
                            <div
                                className={`flex ${expanded ? 'flex-col gap-2' : 'flex-col md:flex-row gap-4 md:gap-10'} justify-between min-w-0 mx-2 md:mx-5`}
                            >
                                <div className="flex items-center gap-3 text-sm text-gray-600">
                                    <span>
                                        <strong className="text-gray-900">{team.played}</strong> joués
                                    </span>
                                    <span className="text-green-600 font-semibold">{team.won}V</span>
                                    {(team.draw ?? 0) > 0 && (
                                        <span className="text-yellow-600 font-semibold">{team.draw}N</span>
                                    )}
                                    <span className="text-red-500 font-semibold">{team.lost}D</span>
                                </div>

                                <div className="flex items-center gap-2 md:gap-4 text-sm">
                                    <StatPill label="Bonus +" value={team.bonusPlus} color="#16a34a" />
                                    <StatPill label="Bonus −" value={team.bonusMinus} color="#dc2626" />
                                    <StatPill label="Diff. M" value={team.matchDiff} showTrend />
                                </div>
                            </div>


                            <div className="shrink-0 md:hidden text-center">
                                <div
                                    className="font-primary text-4xl md:text-5xl leading-none"
                                    style={{ color: accentColor }}
                                >
                                    {team.points}
                                </div>
                                <div className="text-xs text-gray-500 uppercase tracking-wide">Pts</div>
                            </div>
                        </div>
                    </div>

                    <div className="shrink-0 hidden md:block text-center">
                        <div
                            className="font-primary text-4xl md:text-5xl leading-none"
                            style={{ color: accentColor }}
                        >
                            {team.points}
                        </div>
                        <div className="text-xs text-gray-500 uppercase tracking-wide">Pts</div>
                    </div>
                </div>
            )}
        </div>
    );
}

// ─── Sous-composant pill de stat ──────────────────────────────────────────────

function StatPill({
    label,
    value,
    color,
    showSign,
    showTrend,
}: {
    label: string;
    value: number | null;
    color?: string;
    showSign?: boolean;
    showTrend?: boolean;
}) {
    if (value === null) return null;

    const isPositive = value > 0;
    const isNeutral = value === 0;
    const resolvedColor = showTrend
        ? isPositive
            ? '#16a34a'
            : isNeutral
                ? '#9ca3af'
                : '#dc2626'
        : (color ?? '#374151');
    const Icon = showTrend
        ? isPositive
            ? TrendingUp
            : isNeutral
                ? Minus
                : TrendingDown
        : null;
    const display =
        (showSign || showTrend) && isPositive ? `+${value}` : String(value);

    return (
        <div className="shrink-0 text-center md:flex md:justify-center items-center gap-2">
            <div
                className="flex items-center justify-center gap-0.5 font-primary text-base md:text-xl leading-none"
                style={{ color: resolvedColor }}
            >
                {Icon && <Icon size={16} strokeWidth={2.5} />}
                <span>{display}</span>
            </div>
            <div className="text-[11px] md:text-xs text-gray-500 uppercase tracking-wide">{label}</div>
        </div>
    );
}
