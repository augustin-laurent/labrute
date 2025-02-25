import { PetName } from '@labrute/prisma';
import { PETS_TOTAL_ODDS } from './brute/pets';
import { SKILLS_TOTAL_ODDS } from './brute/skills';
import { WEAPONS_TOTAL_ODDS, WeaponAnimations } from './brute/weapons';

export const FIGHTS_PER_DAY = 6;

export const ARENA_OPPONENTS_COUNT = 6;
export const ARENA_OPPONENTS_MAX_GAP = 2;

export const BRUTE_STARTING_POINTS = 11;
export const PERKS_TOTAL_ODDS = WEAPONS_TOTAL_ODDS + PETS_TOTAL_ODDS + SKILLS_TOTAL_ODDS;

export const SHIELD_BLOCK_ODDS = 0.45;

export const Animations = [
  'arrive', 'attack', 'block', 'death', 'drink', 'eat',
  'equip', 'evade', 'grab', 'grabbed', 'hit', 'hit-0', 'hit-1', 'hit-2',
  'idle', 'launch', 'monk', 'prepare-throw', 'run',
  'stolen', 'steal', 'strengthen', 'throw', 'train', 'train2', 'trapped',
  'trash', 'win', ...WeaponAnimations,
] as const;
export type Animation = typeof Animations[number];

export const BruteRankings = [11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0] as const;
export type BruteRanking = typeof BruteRankings[number];

export const GLOBAL_TOURNAMENT_START_HOUR = 8;

export interface Perk {
  name: 'pet' | 'skill' | 'weapon';
  odds: number;
}

export const PERK_ODDS: Perk[] = [
  { name: 'pet', odds: PETS_TOTAL_ODDS },
  { name: 'skill', odds: SKILLS_TOTAL_ODDS },
  { name: 'weapon', odds: WEAPONS_TOTAL_ODDS },
];

export const NEW_BRUTE_BASE_COST = 500;

export const FIGHTER_HEIGHT = {
  brute: 80,
  [PetName.bear]: 130,
  [PetName.panther]: 60,
  dog: 40,
} as const;
export const FIGHTER_WIDTH = {
  brute: 50,
  [PetName.bear]: 120,
  [PetName.panther]: 90,
  dog: 60,
} as const;

export const FIGHTER_HIT_ANCHOR = {
  brute: { x: 5, y: 40 },
  [PetName.bear]: { x: 60, y: 100 },
  [PetName.panther]: { x: 45, y: 45 },
  dog: { x: 30, y: 30 },
} as const;

export const MAX_FAVORITE_BRUTES = 3;

export const BASE_FIGHTER_STATS = {
  reversal: 0,
  evasion: 0.1,
  swiftness: 0.2,
  block: -0.25,
  accuracy: 0,
  disarm: 0.05,
  combo: 0,
  tempo: 1.2,
} as const;

export type FighterStat = keyof typeof BASE_FIGHTER_STATS;

export const BARE_HANDS_DAMAGE = 5;

export const RESET_PRICE = 100;