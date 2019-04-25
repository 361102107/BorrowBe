import React, { PureComponent } from "react";
import { View, Text, TouchableOpacity, TextInput, Image } from "react-native";
import { StackActions } from "react-navigation";
import back from "../../../../../assets/images/back.png";
import logo from "../../../../../assets/images/about_logo.png";
import HTML from "react-native-render-html";
export default class Index extends PureComponent {
    constructor() {
        super();

    }
    handleBackPress() {
        this.props.navigation.dispatch(StackActions.pop({
            n: 1,
        }));
    }
    componentDidMount() {
        // 通过addListener开启监听，可以使用上面的四个属性
        this._didBlurSubscription = this.props.navigation.addListener(
            'didFocus',
            payload => {
                storage.load({
                    key: 'appToken',
                }).then(ret => {
                    console.log(ret);
                    this.getSetting(ret);
                }).catch(err => {

                })
            });

    }
    getSetting(token) {
        let header = { "Authorization": "Bearer" + token }
        let params = { header }
        console.log(params)
        this.props.getService(params);
    }

    render() {
        let { helpCenter } = this.props;
        console.log(helpCenter)
        return (
            <View style={{ flex: 1, backgroundColor: 'white' }}>
                <View style={{ height: 74, paddingTop: global.titleBarPaddingTop, flexDirection: 'row' }}>
                    <TouchableOpacity onPress={this.handleBackPress.bind(this)}>
                        <Image source={back} style={{
                            width: 20, height: 20, marginLeft: 15,
                            resizeMode: 'contain'
                        }}></Image>
                    </TouchableOpacity>

                    <View style={{ flex: 1, marginRight: 35, flexDirection: 'row', justifyContent: 'center' }}>
                        <Text style={{ fontSize: 15, color: 'black' }}>联系客服</Text>
                    </View>
                </View>
                <View style={{ backgroundColor: 'rgba(245,245,245,1)', height: 1 }}></View>
                <HTML style={{ margin: 10 }} html={helpCenter && helpCenter.code && helpCenter.code.content}></HTML>

                <Text style={{ color: 'rgba(150,150,150,1)', marginTop: 20, alignSelf: 'center' }}>微信号：{helpCenter && helpCenter.weChat && helpCenter.weChat.content
                    .replace("<p>", "").replace("</p>", "")}</Text>

            </View >

        );
    }
}