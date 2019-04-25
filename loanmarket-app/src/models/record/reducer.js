import {
	GETLIST,
	SINGLECHECKCHANGE,
	GROUPCHECKCHANGE,
	ALLCHECKCHANGE,
	DELETECHECKED
} from "./types";
import { handleActions } from "redux-actions";

const defaultState = null;

//处理之后的数据结构
// data={
// 	current_page:number,
// 	total:number,
// 	list:Array,//原始数据
// 	dataList:[
// 		{
// 			time:'时间',
// 			isChecked:'选中状态',
// 			children:[
// 				{
// 					...本来单条数据,
// 					isChecked:选中状态
// 				}
// 			]
// 		}
// 	]
// }



export const recordList = handleActions(
	{
		[GETLIST]: (state, { payload }) => {
			let data = {};
			let timeList = [];
			if (!state || (payload && payload.current_page == 1)) {
				state = {};
				state.list = [];
			}
			if (payload && payload.list && payload.list.length > 0) {
				[...state.list, ...payload.list].map((item) => {
					if (item.time && item.time.length > 0) {
						let t = item.time.split(" ")[0];
						if (!data[t]) {
							data[t] = [];
						}
						if (!timeList.includes(t)) {
							timeList.push(t);
						}
						data[t].push({ ...item, isChecked: false });
					}
				});
			}
			let resList = [];
			timeList.map((item) => {
				resList.push({
					time: item,
					isChecked: false,
					children: data[item]
				});
			});
			return {
				...state,
				...payload,
				dataList: [...resList]
			};
		},
		[SINGLECHECKCHANGE]: (state, { payload }) => {
			let { dataList } = state;
			let { time, id } = payload;
			if (dataList && dataList.length > 0) {
				for (let i = 0, len = dataList.length; i < len; i++) {
					if (dataList[i].time != time) {
						continue;
					}
					if (
						!dataList[i].children ||
						dataList[i].children.length <= 0
					) {
						continue;
					}
					let checkedNumer = 0;
					for (
						let k = 0, l = dataList[i].children.length;
						k < l;
						k++
					) {
						if (dataList[i].children[k].id == id) {
							dataList[i].children[k].isChecked = !dataList[i]
								.children[k].isChecked;
						}
						if (dataList[i].children[k].isChecked) {
							checkedNumer++;
						}
					}
					if (checkedNumer == dataList[i].children.length) {
						dataList[i].isChecked = true;
					} else {
						dataList[i].isChecked = false;
					}
				}
			}
			return { ...state, dataList: [...dataList] };
		},
		[GROUPCHECKCHANGE]: (state, { payload }) => {
			let { dataList } = state;
			let { time } = payload;
			if (dataList && dataList.length > 0) {
				for (let i = 0, len = dataList.length; i < len; i++) {
					if (dataList[i].time != time) {
						continue;
					}
					let type = !dataList[i].isChecked;
					dataList[i].isChecked = type;
					if (
						dataList[i].children &&
						dataList[i].children.length > 0
					) {
						dataList[i].children.map((v) => {
							v.isChecked = type;
						});
					}
				}
			}
			return { ...state, dataList: [...dataList] };
		},
		[ALLCHECKCHANGE]: (state, { payload }) => {
			let { dataList } = state;
			let { type } = payload;
			if (dataList && dataList.length > 0) {
				for (let i = 0, len = dataList.length; i < len; i++) {
					dataList[i].isChecked = type;
					if (
						dataList[i].children &&
						dataList[i].children.length > 0
					) {
						dataList[i].children.map((v) => {
							v.isChecked = type;
						});
					}
				}
			}
			return { ...state, dataList: [...dataList] };
		},
		[DELETECHECKED]: (state, { payload }) => {
			let { dataList } = state;
			let { status } = payload;
			if (dataList && dataList.length > 0 && status) {
				for (let i = 0, len = dataList.length; i < len; i++) {
					if (
						dataList[i].children &&
						dataList[i].children.length > 0
					) {
						let m = dataList[i].children.filter(
							(v, idx) => {
								if (!v.isChecked) {
									return v;
								}
							}
						);
						dataList[i].children = m;
					}
				}
				dataList = dataList.filter((v) => {
					if (v && v.children && v.children.length > 0) {
						return v;
					}
				});
			}
			return { ...state, dataList: [...dataList] };
		}
	},
	defaultState
);
