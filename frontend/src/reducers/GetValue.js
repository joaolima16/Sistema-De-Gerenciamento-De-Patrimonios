export default function GetValue(State={value:''},action){
    switch(action.type){
        case 'ADD_VALUE': return {value:action.data}
        default: return State
    }

}
