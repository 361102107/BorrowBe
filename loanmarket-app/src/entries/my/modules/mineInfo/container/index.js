import React, { PureComponent } from "react";
import { View, Text, TouchableOpacity, Image, FlatList, ScrollView, TextInput } from "react-native";
import { StackActions } from "react-navigation";
import back from "../../../../../assets/images/back.png";
import mine_01 from "../../../../../assets/images/mine_01.png";
import sex_select from "../../../../../assets/images/sex_select.png";
import sex_unselect from "../../../../../assets/images/sex_unselect.png";
import indicator from "../../../../../assets/images/indicator.png";
import Toast from 'react-native-easy-toast';
import Loading from 'react-native-whc-loading';
import DateUtils from '../../../../../util/DateUtils';
import OpenBox from '../../../../../components/OpenBox';
import ImageResizer from 'react-native-image-resizer';

export default class Index extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            //请求参数
            nickname: this.props.navigation.state.params.profile.nickname,
            profession: this.props.navigation.state.params.profile.profession,
            signature: this.props.navigation.state.params.profile.signature,
            birthday: this.props.navigation.state.params.profile.birthday,
            city: this.props.navigation.state.params.profile.city,
            sex: this.props.navigation.state.params.profile.sex,
            profile: this.props.navigation.state.params.profile,
            avatar_url: this.props.navigation.state.params.profile.avatar_url,
            user_id: this.props.navigation.state.params.profile.user_id,
            picBoxShow: false,
        };
    }
    handleBackPress() {
        this.props.navigation.dispatch(StackActions.pop({
            n: 1,
        }));
    }
    clickSaveBtn() {
        storage.load({
            key: 'appToken',
        }).then(ret => {
            console.log(ret);
            this.updateInfo(ret)
        }).catch(err => {

        })
    }
    updateInfo(token) {
        let { nickname, sex, city, profession, signature, birthday } = this.state;
        let param = {
            nickname, sex, city, profession, signature, birthday
        }
        let header = { "Authorization": "Bearer" + token }
        let params = { params: param, header }
        this.refs.loading.show();
        this.props.updateInfo(params)
            .then(res => {
                this.refs.loading.close();
                console.log(res);
                console.log("1234");
                if (res && res.code == 0) {
                    this.refs.toast.show("操作成功")
                    this.handleBackPress()
                }
                else {
                    this.refs.toast.show(res.msg);
                }
            }).catch(err => {
                this.refs.toast.show("网络错误");
                this.refs.loading.close();
            });
    }
    clickUserImage() {
        this.setState({
            picBoxShow: true
        });
    }
    clickBirthdayBtn() {
        DateUtils.showDateAndYear((y, m, d) => {
            this.setState({
                birthday: y + '-' + m + '-' + d,
            })
        })
    }
    clickCityBtn() {
        this._showAreaPicker()
    }
    _showAreaPicker() {
        DateUtils.showPickerCity((y, m) => {
            this.setState({
                city: m,
            })
        })
    }
    clickSexBtn(value) {//1 男,2 女
        this.setState({ sex: value });
    }
    componentDidMount() {
        // 通过addListener开启监听，可以使用上面的四个属性
        this._didBlurSubscription = this.props.navigation.addListener(
            'didFocus',
            payload => {
                storage.load({
                    key: 'appToken',
                }).then(ret => {
                    this.getProfile(ret)
                }).catch(err => {

                })

            });

    }
    getProfile(token) {
        let header = { "Authorization": "Bearer" + token }
        let params = { params: null, header }
        this.refs.loading.show();
        this.props.profile(params)
            .then(res => {
                this.refs.loading.close();
                if (res && res.code == 0) {
                    console.log(res.data)
                    this.setState({
                        nickname: res.data.nickname,
                        profession: res.data.profession,
                        signature: res.data.signature,
                        birthday: res.data.birthday,
                        city: res.data.city,
                        sex: res.data.sex,
                        profile: res.data,
                        avatar_url: res.data.avatar_url,
                        user_id: res.data.user_id,
                    })
                }
                else {
                    this.refs.toast.show(res.msg);
                }
            }).catch(err => {
                this.refs.toast.show("网络错误");
                this.refs.loading.close();
            });
    }
    addImage = (uriSource) => {
        this.setState({
            avatar_url: uriSource,
            picBoxShow: false
        })
        //压缩图片
        ImageResizer.createResizedImage(uriSource, 100, 100, 'JPEG', 80)
            .then(({ uri }) => {
                storage.load({
                    key: 'appToken',
                }).then(ret => {
                    this.updateHead(ret, uri)
                }).catch(err => {
        
                })
            })
            .catch(err => {
                console.log(err);
                return Alert.alert('Unable to resize the photo', 'Check the console for full the error message');
            });

      
       
    }
    updateHead(token, uri) {

        let data = new FormData();
        data.append('avatar_url', {
            uri: uri,
            type: 'multipart/form-data',
            name: 'a.jpg'
        });

        let header = { "Authorization": "Bearer " + token, "Content-Type": 'multipart/form-data' }
        // fetch('http://loanmarket.zhepm.com/api/user/upload-head',{
        //     method:'POST',
        //     credentials:'include',
        //     body:data,
        //     headers:{
        //         ...header
        //     }
        // })
        let paramters = { params: data, header }
        this.refs.loading.show();
        this.props.uploadHead(paramters)
            .then(res => {
                this.refs.loading.close();
                console.log(res);
                var result = JSON.parse(res)
                if (result && result.code == 0) {
                    this.refs.toast.show("操作成功")
                    this.handleBackPress()
                }
                else {
                    this.refs.toast.show(result.msg);
                }
            }).catch(err => {
                this.refs.toast.show(err.msg);
                this.refs.loading.close();
            });
    }

    resize() {
        ImageResizer.createResizedImage(this.state.image.uri, 8, 6, 'JPEG', 80)
            .then(({ uri }) => {
                this.setState({
                    resizedImageUri: uri,
                });
            })
            .catch(err => {
                console.log(err);
                return Alert.alert('Unable to resize the photo', 'Check the console for full the error message');
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
                        <Text style={{ fontSize: 15, color: 'black' }}>个人信息</Text>
                    </View>
                    <TouchableOpacity onPress={this.clickSaveBtn.bind(this)}>
                        <Text style={{ fontSize: 13, color: 'rgba(79,119,220,1)', width: 35 }}>保存</Text>
                    </TouchableOpacity>
                </View>
                <ScrollView showsHorizontalScrollIndicator={false}
                    style={{ height: 80 }}>
                    <View style={{ marginTop: 40, alignItems: 'center' }}>
                        <TouchableOpacity onPress={this.clickUserImage.bind(this)}>
                            {
                                (this.state.avatar_url == "" || this.state.avatar_url == null) ?
                                    <Image source={mine_01} style={{
                                        width: 120, height: 120, borderRadius: 60,
                                        resizeMode: 'cover'
                                    }}></Image> :
                                    <Image source={{ uri: this.state.avatar_url }} style={{
                                        width: 120, height: 120, borderRadius: 60,
                                        resizeMode: 'cover'
                                    }}></Image>
                            }

                        </TouchableOpacity>

                    </View>
                    <View style={{ marginTop: 13, alignItems: 'center' }}>
                        <Text style={{ color: 'rgba(150,150,150,1)' }}>点击修改头像</Text>
                    </View>
                    <View style={{ marginTop: 20, height: 5, backgroundColor: 'rgba(245,245,245,1)' }}></View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', height: 60, marginLeft: 20, marginRight: 20 }}>
                        <Text style={{ flex: 1 }}>用户ID</Text>
                        <Text style={{ color: 'rgba(150,150,150,1)' }}>{this.state.user_id}</Text>
                    </View>
                    <View style={{ marginLeft: 15, marginRight: 15, height: 1, backgroundColor: 'rgba(245,245,245,1)' }}></View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', height: 60, marginLeft: 20, marginRight: 20 }}>
                        <Text style={{ flex: 1 }}>昵称</Text>
                        <TextInput style={{ height: 40, color: 'rgba(150,150,150,1)' }}
                            maxLength={20}
                            placeholder={'填写昵称'}
                            onChangeText={(nickname) => this.setState({ nickname })}
                            value={this.state.nickname}
                        />
                    </View>
                    <View style={{ marginLeft: 15, marginRight: 15, height: 1, backgroundColor: 'rgba(245,245,245,1)' }}></View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', height: 60, marginLeft: 20, marginRight: 20 }}>
                        <Text style={{ flex: 1 }}>性别</Text>
                        <TouchableOpacity onPress={this.clickSexBtn.bind(this, '1')}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Image source={this.state.sex == '1' ? sex_select : sex_unselect} style={{
                                    width: 22, height: 22,
                                    resizeMode: 'contain'
                                }}></Image>
                                <Text style={{ color: 'rgba(150,150,150,1)', marginLeft: 5 }}>男</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this.clickSexBtn.bind(this, '2')}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 10 }}>
                                <Image source={this.state.sex == '2' ? sex_select : sex_unselect} style={{
                                    width: 22, height: 22,
                                    resizeMode: 'contain'
                                }}></Image>
                                <Text style={{ color: 'rgba(150,150,150,1)', marginLeft: 5 }}>女</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={{ marginLeft: 15, marginRight: 15, height: 1, backgroundColor: 'rgba(245,245,245,1)' }}></View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', height: 60, marginLeft: 20, marginRight: 20 }}>
                        <Text style={{ flex: 1 }}>生日</Text>
                        <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }} onPress={this.clickBirthdayBtn.bind(this)}>
                            <Text style={{ color: 'rgba(150,150,150,1)' }}>{this.state.birthday}</Text>
                            <Image source={indicator} style={{
                                width: 6, height: 7, marginLeft: 10,
                                resizeMode: 'contain'
                            }}></Image>
                        </TouchableOpacity>

                    </View>
                    <View style={{ marginLeft: 15, marginRight: 15, height: 1, backgroundColor: 'rgba(245,245,245,1)' }}></View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', height: 60, marginLeft: 20, marginRight: 20 }}>
                        <Text style={{ flex: 1 }}>城市</Text>
                        <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }} onPress={this.clickCityBtn.bind(this)}>
                            <Text style={{ color: 'rgba(150,150,150,1)' }}>{this.state.city}</Text>
                            <Image source={indicator} style={{
                                width: 6, height: 7, marginLeft: 10,
                                resizeMode: 'contain'
                            }}></Image>
                        </TouchableOpacity>
                    </View>
                    <View style={{ marginLeft: 15, marginRight: 15, height: 1, backgroundColor: 'rgba(245,245,245,1)' }}></View>
                    <View style={{ flex: 1, flexDirection: 'row', marginLeft: 20, marginRight: 20 }}>
                        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', marginRight: 20, height: 60 }}>
                            <Text style={{ flex: 1 }}>职业</Text>
                        </View>
                        <View style={{ flex: 4, flexDirection: 'row', }}>
                            <Text style={{ flex: 1 }}></Text>
                            <TextInput style={{ color: 'rgba(150,150,150,1)', }}
                                maxLength={50}
                                multiline={true}
                                placeholder={this.state.profession}
                                onChangeText={(profession) => this.setState({ profession })}
                                value={this.state.profession}
                            />
                        </View>
                    </View>


                    <View style={{ marginLeft: 15, marginRight: 15, height: 1, backgroundColor: 'rgba(245,245,245,1)' }}></View>
                    <View style={{ flex: 1, flexDirection: 'row', marginLeft: 20, marginRight: 20 }}>
                        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', marginRight: 20, height: 60 }}>
                            <Text style={{ flex: 1 }}>个性签名</Text>
                        </View>
                        <View style={{ flex: 4, flexDirection: 'row', }}>
                            <Text style={{ flex: 1 }}></Text>
                            <TextInput style={{ color: 'rgba(150,150,150,1)', }}
                                maxLength={255}
                                multiline={true}
                                placeholder={this.state.signature}
                                onChangeText={(signature) => this.setState({ signature })}
                                value={this.state.signature}
                            />
                        </View>
                    </View>
                    <View style={{ marginLeft: 15, marginRight: 15, height: 1, backgroundColor: 'rgba(245,245,245,1)' }}></View>
                </ScrollView>
                <OpenBox
                    isShow={this.state.picBoxShow}
                    close={() => this.setState({ picBoxShow: false })}
                    addImage={(uri) => this.addImage(uri)}
                />
            </View>

        );
    }
}