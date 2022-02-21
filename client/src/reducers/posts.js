export default (state = [], action)=>{
    switch(action.type){
        case 'FETCH_URL':
            return action.payload.response;
        case 'CREATE':
            return [...state, action.payload];
        default:
            return state;
    }
}