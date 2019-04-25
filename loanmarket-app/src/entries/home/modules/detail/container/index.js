import React, { PureComponent } from "react";
import { View, Text, TouchableOpacity, TextInput, Image, WebView, Platform } from "react-native";
import { StackActions, NavigationActions } from "react-navigation";
import back from "../../../../../assets/images/back.png";
import cancel from "../../../../../assets/images/webClose.png";
import * as Util from '../../../../../util/util';
var WEB_VIEW_REF = 'webview';
export default class Index extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.navigation.state.params.id,
            source_type: this.props.navigation.state.params.source_type,
            source_id: this.props.navigation.state.params.source_id,
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
    onNavigationStateChange = (navState) => {
        this.setState({
            backButtonEnabled: navState.canGoBack,
        });
    };

    // onMessage = (e) => {
    //     // console.log('WebView onMessage 收到H5参数：',e.nativeEvent.data);
    //     //let params = e.nativeEvent.data;
    //     //params = JSON.parse(params);
    //     //console.log('WebView onMessage 收到H5参数 json后：',params);

    // };
    onLoadEnd = (e) => {
        console.log('WebView onLoadEnd e：', e.nativeEvent);
        let data = {
            source: 'from rn',
        };
        this.web && this.web.postMessage(JSON.stringify(data));//发送消息到H5
    };

    // _createNavigationBar() {
    // var bodyHtml = [];
    // bodyHtml.push(<Image key={String(i)} source={{ uri: imageNames[i].img_url }} style={styles.bannerImage} />);
    // return bodyHtml;

    // }
    clickRightItem() {
        this.props.navigation.dispatch(StackActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({
                    routeName: "TabRoot"
                })
            ]
        }));
    }

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

            // window.postMessage = patchedPostMessage;
        };
        const patchPostMessageJsCode = `
            window.localStorage.setItem('token','${Util.encryptPass(global.appToken)}')
            window.localStorage.setItem('isApp',true);
            window.localStorage.setItem('platform','${Platform.OS == "ios" ? "iOS" : "Android"}');
        `;
        console.log(patchPostMessageJsCode)

        var path = this.state.source_type == null || this.state.source_type == undefined ? 'id=' + this.state.id : 'id=' + this.state.id + '&source_type=' + this.state.source_id;
        var zyUrl = Util.encryptPass(JSON.stringify({ pathname: '/production', search: path }));
        return (

            <View style={{ flex: 1, backgroundColor: 'white' }}>
                <View style={{ height: 64, paddingTop: global.titleBarPaddingTop, flexDirection: 'row' }}>
                    <View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity onPress={this.handleBackPress.bind(this)}>
                            <Image source={back} style={{
                                width: this.state.backButtonEnabled ? 20 : 0, height: 20, marginLeft: 15,
                                resizeMode: 'contain'
                            }}></Image>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this.handleCancelPress.bind(this)}>
                            <Image source={cancel} style={{
                                width: 20, height: 20, marginLeft: this.state.backButtonEnabled ? 15 : 0,
                                resizeMode: 'contain'
                            }}></Image>
                        </TouchableOpacity>
                    </View>
                    <View style={{ flex: 1, marginRight: this.state.backButtonEnabled ? 35 : 0, flexDirection: 'row', justifyContent: 'center' }}>
                        <Text style={{ fontSize: 15, color: 'black' }}>产品详情</Text>
                    </View>
                    <TouchableOpacity onPress={this.clickRightItem.bind(this)}>
                        <Text style={{ fontSize: 13, color: 'rgba(79,119,220,1)', width: 35 }}>更多</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ backgroundColor: 'rgba(245,245,245,1)', height: 1 }}></View>
                <WebView
                    ref={WEB_VIEW_REF}
                    injectedJavaScript={patchPostMessageJsCode}
                    style={{ flex: 1 }}
                    source={
                        this.state.source_type == null || this.state.source_type == undefined ? {
                            uri: "http://loanmarket-mobile.zhepm.com/transfer?from=" + zyUrl
                            , method: 'GET', headers: { 'Cache-Control': 'no-cache' }
                        } : {
                                uri: "http://loanmarket-mobile.zhepm.com/transfer?from=" + zyUrl
                                , method: 'GET', headers: { 'Cache-Control': 'no-cache' }
                            }
                    }
                    domStorageEnabled={true}
                    scalesPageToFit={false}
                    // onMessage={this.onMessage}
                    bounces={true}
                    onLoadEnd={this.onLoadEnd}//加载成功或者失败都会回调
                    javaScriptEnabled={true}//指定WebView中是否启用JavaScript
                    startInLoadingState={true} //强制WebView在第一次加载时先显示loading视图
                    onNavigationStateChange={this.onNavigationStateChange}
                ></WebView>

            </View>

        );
    }
}