import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Trophy, TrendingUp, TrendingDown, Minus, Medal } from 'lucide-react';

interface TeamRanking {
    position: number;
    team: string;
    played: number;
    won: number;
    lost: number;
    points: number;
    trend?: 'up' | 'down' | 'stable';
}

interface CompetitionData {
    name: string;
    level: string;
    color: string;
    rankings: TeamRanking[];
}

const competitions: CompetitionData[] = [
    {
        name: 'N2',
        level: 'Nationale 2',
        color: '#0153b6',
        rankings: [
            { position: 1, team: 'BC Talence', played: 6, won: 6, lost: 0, points: 18, trend: 'stable' },
            { position: 2, team: 'Bordeaux Etudiants Club', played: 6, won: 5, lost: 1, points: 15, trend: 'up' },
            { position: 3, team: 'CLTO Badminton', played: 6, won: 4, lost: 2, points: 12, trend: 'up' },
            { position: 4, team: 'Stade Bordelais', played: 6, won: 3, lost: 3, points: 9, trend: 'down' },
            { position: 5, team: 'AS Bègles', played: 6, won: 2, lost: 4, points: 6, trend: 'stable' },
        ],
    },
    {
        name: 'N3',
        level: 'Nationale 3',
        color: '#0a69d1',
        rankings: [
            { position: 1, team: 'AS Mérignac', played: 5, won: 5, lost: 0, points: 15, trend: 'stable' },
            { position: 2, team: 'Bordeaux BC', played: 5, won: 4, lost: 1, points: 12, trend: 'up' },
            { position: 3, team: 'CLTO Badminton', played: 5, won: 3, lost: 2, points: 9, trend: 'stable' },
            { position: 4, team: 'Villenave Bad', played: 5, won: 2, lost: 3, points: 6, trend: 'down' },
            { position: 5, team: 'Cenon BC', played: 5, won: 1, lost: 4, points: 3, trend: 'down' },
        ],
    },
    {
        name: 'R2',
        level: 'Régionale 2',
        color: '#da9619',
        rankings: [
            { position: 1, team: 'CLTO Badminton', played: 7, won: 6, lost: 1, points: 18, trend: 'up' },
            { position: 2, team: 'Floirac BC', played: 7, won: 5, lost: 2, points: 15, trend: 'stable' },
            { position: 3, team: 'Bègles Sports', played: 7, won: 5, lost: 2, points: 15, trend: 'up' },
            { position: 4, team: 'Caudéran BC', played: 7, won: 3, lost: 4, points: 9, trend: 'down' },
            { position: 5, team: 'Lormont Bad', played: 7, won: 2, lost: 5, points: 6, trend: 'stable' },
        ],
    },
    {
        name: 'D1A',
        level: 'Départementale 1 - A',
        color: '#16a34a',
        rankings: [
            { position: 1, team: 'CLTO Badminton A', played: 6, won: 5, lost: 1, points: 15, trend: 'up' },
            { position: 2, team: 'Artigues BC', played: 6, won: 4, lost: 2, points: 12, trend: 'stable' },
            { position: 3, team: 'Carbon Blanc', played: 6, won: 4, lost: 2, points: 12, trend: 'down' },
            { position: 4, team: 'Saint-Médard BC', played: 6, won: 3, lost: 3, points: 9, trend: 'up' },
            { position: 5, team: 'Ambarès Bad', played: 6, won: 1, lost: 5, points: 3, trend: 'down' },
        ],
    },
    {
        name: 'D1B',
        level: 'Départementale 1 - B',
        color: '#7c3aed',
        rankings: [
            { position: 1, team: 'Pessac BC 2', played: 6, won: 5, lost: 1, points: 15, trend: 'stable' },
            { position: 2, team: 'CLTO Badminton B', played: 6, won: 4, lost: 2, points: 12, trend: 'up' },
            { position: 3, team: 'Eysines BC', played: 6, won: 4, lost: 2, points: 12, trend: 'stable' },
            { position: 4, team: 'Le Bouscat Bad', played: 6, won: 3, lost: 3, points: 9, trend: 'down' },
            { position: 5, team: 'Blanquefort BC', played: 6, won: 2, lost: 4, points: 6, trend: 'stable' },
        ],
    },
];

export function InterclubRankings() {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const selected = competitions[selectedIndex];

    const getTrendIcon = (trend?: 'up' | 'down' | 'stable') => {
        if (trend === 'up') return <TrendingUp size={18} className="text-green-600" />;
        if (trend === 'down') return <TrendingDown size={18} className="text-red-600" />;
        return <Minus size={18} className="text-gray-400" />;
    };

    return (
        <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
            <div className="max-w-[1280px] mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <h2 className="font-['Bebas_Neue'] text-5xl md:text-6xl text-[#0153b6] mb-4">
                        CLASSEMENTS INTERCLUB
                    </h2>
                    <p className="text-gray-600 text-lg mb-8">
                        Nos équipes en compétition cette saison
                    </p>

                    {/* Competition Selector - Interactive Badges */}
                    <div className="flex flex-wrap justify-center gap-3 mb-8">
                        {competitions.map((comp, index) => (
                            <motion.button
                                key={comp.name}
                                onClick={() => setSelectedIndex(index)}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className={`relative px-6 py-3 rounded-xl font-['Bebas_Neue'] text-xl transition-all duration-300 ${selectedIndex === index
                                    ? 'text-white shadow-xl scale-105'
                                    : 'bg-white text-gray-700 shadow-md hover:shadow-lg'
                                    }`}
                                style={{
                                    backgroundColor: selectedIndex === index ? comp.color : undefined,
                                }}
                            >
                                <span className="relative z-10">{comp.name}</span>
                                {selectedIndex === index && (
                                    <motion.div
                                        layoutId="activeTab"
                                        className="absolute inset-0 rounded-xl"
                                        style={{ backgroundColor: comp.color }}
                                        initial={false}
                                        transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                                    />
                                )}
                            </motion.button>
                        ))}
                    </div>

                    {/* Competition Level Title */}
                    <motion.h3
                        key={selected.level}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="font-['Bebas_Neue'] text-2xl md:text-3xl mb-8"
                        style={{ color: selected.color }}
                    >
                        {selected.level}
                    </motion.h3>
                </motion.div>

                {/* Rankings Cards */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={selectedIndex}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                        className="grid gap-4 max-w-4xl mx-auto"
                    >
                        {selected.rankings.map((ranking, index) => {
                            const isCLTO = ranking.team.includes('CLTO');
                            const isPodium = ranking.position <= 3;

                            return (
                                <motion.div
                                    key={`${selectedIndex}-${ranking.position}`}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.4, delay: index * 0.05 }}
                                    className={`relative rounded-2xl p-6 shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${isCLTO
                                        ? 'bg-gradient-to-r from-blue-50 to-blue-100 border-2 border-[#0153b6]'
                                        : 'bg-white border-2 border-gray-200'
                                        }`}
                                >
                                    {/* Podium Ribbon for top 3 */}
                                    {isPodium && (
                                        <div
                                            className="absolute -top-3 -right-3 w-12 h-12 rounded-full flex items-center justify-center shadow-lg"
                                            style={{
                                                backgroundColor:
                                                    ranking.position === 1
                                                        ? '#FFD700'
                                                        : ranking.position === 2
                                                            ? '#C0C0C0'
                                                            : '#CD7F32',
                                            }}
                                        >
                                            <Medal className="text-white" size={24} />
                                        </div>
                                    )}

                                    <div className="flex items-center gap-6">
                                        {/* Position Badge */}
                                        <div
                                            className="flex-shrink-0 w-16 h-16 rounded-xl flex items-center justify-center font-['Bebas_Neue'] text-3xl text-white shadow-md"
                                            style={{ backgroundColor: selected.color }}
                                        >
                                            {ranking.position}
                                        </div>

                                        {/* Team Name */}
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2 mb-1">
                                                {isCLTO && <Trophy className="text-[#0153b6]" size={20} />}
                                                <h4 className="font-bold text-lg md:text-xl text-gray-900 truncate">
                                                    {ranking.team}
                                                </h4>
                                            </div>
                                            <div className="flex items-center gap-4 text-sm text-gray-600">
                                                <span>
                                                    <strong className="text-gray-900">{ranking.played}</strong> matchs
                                                </span>
                                                <span className="text-green-600">
                                                    <strong>{ranking.won}</strong> V
                                                </span>
                                                <span className="text-red-600">
                                                    <strong>{ranking.lost}</strong> D
                                                </span>
                                            </div>
                                        </div>

                                        {/* Stats */}
                                        <div className="flex items-center gap-6">
                                            {/* Trend */}
                                            <div className="flex-shrink-0">{getTrendIcon(ranking.trend)}</div>

                                            {/* Points */}
                                            <div className="flex-shrink-0 text-center">
                                                <div
                                                    className="font-['Bebas_Neue'] text-4xl leading-none"
                                                    style={{ color: selected.color }}
                                                >
                                                    {ranking.points}
                                                </div>
                                                <div className="text-xs text-gray-500 uppercase">points</div>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </motion.div>
                </AnimatePresence>

                {/* Legend */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                    className="mt-8 flex flex-wrap justify-center gap-6 text-sm text-gray-600"
                >
                    <div className="flex items-center gap-2">
                        <TrendingUp size={16} className="text-green-600" />
                        <span>Progression</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <TrendingDown size={16} className="text-red-600" />
                        <span>Régression</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Minus size={16} className="text-gray-400" />
                        <span>Stable</span>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
