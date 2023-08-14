import React from 'react'

export default function TotalSubscribersReducer(state, action) {
  
    switch(action.type){
        case "UPDATE_COUNT":
            const updatedCount = action.payload;
            return {...state, count:updatedCount};

        default:
            return state;
    }
}
