import React, {Component, Fragment, useCallback, useEffect, useMemo, useReducer, useState} from 'react';
import AddSubscriber from './AddSubscriber';
import ShowSubscribers from './ShowSubscribers';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { SubscriberCountContext } from './SubscriberCountContext';
import Footer from './Footer';
import TotalSubscribersReducer from './TotalSubscribersReducer';
import { useDispatch } from 'react-redux';

export default function PhoneDirectory(){

            const [subscribersList,setSubscribersList] = useState([]);
            const [state, dispatchToTotalSubscriberReducer] = useReducer(TotalSubscribersReducer, {count:0})
            const dispatch = useDispatch();

            async function loadData(){
                const rawResponse = await fetch("http://localhost:7081/contacts");
                const data = await rawResponse.json();
                dispatchToTotalSubscriberReducer({"type": "UPDATE_COUNT", payload: data.length})
                dispatch({"type": "SET_SUBSCRIBERS", payload: data})
                setSubscribersList(data)

                // const results =  fetch("http://localhost:7081/contacts")
                // .then (response=>response.json())
                // .then (data=>setSubscribersList(data))
             }

            useEffect(()=>{
                loadData()
                
            })

        const deleteSubscriberHandler = useCallback(async(subscriberId)=>{
            const rawResponse = await fetch("http://localhost:7081/contacts/" + subscriberId, {method: "DELETE"});
            const data = await rawResponse.json();
            loadData();
        }, [subscribersList])

        // const numberOfSubscriptions = useMemo(()=>{
        //     return subscribersList.length;
        // },[subscribersList])


    // async function deleteSubscriberHandler (subscriberId)  {
    //     // const newSubscribers = subscribersList.filter((subscriber)=>subscriber.id !== subscriberId);
    //     // setSubscribersList(newSubscribers)

    //     // fetch("http://localhost:7081/contacts/" + subscriberId, {method: "DELETE"})
    //     //     .then(input=>input.json())
    //     //     .then(data=>{
    //     //         loadData();
    //     //     })

        

    // }   

    async function addSubscriberHandler  (newSubscriber) {

        const rawResponse = await fetch("http://localhost:7081/contacts",
        {
            method:"POST",
            headers:{'Content-Type': 'application/json'},
            body : JSON.stringify(newSubscriber)
        })

        const data = await rawResponse.json();
        loadData();

        // if (subscribersList.length > 0) {
        //     newSubscriber.id = subscribersList[subscribersList.length - 1].id + 1;
        // } else {
        //     newSubscriber.id = 1;
        // }
        // subscribersList.push(newSubscriber);
        // setSubscribersList(subscribersList)
        //this.setState({ subscribersList: subscribersList });
    }


    return (
        <Fragment>
            <Router>
                <div>
                    <Route exact path="/" render={(props) => <ShowSubscribers {...props} subscribersList={subscribersList} deleteSubscriberHandler={(subscriberId)=>deleteSubscriberHandler(subscriberId)} />} />
                    <Route exact path="/add" render={({history}, props) => <AddSubscriber {...props} addSubscriberHandler={(newSubscriber)=>addSubscriberHandler(newSubscriber)} />} />
                </div>
            </Router>
            <SubscriberCountContext.Provider value={state.count}>
            <Footer></Footer>
            </SubscriberCountContext.Provider>
        </Fragment>
    )

}
