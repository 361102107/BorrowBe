import React from "react";
import storeFun from "./store";
import { Text, AsyncStorage ,Platform} from "react-native";
import { Provider } from "react-redux";
import Route from "./routes";
import Storage from 'react-native-storage';
global.store = storeFun();

var storage = new Storage({
    size: 1000,
    storageBackend: AsyncStorage,
    defaultExpires: null,
    enableCache: true,
})
// 全局变量
global.storage = storage
global.userInfo = null
global.lineColor_Normal = 'rgba(245,245,245,1)'
global.lineColor_High = 'rgba(254,179,40,1)'
global.titleBarPaddingTop = Platform.OS === 'ios' ? 35: 40
global.appToken = null

export default function () {
    return (
        <Provider store={store}>
            <Route />
        </Provider>
    );
}
