import { mount, shallow } from 'enzyme';
import React from 'react';
import { Countdown } from './Countdown';

let wrapper;
describe('Context: Rendering', () => {
  it('renders without crashing', () => {
    expect(shallow(<Countdown />)).toMatchSnapshot();
  });
});

describe('Context: Functional', () => {
  let game;

  beforeEach(() => {
    wrapper = mount(<Countdown />);
    game = wrapper.instance().game;
  });

  it('starts the game on start Click', () => {
    const spy = jest.spyOn(game, 'start');
    wrapper.find('button.start').invoke('onClick')();

    expect(spy).toHaveBeenCalledTimes(1);
  });

  xit('stops the game on stop click', () => {
    const spy = jest.spyOn(game, 'stop');
    wrapper.find('button.stop').invoke('onClick')();

    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('updates the destination on selection', () => {
    const spy = jest.spyOn(game, 'addLetter');

    wrapper.find('button.start').invoke('onClick')();
    wrapper.find('.origin').invoke('onSelect')(0);
    wrapper.find('.destination').invoke('onSelect')(0)

    expect(spy).toHaveBeenCalled();
  });
});
