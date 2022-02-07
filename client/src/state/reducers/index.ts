import { combineReducers } from 'redux';
import authReducer from './authReducer';
import itemReducer from './itemsReducer';


const reducers = combineReducers({
  item: itemReducer,
  auth: authReducer,
});

export default reducers;

export type RootState = ReturnType<typeof reducers>;
