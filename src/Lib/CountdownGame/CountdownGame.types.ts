export interface CountdownWord {
  randomWord: string;
  wordLength: number;
}

export interface Answer {
  correct?: boolean;
  letter: string;
  position: number;
}

export interface CountdownGameState {
  answers: Array<Answer>;
  randomWord: string;
  word: string;
  wordLength?: number;
  state?: MatchState;
}

export type MatchState = 'success' | 'too-many-tries' | 'timeout' | 'stoped';
export type GameOverCallback = (result: CountdownGameState) => void;
export type ClockTickCallback = () => void;
