import assetsWords from '@/Assets/Words';
import { Answer, ClockTickCallback, CountdownGameState, GameOverCallback, MatchState } from './CountdownGame.types';
import { randomChars } from './randomChars';
import { shuffle } from './shuffle';

export class CountdownGame {
  private readonly interval = 60 * 1000;
  private timeoutTick = null;
  private clockTick = null;
  private state: CountdownGameState;

  constructor(
    private onGameOver: GameOverCallback,
    private onClockTick: ClockTickCallback,
    private words: string[] = assetsWords
  ) {}

  start = (): Pick<CountdownGameState, 'randomWord' | 'wordLength'> => {
    this.stop();
    this.state = this.initialState();

    const { randomWord, word } = this.state;

    this.timeoutTick = setTimeout(this.finishError, this.interval);
    this.clockTick = setInterval(this.onClockTick, 1000);

    return { randomWord, wordLength: word.length };
  }

  stop = () => {
    clearTimeout(this.timeoutTick);
    clearInterval(this.clockTick);
  }

  addLetter = (answer: Answer): Array<Answer> => {
    const { letter, position } = answer;
    const { answers, word } = this.state;

    answers.push({
      correct: word[position] === letter,
      position,
      letter
    });

    if(answers.filter((answer) => !answer.correct).length >= 3) {
      this.finishError('too-many-tries');

      return;
    }

    if(this.isWinner()) {
      this.finishSuccess();
    }

    return answers;
  }

  private finishError = (matchState: MatchState = 'timeout') => {
    this.stop();
    this.state.state = matchState;

    this.onGameOver(this.state);
  }

  private finishSuccess = () => {
    this.stop();
    this.state.state = 'success';

    this.onGameOver(this.state);
  }

  private isWinner = (): boolean => {
    const { answers, word } = this.state;

    const response = answers
      .sort((a, b) => a.position - b.position)
      .map(answer => answer.letter)
      .join('');

    return response === word
  }

  private initialState = (): CountdownGameState => {
    const word = this.pickWord();
    const missingChars = randomChars(9 - word.length);
    const randomWord = shuffle(word + missingChars);

    return { answers: [], word, randomWord };
  }

  private pickWord() {
    const index = Math.floor(Math.random() * this.words.length);

    return this.words[index];
  }
}
