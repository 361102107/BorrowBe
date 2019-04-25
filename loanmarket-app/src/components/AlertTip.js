import React, { Component } from 'react'
import { FlatList, Image, Modal, StyleSheet, Text, TouchableHighlight, TouchableOpacity, View, } from 'react-native'
import StyleConfig from '../config/StyleConfig'

const [aWidth, aHeight] = [335, 221];
export default class AlertDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hide: true,
      animationType: 'fade',
      modalVisible: false,
      transparent: true,
      innersWidth: null,
      innersHeight: null,
      content: "",
    }
  }

  show(data, options) {
    if (options) {
      let animationType = options.animationType === undefined ? 'fade' : options.animationType;
      let innersWidth = options.innersWidth === undefined ? null : options.innersWidth;
      let innersHeight = options.innersHeight === undefined ? null : options.innersHeight;
      if (!this.state.modalVisible) {
        this.setState({
          modalVisible: true,
          innersHeight: innersHeight,
          innersWidth: innersWidth,
          animationType: animationType,
        });
      }
    }
    this.setState({
      content: data,
      modalVisible: true
    })
  }

  hide() {
    this.setState({ modalVisible: false });
  }

  render() {
    this.innersWidth = this.state.innersWidth || aWidth;
    this.innersHeight = this.state.innersHeight || aHeight;
    return (
      <Modal
        animationType={this.state.animationType}
        transparent={this.state.transparent}
        visible={this.state.modalVisible}
        onRequestClose={this.hide.bind(this)}
      >
        <View style={[styles.container, styles.flexVer, styles.flex1]}>
          <TouchableHighlight onPress={this.hide.bind(this)} style={[styles.mask]}
            underlayColor='transparent'>
            <Text />
          </TouchableHighlight>
          <View style={[styles.flexVer, styles.acenter,
          {
            width: this.innersWidth,
            borderRadius: 4,
            padding: (15, 20, 15, 20),
          }]}>
            <Image
              source={require('../assets/images/alert_bg.png')}>
            </Image>
            <Text style={{ position: "absolute", top: 170, left: 40, right: 40, color: '#222222', fontSize: 20 }}>
              {this.state.content}
            </Text>
            <TouchableOpacity style={{
              alignItems: 'center',
              justifyContent: 'center', position: "absolute", top: 370, backgroundColor: '#FFD700',
              borderRadius: 25, width: '84%', height: 50,
            }}>
              <Text style={{
                textAlign: "center", fontSize: 20, color: '#222222',
              }}>
                立即更新
            </Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={{ marginTop: 20 }} onPress={() => this.hide()}>
            <Image style={{ height: 33, width: 33, }} source={require('../assets/images/close_tip.png')} />
          </TouchableOpacity>
        </View>
      </Modal >
    )
  }
}

const styles = StyleSheet.create({
  container: {
    width: StyleConfig.DEVICE_WIDTH,
    height: StyleConfig.DEVICE_HEIGHT,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: 'transparent'
  },
  flexVer: {
    flexDirection: 'column',
  },
  flex1: {
    flex: 1,
  },
  mask: {
    justifyContent: "center",
    backgroundColor: "#000000",
    opacity: 0.8,
    position: "absolute",
    width: StyleConfig.DEVICE_WIDTH,
    height: StyleConfig.DEVICE_HEIGHT,
    left: 0,
    top: 0,
  },
  acenter: {
    alignItems: 'center',
  },
  tip: {
    alignItems: "center",
    justifyContent: "space-between",
  },
  titleText: {
    fontSize: 18,
    color: "#0000FF"
  },
  div: {
    // flex: 1,
    width: 100,
    height: 1,
    marginTop: 15,
    marginBottom: 20,
    backgroundColor: '#000',
  },
  listItemView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  listItemNameText: {
    fontSize: 14,
    color: '#00f',
  },
  listItemValueText: {
    fontSize: 14,
    color: '#fff',
  },
})
