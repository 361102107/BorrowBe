import React, { PureComponent } from 'react'
import {
    View,
    Image,
    Dimensions,
    StyleSheet, Text, TouchableOpacity
} from 'react-native'
import Swiper from 'react-native-swiper';
import { StackActions, NavigationActions } from "react-navigation";

const { width, height } = Dimensions.get('window');//获取手机的宽和高


export default class Index extends PureComponent {
    constructor() {
        super();
        this.state = {
            index: 0,
        }
    }
    //加载计时器
    componentDidMount() {
        global.storage.save({
            key: 'notFirstStart',
            data: true,
            expires: null
        });
        this.timer = setTimeout(() => {
            // this.props.navigation.navigate('HomeTab');//7秒后进入底部导航主页
        }, 7000)
    }
    //卸载计时器
    componentWillUnmount() {
        this.timer && clearTimeout(this.timer);//同时为真的才执行卸载
    }
    onIndexChanged(index) {
        console.log(index)
        this.setState({
            index: index
        })
    }
    next() {
        storage.load({
            key: 'appToken',
        }).then(ret => {
            console.log("ret:" + ret)
            if (ret == null || ret == "" || ret == undefined) {
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
            } else {
                global.appToken = ret,
                    this.props.navigation.dispatch(
                        StackActions.reset({
                            index: 0,
                            actions: [
                                NavigationActions.navigate({
                                    routeName: "TabRoot"
                                })
                            ]
                        })
                    );
            }
        }).catch(err => {
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
        })
    }
    render() {
        return (
            <View style={styles.container}>
                <Swiper style={styles.wrapper}
                    showsButtons={true}       //为false时不显示控制按钮
                    paginationStyle={{      //小圆点位置
                        bottom: 70
                    }}
                    loop={false}        //如果设置为false，那么滑动到最后一张时，再次滑动将不会滑到第一张图片。
                    // autoplay={true}          //自动轮播
                    // autoplayTimeout={2}      //每隔2秒切换
                    onIndexChanged={(index) => this.onIndexChanged(index)}
                >

                    <Image style={styles.image} source={require('../../../../../assets/images/boot1.png')} />
                    <Image style={styles.image} source={require('../../../../../assets/images/boot2.png')} />
                    <Image style={styles.image} source={require('../../../../../assets/images/boot3.png')} />
                    <Image style={styles.image} source={require('../../../../../assets/images/boot4.png')} />

                </Swiper>
                {
                    this.state.index == 3 ?
                        <TouchableOpacity style={{
                            position: "absolute", borderRadius: 20, bottom: '15%', backgroundColor: "#666",
                            left: '30%', width: '40%',
                        }} onPress={this.next.bind(this)}>
                            <Text style={{
                                color: '#fff', textAlign: "center",
                                borderRadius: 20, padding: 10, fontSize: 20
                            }}>立即体验</Text>
                        </TouchableOpacity>
                        : null
                }

            </View >
        )
    }
}
const styles = StyleSheet.create({
    wrapper: {

    },
    container: {
        flex: 1,//必写
    },
    image: {
        width,//等于width:width
        height,
    }
});
