import React, { PureComponent } from "react";
import { View, Text, TouchableOpacity, Image, SectionList, StyleSheet, TouchableWithoutFeedback } from "react-native";
import { StackActions } from "react-navigation";
import back from "../../../../../assets/images/back.png";
import logo from "../../../../../assets/images/about_logo.png";
import ScanCell from "./scanCell";
import ScanSection from "./scanSection";
import downImage from "../../../../../assets/images/downLine.png";
import unselect from "../../../../../assets/images/sex_unselect.png";
import select from "../../../../../assets/images/sex_select.png";
export default class Index extends PureComponent {
    constructor() {
        super();
        this.renderItem = this.renderItem.bind(this)
        this.renderSectionHeader = this.renderSectionHeader.bind(this)
        this.state = {
            isEdit: false,
            status: [],
            isSelectedAllItem: false,
            totalNum: 0,
            totalPrice: 0.00,
            per_page: 150,
            page: 1,
            checkIds: [],
            tempArr: {},
            token: "",
        }
    }

    componentDidMount() {
        // 通过addListener开启监听，可以使用上面的四个属性
        this._didBlurSubscription = this.props.navigation.addListener(
            'didFocus',
            payload => {
                //网络请求
                storage.load({
                    key: 'appToken',
                }).then(ret => {
                    console.log(ret);
                    this.getRecordList(ret)
                    this.setState({
                        token: ret,
                    })
                }).catch(err => {

                })

            });

    }
    getRecordList(token) {
        let { per_page, page } = this.state;
        let param = {
            per_page, page
        }
        let header = { "Authorization": "Bearer" + token }
        let params = { params: param, header }
        this.props.getRecordList(params)
    }
    handleBackPress() {
        this.props.navigation.dispatch(StackActions.pop({
            n: 1,
        }));
    }
    clickRightItem() {
        this.setState({
            isEdit: !this.state.isEdit
        })
    }
    checkItem(item) {
        console.log(item.time)
        let time = item.time.toString().substr(0, 10)
        let params = { time: time, id: item.id }
        this.props.singleCheckChange(params)
        this.getCheckIds()
    }
    checkedShop(time) {
        let params = { time: time }
        this.props.groupCheckChange(params)
        this.getCheckIds()
    }
    deleteItem() {
        storage.load({
            key: 'appToken',
        }).then(ret => {
            let param = { ids: this.state.checkIds.join(",") }
            let header = { "Authorization": "Bearer" + ret }
            let params = { params: param, header }
            this.props.deleteCheckedRecord(params)
            this.state.checkIds.length = 0
        }).catch(err => {

        })

    }
    getCheckIds() {
        this.state.checkIds.length = 0
        let dataList = this.state.tempArr
        if (dataList && dataList.length > 0) {
            for (let i = 0, len = dataList.length; i < len; i++) {
                if (
                    !dataList[i].children ||
                    dataList[i].children.length <= 0
                ) {
                    continue;
                }
                for (
                    let k = 0, l = dataList[i].children.length;
                    k < l;
                    k++
                ) {
                    if (
                        dataList[i].children[k].isChecked) {
                        this.state.checkIds.push(dataList[i].children[k].id)
                    }
                }
            }
        }
    }
    _setImage = () => {
        if (this.props.isEdit) {
            return this.state.isSelect ? select : unselect;
        } else {
            this.setState({
                isSelect: false,
            })
            return unselect;
        }
    }
    clickItem(item) {
        if (!this.state.isEdit) {
            // this.apply(item.product_id)
            this.props.navigation.dispatch(
                StackActions.push({
                    routeName: "HomeDetail",
                    params: {
                        id: item.product_id
                    }
                })
            );
        }
    }
    apply(value) {
        let header = { "Authorization": "Bearer" + this.state.token }
        let params = { param: { product_id: value }, header }
        this.props.onApply(params).then(res => {
            console.log(res)
            if (res && res.code == 0) {
                console.log("申请成功")
                this.props.navigation.dispatch(
                    StackActions.push({
                        routeName: "HomeDetail",
                        params: {
                            articleId: value
                        }
                    })
                );
            }
            else {
                this.refs.toast.show(res && res.msg);
            }
        }).catch(err => {
            console.log(err)
            this.refs.toast.show("网络错误");
        });
    }
    renderItem = info => {
        let item = info.item
        var key = (new Date()).getTime()
        return (
            <View style={{ flexDirection: "row" }} key={key}>
                <TouchableOpacity style={{
                    flex: this.state.isEdit ? 1 : 0,
                }} onPress={() => this.checkItem(item)}>
                    <Image source={item.isChecked ? require('../../../../../assets/images/sex_select.png') : require('../../../../../assets/images/sex_unselect.png')} resizeMode={'center'}
                        style={{ position: 'absolute', width: 22, height: 22, marginLeft: 15, marginTop: 24 }}></Image>
                </TouchableOpacity>

                <TouchableWithoutFeedback style={{
                    flex: 5.7,
                    flexDirection: 'row',
                    height: 70,
                    backgroundColor: 'white'
                }}
                    onPress={() => this.clickItem(item)}
                >
                    <View style={{
                        flex: 5.7,
                        flexDirection: 'row',
                        height: 70,
                        backgroundColor: 'white'
                    }}>


                        <Image source={{ uri: item.img }} style={{ width: 50, height: 50, marginLeft: 25, alignSelf: 'center' }}>
                        </Image>
                        <View style={{ flex: 1, marginLeft: 10, marginRight: 10, height: 50, justifyContent: "space-between", alignSelf: 'center' }}>
                            <Text>{item.name}</Text>
                            <Text style={{ color: 'rgba(150,150,150,1)' }}>日利率{item.rate_day}</Text>
                        </View>
                        <View style={{ height: 50, alignItems: 'flex-end', marginRight: 25, alignSelf: 'center' }}>
                            <Text style={{ color: 'red' }}>{item.amount}</Text>
                        </View>
                        <Image source={this.props.isDown ? downImage : null} style={{ position: 'absolute', width: 40, height: 40 }}></Image>
                    </View>

                </TouchableWithoutFeedback>
                <View style={{ backgroundColor: 'rgba(245,245,245,1)', height: 1 }}></View>

            </View>
        )
    }
    renderSectionHeader = ({ section }) => {
        var key = (new Date()).getTime()
        return (
            <View style={{ backgroundColor: 'rgba(245,245,245,1)', flexDirection: "row" }} key={key}>
                <TouchableOpacity style={{ flex: this.state.isEdit ? 1 : 0 }} onPress={() => this.checkedShop(section.key)}>
                    <Image style={styles.checkBox} source={section.isChecked ? require('../../../../../assets/images/sex_select.png') : require('../../../../../assets/images/sex_unselect.png')} resizeMode={'center'}
                        style={{ position: 'absolute', width: 22, height: 22, marginLeft: 15, marginTop: 9 }}></Image>
                </TouchableOpacity>

                <View style={{
                    flexDirection: 'row',
                    height: 40,
                    flex: 5.7,
                    backgroundColor: 'rgba(245,245,245,1)'
                }}>
                    <Text style={{ marginLeft: 15, alignSelf: 'center' }}>{section.key}</Text>
                </View>
            </View>
        )
    }
    createKey() {
        return (new Date()).getTime()
    }

    render() {
        let { recordList } = this.props
        console.log(recordList)
        console.log(recordList && recordList.dataList)
        let tempArr
        if (recordList && recordList.dataList) {
            this.setState({
                tempArr: recordList.dataList
            })
            let dataList = recordList.dataList
            tempArr = dataList.map((item, index) => {
                let tempData = {}
                tempData.key = item.time
                tempData.isChecked = item.isChecked
                tempData.index = index
                tempData.data = item.children
                return tempData
            })
        }

        return (
            <View style={{ flex: 1, backgroundColor: 'white' }}>
                <View style={{ height: 74, paddingTop: global.titleBarPaddingTop, flexDirection: 'row' }}>
                    <TouchableOpacity onPress={this.handleBackPress.bind(this)}>
                        <Image source={back} style={{
                            width: 20, height: 20, marginLeft: 15,
                            resizeMode: 'contain'
                        }}></Image>
                    </TouchableOpacity>

                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }}>
                        <Text style={{ fontSize: 15, color: 'black' }}>浏览记录</Text>
                    </View>
                    <TouchableOpacity onPress={this.clickRightItem.bind(this)}>
                        <Text style={{ fontSize: 13, color: 'rgba(79,119,220,1)', width: 35 }}>{this.state.isEdit ? '完成' : '编辑'}</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ backgroundColor: 'rgba(245,245,245,1)', height: 1 }} />
                {tempArr != null ?
                    <SectionList style={{ flex: 1 }}
                        renderSectionHeader={this.renderSectionHeader}
                        renderItem={this.renderItem}
                        sections={tempArr}
                        key={this.createKey}
                        keyExtractor={(item, index) => item.id}
                        ItemSeparatorComponent={() => <View />}
                        ListHeaderComponent={() => <View />}
                        ListFooterComponent={() => <View />}
                    />
                    : <View style={{ flex: 1 }} />}
                {
                    this.state.isEdit ?
                        <View style={{ height: 49, }}>
                            <View style={{ backgroundColor: 'rgba(245,245,245,1)', height: 1 }} />
                            <TouchableOpacity style={{ marginTop: 14.5, }} onPress={this.deleteItem.bind(this)} >
                                <Text style={{ fontSize: 16, color: '#FF5959', textAlign: 'center', justifyContent: 'center', }}>删除({this.state.checkIds.length})</Text>
                            </TouchableOpacity>
                        </View> :
                        <View />
                }

            </View >
        )
    }
}
const styles = StyleSheet.create({
    checkBox: {
        width: 40,
        height: 40,
    },
})
