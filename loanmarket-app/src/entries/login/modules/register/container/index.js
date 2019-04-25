import React, { PureComponent } from "react";
import { View, Text, TouchableOpacity, TextInput, Image } from "react-native";
import { StackActions } from "react-navigation";
import Toast, {DURATION} from 'react-native-easy-toast'
import Loading from 'react-native-whc-loading'
import back from "../../../../../assets/images/back.png";
import logo from "../../../../../assets/images/register_logo.png";
import select from "../../../../../assets/images/sex_select.png";
import unselect from "../../../../../assets/images/sex_unselect.png";
import cancel from "../../../../../assets/images/cancel.png";
var  TEXT_VIEW_ONE = 'TEXT_ONE';
var  TEXT_VIEW_TWO = 'TEXT_TWO';
export default class Index extends PureComponent {
    constructor() {
        super();
         this.state = { 
            phone:'',
            code:'',
            isRead: false,
            timeValue:60,
            phoneLineColor:global.lineColor_Normal,
            codeLineColor:global.lineColor_Normal,
         };
         this.timer = null;
    }
    handleBackPress() {
        this.props.navigation.dispatch(StackActions.pop({
          n: 1,
      }));
    }
    clickSubmitBtn(){
        this.refs[TEXT_VIEW_ONE].blur();
        this.refs[TEXT_VIEW_TWO].blur();
        if(this.state.phone == ""){
            this.refs.toast.show('请输入手机号!');
            return;
        }
        if(this.state.code == ""){
            this.refs.toast.show('请输入短信验证码!');
            return;
        }
        if(this.state.isRead == false){
            this.refs.toast.show('请勾选《用户协议》');
            return;
        }
    
        this.props.verify({ mobile: this.state.phone, code: this.state.code})
            .then(res => {
                this.refs.loading.close();
                console.log(res);
                if (res && res.code == 0) {
                    
                    this.props.navigation.dispatch(
                        StackActions.push({
                            routeName: "RegisterDetail",
                            params:{
                                ticket: res.data.ticket
                            }
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
    clickCodeBtn(){
        this.refs[TEXT_VIEW_ONE].blur();
        this.refs[TEXT_VIEW_TWO].blur();
        if(this.state.phone == ""){
            this.refs.toast.show('请输入手机号!');
            return;
        }
        
        this.refs.loading.show();
        this.props.getCode({ mobile: this.state.phone})
            .then(res => {
                this.refs.loading.close();
                console.log(res);
                if (res && res.code == 0) {
                    this.refs.toast.show("验证码发送成功!");
                    this.startTime();
                }
                else {
                    this.refs.toast.show(res.msg);
                }
            }).catch(err => {
                this.refs.toast.show("网络错误");
                this.refs.loading.close();
            });
    }
    componentWillUnmount(){     //卸载组件前执行的钩子函数
        
        clearInterval(this.timer);      //清除定时器
    }
    
    startTime(){
        this.setState({
            timeValue: 59
        })
        this.timer = setInterval(
            ()=>{  
            this.setState({
                timeValue: this.state.timeValue - 1
            })
            if(this.state.timeValue == 0){
                clearInterval(this.timer);
                this.setState({
                    timeValue: 60
                })
            }
        },
            1000,
        );  
    }
    clickCancelBtn(){
        this.refs[TEXT_VIEW_ONE].blur();
        this.refs[TEXT_VIEW_TWO].blur();
        this.setState({
            phone:""
        })
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
                <Text style = {{marginLeft:25,marginTop:10,fontSize:20}}>欢迎新用户注册</Text>

                <View style = {{flexDirection:'row',marginTop:20,alignItems:'center',marginLeft:15,marginRight:15}}>
                    <TextInput style={{flex:1,height: 40}}
                        maxLength = {11}
                        ref={TEXT_VIEW_ONE}
                        placeholder = {'请输入手机号'}
                        onChangeText={(phone) => this.setState({phone})}
                        value={this.state.phone}
                        onFocus = {() => {this.setState({phoneLineColor:global.lineColor_High})}}
                        onEndEditing = {() => {this.setState({phoneLineColor:global.lineColor_Normal})}}
                        />
                    <TouchableOpacity onPress={this.clickCancelBtn.bind(this)}>
                        <Image source = {cancel} style={{
                            width: 19, 
                            height: 19, 
                            marginRight:10,      
                            resizeMode:'contain'}}></Image>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.clickCodeBtn.bind(this)} 
                    disabled = {this.state.timeValue == 60 ? false : true}>
                        <Text style = {{color:'orange',marginRight:15}}>
                        {this.state.timeValue == 60 ? '获取验证码' : this.state.timeValue + "s"}
                        </Text>
                    </TouchableOpacity>
                    
                </View>
                <View style = {{marginLeft:15,marginRight:15,height:1,backgroundColor:this.state.phoneLineColor}}/>
                
                <TextInput style={{height: 40,marginLeft:15,marginTop:20,marginRight:15}}
                        maxLength = {11}
                        ref={TEXT_VIEW_TWO}
                        placeholder = {'请输入短信验证码'}
                        onChangeText={(code) => this.setState({code})}
                        value={this.state.code}
                        onFocus = {() => {this.setState({codeLineColor:global.lineColor_High})}}
                        onEndEditing = {() => {this.setState({codeLineColor:global.lineColor_Normal})}}
                        />
                
                <View style = {{marginLeft:15,marginRight:15,height:1,backgroundColor:this.state.codeLineColor}}/>

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
                
                <View style = {{flex:1,alignItems:'center',justifyContent:'flex-end'}}>
                    <TouchableOpacity style = {{marginBottom:60}} onPress={this.handleBackPress.bind(this)}>
                        <Text>已有账号，立即登陆</Text>
                    </TouchableOpacity>
                </View>
                
                
            </View>
            
            
        );
    }
}