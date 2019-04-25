
import React, { PureComponent } from "react";
import { View, Text, TouchableOpacity, TextInput, Image, WebView, NativeModules, Platform } from "react-native";
import { StackActions } from "react-navigation";
import back from "../../../../../assets/images/back.png";
import cancel from "../../../../../assets/images/webClose.png";
import share from "../../../../../assets/images/share.png";
import * as Util from '../../../../../util/util';
var WEB_VIEW_REF = 'webview';
const ShareManager = NativeModules.ShareManager;
export default class Index extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            articleId: this.props.navigation.state.params.articleId,
            articleTitle: this.props.navigation.state.params.articleTitle,
            articleImage: this.props.navigation.state.params.articleImage,
            backButtonEnabled: false,
        };


    }

    componentDidMount() {

    }
    handleBackPress() {
        this.refs[WEB_VIEW_REF].goBack();
    }

    handleCancelPress() {
        this.props.navigation.dispatch(StackActions.pop({
            n: 1,
        }));
    }

    clickShareBtn() {
        if (Platform.OS === 'ios') {//ios
            ShareManager.Show(this.state.articleTitle,
            '一站式线上借贷平台',
            this.state.articleImage,
            "http://loanmarket-mobile.zhepm.com/newsdetail");
        } else {//android
            NativeModules.IntentModule.startActivityFromJS("com.zxj.myandroidtest.TwoActivity", "http://loanmarket-mobile.zhepm.com/newsdetail?id=" + this.state.articleId)
        }

    }
    onMessage = (e) => {
        //console.log('WebView onMessage 收到H5参数：',e.nativeEvent.data);
        //let params = e.nativeEvent.data;
        //params = JSON.parse(params);
        //console.log('WebView onMessage 收到H5参数 json后：',params);

    };
    onLoadEnd = (e) => {
        // console.log('WebView onLoadEnd e：',e.nativeEvent);
        // let data = {
        //     source:'from rn',
        // };
        // this.web&&this.web.postMessage(JSON.stringify(data));//发送消息到H5
    };
    onNavigationStateChange = (navState) => {
        console.log("navigationChange");
        this.setState({
            backButtonEnabled: navState.canGoBack,
        });
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
        }
        const patchPostMessageJsCode = `
            window.localStorage.setItem('token','${Util.encryptPass(global.appToken)}');
            window.localStorage.setItem('isApp',true);
            window.localStorage.setItem('platform','${Platform.OS == "ios" ? "iOS" : "Android"}');
            
        `;
        // ${Util.encryptPass(Platform.OS)}

        // const patchPostMessageJsCode = `window.addEventListener('isApp',(e)=>{
        //              var st=document.querySelectorAll('body')[0].scrollTop;
        //              window.postMessage(JSON.stringify({st}))
        //         },false)`;
        console.log('zhouyuan')
        console.log(this.state.articleId)
        var path = 'id=' + this.state.articleId;
        var zyUrl = Util.encryptPass(JSON.stringify({ pathname: '/newsdetail', search: path }));
        return (

            <View style={{ flex: 1, backgroundColor: 'white' }}>
                <View style={{ height: 64, paddingTop: global.titleBarPaddingTop, flexDirection: 'row' }}>
                    <View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity style = {{ width:this.state.backButtonEnabled ? 35 : 0,height:35,marginLeft: 15}} onPress={this.handleBackPress.bind(this)}>
                            <Image source={back} style={{
                                width: this.state.backButtonEnabled ? 20 : 0, height: 20, 
                                resizeMode: 'contain'
                            }}></Image>
                        </TouchableOpacity>

                        <TouchableOpacity style = {{width:35,height:35}} onPress={this.handleCancelPress.bind(this)}>
                            <Image source={cancel} style={{
                                width: 20, height: 20,
                                resizeMode: 'contain'
                            }}></Image>
                        </TouchableOpacity>
                    </View>
                    <View style={{ flex: 1, marginRight: this.state.backButtonEnabled ? 50 : 15, flexDirection: 'row', justifyContent: 'center' }}>
                        <Text style={{ fontSize: 15, color: 'black' }}>资讯详情</Text>
                    </View>
                    <TouchableOpacity style = {{ width:35 ,height:35}} onPress={this.clickShareBtn.bind(this)}>
                        <Image source={share} style={{
                            width: 20, height: 20, marginLeft: 0, marginRight: 15,
                            resizeMode: 'contain'
                        }}></Image>
                    </TouchableOpacity>
                </View>
                <View style={{ backgroundColor: 'rgba(245,245,245,1)', height: 1 }}></View>
                <WebView

                    ref={WEB_VIEW_REF}
                    injectedJavaScript={patchPostMessageJsCode}
                    style={{ flex: 1 }}
                    source={{ uri: "http://loanmarket-mobile.zhepm.com/transfer?from=" + zyUrl, method: 'GET', headers: { 'Cache-Control': 'no-cache' } }}
                    domStorageEnabled={true}
                    scalesPageToFit={false}
                    // onMessage={this.onMessage}
                    // onLoadEnd={this.onLoadEnd}//加载成功或者失败都会回调
                    javaScriptEnabled={true}//指定WebView中是否启用JavaScript
                    startInLoadingState={true} //强制WebView在第一次加载时先显示loading视图
                    onNavigationStateChange={this.onNavigationStateChange}
                ></WebView>

            </View >

        );

    }
}
