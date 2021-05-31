import React from 'react'
import{ configure, shallow } from 'enzyme'
import Adapter from  'enzyme-adapter-react-16'

import NavigationItems from './NavigationItems'
import NavigationItem from './NavigationItem/NavigationItem'

configure({adapter : new Adapter})
describe('<NavigationItems />', () =>{
    it('should render 2 <NavigationItem /> elements if not authenticated' , () =>{
        //test logic goes here
        const wrapper = shallow(<NavigationItems />);
        expect(wrapper.find(NavigationItem)).toHaveLength(2)
    })
    it('should render 3 <NavigationItem /> elements if authenticated' , () =>{
        //test logic goes here
        const wrapper = shallow(<NavigationItems isAuthenticated/>);
        expect(wrapper.find(NavigationItem)).toHaveLength(2)
    })
}) //available in create react app, accepts 2 arguments, 
