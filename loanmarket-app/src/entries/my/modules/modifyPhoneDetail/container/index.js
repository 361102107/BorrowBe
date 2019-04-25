import React, { PureComponent } from "react";
import { View, Text, TouchableOpacity, TextInput, Image } from "react-native";
import back from "../../../../../assets/images/back.png";
import Toast from 'react-native-easy-toast';
import Loading from 'react-native-whc-loading';
import { StackActions, NavigationActions } from "react-navigation";

export default class Index extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            phone: '',
            code: '',
            token: '',
            ticket: this.props.navigation.state.params.ticket,
        };
    }
    handleBackPress() {
        this.props.navigation.dispatch(StackActions.pop({
            n: 1,
        }));
    }

    clickCodeBtn() {
        if (this.state.phone == "") {
            this.refs.toast.show('请输入手机号!');
            return;
        }
        if (this.state.token != "") {
            this.refs.loading.show();
            let param = { mobile: this.state.phone, ticket: this.state.ticket }
            let header = { "Authorization": "Bearer" + this.state.token }
            let params = { params: param, header }
            this.props.onModifyMobileSend(params)
                .then(res => {
                    this.refs.loading.close();
                    console.log(res);
                    if (res && res.code == 0) {
                        this.refs.toast.show("已向手机发送验证码!");
                        setInterval(
                            () => {
                                this.startTime();
                            },
                            1000,
                        );
                    }
                    else {
                        this.refs.toast.show(res.msg);
                    }
                }).catch(err => {
                    this.refs.toast.show("网络错误");
                    this.refs.loading.close();
                });
        }
    }
    startTime() {
        if (this.state.timeValue - 1 == 0) {
            clearInterval(
                () => {
                    this.startTime();
                },
                1000,
            );

        }
        this.setState({
            timeValue: this.state.timeValue - 1
        })
    }
    clickNextBtn() {
        if (this.state.phone == "") {
            this.refs.toast.show('请输入手机号!');
            return;
        }
        if (this.state.code == "") {
            this.refs.toast.show('请输入短信验证码!');
            return;
        }
        if (this.state.token != "") {
            this.refs.loading.show();
            let param = { mobile: this.state.phone, code: this.state.code }
            let header = { "Authorization": "Bearer" + this.state.token }
            let params = { params: param, header }
            this.props.onModifyMobileVerify(params)
                .then(res => {
                    this.refs.loading.close();
                    console.log(res);
                    if (res && res.code == 0) {
                        this.modifyMobile(res.data.ticket, this.state.phone)
                    }
                    else {
                        this.refs.toast.show(res.msg);
                    }
                }).catch(err => {
                    this.refs.toast.show("网络错误");
                    this.refs.loading.close();
                });
        }
    }
    modifyMobile(ticket, mobile) {
        if (this.state.token != "") {
            this.refs.loading.show();
            let param = { mobile: mobile, ticket: ticket }
            let header = { "Authorization": "Bearer" + this.state.token }
            let params = { params: param, header }
            this.props.onModifyMobile(params)
                .then(res => {
                    this.refs.loading.close();
                    console.log(res);
                    if (res && res.code == 0) {
                        this.refs.toast.show("操作成功!");
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
                    this.refs.toast.show("网络错误");
                    this.refs.loading.close();
                });
        }
    }
    componentDidMount() {
        storage.load({
            key: 'appToken',
        }).then(ret => {
            this.setState({
                token: ret
            })
        }).catch(err => {

        })
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

                    <View style={{ flex: 1, marginRight: 35, flexDirection: 'row', justifyContent: 'center' }}>
                        <Text style={{ fontSize: 15, color: 'black' }}>修改手机号码</Text>
                    </View>
                </View>
                <View style={{ backgroundColor: 'rgba(245,245,245,1)', height: 5 }}></View>

                <View style={{ flexDirection: 'row', marginTop: 20, alignItems: 'center' }}>
                    <Text style={{ marginLeft: 15, fontSize: 13, color: 'rgba(150,150,150,1)' }}>验证原号码/</Text>
                    <Text style={{ fontSize: 15 }}>绑定新手机</Text>
                </View>

                <View style={{ flexDirection: 'row', marginTop: 20, alignItems: 'center' }}>
                    <TextInput style={{ flex: 1, height: 40, marginLeft: 15 }}
                        maxLength={11}
                        placeholder={'请输入手机号'}
                        onChangeText={(phone) => this.setState({ phone })}
                        value={this.state.phone}
                    />
                    <TouchableOpacity onPress={this.clickCodeBtn.bind(this)}>
                        <Text style={{ color: 'orange', marginRight: 15 }}>获取验证码</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ marginLeft: 15, marginRight: 15, height: 1, backgroundColor: 'rgba(245,245,245,1)' }} />
                <TextInput style={{ height: 40, marginLeft: 15, marginTop: 15, marginRight: 15 }}
                    maxLength={11}
                    placeholder={'请输入验证码'}
                    onChangeText={(code) => this.setState({ code })}
                    value={this.state.code}
                />
                <View style={{ marginLeft: 15, marginRight: 15, height: 1, backgroundColor: 'rgba(245,245,245,1)' }} />
                <TouchableOpacity style={{
                    marginLeft: 15,
                    marginRight: 15,
                    marginTop: 40,
                    height: 45,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: 'rgba(255,189,45,1)'
                }} onPress={this.clickNextBtn.bind(this)}>
                    <Text style={{ color: 'white' }}>确定</Text>
                </TouchableOpacity>
                <Text style={{
                    marginLeft: 15,
                    marginTop: 30,
                    color: 'rgba(150,150,150,1)',
                    fontSize: 15
                }}>温馨提示:</Text>
                <Text style={{ marginLeft: 15, marginTop: 5, color: 'rgba(150,150,150,1)', fontSize: 13 }}>
                    手机号码修改成功后需要使用新的手机号码进行登录。</Text>
            </View>

        );
    }
}