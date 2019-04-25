import React, { Component } from 'react';
import {
    Text,
    View,
    StyleSheet,
    ListView,
    TouchableOpacity,
    ToastAndroid,
    Image,
    FlatList,
} from 'react-native';

//屏幕信息
var dimensions = require('Dimensions');
//获取屏幕的宽度
var { width } = dimensions.get('window');
var columns = 4;//每一行显示多少列
var itemWidth = width / columns;//每一个item所占的宽度

class GridView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            //传入我们需要展示的数据
            data: this.props.dataList,
        }
    }

    componentDidMount() {
        console.log(this.state.data)
    }

    render() {
        return (
            <FlatList
                data={this.state.data}
                renderItem={({ item }) => this.getView(item)}
                numColumns={columns}
                horizontal={false}
                keyExtractor={(item) => item.id.toString()}
                columnWrapperStyle={styles.columnStyle}
            />
        )
    }

    getView(rowData) {
        //这里返回的就是每个Item
        return (
            <TouchableOpacity activeOpacity={0.5}>
                <View style={styles.item}>
                    <Image source={{ uri: rowData.img_url }} style={{
                        width: 40,
                        height: 40,
                        marginBottom: 10,
                        resizeMode: 'contain'
                    }}></Image>
                    <Text>{rowData.name}</Text>
                </View>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    item: {
        justifyContent: 'center',
        alignItems: 'center',
        width: itemWidth,
        height: 80,
    },
    list: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    columnStyle: {

    }
});
module.exports = GridView;
