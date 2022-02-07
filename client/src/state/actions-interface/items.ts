import { ActionType } from '../action-types';

export interface IItem{
  id: number;
  title: string;
  content?: string
}

export interface ItemsGetAction {
  type: ActionType.GET_ITEMS;
  payload:IItem[];
}

export interface ItemDeleteAction {
  type: ActionType.DELETE_ITEM,
  payload: number
}

export interface ItemAddAction {
  type: ActionType.ADD_ITEM,
  payload: IItem
}

export interface ItemsLoadingAction {
  type: ActionType.ITEMS_LOADING;
}

export interface ItemsErrorAction {
  type: ActionType.ITEM_ERROR;
  payload: string;
}

export interface ClearErrorAction {
  type: ActionType.CLEAR_ERROR;
}

export type ItemAction = 
  | ItemsGetAction
  | ItemsLoadingAction
  | ItemDeleteAction
  | ItemAddAction
  | ItemsErrorAction
  | ClearErrorAction;
