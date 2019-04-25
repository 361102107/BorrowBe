import React, { PureComponent } from "react";
import { View, Text, TouchableOpacity, Image, FlatList } from "react-native";
import { StackActions } from "react-navigation";
import back from "../../../../../assets/images/back.png";
import MineCenterCell from "./mineCenterCell"
export default class Index extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      profile: this.props.navigation.state.params.profile
    }
  }
  handleBackPress() {
    this.props.navigation.dispatch(StackActions.pop({
      n: 1,
    }));
  }
  clickCell(value) {
    if (value == '0') {
      this.props.navigation.dispatch(
        StackActions.push({
          routeName: "MineInfo",
          params: {
            profile: this.state.profile
          }
        })
      );
    } else if (value == '1') {
      this.props.navigation.dispatch(
        StackActions.push({
          routeName: "ModifyPassword",

        })
      );
    } else if (value == '2') {
      this.props.navigation.dispatch(
        StackActions.push({
          routeName: "ModifyPhone",

        })
      );
    }
  }
  componentDidMount() {
  }
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <View style={{ height: 74, paddingTop: global.titleBarPaddingTop, flexDirection: 'row' }}>
          <TouchableOpacity onPress={this.handleBackPress.bind(this)}>
            <Image source={back} style={{
              width: 20, height: 20, marginLeft: 15,
              resizeMode: 'contain'
            }}></Image>
          </TouchableOpacity>

          <View style={{ flex: 1, marginRight: 35, flexDirection: 'row', justifyContent: 'center' }}>
            <Text style={{ fontSize: 15, color: 'black' }}>个人中心</Text>
          </View>
        </View>
        <View style={{ backgroundColor: 'rgba(245,245,245,1)', height: 5 }}></View>
        <FlatList
          data={[
            { id: "0", title: '个人信息' },
            { id: "1", title: '修改密码' },
            { id: "2", title: '修改手机' },

          ]}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <TouchableOpacity onPress={this.clickCell.bind(this, item.id)}>

            <MineCenterCell title={item.title}></MineCenterCell>

          </TouchableOpacity>}
        />
      </View>

    );
  }
}