import { combineReducers } from "redux";
import {
    userInfo,
    register_getCode_info,
    register_verify_info,
    register_complete_info,
    find_setPassword_info,
    find_verify_info,
    find_getCode_info
} from "./login/reducer";
import { productListInfo, adInfo, noticeInfo, toolInfo, apply, click } from "./home/reducer";
import { getCategory_Info, getArticle_list_Info } from "./infomation/reducer";
import { updateResult, profile, message, helpCenter, upload_head, messageType } from "./mine/reducer";
import { recordList, } from "./record/reducer";
export default combineReducers({
    userInfo,
    register_getCode_info,
    register_verify_info,
    register_complete_info,
    find_setPassword_info,
    find_verify_info,
    find_getCode_info,
    getCategory_Info,
    getArticle_list_Info,
    //mine
    updateResult,
    profile,
    message,
    helpCenter,
    upload_head,
    messageType,
    //home
    productListInfo,
    adInfo,
    noticeInfo,
    toolInfo,
    apply,
    click,
    //record
    recordList,

});
