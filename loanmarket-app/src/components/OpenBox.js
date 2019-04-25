// 弹出框组件，询问，
/*
made by 白
参数
isShow ：true
data={
    con:'内容',
    left:'取消',   //可不填
    right:'确定',  //可不填
}
right = function
left = function
请放在最外层之类的
父级元素需要'relative'定位
*/
import React, { Component } from 'react';
import { Animated, Dimensions, Easing, StyleSheet, Text, TouchableOpacity } from 'react-native';

import ImagePicker from 'react-native-image-picker';

const heisss = Dimensions.get('window').height;
//搜索组件
export default class OpenBox extends Component {
  //选照片
  choosePhoto = () => {
    let options = {};
    ImagePicker.launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker')
      }
      else if (response.error) {
        console.log('ImagePicker Error: ', response.error)
      }
      else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton)
      }
      else if (response.uri) {
        this.props.addImage(response.uri)
      }
    })
  }
  //照相
  takePhone = () => {
    let options = {};
    ImagePicker.launchCamera(options, (response) => {
      //响应结果处理参考上面样例
      this.props.addImage(response.uri);
    });
  }

  constructor(props) {
    super(props);
    let opa = 0, zi = -1, bots = -138;
    if (this.props.isShow) {
      opa = 1;
      zi = 999;
      bots = 0;
    }
    this.state = {
      opacity: new Animated.Value(opa),
      zIndex: new Animated.Value(zi),
      bot: new Animated.Value(bots),
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isShow) {
      Animated.sequence([
        Animated.timing(this.state.zIndex, {
          toValue: 999,
          duration: 1,
          easing: Easing.linear,// 线性的渐变函数
        }),
        Animated.parallel([
          Animated.timing(this.state.opacity, {
            toValue: 1,
            duration: 200,
            easing: Easing.linear,// 线性的渐变函数
          }),
          Animated.timing(this.state.bot, {
            toValue: 0,
            duration: 200,
            easing: Easing.linear,// 线性的渐变函数
          })
        ])

      ]).start();
    } else {
      Animated.sequence([
        Animated.parallel([
          Animated.timing(this.state.opacity, {
            toValue: 0,
            duration: 200,
            easing: Easing.linear,// 线性的渐变函数
          }),
          Animated.timing(this.state.bot, {
            toValue: -138,
            duration: 200,
            easing: Easing.linear,// 线性的渐变函数
          }),
        ]),
        Animated.timing(this.state.zIndex, {
          toValue: -1,
          duration: 5,
          easing: Easing.linear,// 线性的渐变函数
        })

      ]).start();
    }

  }

  render() {
    return (
      <Animated.View
        style={[styles.commitBg, { height: heisss, opacity: this.state.opacity, zIndex: this.state.zIndex }]}>
        <Animated.View style={[styles.commitBox, { bottom: this.state.bot }]}>
          <TouchableOpacity style={styles.btns} onPress={() => this.choosePhoto()}>
            <Text style={[styles.fonts, styles.font2]}>相册</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btns} onPress={() => this.takePhone()}>
            <Text style={[styles.fonts, styles.font2]}>拍照</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btns} onPress={() => this.props.close()}>
            <Text style={[styles.fonts]}>取消</Text>
          </TouchableOpacity>
        </Animated.View>
      </Animated.View>
    )
  }
}


const styles = StyleSheet.create({
  commitBg: {
    width: '100%',
    position: 'absolute',
    left: 0,
    top: 0,
    backgroundColor: 'rgba(0,0,0,.3)',
  },
  commitBox: {
    width: '100%',
    height: 158,
    position: 'absolute',
    left: 0,
    backgroundColor: '#fff',
    paddingLeft: 15,
    paddingRight: 15,
    paddingBottom: 20,
  },
  btns: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderTopWidth: 0.5,
    borderColor: '#e1e1e1',
    borderStyle: 'solid'
  },
  fonts: {
    fontSize: 15,
    fontFamily: "PingFangSC-Regular",
    color: '#666'
  },
  font2: {
    color: 'rgb(74,144,226)'
  },
});
