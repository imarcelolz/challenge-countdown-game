export interface CountdownWord {
  randomWord: string;
  wordLength: number;
}

export interface Answer {
  correct: boolean;
  letter: string;
  position: number;
}

export interface CountdownState {
  answers: Array<Answer>;
  randomWord: string;
  word: string;
  wordLength?: number;
  state?: MatchState;
}

export type MatchState = 'success' | 'too-many-tries' | 'timeout' | 'stoped';
export type GameOverCallback = (result: CountdownState) => void;
export type ClockTickCallback = () => void;
