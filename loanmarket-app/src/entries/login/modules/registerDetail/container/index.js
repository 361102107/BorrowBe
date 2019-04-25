import React, { PureComponent } from "react";
import { View, Text, TouchableOpacity, TextInput, Image } from "react-native";
import { StackActions } from "react-navigation";
import Toast, {DURATION} from 'react-native-easy-toast'
import Loading from 'react-native-whc-loading'
import * as Util from '../../../../../util/util'
import back from "../../../../../assets/images/back.png";
import logo from "../../../../../assets/images/register_logo.png";
import select from "../../../../../assets/images/sex_select.png";
import unselect from "../../../../../assets/images/sex_unselect.png";
import cancel from "../../../../../assets/images/cancel.png";
import login_eye_o from "../../../../../assets/images/login_eye_o.png";
import login_eye_c from "../../../../../assets/images/login_eye_c.png";
var  TEXT_VIEW_ONE = 'TEXT_ONE';
var  TEXT_VIEW_TWO = 'TEXT_TWO';
export default class Index extends PureComponent {
    constructor(props) {
        super(props);
         this.state = { 
            password:'',
            againPassword:'',
            isRead: false,
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
            this.refs.toast.show('请输入登录密码!');
            return;
        }
        if(this.state.againPassword == ""){
            this.refs.toast.show('请再次输入登录密码!');
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
        if(this.state.isRead == false){
            this.refs.toast.show('请勾选《用户协议》');
            return;
        }
        
        this.refs.loading.show();
        this.props.complete({ ticket: this.state.ticket, password: 
        Util.encryptPass(this.state.password), 
        password_confirm:Util.encryptPass(this.state.againPassword) })
            .then(res => {
                this.refs.loading.close();
                console.log(res);
                this.refs.toast.show("注册成功!");
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
    clickCancelBtn(){
        this.refs[TEXT_VIEW_ONE].blur();
        this.refs[TEXT_VIEW_TWO].blur();
        this.setState({
            password:"",
            againPassword:""
        })
    }
    clickEyeBtn(){
        this.setState({
            isShowPs: !this.state.isShowPs,
        });

        
    }
    clickReadBtn(){
        this.refs[TEXT_VIEW_ONE].blur();
        this.refs[TEXT_VIEW_TWO].blur();
        this.setState({
            isRead:!this.state.isRead
        })
    }
    clickUserProtocol(){
        
        this.props.navigation.dispatch(
            StackActions.push({
              routeName: "UserProtocol",
             
            })
          );
    } 
    render() {
        return (
            <View style={{flex:1,backgroundColor: 'white'}}>
                <Loading ref="loading"/>
                <Toast ref="toast"/>
                <View style = {{height:20,marginTop:50,marginLeft:15,flexDirection:'row'}}>
                    <TouchableOpacity style = {{width:30,height:30}} onPress={this.handleBackPress.bind(this)}>
                        <Image source = {back} style={{width: 20, 
                        height: 20,
                                
                        resizeMode:'contain'}}></Image>
                </TouchableOpacity>
                </View>

                <View style = {{flexDirection:'row',alignItems:'center',marginLeft:25,marginTop:50}}>
                    <Image source = {logo} 
                    style = {{width:24,height:24,resizeMode:'contain'}}>
                    </Image>
                    <Text style = {{fontSize:17,marginLeft:5}}>贷款APP</Text>
                </View>
                <Text style = {{marginLeft:25,marginTop:10,fontSize:20}}>设置登录密码</Text>

                <View style = {{flexDirection:'row',marginTop:20,alignItems:'center',marginLeft:15,marginRight:15}}>
                    <TextInput style={{flex:1,height: 40}}
                        maxLength = {20}
                        ref={TEXT_VIEW_ONE}
                        secureTextEntry = {!this.state.isShowPs}
                        placeholder = {'请设置6至20位登录密码'}
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
                            width: 22, 
                            height: 22,       
                            resizeMode:'contain'}}></Image>
                    </TouchableOpacity>
                    
                </View>
                <View style = {{marginLeft:15,marginRight:15,height:1,backgroundColor:this.state.passwordLineColor}}/>
                
                <TextInput style={{height: 40,marginLeft:15,marginTop:20,marginRight:15}}
                        maxLength = {20}
                        ref={TEXT_VIEW_TWO}
                        secureTextEntry = {!this.state.isShowPs}
                        placeholder = {'请再次确认登录密码'}
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
                        <Text style = {{color:'white'}}>注册</Text>
                </TouchableOpacity>

                <View style = {{flexDirection:'row',marginTop:25,justifyContent:'center'}}>
                    <TouchableOpacity onPress={this.clickReadBtn.bind(this)}>
                        <Image source = {this.state.isRead ? select : unselect} 
                        style = {{width:16,height:16,resizeMode:'contain'}}>
                        </Image>
                    </TouchableOpacity>
                    <Text style = {{marginLeft:5,marginRight:5,color:'gray'}}>我已阅读并同意</Text>
                    <TouchableOpacity onPress={this.clickUserProtocol.bind(this)}>
                        <Text style = {{color:'rgba(79,119,220,1)'}}>《用户协议》</Text>
                    </TouchableOpacity>
                </View>
                
            </View>
            
            
        );
    }
}