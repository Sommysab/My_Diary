import { ActionType } from '../action-types';
import { AuthAction } from '../actions-interface';

interface AuthState {
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  error: string | null;
  user: string[] | null;
  noted: boolean;
}

const token = localStorage.getItem('token');
const initialState: AuthState = {
  token,
  isAuthenticated: token && token!=='undefined'? true : false,
  isLoading: false,
  error: null,
  user: null,
  noted: false,
};


const reducer = (state: AuthState = initialState, action: AuthAction): AuthState => {
  switch (action.type) {
    case ActionType.USER_LOADING:
      return {...state, isLoading: true}      
    case ActionType.USER_LOADED:     
      return {...state, isAuthenticated:true, isLoading: false, user: action.payload}
    case ActionType.LOGIN_SUCCESS:
      localStorage.setItem('token', action.payload);
      return {...state, token: action.payload, isAuthenticated: true, isLoading: false}
    case ActionType.REGISTER_SUCCESS: 
      return {...state, token:null, user:null, isAuthenticated:false, isLoading:false, noted:true}
    case ActionType.LOGOUT_SUCCESS:
      localStorage.removeItem('token');
      return {...state, token:null, user:null, isAuthenticated:false, isLoading:false}
    case ActionType.AUTH_ERROR:
    case ActionType.LOGIN_FAIL:
    case ActionType.REGISTER_FAIL:
      localStorage.removeItem('token');
      return {...state, token:null, user:null, isAuthenticated:false, isLoading:false, error:action.payload}
    case ActionType.CLEAR_ERROR:
      return {...state, error:null}  
    default:
      return state;
  }
}


export default reducer;
