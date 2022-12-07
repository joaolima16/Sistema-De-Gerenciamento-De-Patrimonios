export default function NavData(state={value:''}, action){
    switch(action.type){
        case 'ADD_NAV_DATA':
            return {value:action.data};
        case 'REMOVE_NAV_DATA':
            return {value:''};
        default:
            return state;
    }
}