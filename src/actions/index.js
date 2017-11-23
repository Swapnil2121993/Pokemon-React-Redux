import axios from 'axios';

const ROOT_URL = 'https://pokeapi.co/api/v2/pokemon';

export const FETCH_LIST = 'FETCH_LIST';
export const FETCH_DETAILS='FETCH_DETAILS';

export function fetchList(){
    const url = `${ROOT_URL}/?limit=20&offset=0`;
    const request = axios.get(url);
     return{
        type:FETCH_LIST,
        payload: request
    };
}

export function fetchDetails(id){
    const url=`${ROOT_URL}/${id}`;
    const request=axios.get(url);
    return{
        type:FETCH_DETAILS,
        payload:request
    };
}