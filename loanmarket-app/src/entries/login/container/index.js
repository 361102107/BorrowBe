import React, { PureComponent } from "react";
import { View, Text, Image, TextInput, TouchableOpacity } from "react-native";
import { StackActions, NavigationActions } from "react-navigation";
import Toast, { DURATION } from 'react-native-easy-toast'
import Loading from 'react-native-whc-loading'
import * as Util from '../../../util/util'
import logo from "../../../assets/images/login_01.png";
import login_eye_o from "../../../assets/images/login_eye_o.png";
import login_eye_c from "../../../assets/images/login_eye_c.png";
var  TEXT_VIEW_ONE = 'TEXT_ONE';
var  TEXT_VIEW_TWO = 'TEXT_TWO';
export default class Index extends PureComponent {
    constructor() {
        super();
        this.state = { 
            phone:'',
            password:'',
            isShowPs: true,
            phoneLineColor:global.lineColor_Normal,
            passwordLineColor:global.lineColor_Normal,
        };
    }
    clickEyeBtn() {
        this.setState({
            isShowPs: !this.state.isShowPs,
        });

        // storage.load({
        //     key:'appToken',
        // }).then(ret => {
        //     console.log(ret);
        // }).catch(err => {

        // })

    }

    
    clickLoginBtn() {
        this.refs[TEXT_VIEW_ONE].blur();
        this.refs[TEXT_VIEW_TWO].blur();
        
        if (this.state.phone == "") {
            this.refs.toast.show('请输入手机号!');
            return;
        }
        if (this.state.password == "") {
            this.refs.toast.show('请输入登录密码!');
            return;
        }

        this.refs.loading.show();
        this.props.userLogin({ mobile: this.state.phone, password:Util.encryptPass(this.state.password)  })
            .then(res => {
                this.refs.loading.close();
                console.log(res);
                if (res && res.code == 0) {
                    global.storage.save({
                        key: 'appToken',
                        data: res.data.access_token,
                        expires: null
                    });
                    global.userInfo = res.data;
                    global.appToken = res.data.access_token,
                    this.pushToHome()
                }
                else {
                    this.refs.toast.show(res.msg);
                }
            }).catch(err => {
                this.refs.toast.show("网络错误");
                this.refs.loading.close();
            });
    }
    pushToHome() {
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
    clickRegisterBtn() {
        
        this.props.navigation.dispatch(
            StackActions.push({
                routeName: "Register",

            })
            
        );
    }
    clickFindPasswordBtn() {
        this.props.navigation.dispatch(
            StackActions.push({
                routeName: "FindPassword",
                
            })
        );
    
    }
    render() {
        
        return (
            <View style={{ flex: 1, backgroundColor: "white" }}>
                <Loading ref="loading" />
                <Toast ref="toast" />
                <Image source={logo}
                    style={{ width: 60, height: 60, marginLeft: 25, marginTop: 100, resizeMode: 'contain' }}>
                </Image>
                <Text style={{ marginLeft: 25, marginTop: 10, fontSize: 20 }}>欢迎登录借去呗</Text>

                <TextInput style={{ height: 40, marginLeft: 25, marginRight: 25, marginTop: 50 }}
                    maxLength={11}
                    placeholder={'请输入手机号'}
                    ref={TEXT_VIEW_ONE}
                    onChangeText={(phone) => this.setState({ phone })}
                    value={this.state.phone}
                    onFocus = {() => {this.setState({phoneLineColor:global.lineColor_High})}}
                    onEndEditing = {() => {this.setState({phoneLineColor:global.lineColor_Normal})}}
                />
                <View style={{ marginLeft: 25, marginRight: 25, height: 1, backgroundColor: this.state.phoneLineColor }} />

                <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 25, marginTop: 30 }}>
                    <TextInput style={{ flex: 1, height: 40 }}
                        maxLength={20}
                        ref={TEXT_VIEW_TWO}
                        secureTextEntry={!this.state.isShowPs}
                        placeholder={'请输入登录密码'}
                        onChangeText={(password) => this.setState({ password })}
                        value={this.state.password}
                        onFocus = {() => {this.setState({passwordLineColor:global.lineColor_High})}}
                        onEndEditing = {() => {this.setState({passwordLineColor:global.lineColor_Normal})}}
                    />
                    <TouchableOpacity onPress={this.clickEyeBtn.bind(this)}>
                        <Image source={!this.state.isShowPs ? login_eye_c : login_eye_o} style={{
                            width: 22,
                            height: 22,
                            marginRight: 25,
                            resizeMode: 'contain'
                        }}></Image>
                    </TouchableOpacity>
                </View>
                <View style={{ marginLeft: 25, marginRight: 25, height: 1, backgroundColor: this.state.passwordLineColor }} />
                <TouchableOpacity style={{
                    marginLeft: 25,
                    marginRight: 25,
                    marginTop: 30,
                    height: 45,
                    borderRadius:22.5,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: 'rgba(255,189,45,1)'
                    
                }} onPress={this.clickLoginBtn.bind(this)}>
                    <Text style={{ color: 'white' }}>登录</Text>
                </TouchableOpacity>

                <View style={{
                    flexDirection: 'row',
                    marginTop: 20,
                    marginLeft: 25,
                    marginRight: 25,
                    justifyContent: 'space-between',
                }}>
                    <TouchableOpacity onPress={this.clickRegisterBtn.bind(this)}>
                        <Text>注册新用户</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.clickFindPasswordBtn.bind(this)}>
                        <Text>找回密码</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}