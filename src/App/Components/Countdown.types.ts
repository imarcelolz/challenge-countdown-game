import { Answer } from '@/Lib/CountdownGame';
import { MatchResult } from '@/Lib/CountdownGame/CountdownGame.types';

export interface CountdownState {
  answers: Array<Answer>;
  clockSeconds: number;
  message?: string;
  randomWord: Array<Letter>;
  selected?: Letter;
  wordLength: number;
  matchResult?: MatchResult;
}

export interface Letter {
  value: string;
  correct?: boolean;
  selected?: boolean;
}

export type DragDirection = 'from' | 'to';
