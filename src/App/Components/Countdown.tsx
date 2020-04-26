import { CountdownGame } from '@/Lib/CountdownGame/CountdownGame';
import { CountdownGameState } from '@/Lib/CountdownGame/CountdownGame.types';
import React, { Component } from 'react';
import { CountdownState } from './Countdown.types';
import { Clock } from './Views/Clock';
import { WordPanel } from './Views/WordPanel';

const InitialState = (): CountdownState => ({
  clockSeconds: 0,
  randomWord: [],
  wordLength: 0,
  answers: [],
});

export class Countdown extends Component<{}, CountdownState> {
  private game: CountdownGame;
  private set ClockSeconds(clockSeconds: number) { this.setState({ clockSeconds }); }
  private get ClockSeconds(): number { return this.state.clockSeconds; }

  constructor(props) {
    super(props);

    this.game = new CountdownGame(this.onGameOver, this.onClockTick);
    this.state = InitialState();
  }

  onStartClick = () => {
    const gameState = this.game.start();

    const newState = InitialState();
    newState.randomWord = gameState.randomWord.split('')
      .map((item) => ({ value: item }));

    newState.wordLength = gameState.wordLength;

    this.setState(newState);
  };

  onStopClick = () => {
    this.ClockSeconds = 0;
    this.game.stop();
  };

  onGameOver = (gameState: CountdownGameState) => {
    let message;

    switch (gameState.result) {
      case 'success':
        message = 'Congratulations, you win!';
        break;
      case 'timeout':
        message = 'Game over, you will need to be hurry on the next time';
        break;
      case 'too-many-tries':
        message = 'Game over, you reach the error limit, try again';
        break;
    }

    this.setState({
      answers: gameState.answers,
      matchResult: gameState.result,
      message
    });
  };

  onClockTick = () => {
    this.ClockSeconds += 1;
  }

  onOriginSelected = (index: number) => {
    const { randomWord } = this.state;
    const updated = [...randomWord];

    const item = updated[index];
    if(item.selected) {
      return;
    }

    item.selected = true;

    this.setState({ selected: item, randomWord });
  }

  onDestinationSelected = (index: number) => {
    const { selected } = this.state;
    if(!selected) { return; }

    const answers = this.game.addLetter({ value: selected.value, index });

    this.setState({ answers, selected });
  }

  private get CurrentAnswer() {
    const { wordLength, answers } = this.state;

    const currentAnswer = [];
    for(let i = 0 ; i < wordLength; i++) {
      const answer = answers?.find((item) => item.index === i);

      currentAnswer.push(answer || { value: '' });
    }

    return currentAnswer;
  }

  render() {
    const { randomWord, message } = this.state;

    return (
      <div className="countdown-container">
        <Clock seconds={this.ClockSeconds} />
        <span>
          <h3>Create the word by dragging letters into empty boxes</h3>
          <h5>You have one minute</h5>
        </span>
        <WordPanel className="origin" letters={randomWord} dragDirection="from" onSelect={this.onOriginSelected} />
        <WordPanel className="destination" letters={this.CurrentAnswer} dragDirection="to" onSelect={this.onDestinationSelected}/>

        <h5>{message}</h5>
        <div>
          <button className='start' onClick={this.onStartClick}>Start</button>
          <button className='stop' onClick={this.onStopClick}>Stop</button>
        </div>
      </div>
    );
  }
}
