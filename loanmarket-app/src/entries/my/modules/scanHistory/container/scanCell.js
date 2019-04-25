import React, { PureComponent } from "react";
import { View, Text, TouchableOpacity, TextInput, Image } from "react-native";
import { StackActions } from "react-navigation";
import downImage from "../../../../../assets/images/downLine.png";
import unselect from "../../../../../assets/images/sex_unselect.png";
import select from "../../../../../assets/images/sex_select.png";
export default class Index extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            isSelect: this.props.isSelect,
        }
         
    }
    clickSelectBtn(){
        this.setState({
            isSelect: !this.state.isSelect,
        })
    }
    _setImage = () => {
        if(this.props.isEdit){
            return this.state.isSelect ? select : unselect;
        }else{
            this.setState({
            isSelect: false,
        })
            return unselect;
        }
        
    }
    
    render() {
        return (
            <View>
                <TouchableOpacity onPress={this.clickSelectBtn.bind(this)}>
                    <Image source = {this._setImage()} style = {{position:'absolute',width:22,height:22,marginLeft:15,marginTop:24}}></Image>
                </TouchableOpacity>
                
                <View style = {{flexDirection:'row',
                height:70,
                marginLeft:this.props.isEdit ? 50 : 0, marginRight:this.props.isEdit ? -50 : 0,
                backgroundColor:'white'}}>
                    <Image source = {this.props.image} style = {{width:50,height:50,marginLeft:25,alignSelf:'center'}}>
                    </Image>
                    <View style = {{flex:1,marginLeft:10,marginRight:10,height:50,justifyContent:"space-between",alignSelf:'center'}}>
                        <Text>{this.props.title}</Text>
                        <Text style = {{color:'rgba(150,150,150,1)'}}>{this.props.content}</Text>
                    </View>
                    <View style = {{height:50,alignItems:'flex-end',marginRight:25,alignSelf:'center'}}>
                        <Text style = {{color:'red'}}>{this.props.money}</Text>
                    </View>
                    <Image source = {this.props.isDown ? downImage : null} style = {{position:'absolute',width:40,height:40}}></Image>
                </View>
                <View style = {{backgroundColor:'rgba(245,245,245,1)',height:1}}></View>
                
            </View>
            
        );
    }
}