import React, { PureComponent } from "react";
import { View, Text, StyleSheet, Image, TouchableHighlight, TouchableOpacity } from "react-native";
import Swiper from "react-native-swiper";
import home_01 from "../../../assets/images/home_01.png";
import home_02 from "../../../assets/images/home_02.png";
import home_03 from "../../../assets/images/home_03.png";
import home_04 from "../../../assets/images/home_04.png";
import home_05 from "../../../assets/images/home_05.png";
import Carousel from "../../../components/marquee/carousel";
import GridView from "../../../components/gridview";
import { StackActions } from "react-navigation";
export default class Index extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      visibleSwiper: false,
      token: "",
      onClick: this.props.onClick,
      onApply: this.props.onApply,
    };
  }
  componentDidMount() {
    storage.load({
      key: 'appToken',
    }).then(ret => {
      this.setState({
        token: ret
      })
    }).catch(err => {

    })
    // 通过addListener开启监听，可以使用上面的四个属性
    this._didBlurSubscription = this.props.navigation.addListener(
      'didFocus',
      payload => {
        this.setState({
          visibleSwiper: false
        })
        setTimeout(() => {
          this.setState({
            visibleSwiper: true
          });
        }, 300);
      })
  }
  _createThirdButtons(toolInfo) {
    return <GridView dataList={toolInfo} />;
  }
  dispatch(list, position) {
    var item = list[position];
    console.log(item)
    this.click(item)
  }
  click(item) {
    let header = { "Authorization": "Bearer" + this.state.token }
    console.log(item)
    let params = { param: { ad_id: item && item.id }, header }
    this.state.onClick(params).then(res => {
      console.log(res)
      if (res && res.code == 0) {
        console.log("点击成功")
        switch (item.link_type) {
          case 1:
            this.props.navigation.dispatch(
              StackActions.push({
                routeName: "LinkUrl",
                params: {
                  articleId: item.link_param
                }
              })
            );
            break;
          case 2:
            this.props.navigation.dispatch(
              StackActions.push({
                routeName: "HomeDetail",
                params: {
                  id: item.link_param,
                  source_type: 3,
                  source_id: res.data.id,
                }
              })
            );
            break;
          case 3:
            this.props.navigation.dispatch(
              StackActions.push({
                routeName: "InfomationDetail",
                params: {
                  articleId: item.link_param
                }
              })
            );
            break;
          default:
            break;
        }
      }
      else {
        this.refs.toast.show(res && res.msg);
      }
    }).catch(err => {
      console.log(err)
      this.refs.toast.show("网络错误");
    });
  }

  render() {
    let { adList, noticeInfo, toolInfo } = this.props

    let array = [{ id: '', name: '', position: 0, img_url: '', link_type: 0, link_param: '' }];
    array = [];
    console.log(noticeInfo)
    for (var i in noticeInfo) {
      array.push({
        id: noticeInfo[i].id,
        name: noticeInfo[i].name,
        position: noticeInfo[i].position,
        img_url: noticeInfo[i].img_url,
        link_type: noticeInfo[i].link_type,
        link_param: noticeInfo[i].link_param
      });
    }
    console.log(array)
    tools = [];
    for (var i in toolInfo) {
      tools.push({
        id: toolInfo[i].id,
        name: toolInfo[i].name,
        position: toolInfo[i].position,
        img_url: toolInfo[i].img_url,
        link_type: toolInfo[i].link_type,
        link_param: toolInfo[i].link_param
      });
    }
    console.log("toolInfo")
    console.log(tools)
    banner = [];
    for (var i in adList) {
      banner.push({
        id: adList[i].id,
        name: adList[i].name,
        position: adList[i].position,
        img_url: adList[i].img_url,
        link_type: adList[i].link_type,
        link_param: adList[i].link_param
      });
    }


    return (
      <View>
        <View style={styles.firstView}>
          {this.state.visibleSwiper ?
            <Swiper style={styles.swiper} autoplay={true} horizontal={true} showsPagination={true} loop={true} index={0} width={'100%'}
              removeClippedSubviews={false} paginationStyle={{ bottom: 8 }}
              dot={
                <View style={{ backgroundColor: 'rgba(0,0,0,.2)', width: 15, height: 3, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3, }} />
              }
              activeDot={
                <View style={{ backgroundColor: '#FFC533', width: 15, height: 3, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3, }} />
              }>
              {banner.map((item, index) => {
                return <TouchableOpacity key={index} onPress={() => this.dispatch(banner, index)} style={{ backgroundColor: "#666", flex: 1, borderRadius: 11 }}>
                  <Image key={String(i)} source={{ uri: item.img_url }} style={styles.bannerImage} />
                </TouchableOpacity>
              })}
            </Swiper> : <View />}
        </View>
        <View style={{ flexDirection: 'row', flex: 1, backgroundColor: "#F2F4F8", height: 34, borderRadius: 17, margin: 16, paddingLeft: 13 }}>
          <Carousel height={34}>
            {array.map((item, index) => (
              <TouchableOpacity key={index} style={{ height: 34 }} onPress={() => this.dispatch(array, index)}>
                <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
                  <Image source={{ uri: item.img_url }} style={{
                    width: 16,
                    height: 16,
                  }}></Image>
                  <Text style={{ marginLeft: 8 }}>{item.name}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </Carousel>

        </View>
        {toolInfo ? this._createThirdButtons(tools) : null}
        <View style={{ backgroundColor: 'rgba(240,240,240,1)', height: 5 }}></View>
        <Text style={{ marginLeft: 15, marginTop: 15, fontSize: 18, marginBottom: 10, color: "#222" }}>热门推荐</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({

  firstView: {
    height: 160,
    marginLeft: 15,
    marginRight: 15,
    borderRadius: 11,
    // backgroundColor: 'orange'
  },
  secondView: {
    height: 25,
    marginTop: 15,
    marginLeft: 15,
    marginRight: 15,
    backgroundColor: 'rgba(240,240,240,1)'
  },
  thirdView: {
    flexDirection: 'row',
    marginTop: 15,
    height: 80,
    justifyContent: "space-around",
  },
  bannerImage: {
    flex: 1,
    resizeMode: 'cover',
    borderRadius: 11,

  },
  infortxt: {
  },
  swiper: {

  }
});