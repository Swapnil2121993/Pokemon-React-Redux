import {createStore, applyMiddleware} from 'redux';
import ReduxPromise from 'redux-promise';
import rootReducer from './index';

const store = createStore(
    rootReducer,
    applyMiddleware(ReduxPromise)
);


export default store;
