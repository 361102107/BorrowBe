import { LOGIN, 
REGISTER_GET_CODE, 
REGISTER_VERIFY, 
REGISTER_COMPLETE,
FIND_GET_CODE,
FIND_VERIFY,
FIND_SET_PASSWORD} from "./types";
import { createAction } from "redux-actions";
import http from "../../util/ajax";

export const userLogin = createAction(LOGIN, params => {
    return http.post({
        url: "/auth/login",
        params: params
    });
    
});

export const register_getCode = createAction(REGISTER_GET_CODE, params => {
    return http.post({
        url: "/auth/register-send",
        params: params
    });
    
});

export const register_verify = createAction(REGISTER_VERIFY, params => {
    return http.post({
        url: "/auth/register-verify",
        params: params
    });
    
});

export const register_complete = createAction(REGISTER_COMPLETE, params => {
    return http.post({
        url: "/auth/register",
        params: params
    });
    
});

export const find_getCode = createAction(FIND_GET_CODE, params => {
    return http.post({
        url: "/user/find-password-send",
        params: params
    });
    
});

export const find_verify = createAction(FIND_VERIFY, params => {
    return http.post({
        url: "/user/find-password-verify",
        params: params
    });
    
});

export const find_setPassword = createAction(FIND_SET_PASSWORD, params => {
    return http.post({
        url: "/user/find-password",
        params: params
    });
    
});

