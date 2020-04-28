import React from 'react';
import { DragDirection, Letter } from '../Countdown.types';

export interface WordPanelProps {
  className?: string;
  dragDirection: DragDirection;
  letters: Array<Letter>;
  onSelect?: (index: number) => void;
}

export function WordPanel(props: WordPanelProps) {
  const { letters } = props;

  const renderedLetters = letters.map((letter, index) =>
    <span
      key={index}
      onClick={() => props.onSelect(index)}
      className={letterClassName(letter)}>
        {letter.value}
      </span>
  );

  return (
    <div>{renderedLetters}</div>
  );
}

function letterClassName(letter: Letter) {
  let className = 'letter ';

  if(letter?.correct !== undefined) {
    className += letter.correct ? 'success' : 'error';
  }

  if(letter?.selected){
    className += ' selected'
  }

  return className;
}
