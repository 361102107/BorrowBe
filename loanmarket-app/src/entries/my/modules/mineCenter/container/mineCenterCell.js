import React, { PureComponent } from "react";
import {  View, Text, StyleSheet, Image } from "react-native";
import indicator from "../../../../../assets/images/indicator.png";

export default class mineCellPage extends PureComponent {
    constructor() {
        super();

    }
    render() {
        return (
            <View>
               <View style = {styles.showView}>
                    <Text style = {{flex:1}}>{this.props.title}</Text>
                    <Image source={indicator} style={{width: 7, height: 7,
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
    height:50,
    alignItems:'center',
    marginLeft:15,
    marginRight:15,
  },
  line: {
    marginLeft:15,
    height:1,
    backgroundColor:'rgba(240,240,240,1)'
  }
  
});