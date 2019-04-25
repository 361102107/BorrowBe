import React, { PureComponent } from "react";
import { View, Text, TouchableOpacity, TextInput, Image } from "react-native";
import { StackActions } from "react-navigation";
import Toast, {DURATION} from 'react-native-easy-toast';
import Loading from 'react-native-whc-loading';
import * as Util from '../../../../../util/util'
import back from "../../../../../assets/images/back.png";
import login_eye_o from "../../../../../assets/images/login_eye_o.png";
import login_eye_c from "../../../../../assets/images/login_eye_c.png";
import cancel from "../../../../../assets/images/cancel.png";
var  TEXT_VIEW_ONE = 'TEXT_ONE';
var  TEXT_VIEW_TWO = 'TEXT_TWO';
export default class Index extends PureComponent {
    constructor(props) {
        super(props);
         this.state = { 
            password:'',
            againPassword:'',
            isShowPs: true,
            ticket: this.props.navigation.state.params.ticket,
            passwordLineColor:global.lineColor_Normal,
            againPasswordLineColor:global.lineColor_Normal,
         };
    }
    handleBackPress() {
        this.props.navigation.dispatch(StackActions.pop({
          n: 1,
      }));
    }
    clickSubmitBtn(){
        this.refs[TEXT_VIEW_ONE].blur();
        this.refs[TEXT_VIEW_TWO].blur();
        if(this.state.password == ""){
            this.refs.toast.show('请输入新的登录密码!');
            return;
        }
        if(this.state.againPassword == ""){
            this.refs.toast.show('请再次输入新的登录密码!');
            return;
        }
        if(this.state.againPassword != this.state.password){
            this.refs.toast.show('两次密码输入不一致!');
            return;
        }
        if(this.state.password.length < 6){
            this.refs.toast.show('密码必须大于或等于6位!');
            return;
        }
        this.refs.loading.show();
        this.props.setPassword({ ticket: this.state.ticket, password: 
        Util.encryptPass(this.state.password), 
        password_confirm:Util.encryptPass(this.state.againPassword)})
            .then(res => {
                this.refs.loading.close();
                console.log(res);
                this.refs.toast.show("修改密码成功!");
                if (res && res.code == 0) {
                    this.props.navigation.dispatch(StackActions.pop({
                        n: 2,
                    }));
    
                }
                else {
                    this.refs.toast.show(res.msg);
                }
            }).catch(err => {
                this.refs.toast.show("网络错误");
                this.refs.loading.close();
            });
    }
    clickEyeBtn(){
        
        this.setState({
            isShowPs: !this.state.isShowPs,
        })
    }
    clickCancelBtn(){
        this.refs[TEXT_VIEW_ONE].blur();
        this.refs[TEXT_VIEW_TWO].blur();
        this.setState({
            password:"",
            againPassword:""
        })
    }
    render() {
        return (
            <View style={{flex:1,backgroundColor: 'white'}}>
                <Loading ref="loading"/>
                <Toast ref="toast"/>
                <View style = {{height:74,paddingTop:50,flexDirection:'row'}}>
                    <TouchableOpacity onPress={this.handleBackPress.bind(this)}>
                        <Image source = {back} style={{width: 20, height: 20,marginLeft:15,
                                    resizeMode:'contain'}}></Image>
                    </TouchableOpacity>

                    <View  style = {{flex:1,marginRight:35,flexDirection:'row',justifyContent:'center'}}>
                        <Text  style = {{fontSize:15,color:'black'}}>找回密码</Text>
                    </View>
                </View>
                <View style = {{backgroundColor:'rgba(245,245,245,1)',height:5}}></View>
                
                <View style = {{flexDirection:'row',marginTop:20,alignItems:'center'}}>
                    <Text style = {{marginLeft:15,fontSize:13,color:'rgba(150,150,150,1)'}}>验证手机号码/</Text>
                    <Text style = {{fontSize:14}}>设置新密码</Text>
                </View>

                <View style = {{flexDirection:'row',marginTop:20,alignItems:'center',marginLeft:15,marginRight:15}}>
                    <TextInput style={{flex:1,height: 40}}
                        maxLength = {20}
                        ref={TEXT_VIEW_ONE}
                        secureTextEntry = {!this.state.isShowPs}
                        placeholder = {'请输入新的登陆密码(6至20位)'}
                        onChangeText={(password) => this.setState({password})}
                        value={this.state.password}
                        onFocus = {() => {this.setState({passwordLineColor:global.lineColor_High})}}
                        onEndEditing = {() => {this.setState({passwordLineColor:global.lineColor_Normal})}}
                        />
                    <TouchableOpacity onPress={this.clickCancelBtn.bind(this)}>
                        <Image source = {cancel} style={{
                            width: 19, 
                            height: 19,  
                            marginRight:10,     
                            resizeMode:'contain'}}></Image>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.clickEyeBtn.bind(this)}>
                        <Image source = {!this.state.isShowPs ? login_eye_c : login_eye_o} style={{
                            width: 19, 
                            height: 19,       
                            resizeMode:'contain'}}></Image>
                    </TouchableOpacity>
                    
                </View>
                <View style = {{marginLeft:15,marginRight:15,height:1,backgroundColor:this.state.passwordLineColor}}/>
                
                <TextInput style={{height: 40,marginLeft:15,marginTop:20,marginRight:15}}
                        maxLength = {20}
                        ref={TEXT_VIEW_TWO}
                        secureTextEntry = {!this.state.isShowPs}
                        placeholder = {'请再次输入新的登陆密码'}
                        onChangeText={(againPassword) => this.setState({againPassword})}
                        value={this.state.againPassword}
                        onFocus = {() => {this.setState({againPasswordLineColor:global.lineColor_High})}}
                        onEndEditing = {() => {this.setState({againPasswordLineColor:global.lineColor_Normal})}}
                        />
                
                <View style = {{marginLeft:15,marginRight:15,height:1,backgroundColor:this.state.againPasswordLineColor}}/>

                <TouchableOpacity style = {{
                    marginLeft:15,
                    marginRight:15,
                    marginTop:40,
                    height:45,
                    borderRadius:22.5,
                    justifyContent:'center',
                    alignItems:'center',
                    backgroundColor:'rgba(255,189,45,1)'}} onPress={this.clickSubmitBtn.bind(this)}>
                        <Text style = {{color:'white'}}>提交</Text>
                </TouchableOpacity>
                
            </View>
            
        );
    }
}