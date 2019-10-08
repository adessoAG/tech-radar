import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react'; 
import { unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import { shallow, mount, render } from 'enzyme';

import MSDataService from '../src/components/dataservices/MSDataService';
import msJSON from '../src/components/microsoft-radar.json';

let container = null;

configure({ adapter: new Adapter() });

beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
});

afterEach(() => {
    unmountComponentAtNode(container);
    container.remove();
    container = null;
});

describe('Unit test: MSDataService', () => {
    it('check all states', () => {
        const wrapper = shallow(<MSDataService />);

        expect(wrapper.state('data')).toEqual(msJSON);
        expect(wrapper.state('innerRingDistance')).toEqual(100);
        expect(wrapper.state('innerRingWidth')).toEqual(200);
        expect(wrapper.state('middleRingDistance')).toEqual(158.33333333333334);
        expect(wrapper.state('middleRingWidth')).toEqual(83.33333333333333);
        expect(wrapper.state('outerRingDistance')).toEqual(225);
        expect(wrapper.state('outerRingWidth')).toEqual(50);

        expect(wrapper.state('blips').length).toBeGreaterThan(0);
    });
    it('check all blips, whether they overlap', () => {
        const wrapper = shallow(<MSDataService />);
        function checkOverlapping() {
            const blips = wrapper.state('blips');
            for (let i = 0; i < blips.length; i++) {
                let currentBlip = blips[i];
                let j = i+1;
                for (j; j < blips.length; j++) {
                    const nextBlip = blips[j];
                    if (currentBlip.x === nextBlip.x && 
                            currentBlip.y === nextBlip.y) {
                        return false;
                    }
                }
            }
            return true;
        }
        expect(checkOverlapping()).toBe(true);
    });
});