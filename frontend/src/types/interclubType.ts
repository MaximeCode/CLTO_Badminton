import type { Divisions } from "@/types/divisionsType";

export type InterclubTeamRanking = {
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
};

export type InterclubTeamSummary = {
  teamSlug: string;
  teamLabel: string;
  divisions_interclub: Divisions | null;
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
  ranking: InterclubTeamRanking[] | null;
  icbadUrl: string;
  image: { url: string } | null;
  desc: string | null;
  objectif: string | null;
};
