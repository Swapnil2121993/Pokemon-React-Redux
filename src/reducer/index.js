import {combineReducers} from 'redux';
import PokemonListReducer from './reducer_list';

const rootReducer = combineReducers({
 pokemon:PokemonListReducer,
});

export default rootReducer;





