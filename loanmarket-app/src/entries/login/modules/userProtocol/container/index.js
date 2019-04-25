import React, { PureComponent } from "react";
import { View, Text, TouchableOpacity, ScrollView, Image, Dimensions } from "react-native";
import { StackActions } from "react-navigation";
import back from "../../../../../assets/images/back.png";
import HTML from "react-native-render-html";

export default class Index extends PureComponent {
    constructor() {
        super();
        this.state = {
            filed: "agreement"
        }

    }
    handleBackPress() {
        this.props.navigation.dispatch(StackActions.pop({
            n: 1,
        }));
    }
    componentDidMount() {
        storage.load({
            key: 'appToken',
        }).then(ret => {
            console.log(ret);
            this.getSetting(ret);
        }).catch(err => {

        })
    }
    getSetting(token) {
        let { filed } = this.state;
        let param = {
            filed
        }
        let header = { "Authorization": "Bearer" + token }
        let params = { params: param, header }
        console.log(params)
        this.props.getProtocol(params);
    }

    render() {
        let { helpCenter } = this.props
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
                        <Text style={{ fontSize: 15, color: 'black' }}>用户协议</Text>
                    </View>
                </View>
                <View style={{ backgroundColor: 'rgba(245,245,245,1)', height: 1 }}></View>
                <ScrollView style={{ flex: 1, padding: 20, marginBottom: 10 }}>
                    <HTML style={{ padding: 20, fontSize: 16, color: "#AFAFAF" }} html={helpCenter && helpCenter.agreement && helpCenter.agreement.content + "<p/>"}
                        imagesMaxWidth={Dimensions.get("window").width - 20}></HTML>
                </ScrollView>


            </View>

        );
    }
}