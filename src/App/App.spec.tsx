import { mount, shallow } from 'enzyme';
import React from 'react';
import App from './App';
import { Countdown } from './Components/Countdown';

describe('Context: Rendering', () => {
  it('render without crashing', () => {
    expect(shallow(<App />)).toMatchSnapshot();
  });
});


describe('Context: Functional', () => {
  it('renders the Countdown component', () => {
    const wrapper = mount(<App />);

    expect(wrapper.exists(Countdown)).toBeTruthy();
  });
});
