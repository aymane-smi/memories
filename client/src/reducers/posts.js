export default (state = [], action)=>{
    switch(action.type){
        case 'FETCH_URL':
            return action.payload.response;
        case 'CREATE':
            return [...state, action.payload];
        case 'UPDATE':
            return state.map((post)=> post._id === action.payload._id ? action.payload : post);
        case 'DELETE':
            return state.filter((post)=> post._id !== action.payload);
        case 'ADD_LIKE':
            return state.map((post) => post._id === action.payload._id ? action.payload : post);
        default:
            return state;
    }
}