import React, { PureComponent } from "react";
import { View, Text, TouchableOpacity, TextInput, Image } from "react-native";
import { StackActions, NavigationActions } from "react-navigation";
import back from "../../../../../assets/images/back.png";
import Toast from 'react-native-easy-toast';
import Loading from 'react-native-whc-loading';
import * as Util from '../../../../../util/util';

export default class Index extends PureComponent {
    constructor() {
        super();
        this.state = {
            old_password: '',
            password: '',
            password_confirm: '',
        };
    }
    handleBackPress() {
        this.props.navigation.dispatch(StackActions.pop({
            n: 1,
        }));
    }
    clickCell(value) {
        this.props.navigation.dispatch(
            StackActions.push({
                routeName: "MineInfo",

            })
        );
    }
    clickSaveBtn() {
        if (this.state.old_password == "") {
            this.refs.toast.show('请输入旧密码!');
            return;
        }
        if (this.state.password == "") {
            this.refs.toast.show('请输入新密码!');
            return;
        }
        if (this.state.password_confirm == "") {
            this.refs.toast.show('请输入确认密码!');
            return;
        }
        if (this.state.password != this.state.password_confirm) {
            this.refs.toast.show('确认密码不一致!');
            return;
        }
        if (this.state.password_confirm.length < 6 || this.state.password_confirm.length > 20) {
            this.refs.toast.show('请输入6至20位密码!');
            return;
        }
        storage.load({
            key: 'appToken',
        }).then(ret => {
            this.modifyPassword(ret)
        }).catch(err => {

        })
    }
    modifyPassword(token) {
        let { old_password, password, password_confirm } = this.state;
        // let params = {
        //     old_password, password, password_confirm
        // }
        console.log("here")
        let params = {
            old_password: Util.encryptPass(this.state.old_password),
            password: Util.encryptPass(this.state.password),
            password_confirm: Util.encryptPass(this.state.password_confirm)
        }
        console.log("here1")
        let header = { "Authorization": "Bearer" + token }
        let paramters = { params: params, header }
        this.refs.loading.show();
        this.props.onModifyPassword(paramters)
            .then(res => {
                console.log("her2")
                this.refs.loading.close();
                console.log(res);
                if (res && res.code == 0) {
                    this.refs.toast.show("操作成功")
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
                }
                else {
                    this.refs.toast.show(res.msg);
                }
            }).catch(err => {
                console.log("here3")
                this.refs.toast.show("网络错误");
                this.refs.loading.close();
            });
    }
    render() {
        return (
            <View style={{ flex: 1, backgroundColor: 'white' }}>
                <Loading ref="loading" />
                <Toast ref="toast" />
                <View style={{ height: 74, paddingTop: global.titleBarPaddingTop, flexDirection: 'row' }}>
                    <TouchableOpacity onPress={this.handleBackPress.bind(this)}>
                        <Image source={back} style={{
                            width: 20, height: 20, marginLeft: 15,
                            resizeMode: 'contain'
                        }}></Image>
                    </TouchableOpacity>

                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }}>
                        <Text style={{ fontSize: 15, color: 'black' }}>修改密码</Text>
                    </View>
                    <TouchableOpacity onPress={this.clickSaveBtn.bind(this)}>
                        <Text style={{ fontSize: 13, color: 'rgba(79,119,220,1)', width: 35 }}>完成</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ backgroundColor: 'rgba(245,245,245,1)', height: 5 }}></View>
                <Text style={{ marginLeft: 15, marginTop: 20 }}>旧密码</Text>
                <TextInput style={{ height: 40, marginLeft: 15, marginTop: 5 }}
                    maxLength={20}
                    secureTextEntry={true}
                    placeholder={'请输入旧密码'}
                    onChangeText={(old_password) => this.setState({ old_password })}
                    value={this.state.old_password}
                />
                <View style={{ marginLeft: 15, height: 1, backgroundColor: 'rgba(245,245,245,1)' }} />
                <Text style={{ marginLeft: 15, marginTop: 20 }}>新密码</Text>
                <TextInput style={{ height: 40, marginLeft: 15, marginTop: 5 }}
                    maxLength={20}
                    secureTextEntry={true}
                    placeholder={'请输入新密码(6至20位字符或数字)'}
                    onChangeText={(password) => this.setState({ password })}
                    value={this.state.password}
                />
                <View style={{ marginLeft: 15, height: 1, backgroundColor: 'rgba(245,245,245,1)' }} />
                <Text style={{ marginLeft: 15, marginTop: 20 }}>确认密码</Text>
                <TextInput style={{ height: 40, marginLeft: 15, marginTop: 5 }}
                    maxLength={20}
                    secureTextEntry={true}
                    placeholder={'请再次输入新密码'}
                    onChangeText={(password_confirm) => this.setState({ password_confirm })}
                    value={this.state.password_confirm}
                />
                <View style={{ marginLeft: 15, height: 1, backgroundColor: 'rgba(245,245,245,1)' }} />
            </View>

        );
    }
}