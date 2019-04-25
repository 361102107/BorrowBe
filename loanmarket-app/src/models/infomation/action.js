import { CATEGORY,ARTICLELIST } from "./types";
import { createAction } from "redux-actions";
import http from "../../util/ajax";

export const getCategory = createAction(CATEGORY, params => {
    return http.get({
        url: "/article/cate",
        params: params.params,
        header: params.header
    });
});

export const getArticle_list = createAction(ARTICLELIST, params => {
    return http.get({
        url: "/article/list",
        params: params.params,
        header: params.header
    });
});