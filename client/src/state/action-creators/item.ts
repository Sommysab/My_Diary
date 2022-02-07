import axios from 'axios'; 
import { Dispatch } from 'redux'; 
import { ActionType } from '../action-types'; 
import { ItemAction, tokenConfig, IItem} from '../actions-interface'; 



export const getItems = () => async (dispatch: Dispatch<ItemAction>, getState: Function) => { 
    try{
        const res = await axios.get('/api/posts', tokenConfig(getState));    
        // console.log('items', res) 
        dispatch({
            type: ActionType.GET_ITEMS,
            payload: res.data
        }); 
        
    }catch(err: any){
        dispatch({type: ActionType.ITEM_ERROR, payload: err.message})
    }
}

export const addItem = (item: IItem) => async (dispatch: Dispatch<ItemAction>, getState: Function) => { 
    try{
        const res = await axios.post('/api/posts', item, tokenConfig(getState));
        dispatch({
            type: ActionType.ADD_ITEM,
            payload: res.data
        }) 
    }catch(err: any){
        dispatch({type: ActionType.ITEM_ERROR, payload: err.message})
    }
}

export const deleteItem = (id: number) => async (dispatch: Dispatch<ItemAction>, getState: Function) => { 
    try{
        await axios.delete(`/api/posts/${id}`, tokenConfig(getState));
        dispatch({
            type: ActionType.DELETE_ITEM,
            payload: id
        })
    }catch(err: any){
        dispatch({type: ActionType.ITEM_ERROR, payload: err.message})
    }
}

export const setItemsLoading = () => {
    return {
        type: ActionType.ITEMS_LOADING
    }
}