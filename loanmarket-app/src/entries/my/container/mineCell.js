import React, { PureComponent } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import mine_02 from "../../../assets/images/mine_02.png";

export default class mineCellPage extends PureComponent {
  constructor() {
    super();

  }
  render() {
    return (
      <View>
        <View style={styles.showView}>
          <Image source={this.props.image} style={{
            width: 35, height: 35,
            resizeMode: 'contain'
          }}></Image>
          <Text style={{ flex: 1, marginLeft: 10 }}>{this.props.title}</Text>
          {this.props.title == "系统通知" && this.props.unread_count > 0 ? <View style={styles.point}></View> : null}

        </View>
        <View style={styles.line}></View>
      </View>
    );
  }
}

const styles = StyleSheet.create({

  showView: {
    flexDirection: 'row',
    height: 60,
    alignItems: 'center',
    marginLeft: 25,
    marginRight: 25,
  },
  line: {
    marginLeft: 15,
    marginRight: 15,
    height: 1,
    backgroundColor: 'rgba(240,240,240,1)'
  },
  point: {
    marginRight: 5,
    backgroundColor: "red",
    width: 8,
    height: 8,
    borderRadius: 4,
  }

});