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
import { createAction } from "redux-actions";
import http from "../../util/ajax";

export const updateInfo = createAction(UPDATE_INFO, params => {
    return http.post({
        url: "/user/modify-profile",
        params: params.params,
        header: params.header,
    });
});
export const modifyPassword = createAction(MODIFY_PASSWORD, params => {
    return http.post({
        url: "/user/modify-password",
        params: params.params,
        header: params.header,
    });
});
export const modifyMobileOldSend = createAction(MODIFY_MOBILE_OLD_SEND, params => {
    return http.post({
        url: "/user/modify-mobile-old-send",
        params: params.params,
        header: params.header,
    });
});
export const modifyMobileOldVerify = createAction(MODIFY_MOBILE_OLD_VERIFY, params => {
    return http.post({
        url: "/user/modify-mobile-old-verify",
        params: params.params,
        header: params.header,
    });
});
export const modifyMobileSend = createAction(MODIFY_MOBILE_SEND, params => {
    return http.post({
        url: "/user/modify-mobile-send",
        params: params.params,
        header: params.header,
    });
});
export const modifyMobileVerify = createAction(MODIFY_MOBILE_VERIFY, params => {
    return http.post({
        url: "/user/modify-mobile-verify",
        params: params.params,
        header: params.header,
    });
});
export const modifyMobile = createAction(MODIFY_MOBILE, params => {
    return http.post({
        url: "/user/modify-mobile",
        params: params.params,
        header: params.header,
    });
});
export const profile = createAction(PROFILE, params => {
    return http.get({
        url: "/user/profile",
        // params: params.params,
        header: params.header,
    });
});
export const productLog = createAction(PRODUCT_LOG, params => {
    return http.get({
        url: "/user/product-log",
        params: params.params,
        header: params.header,
    });
});
export const messageType = createAction(MESSAGE_TYPE, params => {
    return http.get({
        url: "/user/message-type",
        params: params.params,
        header: params.header,
    });
});
export const message = createAction(MESSAGE, params => {
    return http.get({
        url: "/user/message",
        params: params.params,
        header: params.header,
    });
});
export const helpCenter = createAction(HELP_CENTER, params => {
    return http.get({
        url: "/setting/list",
        params: params.params,
        header: params.header,
    });
});
export const upload_head = createAction(UPLOAD_HEAD, params => {
    return http.post({
        url: "/user/upload-head",
        params: params.params,
        header: params.header,
    });
});
export const logout = createAction(LOGOUT, params => {
    return http.get({
        url: "/auth/logout",
        // params: params.params,
        header: params.header,
    });
});