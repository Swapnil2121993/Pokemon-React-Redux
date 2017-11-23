import {FETCH_LIST,FETCH_DETAILS} from '../actions/index';

export default function Pokemon(state={}, action){
    switch(action.type){
        case FETCH_LIST:
        return {
            ...state, 
           list: action.payload
        }

        case FETCH_DETAILS:
        return{
            ...state,
            list:action.payload
        }

        default:
        return state;
    }
    
}


