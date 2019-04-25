import { LOGIN, 
REGISTER_GET_CODE, 
REGISTER_VERIFY, 
REGISTER_COMPLETE,
FIND_GET_CODE,
FIND_VERIFY,
FIND_SET_PASSWORD } from "./types";
import { handleActions } from "redux-actions";

const defaultState = null;

export const userInfo = handleActions(
    {
        [LOGIN]: (state, { payload }) => {
            
            return { ...state, ...payload };
        }
    },
    defaultState
);

export const register_getCode_info = handleActions(
    {
        [REGISTER_GET_CODE]: (state, { payload }) => {
            
            return { ...state, ...payload };
        }
    },
    defaultState
);

export const register_verify_info = handleActions(
    {
        [REGISTER_VERIFY]: (state, { payload }) => {
            
            return { ...state, ...payload };
        }
    },
    defaultState
);

export const register_complete_info = handleActions(
    {
        [REGISTER_COMPLETE]: (state, { payload }) => {
            
            return { ...state, ...payload };
        }
    },
    defaultState
);

export const find_getCode_info = handleActions(
    {
        [FIND_GET_CODE]: (state, { payload }) => {
            
            return { ...state, ...payload };
        }
    },
    defaultState
);

export const find_verify_info = handleActions(
    {
        [FIND_VERIFY]: (state, { payload }) => {
            
            return { ...state, ...payload };
        }
    },
    defaultState
);

export const find_setPassword_info = handleActions(
    {
        [FIND_SET_PASSWORD]: (state, { payload }) => {
            
            return { ...state, ...payload };
        }
    },
    defaultState
);
