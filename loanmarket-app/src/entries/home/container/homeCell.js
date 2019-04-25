import React, { PureComponent } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import home_02 from "../../../assets/images/home_02.png";
import indicator from "../../../assets/images/indicator.png";
export default class homeCellPage extends PureComponent {
  constructor() {
    super();
  }
  render() {
    let { productInfo } = this.props
    return (
      <View>
        <View style={styles.titleView}>
          <Image source={{ uri: productInfo.cover_img }} style={{
            width: 30, height: 30,
            resizeMode: 'contain'
          }}></Image>
          <Text style={{ flex: 1, marginLeft: 10, fontSize: 18, color: "#222" }}>{productInfo.name}</Text>
          <Image source={indicator} style={{
            width: 13, height: 13,
            resizeMode: 'contain'
          }}></Image>
        </View>
        <Text style={{
          marginLeft: 15,
          marginRight: 15,
          marginTop: 5,
          color: 'rgba(150,150,150,1)'
        }}>贷款额度(元)    成功率：{productInfo.success_rate}</Text>
        <Text style={{
          marginLeft: 15,
          marginTop: 10,
          color: 'red',
          fontSize: 18
        }}>{productInfo.amount_min}~{productInfo.amount_max}</Text>
        <Text style={{
          marginLeft: 15,
          marginRight: 15,
          marginTop: 10,
          color: 'rgba(150,150,150,1)'
        }}>申请通过人数：{productInfo.apply_pass_num}    贷款周期：{productInfo.deadline}</Text>
        <View style={styles.line}></View>
      </View>
    );
  }
}

const styles = StyleSheet.create({

  titleView: {
    flexDirection: 'row',
    height: 40,
    marginLeft: 15,
    marginRight: 15,
    backgroundColor: 'white',
    alignItems: 'center'
  },
  line: {
    marginLeft: 15,
    marginRight: 15,
    marginTop: 10,
    height: 1,
    backgroundColor: 'rgba(240,240,240,1)'
  }
});