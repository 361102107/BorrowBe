import React, { PureComponent } from "react";
import {  View, Text, StyleSheet } from "react-native";

export default class exitCellPage extends PureComponent {
    constructor() {
        super();
    }
    render() {
        return (
            <View>
               <View style = {styles.line}></View>
               <View style = {styles.showView}>
                    <Text>{this.props.title}</Text>
               </View>
               <View style = {styles.line}></View>
            </View>
        );
    }
}

const styles = StyleSheet.create({

  showView: {
    justifyContent: "center",
    height:50,
    alignItems:'center',
  },
  line: {
    height:5,
    backgroundColor:'rgba(250,250,250,1)'
  },
  
});