import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme, {mount} from 'enzyme';
import AddSubscriber from '../AddSubscriber';
import { useLocationDetail } from '../customhook';
/*
@jest-environment jsdom
*/

import { Router } from 'react-router-dom/cjs/react-router-dom';
import { TextValidator } from 'react-material-ui-form-validator';

Enzyme.configure({adapter: new  Adapter})

jest.mock("../customhook",()=>({
    useLocationDetail:()=>{
        return{"city":"mock-city", "region":"mock-region", "country_name":"mock_country"}
    }
}))

test(" AddSubscriber Component should render two TextValidator", ()=>{
    const history = createMemoryHistory();

    const container = mount(<Router history={history}>
        <AddSubscriber></AddSubscriber>
    </Router>)

    console.log(container.html())
    const actualValue = container.find(TextValidator).length
    const expectedValue = 2;
    expect(actualValue).toBe(expectedValue)
})