import { ActionType } from '../action-types';
import {ItemAction, IItem} from '../actions-interface';


interface IItemState {
  items: IItem[];
  loading: boolean;
  error: string | null;
}

const initialState: IItemState = {
  items: [],
  loading: false,
  error: null,
}


const reducer = (state: IItemState = initialState, action: ItemAction): IItemState => {
  switch(action.type) {
      case ActionType.GET_ITEMS: 
          return {...state, items: action.payload, loading: false }
      case ActionType.DELETE_ITEM:
          return {
              ...state,
              items: state.items.filter(item => item.id !== action.payload)
          }
      case ActionType.ADD_ITEM:
          return {
              ...state,
              items: [...state.items, action.payload]
          }
      case ActionType.ITEMS_LOADING:
          return {...state, loading: true}
      case ActionType.ITEM_ERROR:
          return {...state, error: action.payload}
      case ActionType.CLEAR_ERROR:
          return {...state, error: null}
      
      default:
          return state;
  }
}

export default reducer;