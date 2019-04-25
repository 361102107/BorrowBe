import React, { PureComponent } from "react";
import { View, Text, Image, Platform } from "react-native";
import { StackActions, NavigationActions } from "react-navigation";
import AlertTip from "../../../components/AlertTip";
export default class Index extends PureComponent {
    constructor() {
        super();
    }
    componentDidMount() {
        setTimeout(() => {
            storage.load({
                key: 'notFirstStart',
            }).then(ret => {
                console.log(ret)
                if (ret != null && ret != undefined && ret == true) {
                    if (3 < 2) {
                        this.refs.rAlert.show("1.qeqwew\n\n2.faadsfdfsdfas\n\n3.fasfsdfsddddddddddddddddddddd")
                    } else {
                        storage.load({
                            key: 'appToken',
                        }).then(ret => {
                            console.log("ret:" + ret)
                            if (ret == null || ret == "" || ret == undefined) {
                                this.props.navigation.dispatch(
                                    StackActions.reset({
                                        index: 0,
                                        actions: [
                                            NavigationActions.navigate({
                                                routeName: "Login"
                                            })
                                        ]
                                    })
                                );
                            } else {
                                global.appToken = ret,
                                    this.props.navigation.dispatch(
                                        StackActions.reset({
                                            index: 0,
                                            actions: [
                                                NavigationActions.navigate({
                                                    routeName: "TabRoot"
                                                })
                                            ]
                                        })
                                    );
                            }
                        }).catch(err => {
                            this.props.navigation.dispatch(
                                StackActions.reset({
                                    index: 0,
                                    actions: [
                                        NavigationActions.navigate({
                                            routeName: "Login"
                                        })
                                    ]
                                })
                            );
                        })
                    }
                } else {
                    this.props.navigation.dispatch(
                        StackActions.reset({
                            index: 0,
                            actions: [
                                NavigationActions.navigate({
                                    routeName: "Boot"
                                })
                            ]
                        })
                    );
                }
            }).catch(err => {
                this.props.navigation.dispatch(
                    StackActions.reset({
                        index: 0,
                        actions: [
                            NavigationActions.navigate({
                                routeName: "Boot"
                            })
                        ]
                    })
                );
            })
        }, Platform.OS === 'ios' ? 2000 : 0);
    }
    render() {
        return (
            Platform.OS === 'ios' ? <View style={{ flex: 1 }}>
                <AlertTip ref="rAlert" />
                <Image style={{
                    flex: 1, width: '100%', height: '100%',
                    resizeMode: 'cover'
                }}
                    source={require('../../../assets/images/splash.png')} />
            </View> : null


        );
    }
}
