import React, { PureComponent } from "react";
import { View, Text, TouchableOpacity, FlatList, Image } from "react-native";
import { StackActions } from "react-navigation";
import back from "../../../../../assets/images/back.png";
import logo from "../../../../../assets/images/about_logo.png";
import AbountCell from "./aboutCell";
export default class Index extends PureComponent {
    constructor() {
        super();

    }
    handleBackPress() {
        this.props.navigation.dispatch(StackActions.pop({
            n: 1,
        }));
    }
    clickUserProtocol() {
        this.props.navigation.dispatch(
            StackActions.push({
                routeName: "UserProtocol",

            })
        );
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
        this.props.getSetting(params);
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
                        <Text style={{ fontSize: 15, color: 'black' }}>关于我们</Text>
                    </View>
                </View>
                <View style={{ backgroundColor: 'rgba(245,245,245,1)', height: 1 }}></View>
                <Image source={logo}
                    style={{ width: 80, height: 80, resizeMode: 'contain', marginTop: 50, alignSelf: 'center' }}>
                </Image>
                <Text style={{ color: 'rgba(150,150,150,1)', marginTop: 20, alignSelf: 'center' }}>贷款系统</Text>
                <FlatList style={{ flex: 1, marginTop: 30 }}
                    data={[
                        { id: "0", title: '客服热线', content: helpCenter && helpCenter.telephone && helpCenter.telephone.content },
                        { id: "1", title: '客服邮箱', content: helpCenter && helpCenter.email && helpCenter.email.content },
                        { id: "2", title: '客服微信', content: helpCenter && helpCenter.weChat && helpCenter.weChat.content },
                        { id: "3", title: '当前版本', content: "V1.0" },
                    ]}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) =>
                        <AbountCell
                            title={item.title}
                            content={item.content}
                        ></AbountCell>
                    }
                />

                <TouchableOpacity style={{ marginBottom: 10, alignSelf: 'center' }}
                    onPress={this.clickUserProtocol.bind(this)}>
                    <Text style={{ color: 'rgba(79,119,220,1)' }}>《贷款系统用户协议》</Text>
                </TouchableOpacity>
                <Text style={{ color: 'rgba(150,150,150,1)', alignSelf: 'center', marginBottom: 30 }}>CopyRight @ 贷款系统 2015 - 2019</Text>
            </View>

        );
    }
}