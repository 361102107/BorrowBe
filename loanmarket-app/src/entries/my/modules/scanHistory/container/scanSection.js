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
            <View style = {{backgroundColor:'rgba(245,245,245,1)'}}>
                <TouchableOpacity onPress={this.clickSelectBtn.bind(this)}>
                    <Image source = {this._setImage()} style = {{position:'absolute',width:22,height:22,marginLeft:15,marginTop:9}}></Image>
                </TouchableOpacity>
                
                <View style = {{flexDirection:'row',
                height:40,
                marginLeft:this.props.isEdit ? 50 : 0, marginRight:this.props.isEdit ? -50 : 0,
                backgroundColor:'rgba(245,245,245,1)'}}>
                    <Text style = {{marginLeft:15,alignSelf:'center'}}>{this.props.title}</Text>
                </View>
            </View>
            
        );
    }
}