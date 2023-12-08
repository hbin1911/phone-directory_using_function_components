import React, { Component, useState } from 'react';
import Header from './Header';
import './AddSubscriber.css';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';

export default function AddSubscriber({addSubscriberHandler}){

    const [addSubscriberForm, setAddSubscriberForm] = useState({
        id: 0,
        name: '',
        phone: ''
    })

    const history = useHistory();

    const inputChangedHandler = (e) => {
        const state = addSubscriberForm;
        state[e.target.name] = e.target.value;

        setAddSubscriberForm({...state})
    }

    const onFormSubmitted = (e) => {
        e.preventDefault();
        addSubscriberHandler(addSubscriberForm);
            setAddSubscriberForm({ id: 0, name: '', phone: ' ' });
        history.push("/");
    }

    const {name, phone} = addSubscriberForm;

    return (
        <div>
            <Header heading="Add Subscriber" />
            <div className="component-body-container">
                <Link to="/">
                    <button className="custom-btn">Back</button>
                </Link>

                <ValidatorForm className="subscriber-form" onSubmit={onFormSubmitted}>
                    <TextValidator id="name" type="text" className="input-control" label="Enter Name" value={name} name="name" onChange={inputChangedHandler}
                    validators={['required']} errorMessages={['Name cannot be empty!']}></TextValidator>

                    {/* <label htmlFor="name" className="label-control">Name: </label><br />
                    <input id="name" type="text" className="input-control" name="name" onChange={inputChangedHandler} /> */}
                    
                    
                    <br /><br />


                    <TextValidator id="phone" type="text" className="input-control" label="Enter Phone Number" value={phone} name="phone" onChange={inputChangedHandler}
                    validators={['required']} errorMessages={['Phone Number cannot be empty!']}>

                    </TextValidator>

                    {/* <label htmlFor="phone" className="label-control">Phone: </label><br />
                    <input id="phone" type="text" className="input-control" name="phone" onChange={inputChangedHandler} /> */}
                    
                    
                    <br /><br />

                    <div className="subscriber-info-container">
                        <span className="subscriber-to-add-heading">Subscriber to be added: </span><br />
                        <span className="subscriber-info">Name: {name}</span><br />
                        <span className="subscriber-info">Phone: {phone}</span><br />
                        <span className="subscriber-info">test: {phone}</span><br />
                    </div>

                    <button type="submit" className="custom-btn add-btn">Add</button>
                </ValidatorForm>
            </div>
        </div>
    )
}


