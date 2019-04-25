import React, { Component } from "react";

import {
    createBottomTabNavigator,
    createStackNavigator,
    createAppContainer
} from "react-navigation";
import { View, Text, Image, StyleSheet } from "react-native";
import welcomScreen from "./entries/welcome";
import bootScreen from "./entries/welcome/modules/boot";
import HomeScreen from "./entries/home";
import InfomationScreen from "./entries/infomation";
import MyScreen from "./entries/my";
import LoginScreen from "./entries/login";
import MineCenterScreen from "./entries/my/modules/mineCenter"
import MineInfoScreen from "./entries/my/modules/mineInfo"
import ModifyPasswordScreen from "./entries/my/modules/modifyPassword"
import ModifyPhoneScreen from "./entries/my/modules/modifyPhone"
import ModifyPhoneDetailScreen from "./entries/my/modules/modifyPhoneDetail"
import FindPasswordScreen from "./entries/login/modules/findPassword"
import FindPasswordDetailScreen from "./entries/login/modules/findPasswordDetail"
import RegisterScreen from "./entries/login/modules/register"
import RegisterDetailScreen from "./entries/login/modules/registerDetail"
import UserProtocolScreen from "./entries/login/modules/userProtocol"
import HelpCenterScreen from "./entries/my/modules/helpCenter"
import AboutUsScreen from "./entries/my/modules/aboutUs"
import InfomationDetailScreen from "./entries/infomation/modules/detail"
import HomeDetailScreen from "./entries/home/modules/detail"
import LinkUrlScreen from "./entries/home/modules/linkurl"
import CantactUsScreen from "./entries/my/modules/contactUs"
import ScanHistoryScreen from "./entries/my/modules/scanHistory"
import MessageListScreen from "./entries/my/modules/messageList"
import tabbar_01_n from "./assets/images/tabbar_01_n.png";
import tabbar_02_n from "./assets/images/tabbar_02_n.png";
import tabbar_03_n from "./assets/images/tabbar_03_n.png";
import tabbar_01_h from "./assets/images/tabbar_01_h.png";
import tabbar_02_h from "./assets/images/tabbar_02_h.png";
import tabbar_03_h from "./assets/images/tabbar_03_h.png";
import myIcon from "./assets/images/my.png";
import navigationService from "./util/NavigationService";
import NetworkFailedScreen from "./entries/home/modules/networkfailed";

const setIcon = function ({ ...set }) {
    return (
        <View style={styles.iconbox}>
            {/* <View style={styles.text} /> */}
            <Image
                source={set.focused ? set.source_h : set.source_n}
                style={{
                    width: 24,
                    height: 24,

                }}
            />
        </View>
    );
};

const TabRoot = createBottomTabNavigator(
    {
        HomeStack: {
            screen: HomeScreen,
            navigationOptions: navigation => {
                return {
                    tabBarLabel: "首页",
                    tabBarIcon: state => {
                        return setIcon({
                            ...state,
                            source_h: tabbar_01_h,
                            source_n: tabbar_01_n,
                        });
                    }
                };
            }
        },
        InfomationStack: {
            screen: InfomationScreen,
            navigationOptions: navigation => {
                return {
                    tabBarLabel: "资讯",
                    tabBarIcon: state => {
                        return setIcon({
                            ...state,
                            source_h: tabbar_02_h,
                            source_n: tabbar_02_n,
                        });
                    }
                };
            }
        },
        My: {
            screen: MyScreen,
            navigationOptions: navigation => {
                return {
                    tabBarLabel: "我的",
                    tabBarIcon: state => {
                        return setIcon({
                            ...state,
                            source_h: tabbar_03_h,
                            source_n: tabbar_03_n,
                        });
                    }
                };
            }
        }
    },
    {
        tabBarOptions: {
            activeTintColor: "black"
        }
    }
);

const RootRouter = createStackNavigator(
    {
        Welcom: {
            screen: welcomScreen
        },
        Boot: {
            screen: bootScreen
        },
        TabRoot: {
            screen: TabRoot
        },
        MineCenter: {
            screen: MineCenterScreen
        },
        Login: {
            screen: LoginScreen
        },
        MineInfo: {
            screen: MineInfoScreen
        },
        ModifyPassword: {
            screen: ModifyPasswordScreen
        },
        ModifyPhone: {
            screen: ModifyPhoneScreen
        },
        ModifyPhoneDetail: {
            screen: ModifyPhoneDetailScreen
        },
        FindPassword: {
            screen: FindPasswordScreen
        },
        FindPasswordDetail: {
            screen: FindPasswordDetailScreen
        },
        Register: {
            screen: RegisterScreen
        },
        RegisterDetail: {
            screen: RegisterDetailScreen
        },
        UserProtocol: {
            screen: UserProtocolScreen
        },
        HelpCenter: {
            screen: HelpCenterScreen
        },
        AboutUs: {
            screen: AboutUsScreen
        },
        CantactUs: {
            screen: CantactUsScreen
        },
        ScanHistory: {
            screen: ScanHistoryScreen
        },
        MessageList: {
            screen: MessageListScreen
        },
        InfomationDetail: {
            screen: InfomationDetailScreen
        },
        HomeDetail: {
            screen: HomeDetailScreen
        },
        LinkUrl: {
            screen: LinkUrlScreen
        },
        NetworkFailed: {
            screen: NetworkFailedScreen
        }
    },
    {
        navigationOptions: () => {
            return {
                header: null
            };
        }
    }
);


const styles = StyleSheet.create({
    iconbox: {
        position: "relative"
    },
    text: {
        position: "absolute",
        right: -5,
        top: 0,
        borderRadius: 10,
        width: 10,
        height: 10,
        backgroundColor: "red"
    }
});

export default class Route extends Component {
    render() {
        return <RootRouter
            ref={
                navigatorRef => {
                    navigationService.setTopLevelNavigator(navigatorRef);
                }
            }
        />
    }
}
