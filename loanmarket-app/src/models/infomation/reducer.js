import { CATEGORY,ARTICLELIST } from "./types";
import { handleActions } from "redux-actions";

const defaultState = null;

export const getCategory_Info = handleActions(
    {
        [CATEGORY]: (state, { payload }) => {
            return [...payload];
        }
    },
    defaultState
);

export const getArticle_list_Info = handleActions(
    {
        [ARTICLELIST]: (state, { payload }) => {
            console.log(payload);
            if (!state) {
                state = {};
                state.list = [];
            }
            if(payload.current_page != 1){
                return { ...state, ...payload, list: [...state.list, ...payload.list] };
            }else{
                return {...payload};
            }
            
            
        }
    },
    defaultState
);