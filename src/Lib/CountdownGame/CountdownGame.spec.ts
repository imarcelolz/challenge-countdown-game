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
    target.addLetter({ index: 1, value: 'c' });
    target.addLetter({ index: 1, value: 'c' });
    target.addLetter({ index: 1, value: 'c' });

    expect(onTimeout).toHaveBeenCalledWith({'answers':[{'correct':false,'index':1,'value':'c'},{'correct':false,'index':1,'value':'c'},{'correct':false,'index':1,'value':'c'}],'word':'banana','wrongAnswersCount': 3, 'randomWord':'baannnann','result':'too-many-tries'});
  });

  it('finishes with success when you choose the correct word', () => {
    words[0].split('').forEach((value,  index) => {
      target.addLetter({ index, value });
    });

    expect(onTimeout).toHaveBeenCalledWith({'answers':[{'correct':true,'index':0,'value':'b'},{'correct':true,'index':1,'value':'a'},{'correct':true,'index':2,'value':'n'},{'correct':true,'index':3,'value':'a'},{'correct':true,'index':4,'value':'n'},{'correct':true,'index':5,'value':'a' }], 'word' :'banana', 'wrongAnswersCount': 0, 'randomWord':'baannnann','result':'success'});
  });

  it('returns the updated answers', () => {
    const result = target.addLetter({ index: 1, value: 'c' });

    expect(result).toEqual([{'correct': false, 'value': 'c', 'index': 1}]);
  });
});
