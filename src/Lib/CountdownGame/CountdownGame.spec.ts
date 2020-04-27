import assetsWords from '@/Assets/Words';
import { CountdownGame } from './CountdownGame';
import { CountdownGameState } from './CountdownGame.types';

let target: CountdownGame;
let onTimeout;
let onClock;
const words = ['banana'];

const build = () => {
  onTimeout = jest.fn();
  onClock = jest.fn();
  jest.useFakeTimers();

  target = new CountdownGame(onTimeout, onClock, words);
};

describe('#constructor', () => {
  it('set the default value with the words assets', () => {
    target = new CountdownGame(onTimeout, onClock);

    expect(target['words'].length).toEqual(assetsWords.length);
  });
})
describe('#start', () => {
  let result: Partial<CountdownGameState>;

  beforeEach(build);

  beforeEach(() => {
    result = target.start();
  });

  it('returns the random word', () => {
    expect(result.randomWord).toEqual('baannnann');
  });

  it('returns the correct word length', () => {
    expect(result.wordLength).toEqual(6);
  });

  it('triggers the onClock callback', () => {
    jest.advanceTimersByTime(1000);

    expect(onClock).toHaveBeenCalled();
  });

  it('triggers the onTimeout callback', () => {
    jest.advanceTimersByTime(61 * 1000);

    expect(onTimeout).toHaveBeenCalled();
  });
});

describe('#addLetter', () => {
  beforeEach(() => {
    build();
    target.start();
  });

  it('finishes the game when you try more than tree times', () => {
    target.addLetter({ position: 1, letter: 'c' });
    target.addLetter({ position: 1, letter: 'c' });
    target.addLetter({ position: 1, letter: 'c' });

    expect(onTimeout).toHaveBeenCalledWith({'answers':[{'correct':false,'position':1,'letter':'c'},{'correct':false,'position':1,'letter':'c'},{'correct':false,'position':1,'letter':'c'}],'word':'banana','randomWord':'baannnann','state':'too-many-tries'});
  });

  it('finishes with success when you choose the correct word', () => {
    words[0].split('').forEach((letter,  position) => {
      target.addLetter({ position, letter });
    });

    expect(onTimeout).toHaveBeenCalledWith({'answers':[{'correct':true,'position':0,'letter':'b'},{'correct':true,'position':1,'letter':'a'},{'correct':true,'position':2,'letter':'n'},{'correct':true,'position':3,'letter':'a'},{'correct':true,'position':4,'letter':'n'},{'correct':true,'position':5,'letter':'a' }],'word':'banana','randomWord':'baannnann','state':'success'});
  });

  it('returns the updated answers', () => {
    const result = target.addLetter({ position: 1, letter: 'c' });

    expect(result).toEqual([{'correct': false, 'letter': 'c', 'position': 1}]);
  });
});
