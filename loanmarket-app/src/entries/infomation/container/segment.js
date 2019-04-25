import React, { PureComponent } from "react";
import {  View, Text, StyleSheet,ScrollView,TouchableOpacity } from "react-native";

export default class segmentPage extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            currentIndex:this.props.index,
        };
    }
    selectedItem(value){
        this.setState({currentIndex:value});
        this.props.selectedItem(value);
    }
    _creatButtons(){
      var titles = this.props.titleData;
      
      if(titles == null){
          return [];
      }
      
      var bodyHtml = [];
      
      for(let i = 0;i < titles.length;i ++){
                bodyHtml.push(<View key = {String(i)} style = {styles.button}>
                    <TouchableOpacity onPress={this.selectedItem.bind(this, i)}>
                        <Text style = {this.state.currentIndex == i ? styles.titleHigh : styles.titleNormal}>{titles[i].name}</Text>
                    </TouchableOpacity>
                    <View style = {this.state.currentIndex == i ? styles.lineHigh : styles.lineNormal}></View>
                </View>);
            }
      return bodyHtml;
    }
    render() {
        return (
            <View>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}
                style = {{height: 80}}>
                    {this._creatButtons()}
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({

  button: {
    width: 80,
    backgroundColor: 'white',
    alignItems:'center',
    justifyContent: 'flex-end',
    marginBottom:10,
  },
  titleNormal: {
      color:'rgba(150,150,150,1)',
      fontSize:15,
  },
  titleHigh: {
      color:'black',
      fontSize:17,
  },
  lineNormal:{
      width:20,
      height:2,
      backgroundColor: 'white',
      marginTop:10,
  },
  lineHigh:{
      width:20,
      height:2,
      backgroundColor: 'rgba(255,189,45,1)',
      marginTop:10,
  }
});