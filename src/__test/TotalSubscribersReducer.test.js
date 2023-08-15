
test("Testing TotalSubscribersReducer", ()=>{
    const action = {"type":"UPDATE_COUNT", "payload":23}
    const actualResult = TotalSubscribersReducer({}, action)
    const expectedResult = {"count":23};
    expectedResult(actualResult).toEqual(expectedResult);
})