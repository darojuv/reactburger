import React from 'react';

import { configure, shallow } from 'enzyme';
import Adaptor from 'enzyme-adapter-react-16';

import { BurgerBuilder } from './BurgerBuilder';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

configure({adapter: new Adaptor()});

describe('BurgerBuilder_descript', () => {
    let wrapper = null;
    beforeEach(() => {        
         wrapper = shallow(<BurgerBuilder onInitIngredients={() => {}} ings={{salad:0}}/>);
    });

    it('Should show (BurgerBuilder should show).', () => {
        //wrapper.setProps({ings:{salad:0}});
        expect(wrapper.find(BuildControls)).toHaveLength(1);
    });
   
});