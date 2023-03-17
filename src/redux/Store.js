import {createStore, combineReducers} from 'redux';
import Reducer from '../redux/Reducer';

const rootReducer = combineReducers({
  USER_TOKEN: Reducer,
});

export const store = createStore(rootReducer);
