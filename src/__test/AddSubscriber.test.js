import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme, {mount} from 'enzyme';
import AddSubscriber from '../AddSubscriber';
/*
@jest-environment jsdom
*/

import { Router } from 'react-router-dom/cjs/react-router-dom';
import { TextValidator } from 'react-material-ui-form-validator';

Enzyme.configure({adapter: new  Adapter})
test(" AddSubscriber Component should render two TextValidator", ()=>{
    const history = createMemoryHistory();

    const container = mount(<Router history={history}>
        <AddSubscriber></AddSubscriber>
    </Router>)

    const actualValue = container.find(TextValidator).length
    const expectedValue = 2;
    expect(actualValue).toBe(expectedValue)
})