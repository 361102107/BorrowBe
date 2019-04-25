import React, { PureComponent } from "react";
import { View, Text, TouchableOpacity, TextInput, Image, WebView } from "react-native";
import { StackActions } from "react-navigation";
import back from "../../../../../assets/images/back.png";
import * as Util from '../../../../../util/util';
export default class Index extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            articleId: this.props.navigation.state.params.articleId,
        };
    }

    componentDidMount() {

    }
    handleBackPress() {
        this.props.navigation.dispatch(StackActions.pop({
            n: 1,
        }));
    }

    handleCancelPress() {

    }


    onMessage = (e) => {
        // console.log('WebView onMessage 收到H5参数：',e.nativeEvent.data);
        //let params = e.nativeEvent.data;
        //params = JSON.parse(params);
        //console.log('WebView onMessage 收到H5参数 json后：',params);

    };
    onLoadEnd = (e) => {
        console.log('WebView onLoadEnd e：', e.nativeEvent);
        let data = {
            source: 'from rn',
        };
        this.web && this.web.postMessage(JSON.stringify(data));//发送消息到H5
    };

    render() {
        console.log(global.userInfo)
        const patchPostMessageFunction = function () {
            var originalPostMessage = window.postMessage;

            var patchedPostMessage = function (message, targetOrigin, transfer) {
                originalPostMessage(message, targetOrigin, transfer);
            };

            patchedPostMessage.toString = function () {
                return String(Object.hasOwnProperty).replace('hasOwnProperty', 'postMessage');
            };

            window.postMessage = patchedPostMessage;
        };
        const patchPostMessageJsCode = `
            window.localStorage.setItem('token','${Util.encryptPass(global.appToken)}')
            window.isApp=true;
            window.openAppDetail=function(item){
                window.postMessage(JSON.stringify(item))
            }
        `;
        console.log(patchPostMessageJsCode)
        return (

            <View style={{ flex: 1, backgroundColor: 'white' }}>
                <View style={{ height: 74, paddingTop: global.titleBarPaddingTop, flexDirection: 'row' }}>

                    <View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity onPress={this.handleBackPress.bind(this)}>
                            <Image source={back} style={{
                                width: 20, height: 20, marginLeft: 15,
                                resizeMode: 'contain'
                            }}></Image>
                        </TouchableOpacity>

                    </View>



                    <View style={{ flex: 1, marginRight: 35 + 35, flexDirection: 'row', justifyContent: 'center' }}>
                        <Text style={{ fontSize: 15, color: 'black' }}></Text>
                    </View>
                </View>
                <View style={{ backgroundColor: 'rgba(245,245,245,1)', height: 1 }}></View>
                <WebView
                    injectedJavaScript={patchPostMessageJsCode}
                    style={{ flex: 1 }}
                    source={{ uri: this.state.articleId, method: 'GET' }}
                    domStorageEnabled={true}
                    scalesPageToFit={false}
                    onMessage={this.onMessage}
                    onLoadEnd={this.onLoadEnd}//加载成功或者失败都会回调
                    javaScriptEnabled={true}//指定WebView中是否启用JavaScript
                    startInLoadingState={true} //强制WebView在第一次加载时先显示loading视图
                ></WebView>

            </View>

        );
    }
}