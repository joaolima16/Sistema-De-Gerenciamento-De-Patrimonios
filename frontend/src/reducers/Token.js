export default function Token(state={value:''}, action){
    switch(action.type){
        case 'ADD_TOKEN':
            return {value:action.data};
        case 'REMOVE_TOKEN':
            return {value:''};
        default:
            return state;
    }
}