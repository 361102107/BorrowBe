import React, { PureComponent } from "react";
import { View, Text, TouchableOpacity, TextInput, Image } from "react-native";
import { StackActions } from "react-navigation";

export default class Index extends PureComponent {
    constructor() {
        super();

    }

    render() {
        return (
            <View>
                <View style={{ flexDirection: 'row', height: 70, marginLeft: 15, marginRight: 15, alignItems: 'center' }}>
                    <Image source={this.props.image} style={{ width: 50, height: 50 }}>
                    </Image>
                    <View style={{ flex: 1, marginLeft: 10, marginRight: 10, height: 50, justifyContent: "space-between" }}>
                        <Text>{this.props.title}</Text>
                        <Text style={{ color: 'rgba(150,150,150,1)' }} numberOfLines={2} ellipsizeMod='tail'>{this.props.content}</Text>
                    </View>
                    <View style={{ height: 50, justifyContent: "space-between", alignItems: 'flex-end' }}>
                        <Text style={{ color: 'rgba(150,150,150,1)' }}>{this.props.time}</Text>
                        {this.props.is_read == 0 ? <View style={{
                            marginRight: 5,
                            backgroundColor: "red",
                            width: 8,
                            height: 8,
                            borderRadius: 4,
                        }}></View> : null}
                    </View>
                </View>
                <View style={{ backgroundColor: 'rgba(245,245,245,1)', height: 1 }}></View>

            </View>

        );
    }
}