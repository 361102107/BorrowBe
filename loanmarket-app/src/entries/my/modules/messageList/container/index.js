import React, { PureComponent } from "react";
import { View, Text, TouchableOpacity, FlatList, Image } from "react-native";
import { StackActions } from "react-navigation";
import back from "../../../../../assets/images/back.png";
import mine_02 from "../../../../../assets/images/mine_02.png";
import MessageCell from "./messageCell";
export default class Index extends PureComponent {
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
            messageListInfo: [],
        }

    }
    handleBackPress() {
        this.props.navigation.dispatch(StackActions.pop({
            n: 1,
        }));
    }

    clickCell(value) {

    }
    componentDidMount() {
        // 通过addListener开启监听，可以使用上面的四个属性
        this._didBlurSubscription = this.props.navigation.addListener(
            'didFocus',
            payload => {
                this._onRefresh()

            });
    }
    getMessage(token) {
        let { page, per_page } = this.state;
        let param = {
            page, per_page
        }
        let header = { "Authorization": "Bearer" + token }
        let params = { params: param, header }
        this.props.getMessage(params).then((data) => {
            console.log(data)
            if (!data || data && data.code != 0) {//成功
                this.setState({
                    isRefresh: false,
                    isLoadMore: false,
                })
                if (this.state.page == 1) {
                    this.setState({
                        messageListInfo: [],
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
                            messageListInfo: [],
                        })
                    }
                } else {
                    this.setState({
                        total: data.data.total,
                    })
                    if (this.state.page === 1) {
                        console.log("重新加载")
                        this.setState({
                            isRefresh: false,
                            messageListInfo: data.data.list
                        })
                    } else {
                        console.log("加载更多")
                        this.setState({
                            // 加载更多 这个变量不刷新
                            isLoadMore: false,
                            // 数据源刷新 add
                            messageListInfo: this.state.messageListInfo.concat(data.data.list)
                        })
                    }
                }
            }
        }).catch((error) => {
            console.error(error);
            if (this.state.page == 1) {
                this.setState({
                    messageListInfo: [],
                })
            }
        });
    }
    _createEmptyView() {
        return (
            <View style={{ height: '100%', alignItems: 'center', justifyContent: 'center' }}>
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
        if (!this.state.isLoadMore && this.state.messageListInfo.length < this.state.total) {
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
                <Image style={{ height: 30, width: 30, marginTop: 15 }} source={require("../../../../../assets/images/loading.gif")} />
                <Text style={{ fontSize: 13, color: '#afafaf', marginTop: 20, marginLeft: 11 }}>正在加载</Text>
            </View>
    };
    requestData() {
        storage.load({
            key: 'appToken',
        }).then(ret => {
            this.getMessage(ret);
        }).catch(err => {

        })
    }
    render() {
        return (
            <View style={{ flex: 1, backgroundColor: 'white' }}>
                <View style={{ height: 74, paddingTop: global.titleBarPaddingTop, flexDirection: 'row' }}>
                    <TouchableOpacity onPress={this.handleBackPress.bind(this)}>
                        <Image source={back} style={{
                            width: 20, height: 20, marginLeft: 15,
                            resizeMode: 'contain'
                        }}></Image>
                    </TouchableOpacity>

                    <View style={{ flex: 1, marginRight: 35, flexDirection: 'row', justifyContent: 'center' }}>
                        <Text style={{ fontSize: 15, color: 'black' }}>消息列表</Text>
                    </View>
                </View>
                <View style={{ backgroundColor: 'rgba(245,245,245,1)', height: 1 }}></View>

                <FlatList style={{ flex: 1 }}
                    data={this.state.messageListInfo}
                    keyExtractor={(item) => item.time}
                    renderItem={({ item }) => <TouchableOpacity onPress={this.clickCell.bind(this, item.title)}>
                        <MessageCell
                            image={mine_02}
                            title={item.title}
                            content={item.content}
                            time={item.time}
                            is_read={item.is_read}
                        ></MessageCell>

                    </TouchableOpacity>}

                    // 空布局
                    ListEmptyComponent={this._createEmptyView}
                    下拉刷新相关
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