import { ActionType } from '../action-types';

export interface UserLoadedAction {
  type: ActionType.USER_LOADED;
  payload: string[];
}

export interface RegisterSuccessAction {
  type: ActionType.REGISTER_SUCCESS;
}

export interface LoginSuccessAction {
  type: ActionType.LOGIN_SUCCESS;
  payload: string
}

export interface LogoutSuccessAction {
  type: ActionType.LOGOUT_SUCCESS;
}

export interface UserLoadingAction {
  type: ActionType.USER_LOADING;
}

export interface AuthErrorAction {
  type: ActionType.AUTH_ERROR;
  payload: string
}

export interface RegisterFailAction {
  type: ActionType.REGISTER_FAIL;
  payload: string
}

export interface LoginFailAction {
  type: ActionType.LOGIN_FAIL;
  payload: string
}

export interface clearError {
  type: ActionType.CLEAR_ERROR;
}

export interface IAuthFunction {
  name?: string;
  email: string;
  password: string;
}

export interface IConfigHeaders {
  headers: {
    [index: string]: string;
  };
}

// Setup config/headers and token 
export const tokenConfig = (getState: Function) => { 
  // Get token from localstorage 
  const token = getState().auth.token; 
  // Headers 
  const config: IConfigHeaders = { 
    headers: { 
      'Content-type': 'application/json' 
    } 
  }; 
  
  // If token, add to headers 
  if (token) { 
    config.headers['Authorization']=token;
  }

  return config;
};


export type AuthAction = 
  | UserLoadedAction
  | UserLoadingAction 
  | AuthErrorAction
  | RegisterFailAction
  | RegisterSuccessAction
  | LoginSuccessAction
  | LoginFailAction
  | LogoutSuccessAction
  | clearError;
