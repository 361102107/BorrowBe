import React, { PureComponent } from "react";
import { View, Text, TouchableOpacity, TextInput, Image } from "react-native";
import { StackActions } from "react-navigation";
import HTML from "react-native-render-html";

export default class Index extends PureComponent {
    constructor() {
        super();

    }

    render() {
        return (
            <View>
                <View style={{ flexDirection: 'row', height: 50, marginLeft: 15, marginRight: 15, alignItems: 'center' }}>
                    <Text style={{ flex: 1, fontSize: 15 }}>{this.props.title}</Text>
                    <HTML style={{ color: 'rgba(150,150,150,1)', fontSize: 13 }} html={this.props.content}></HTML>
                </View>
                <View style={{ backgroundColor: 'rgba(245,245,245,1)', height: 1 }}></View>

            </View>

        );
    }
}