export interface CountdownWord {
  randomWord: string;
  wordLength: number;
}

export interface Answer {
  correct?: boolean;
  index: number;
  value: string;
}

export interface CountdownGameState {
  answers: Array<Answer>;
  randomWord: string;
  result?: MatchResult;
  word: string;
  wordLength?: number;
  wrongAnswersCount: number;
}

export type MatchResult = 'success' | 'too-many-tries' | 'timeout' | 'stoped';
export type GameOverCallback = (result: CountdownGameState) => void;
export type ClockTickCallback = () => void;
