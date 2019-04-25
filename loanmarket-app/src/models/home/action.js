import { PRODUCT_LIST, BANNER, GET_NOTICE, GET_TOOL, APPLY, CLICK } from "./types";
import { createAction } from "redux-actions";
import http from "../../util/ajax";

export const productList = createAction(PRODUCT_LIST, params => {
    return http.get({
        url: "/product/list",
        params: params.param,
        header: params.header,
    });

});
export const adList = createAction(BANNER, params => {
    return http.get({
        url: "/promotion/ad",
        params: params.param,
        header: params.header,
    });

});
export const getNotice = createAction(GET_NOTICE, params => {
    return http.get({
        url: "/promotion/ad",
        params: params.param,
        header: params.header,
    });
});
export const toolList = createAction(GET_TOOL, params => {
    return http.get({
        url: "/promotion/ad",
        params: params.param,
        header: params.header,
    });
});
export const apply = createAction(APPLY, params => {
    return http.post({
        url: "/product/apply",
        params: params.param,
        header: params.header,
    });
});
export const click = createAction(CLICK, params => {
    return http.post({
        url: "/promotion/click",
        params: params.param,
        header: params.header,
    });
});