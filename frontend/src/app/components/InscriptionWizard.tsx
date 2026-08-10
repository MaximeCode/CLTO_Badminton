import { useState } from 'react';
import { motion } from 'motion/react';
import {
    AlertCircle,
    AlertTriangle,
    ArrowLeft,
    ArrowRight,
    CheckCircle2,
    LoaderCircle,
    RotateCcw,
} from 'lucide-react';

import type { CaseKey, EtapeInscription } from '@/types/pageAdhererType';
import { BlocksRenderer } from './BlocksRenderer';

type NodeId =
    | 'q-deja-licence'
    | 'q-licence-2526'
    | 'q-licence-clto'
    | 'q-type-licence-a'
    | 'q-type-licence-b'
    | 'q-type-licence-c';

type ResultTarget = {
    type: 'result';
    caseKey: CaseKey;
};

type DecisionNode = {
    id: NodeId;
    question: string;
    answers: {
        id: string;
        label: string;
        next: NodeId | ResultTarget;
    }[];
};

type HistoryEntry = {
    nodeId: NodeId;
    question: string;
    answerLabel: string;
};

type InscriptionWizardProps = {
    casInscriptions: EtapeInscription[];
    isLoading: boolean;
    loadError: string | null;
};

const START_NODE_ID: NodeId = 'q-deja-licence';

const result = (caseKey: CaseKey): ResultTarget => ({ type: 'result', caseKey });

const DECISION_TREE: Record<NodeId, DecisionNode> = {
    'q-deja-licence': {
        id: 'q-deja-licence',
        question: 'Ai-je déjà eu une licence ?',
        answers: [
            { id: 'oui', label: 'Oui', next: 'q-licence-2526' },
            { id: 'non', label: 'Non', next: result('cas_0') },
        ],
    },
    'q-licence-2526': {
        id: 'q-licence-2526',
        question: 'Avais-je une licence pour la saison 2025-2026 ?',
        answers: [
            { id: 'oui', label: 'Oui', next: 'q-licence-clto' },
            { id: 'non', label: 'Non', next: 'q-type-licence-a' },
        ],
    },
    'q-licence-clto': {
        id: 'q-licence-clto',
        question: 'Ma licence 2025-2026 était-elle au CLTO ?',
        answers: [
            { id: 'oui', label: 'Oui', next: 'q-type-licence-b' },
            { id: 'non', label: 'Non', next: 'q-type-licence-c' },
        ],
    },
    'q-type-licence-a': {
        id: 'q-type-licence-a',
        question: 'Je souhaite une licence…',
        answers: [
            { id: 'principale', label: 'Principale', next: result('cas_1_1') },
            { id: 'exterieure', label: 'Extérieure', next: result('cas_1_2') },
        ],
    },
    'q-type-licence-b': {
        id: 'q-type-licence-b',
        question: 'Je souhaite une licence…',
        answers: [
            { id: 'principale', label: 'Principale', next: result('cas_2_1') },
            { id: 'exterieure', label: 'Extérieure', next: result('cas_2_2') },
        ],
    },
    'q-type-licence-c': {
        id: 'q-type-licence-c',
        question: 'Je souhaite une licence…',
        answers: [
            { id: 'principale', label: 'Principale', next: result('cas_3_1') },
            { id: 'exterieure', label: 'Extérieure', next: result('cas_3_2') },
        ],
    },
};

const CASE_LABELS: Record<CaseKey, string> = {
    cas_0: 'Cas 0',
    cas_1_1: 'Cas 1.1',
    cas_1_2: 'Cas 1.2',
    cas_2_1: 'Cas 2.1',
    cas_2_2: 'Cas 2.2',
    cas_3_1: 'Cas 3.1',
    cas_3_2: 'Cas 3.2',
};

function findCmsCase(
    casInscriptions: EtapeInscription[],
    caseKey: CaseKey,
): EtapeInscription | undefined {
    return casInscriptions.find(
        (item) => item.case_key === caseKey,
    );
}

export function InscriptionWizard({
    casInscriptions,
    isLoading,
    loadError,
}: InscriptionWizardProps) {
    const [currentNodeId, setCurrentNodeId] = useState<NodeId>(START_NODE_ID);
    const [resultCaseKey, setResultCaseKey] = useState<CaseKey | null>(null);
    const [history, setHistory] = useState<HistoryEntry[]>([]);

    const currentNode = DECISION_TREE[currentNodeId];
    const selectedCase = resultCaseKey
        ? findCmsCase(casInscriptions, resultCaseKey)
        : undefined;

    const handleAnswer = (answer: DecisionNode['answers'][number]) => {
        setHistory((currentHistory) => [
            ...currentHistory,
            {
                nodeId: currentNode.id,
                question: currentNode.question,
                answerLabel: answer.label,
            },
        ]);

        if (typeof answer.next === 'string') {
            setCurrentNodeId(answer.next);
            setResultCaseKey(null);
            return;
        }

        setResultCaseKey(answer.next.caseKey);
    };

    const handleBack = () => {
        const previousStep = history.at(-1);
        if (!previousStep) return;

        setHistory((currentHistory) => currentHistory.slice(0, -1));
        setCurrentNodeId(previousStep.nodeId);
        setResultCaseKey(null);
    };

    const handleRestart = () => {
        setCurrentNodeId(START_NODE_ID);
        setResultCaseKey(null);
        setHistory([]);
    };

    return (
        <div
            className="w-full md:w-5/6 mx-auto overflow-hidden rounded-2xl border border-primary/15 bg-white shadow-sm"
            aria-live="polite"
        >
            <div className="border-b border-primary/10 bg-primary/4 px-4 py-4 sm:px-6">

                <div className="flex flex-wrap items-center justify-between gap-3">
                    <p className="text-sm font-semibold text-primary-accent">
                        {resultCaseKey ? 'Parcours identifié' : `Question ${history.length + 1}`}
                    </p>

                    {(history.length > 0 || resultCaseKey) && (
                        <button
                            type="button"
                            onClick={handleRestart}
                            className="inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-primary transition-colors hover:bg-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2"
                        >
                            <RotateCcw size={16} aria-hidden="true" />
                            Recommencer
                        </button>
                    )}
                </div>
                <div className="w-full">
                    {history.length > 0 && (
                        <ol className="mt-4 grid grid-cols-[auto_minmax(0,1fr)_auto] gap-y-2 text-sm text-primary-accent">
                            {history.map((entry, index) => (
                                <li
                                    key={`${entry.nodeId}-${index}`}
                                    className="col-span-3 grid grid-cols-subgrid items-baseline gap-x-3 rounded-lg bg-white/70 px-3 py-2"
                                >
                                    <span className="font-semibold text-primary tabular-nums">
                                        {index + 1}.
                                    </span>
                                    <span className="min-w-0">{entry.question}</span>
                                    <span className="font-semibold text-secondary text-right whitespace-nowrap">
                                        {entry.answerLabel}
                                    </span>
                                </li>
                            ))}
                        </ol>
                    )}
                </div>
            </div>

            <motion.div
                key={resultCaseKey ?? currentNodeId}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className="p-4 sm:p-6 md:p-8"
            >
                {!resultCaseKey ? (
                    <div>
                        <h3 className="font-primary text-2xl leading-tight text-primary sm:text-3xl md:text-4xl">
                            {currentNode.question}
                        </h3>
                        <p className="mt-2 text-sm text-primary-accent sm:text-base">
                            Sélectionnez la réponse correspondant à votre situation.
                        </p>

                        <div className="w-full mx-auto mt-4 md:mt-6 grid gap-3 sm:grid-cols-2 sm:gap-4">
                            {currentNode.answers.map((answer) => (
                                <button
                                    key={answer.id}
                                    type="button"
                                    onClick={() => handleAnswer(answer)}
                                    className="group flex min-h-16 lg:min-h-24 w-full items-center justify-between gap-4 rounded-xl border border-primary/20 bg-white p-5 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-secondary hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2"
                                >
                                    <span className="font-primary text-lg md:text-xl lg:text-2xl text-primary transition-colors group-hover:text-secondary sm:text-3xl">
                                        {answer.label}
                                    </span>
                                    <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary transition-colors group-hover:bg-secondary group-hover:text-white">
                                        <ArrowRight size={20} aria-hidden="true" />
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>
                ) : isLoading ? (
                    <div className="flex min-h-44 flex-col items-center justify-center text-center">
                        <LoaderCircle className="mb-3 animate-spin text-primary" size={32} aria-hidden="true" />
                        <h3 className="font-primary text-3xl text-primary sm:text-4xl">
                            Chargement des instructions…
                        </h3>
                    </div>
                ) : loadError ? (
                    <div className="rounded-xl border border-red-200 bg-red-50 p-5 sm:p-6">
                        <div className="flex items-start gap-3">
                            <AlertCircle className="mt-1 shrink-0 text-red-600" size={22} aria-hidden="true" />
                            <div>
                                <h3 className="font-primary text-2xl text-red-700 sm:text-3xl">
                                    Impossible de charger les instructions
                                </h3>
                                <p className="mt-2 text-sm text-red-700 sm:text-base">{loadError}</p>
                            </div>
                        </div>
                    </div>
                ) : selectedCase ? (
                    <div>
                        <div className="mb-6 flex items-start gap-3">
                            <CheckCircle2 className="mt-1 shrink-0 text-secondary" size={28} aria-hidden="true" />
                            <div>
                                <p className="text-sm font-semibold uppercase tracking-wide text-secondary">
                                    Votre parcours d&apos;inscription
                                </p>
                                <h3 className="mt-1 font-primary text-2xl leading-tight text-primary sm:text-3xl md:text-4xl">
                                    {selectedCase.titre}
                                </h3>
                            </div>
                        </div>

                        <div className="[&_a]:text-secondary [&_li]:text-sm [&_li]:text-primary-accent [&_p]:mb-2 [&_p]:text-sm [&_p]:text-primary-accent sm:[&_li]:text-base sm:[&_p]:text-base">
                            <BlocksRenderer content={selectedCase.contenu} headingOffset={3} />
                        </div>
                    </div>
                ) : (
                    <div className="rounded-xl border border-amber-200 bg-amber-50 p-5 sm:p-6">
                        <div className="flex items-start gap-3">
                            <AlertTriangle className="mt-1 shrink-0 text-amber-700" size={22} aria-hidden="true" />
                            <div>
                                <h3 className="font-primary text-2xl text-amber-800 sm:text-3xl">
                                    Instructions indisponibles pour le {CASE_LABELS[resultCaseKey]}
                                </h3>
                                <p className="mt-2 text-sm text-amber-800 sm:text-base">
                                    Ce cas n&apos;est pas encore configuré dans Strapi. Vous pouvez recommencer le questionnaire ou contacter le club pour obtenir les instructions adaptées.
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                {history.length > 0 && (
                    <div className="mt-6 border-t border-primary/10 pt-4">
                        <button
                            type="button"
                            onClick={handleBack}
                            className="inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-primary transition-colors hover:bg-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2"
                        >
                            <ArrowLeft size={16} aria-hidden="true" />
                            Retour
                        </button>
                    </div>
                )}
            </motion.div>
        </div>
    );
}
