import React from 'react';

import { configure, shallow } from 'enzyme';
import Adaptor from 'enzyme-adapter-react-16';

import NavigationItems from './NavigationItems';
import NavigationItem from './NavigationItem/NavigatoinItem';

configure({adapter: new Adaptor()});

describe('NavigationItems_descript', () => {
    let wrapper = null;
    beforeEach(() => {        
         wrapper = shallow(<NavigationItems />);
    });
    it('Should show (NavigationItems should show) two elements if not authenticate.', () => {
        expect(wrapper.find(NavigationItem)).toHaveLength(2);
    });

    it('Should show (NavigationItems should show) three elements if authenticate.', () => {
        //wrapper = shallow(<NavigationItems isAuthenticated />);
        wrapper.setProps({isAuthenticated: true});
        
        expect(wrapper.find(NavigationItem)).toHaveLength(3);
    });  

    it('Should show (NavigationItems should show) three elements if authenticate.', () => {
        wrapper.setProps({isAuthenticated: true});        
        expect(wrapper.contains(<NavigationItem  link="/logout" >Logout</NavigationItem>)).toEqual(true);
    });    
});