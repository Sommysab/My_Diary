import axios from 'axios';
import { Dispatch } from 'redux';
import { ActionType } from '../action-types';
import { AuthAction, IAuthFunction, tokenConfig } from '../actions-interface';


// Check token & load user 
export const loadUser = () => async (dispatch: Dispatch<AuthAction>, getState: Function) => { 
    // Init Loader 
    dispatch({type: ActionType.USER_LOADING }); 

    // User loading 
    try{ 
      const res = await axios.get('/api/user', tokenConfig(getState)); 

      dispatch({
        type: ActionType.USER_LOADED,
        payload: res.data
      }); 

    }catch(err: any){
      return {
        type: ActionType.AUTH_ERROR,
        payload: {
          payload: err.message,
        }
      }
    }
};

// Register User
export const register = ({ name, email, password }: IAuthFunction) => async (dispatch: Dispatch<AuthAction>, getState: Function) => { 
  // Request body
  try {
    const body = { name, email, password }; 
    await axios.post(`/api/register`, body, tokenConfig(getState));     

    dispatch({ 
      type: ActionType.REGISTER_SUCCESS
    }); 

  }catch(err: any) { 
    dispatch({ 
      type: ActionType.REGISTER_FAIL, 
      payload: err.message 
    }); 
  }; 
}; 

// Login User 
export const login = ({email, password }: IAuthFunction) => async (  
  dispatch: Dispatch<AuthAction>, getState: Function
) => { 
    
  try { 
    const body = { email, password }; 
    const res = await axios.post(`/api/login`, body, tokenConfig(getState)); 
    
    dispatch({ 
      type: ActionType.LOGIN_SUCCESS, 
      payload: res.data 
    }) 
  }catch(err: any) { 
    console.log({err}); 
    
    dispatch({
      type: ActionType.LOGIN_FAIL,
      payload: err.message
    });
  };
};

// Logout User
export const logout = () => async (dispatch: Dispatch<AuthAction>) => {  
  dispatch ({
    type: ActionType.LOGOUT_SUCCESS
  });
};

// Clear Error Record
export const clear = () => async ( dispatch: Dispatch<AuthAction>) => {   
  dispatch ({
    type: ActionType.CLEAR_ERROR
  });
}