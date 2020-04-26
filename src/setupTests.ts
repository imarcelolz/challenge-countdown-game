import '@testing-library/jest-dom/extend-expect';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

jest.spyOn(global.Math, 'random').mockReturnValue(0.5);

configure({ adapter: new Adapter() });
