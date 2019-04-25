import React, { PureComponent } from "react";
import { View, Text, TouchableOpacity, TextInput, Image } from "react-native";
import { StackActions } from "react-navigation";
import Toast, {DURATION} from 'react-native-easy-toast';
import Loading from 'react-native-whc-loading';
import back from "../../../../../assets/images/back.png";
var  TEXT_VIEW_ONE = 'TEXT_ONE';
var  TEXT_VIEW_TWO = 'TEXT_TWO';
export default class Index extends PureComponent {
    constructor() {
        super();
         this.state = { 
            phone:'',
            code:'',
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
                    this.refs.toast.show("已向手机发送验证码!");
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
    clickNextBtn(){
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
    
        this.props.verify({ mobile: this.state.phone, code: this.state.code})
            .then(res => {
                this.refs.loading.close();
                console.log(res);
                if (res && res.code == 0) {
                    
                    this.props.navigation.dispatch(
                        StackActions.push({
                            routeName: "FindPasswordDetail",
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
                    <Text style = {{marginLeft:15,fontSize:15}}>验证手机号码</Text>
                    <Text style = {{fontSize:13,color:'rgba(150,150,150,1)'}}>/设置新密码</Text>
                </View>

                <TextInput style={{height: 40,marginLeft:15,marginTop:20,marginRight:15}}
                        maxLength = {11}
                        ref={TEXT_VIEW_ONE}
                        placeholder = {'请输入注册手机号码'}
                        onChangeText={(phone) => this.setState({phone})}
                        value={this.state.phone}
                        onFocus = {() => {this.setState({phoneLineColor:global.lineColor_High})}}
                        onEndEditing = {() => {this.setState({phoneLineColor:global.lineColor_Normal})}}
                        />
                <View style = {{marginLeft:15,marginRight:15,height:1,backgroundColor:this.state.phoneLineColor}}/>

                <View style = {{flexDirection:'row',marginTop:20,alignItems:'center'}}>
                    <TextInput style={{flex:1,height: 40,marginLeft:15}}
                        maxLength = {11}
                        ref={TEXT_VIEW_TWO}
                        placeholder = {'请输入短信验证码'}
                        onChangeText={(code) => this.setState({code})}
                        value={this.state.code}
                        onFocus = {() => {this.setState({codeLineColor:global.lineColor_High})}}
                        onEndEditing = {() => {this.setState({codeLineColor:global.lineColor_Normal})}}
                        />
                    <TouchableOpacity onPress={this.clickCodeBtn.bind(this)}
                    disabled = {this.state.timeValue == 60 ? false : true}>
                        <Text style = {{color:'orange',marginRight:15}}>
                        {this.state.timeValue == 60 ? '获取验证码' : this.state.timeValue + "s"}
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style = {{marginLeft:15,marginRight:15,height:1,backgroundColor:this.state.codeLineColor}}/>

                <TouchableOpacity style = {{
                    marginLeft:15,
                    marginRight:15,
                    marginTop:40,
                    height:45,
                    borderRadius:22.5,
                    justifyContent:'center',
                    alignItems:'center',
                    backgroundColor:'rgba(255,189,45,1)'}} onPress={this.clickNextBtn.bind(this)}>
                        <Text style = {{color:'white'}}>下一步</Text>
                </TouchableOpacity>
                
            </View>
            
        );
    }
}