import React, { PureComponent } from "react";
import {  View, Text, StyleSheet, Image } from "react-native";
import infomationTest from "../../../assets/images/infomationTest.png";
import home_02 from "../../../assets/images/home_02.png";
import eye from "../../../assets/images/eye.png";
export default class infomationCellPage extends PureComponent {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <View>
                <View style = {styles.showView}>
                    <View style = {{flex:1,marginRight:10}}>
                        <Text style = {{flex:1, marginTop:10}} numberOfLines = {2}>{this.props.title}</Text>
                        <View style = {{flexDirection:'row',alignItems:'center',marginBottom:10}}>
                            <Image source={{uri:this.props.avatar}} style={{width: 22, height: 22, 
                                    resizeMode:'contain'}}></Image>
                            <Text style = {{flex:1, 
                            marginLeft:5,
                            fontSize:12,
                            color:'rgba(150,150,150,1)'}}>{this.props.author}</Text>
                            <Image source={eye} style={{width: 12, 
                            height: 12, 
                            resizeMode:'contain'}}></Image>
                            <Text style = {{marginLeft:1,
                            fontSize:12,
                            color:'rgba(150,150,150,1)'}}>{this.props.look}</Text>
                        </View>
                    </View>
                    <Image source={{uri:this.props.cover_img}} style={{width: 105, height: 80, 
                                    resizeMode:'contain'}}></Image>
                </View>
                <View style = {styles.line}></View>
            </View>
        );
    }
}

const styles = StyleSheet.create({

  showView: {
    flexDirection:'row',
    height:100,
    alignItems:'center',
    marginLeft:15,
    marginRight:15,
  },
  line: {
    marginLeft:15,
    marginRight:15,
    height:1,
    backgroundColor:'rgba(240,240,240,1)'
  },
  
});