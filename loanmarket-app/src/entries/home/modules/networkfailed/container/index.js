import React, { PureComponent } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { StackActions, NavigationActions } from "react-navigation";
import back from "../../../../../assets/images/back.png";
export default class Index extends PureComponent {
    constructor() {
        super();
    }
    componentDidMount() {
    }
    handleBackPress() {
        this.props.navigation.dispatch(StackActions.pop({
            n: 1,
        }));
    }
    reload() {
        // this.props.navigation.dispatch(StackActions.pop({
        //     n: 1,
        // }));
        this.props.navigation.dispatch(StackActions.pop({
            n: 1,
        }));
    }
    render() {
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
                        <Text style={{ fontSize: 15, color: 'black' }}>提示</Text>
                    </View>
                </View>
                <View style={{ backgroundColor: 'rgba(245,245,245,1)', height: 1 }} />
                <View style={{ justifyContent: 'center', alignItems: 'center', flex: 0.8 }}>
                    <Image style={{ height: 87, width: 87 }} source={require('../../../../../assets/images/not_found.png')} />
                    <Text style={{ color: "#727272", fontSize: 20, marginTop: 12 }}>网络连接失败</Text>
                    <Text style={{ color: "#AFAFAF", fontSize: 16, marginTop: 10 }}>请检查您的网络设置或重新加载</Text>
                    <TouchableOpacity style={{ borderRadius: 4, borderColor: '#DDDDDD', borderWidth: 1, marginTop: 20 }}
                        onPress={this.reload.bind(this)}>
                        <Text style={{ color: '#222222', paddingLeft: 39, paddingRight: 39, paddingTop: 16, paddingBottom: 16 }}>重新加载</Text>
                    </TouchableOpacity>

                </View>

            </View>
        );
    }
}
