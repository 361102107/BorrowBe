import { PRODUCT_LIST, BANNER, GET_NOTICE, GET_TOOL, APPLY, CLICK } from "./types";
import { handleActions } from "redux-actions";

const defaultState = null;

export const productListInfo = handleActions(
    {
        [PRODUCT_LIST]: (state, { payload }) => {
            console.log(payload)
            if (!state) {
                state = {};
                state.list = [];
            }
            return { ...state, ...payload, list: [...state.list, ...payload.list] };
        }
    },
    defaultState
);
export const adInfo = handleActions(
    {
        [BANNER]: (state, { payload }) => {

            return { ...state, ...payload };
        }
    },
    defaultState
);
export const noticeInfo = handleActions(
    {
        [GET_NOTICE]: (state, { payload }) => {

            return { ...state, ...payload };
        }
    },
    defaultState
);
export const toolInfo = handleActions(
    {
        [GET_TOOL]: (state, { payload }) => {

            return { ...state, ...payload };
        }
    },
    defaultState
);
export const apply = handleActions(
    {
        [APPLY]: (state, { payload }) => {

            return { ...state, ...payload };
        }
    },
    defaultState
);
export const click = handleActions(
    {
        [CLICK]: (state, { payload }) => {

            return { ...state, ...payload };
        }
    },
    defaultState
);