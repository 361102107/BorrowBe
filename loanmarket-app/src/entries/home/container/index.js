import React, { PureComponent } from "react";
import { View, Text, FlatList, TouchableOpacity, Image, Platform } from "react-native";
import { StackActions } from "react-navigation";
import Confirm from "../../../components/confirm";
import styles from "./style";
import Header from "./homeHeader"
import HomeCell from "./homeCell"
import Toast from 'react-native-easy-toast';

class Index extends PureComponent {
    constructor() {
        super();
        this.state = {
            page: 1,
            per_page: 10,
            total: 0,
            // 下拉刷新
            isRefresh: false,
            // 加载更多
            isLoadMore: false,
            endReaching: false,
            productListInfo: [],
            marginTop: Platform.OS === 'ios' ? 64 : 44,
            token: "",
        }
    }
    componentDidMount() {
        // 通过addListener开启监听，可以使用上面的四个属性
        this._didBlurSubscription = this.props.navigation.addListener(
            'didFocus',
            payload => {
                storage.load({
                    key: 'appToken',
                }).then(ret => {
                    console.log(ret);
                    this.setState({
                        token: ret,
                    })
                    this.getAdData(ret);
                    this.getMarqueeData(ret);
                    this.getTool(ret);
                }).catch(err => {

                })
                this._onRefresh()
            });

    }
    getListData(token) {
        let { page, per_page } = this.state;
        let param = {
            page, per_page
        }
        let header = { "Authorization": "Bearer" + token }
        let params = { param: param, header }
        this.props.productList(params).then((data) => {
            console.log(data)
            if (!data || data && data.code != 0) {//成功
                this.setState({
                    isRefresh: false,
                    isLoadMore: false,
                })
                if (this.state.page == 1) {
                    this.setState({
                        productListInfo: [],
                    })
                }
            } else {
                if (data.data.list == null || data.data.list.length < 1) {
                    this.setState({
                        isRefresh: false,
                        isLoadMore: false,
                        endReaching: true,
                    })
                    console.log("endReaching" + this.state.endReaching)
                    if (this.state.page == 1) {
                        this.setState({
                            productListInfo: [],
                        })
                    }
                } else {
                    this.setState({
                        total: data.data.total
                    })
                    if (this.state.page === 1) {
                        console.log("重新加载")
                        this.setState({
                            isRefresh: false,
                            productListInfo: data.data.list
                        })
                    } else {
                        console.log("加载更多")
                        this.setState({
                            // 加载更多 这个变量不刷新
                            isLoadMore: false,
                            // 数据源刷新 add
                            productListInfo: this.state.productListInfo.concat(data.data.list)
                        })
                    }
                }
            }
        }).catch((error) => {
            console.error(error);
            if (this.state.page == 1) {
                this.setState({
                    productListInfo: [],
                })
            }
        });


    }
    getAdData(token) {
        let param = { position: 2 }
        let header = { "Authorization": "Bearer" + token }
        let params = { param: param, header }
        this.props.adList(params)
    }
    getMarqueeData(token) {
        let param = { position: 3 }
        let header = { "Authorization": "Bearer" + token }
        let params = { param: param, header }
        this.props.getNotice(params)
    }
    getTool(token) {
        let param = { position: 5 }
        let header = { "Authorization": "Bearer" + token }
        let params = { param: param, header }
        this.props.getTool(params)
    }
    clickCell(value) {
        // this.apply(value)
        this.props.navigation.dispatch(
            StackActions.push({
                routeName: "HomeDetail",
                params: {
                    id: value
                }
            })
        );

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
    header(adInfo, noticeInfo, toolInfo, navigation, onClick, onApply) {
        return <Header adList={adInfo} noticeInfo={noticeInfo} toolInfo={toolInfo} navigation={navigation} onClick={onClick} onApply={onApply}></Header>;
    }
    _createEmptyView() {
        return (
            <View style={{ height: '100%', alignItems: 'center', justifyContent: 'center'}}>
                <Text style={{ fontSize: 12, color: '#1989FA', marginTop: 10 }}>
                    暂无列表数据
                </Text>
            </View>
        );
    }
    _onRefresh() {
        // 不处于 下拉刷新
        if (!this.state.isRefresh) {
            this.state.page = 1
            this.state.endReaching = false
            this.requestData()
        }
    };
    _onLoadMore() {
        // 不处于正在加载更多 && 有下拉刷新过，因为没数据的时候 会触发加载
        console.log('oopoop')
        if (!this.state.isLoadMore && this.state.productListInfo.length < this.state.total) {
            this.state.page = this.state.page + 1
            this.requestData()
        } else {
            this.setState({
                endReaching: true
            })
        }
    }
    genIndictor = () => {
        return this.state.endReaching ?
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', height: 30 }}>
                <Text style={{ fontSize: 13, color: '#666', marginTop: 5 }}>加载完成</Text>
            </View> :
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', height: 60 }}>
                <Image style={{ height: 30, width: 30, marginTop: 15 }} source={require("../../../assets/images/loading.gif")} />
                <Text style={{ fontSize: 13, color: '#afafaf', marginTop: 20, marginLeft: 11 }}>正在加载</Text>
            </View>
    };
    requestData() {
        storage.load({
            key: 'appToken',
        }).then(ret => {
            this.getListData(ret);
        }).catch(err => {

        })
    }

    render() {
        let { adInfo, noticeInfo, toolInfo } = this.props;
        
        return (
            <View style={styles.pageBox}>

                <Toast ref="toast" />
                <View style={{ height: this.state.marginTop, backgroundColor: 'white' }}></View>
                <FlatList
                    data={this.state.productListInfo}
                    enableEmptySections={true}
                    keyExtractor={(item) => item.id.toString()}
                    ListHeaderComponent={this.header(adInfo, noticeInfo, toolInfo, this.props.navigation, this.props.onClick, this.props.onApply)}
                    renderItem={({ item }) => <TouchableOpacity onPress={this.clickCell.bind(this, item.id)}>
                        <HomeCell productInfo={item}></HomeCell>

                    </TouchableOpacity>}

                    // 空布局
                    ListEmptyComponent={this._createEmptyView}
                    //下拉刷新相关
                    onRefresh={() => this._onRefresh()}
                    refreshing={this.state.isRefresh}
                    endReaching={this.state.endReaching}
                    ListFooterComponent={() => this.genIndictor()}
                    onEndReached={() => this._onLoadMore()}
                    onEndReachedThreshold={0.1}
                />
            </View>
        );
    }
}
export default Index;
