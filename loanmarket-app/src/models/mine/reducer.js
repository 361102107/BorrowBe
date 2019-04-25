import {
    UPDATE_INFO,
    MODIFY_PASSWORD,
    MODIFY_MOBILE_OLD_SEND,
    MODIFY_MOBILE_OLD_VERIFY,
    MODIFY_MOBILE_SEND,
    MODIFY_MOBILE_VERIFY,
    MODIFY_MOBILE,
    PROFILE,
    PRODUCT_LOG,
    MESSAGE_TYPE,
    MESSAGE,
    HELP_CENTER,
    UPLOAD_HEAD,
    LOGOUT,
} from "./types";
import { handleActions } from "redux-actions";

const defaultState = null;

export const updateResult = handleActions(
    {
        [UPDATE_INFO]: (state, { payload }) => {

            return { ...state, ...payload };
        }
    },
    defaultState
);
export const modifyPassword = handleActions(
    {
        [MODIFY_PASSWORD]: (state, { payload }) => {

            return { ...state, ...payload };
        }
    },
    defaultState
);
export const modifyMobileOldSend = handleActions(
    {
        [MODIFY_MOBILE_OLD_SEND]: (state, { payload }) => {

            return { ...state, ...payload };
        }
    },
    defaultState
);
export const modifyMobileOldVerify = handleActions(
    {
        [MODIFY_MOBILE_OLD_VERIFY]: (state, { payload }) => {

            return { ...state, ...payload };
        }
    },
    defaultState
);
export const modifyMobileSend = handleActions(
    {
        [MODIFY_MOBILE_SEND]: (state, { payload }) => {

            return { ...state, ...payload };
        }
    },
    defaultState
);
export const modifyMobileVerify = handleActions(
    {
        [MODIFY_MOBILE_VERIFY]: (state, { payload }) => {

            return { ...state, ...payload };
        }
    },
    defaultState
);
export const modifyMobile = handleActions(
    {
        [MODIFY_MOBILE]: (state, { payload }) => {

            return { ...state, ...payload };
        }
    },
    defaultState
);
export const profile = handleActions(
    {
        [PROFILE]: (state, { payload }) => {

            return { ...state, ...payload };
        }
    },
    defaultState
);
export const productLog = handleActions(
    {
        [PRODUCT_LOG]: (state, { payload }) => {

            return { ...state, ...payload };
        }
    },
    defaultState
);
export const messageType = handleActions(
    {
        [MESSAGE_TYPE]: (state, { payload }) => {
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
export const message = handleActions(
    {
        [MESSAGE]: (state, { payload }) => {
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
export const helpCenter = handleActions(
    {
        [HELP_CENTER]: (state, { payload }) => {

            return { ...state, ...payload };
        }
    },
    defaultState
);
export const upload_head = handleActions(
    {
        [UPLOAD_HEAD]: (state, { payload }) => {

            return { ...state, ...payload };
        }
    },
    defaultState
);
export const logout = handleActions(
    {
        [LOGOUT]: (state, { payload }) => {

            return { ...state, ...payload };
        }
    },
    defaultState
);