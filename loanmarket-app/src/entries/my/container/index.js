import React, { PureComponent } from "react";
import { View, Text, Image, TouchableOpacity, FlatList, StyleSheet } from "react-native";
import { StackActions, NavigationActions } from "react-navigation";
import styles from "./style";
import MineCell from "./mineCell";
import ExitCell from "./exitCell";
import mine_01 from "../../../assets/images/mine_01.png";
import mine_02 from "../../../assets/images/mine_02.png";
import mine_03 from "../../../assets/images/mine_03.png";
import mine_04 from "../../../assets/images/mine_04.png";
import mine_05 from "../../../assets/images/mine_05.png";
import mine_06 from "../../../assets/images/mine_06.png";
import Toast from 'react-native-easy-toast';
import Loading from 'react-native-whc-loading';
import Confirm from "../../../components/confirm";

export default class Index extends PureComponent {
  constructor() {
    super();
    this.state = {
      profile: {
        // id: 329850,
        // nickname: "用户601848",
        // mobile: "18010102020",
        // sex: 0,
        // birthday: null,
        // profession: "",
        // signature: "",
        avatar_url: '../../../assets/images/mine_01.png',
        // reg_ip: "172.25.0.1",
        // last_login_ip: "172.25.0.1",
        // last_login_time: "2019-03-13 16:57:43",
        // created_at: "2019-03-13 16:57:43",
        // updated_at: "2019-03-13 16:57:43",
        // status: 1
      },
      isVisible: false,
      unread_count: 0,
    }
  }
  clickNotifyBtn() {
    this.props.navigation.dispatch(
      StackActions.push({
        routeName: "MessageList",

      })
    );
  }
  clickCell(value) {
    if (value == '0') {
      this.props.navigation.dispatch(
        StackActions.push({
          routeName: "ScanHistory",

        })
      );
    } else if (value == '1') {
      this.props.navigation.dispatch(
        StackActions.push({
          routeName: "MessageList",

        })
      );
    } else if (value == '2') {
      this.props.navigation.dispatch(
        StackActions.push({
          routeName: "HelpCenter",

        })
      );
    } else if (value == '3') {
      this.props.navigation.dispatch(
        StackActions.push({
          routeName: "CantactUs",

        })
      );
    } else if (value == '4') {
      this.props.navigation.dispatch(
        StackActions.push({
          routeName: "AboutUs",

        })
      );
    } else if (value == '5') {
      this.setState({
        isVisible: true,
      })
      // storage.load({
      //   key: 'appToken',
      // }).then(ret => {
      //   this.logout(ret)
      // }).catch(err => {

      // })
    }
  }
  logout(token) {
    let header = { "Authorization": "Bearer" + token }
    let params = { header }
    this.refs.loading.show();
    this.props.onLogout(params).then((res) => {
      this.refs.loading.close();
      console.log(res);
      if (res && res.code == 0) {
        this.refs.toast.show("退出成功");
        global.storage.remove({
          key: 'appToken'
        });
        this.props.navigation.dispatch(
          StackActions.reset({
            index: 0,
            actions: [
              NavigationActions.navigate({
                routeName: "Login"
              })
            ]
          })
        );
      }
      else {
        this.refs.toast.show(res.msg);
      }
    }).catch((error) => {
      this.refs.toast.show(error);
      this.refs.loading.close();
    });
  }
  clickUserImage() {
    this.props.navigation.dispatch(
      StackActions.push({
        routeName: "MineCenter",
        params: {
          profile: this.state.profile,
        }
      })
    );
  }
  componentDidMount() {
    // 通过addListener开启监听，可以使用上面的四个属性
    this._didBlurSubscription = this.props.navigation.addListener(
      'didFocus',
      payload => {
        console.log('didBlur', payload);
        storage.load({
          key: 'appToken',
        }).then(ret => {
          this.getProfile(ret)
          this.getMessageType(ret)
        }).catch(err => {

        })
      }
    );
  }
  getProfile(token) {
    let header = { "Authorization": "Bearer" + token }
    let params = { params: null, header }
    this.refs.loading.show();
    this.props.profile(params)
      .then(res => {
        this.refs.loading.close();
        if (res && res.code == 0) {
          console.log(res.data)
          this.setState({
            profile: res.data,
          })
        }
        else {
          this.refs.toast.show(res.msg);
        }
      }).catch(err => {
        this.refs.toast.show("网络错误");
        this.refs.loading.close();
      });
  }
  getMessageType(token) {
    let header = { "Authorization": "Bearer" + token }
    let params = { params: null, header }
    this.refs.loading.show();
    this.props.getMessageType(params)
      .then(res => {
        this.refs.loading.close();
        if (res && res.code == 0) {
          console.log(res.data)
          this.setState({
            unread_count: res.data.unread_count
          })
        }
        else {
          this.refs.toast.show(res.msg);
        }
      }).catch(err => {
        this.refs.toast.show("网络错误");
        this.refs.loading.close();
      });
  }
  getPhone(phone) {
    if (phone && phone.toString().length == 11) {
      return phone.substr(0, 3) + "****" + phone.substr(7);
    } else {
      return phone
    }
  }
  componentWillUnmount() {
    this.setState({
      isVisible: false,
    })
    // 在页面消失的时候，取消监听
    this._didBlurSubscription && this._didBlurSubscription.remove();
  }
  render() {
    return (
      <View style={styles.pageBox}>
        <Loading ref="loading" />
        <Toast ref="toast" />
        <Confirm isVisible={this.state.isVisible}
          title="提示"
          content="您确定退出当前账号?"
          ref="confirm"
          cancelClick={
            () => {
              this.setState({
                isVisible: false,
              })
            }
          }
          sureClick={
            () => {
              storage.load({
                key: 'appToken',
              }).then(ret => {
                this.logout(ret)
              }).catch(err => {

              })
            }
          } />
        <View style={{ height: 45, backgroundColor: 'white' }}></View>
        <View style={{ flexDirection: 'row' }}>
          <Text style={{ flex: 1, fontSize: 18, marginLeft: 15 }}>我的</Text>
          <TouchableOpacity onPress={this.clickNotifyBtn.bind(this)}>
            <Image source={mine_01} style={{
              width: 17, height: 17, marginRight: 15,
              resizeMode: 'contain'
            }}></Image>
            {this.state.unread_count > 0 ?
              <View style={style.point}></View> : null}
          </TouchableOpacity>
        </View>
        <View style={{ marginTop: 30, alignItems: 'center' }}>
          <TouchableOpacity onPress={this.clickUserImage.bind(this)}>
            {(this.state.profile.avatar_url.toString().indexOf("../") != -1 || this.state.profile.avatar_url.toString() == "") ?
              <Image source={require('../../../assets/images/mine_01.png')} style={{
                width: 120, height: 120, borderRadius: 60,
                resizeMode: 'cover'
              }}></Image>
              :
              <Image source={{ uri: this.state.profile.avatar_url }} style={{
                width: 120, height: 120, borderRadius: 60,
                resizeMode: 'cover'
              }}></Image>
            }
          </TouchableOpacity>

        </View >
        <View style={{ marginTop: 15, alignItems: 'center' }}>
          <Text>{this.state.profile["nickname"] == undefined ? "XXX" : this.state.profile["nickname"]}</Text>
        </View>
        <View style={{ marginTop: 5, alignItems: 'center' }}>
          <Text style={{ color: 'rgba(150,150,150,1)' }}>{this.getPhone(this.state.profile["mobile"])}</Text>
        </View>
        <FlatList style={{ marginTop: 20 }}
          data={[
            { id: "0", title: '浏览记录', image: mine_02 },
            { id: "1", title: '系统通知', image: mine_03 },
            { id: "2", title: '帮助中心', image: mine_04 },
            { id: "3", title: '联系客服', image: mine_05 },
            { id: "4", title: '关于我们', image: mine_06 },
            { id: "5", title: '退出账号', image: mine_06 },
          ]}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <TouchableOpacity onPress={this.clickCell.bind(this, item.id)}>

            {item.id == "5" ? <ExitCell title={item.title}></ExitCell> : <MineCell image={item.image} title={item.title} unread_count={this.state.unread_count}></MineCell>}

          </TouchableOpacity>}
        />
      </View >
    );
  }
}
const style = StyleSheet.create({
  point: {
    marginRight: 5,
    backgroundColor: "red",
    width: 8,
    height: 8,
    borderRadius: 4,
    position: 'absolute',
    left: 10,
    top: -2,
  }
});