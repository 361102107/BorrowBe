import {
	GETLIST,
	SINGLECHECKCHANGE,
	GROUPCHECKCHANGE,
	ALLCHECKCHANGE,
	DELETECHECKED
} from "./types";
import { createAction } from "redux-actions";
import http from "../../util/ajax";

export const getRecordList = createAction(GETLIST, (params) => {
	return http.get({
		url: "/user/product-log",
		params: params.params,
		header: params.header,
	});
});
//params={time:'2019-02-03',id:item.id}
export const singleCheckChange = createAction(
	SINGLECHECKCHANGE,
	(params) => {
		return params;
	}
);
//params={time:'2019-02-03'}
export const groupCheckChange = createAction(
	GROUPCHECKCHANGE,
	(params) => {
		return params;
	}
);
//params={type:boolean}
export const allCheckChange = createAction(ALLCHECKCHANGE, (params) => {
	return params;
});
////params={ids：选中的id逗号分隔字符串}
export const deleteCheckedRecord = createAction(
	DELETECHECKED,
	async (params) => {
		try {
			let res = await http.post({
				url: "/user/product-log-delete",
				params: params.params,
				header: params.header,
			});
			if (res && res.code == 0) {
				return { status: true };
			} else {
				return { status: false };
			}
		} catch (e) {
			return { status: false };
		}
	}
);
