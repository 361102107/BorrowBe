import React, { PureComponent } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { StackActions } from "react-navigation";
import Toast, { DURATION } from 'react-native-easy-toast';
import Loading from 'react-native-whc-loading';
import styles from "./style";
import InfomationCell from "./infomationCell"
import Segment from "./segment";
import loadGif from "../../../assets/images/loading.gif";
var LIST_VIEW = 'listView';
export default class Index extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            page: 1,
            per_page: 15,
            total: 0,
            // 下拉刷新
            isRefresh: false,
            // 加载更多
            isLoadMore: false,
            endReaching: false,
            currentSegmentIndex: 0,
        }
        console.log('888888');
    }
    componentWillMount(){
        console.log('componentWillMount');
    }
    
    componentDidMount() {
        
        console.log('componentDidMount');
        // 通过addListener开启监听，可以使用上面的四个属性
        this._didBlurSubscription = this.props.navigation.addListener(
            'didFocus',
            payload => { this.getTitleCategory(); });

            this._didBlurSubscription = this.props.navigation.addListener(
                'didBlur',
                payload => {
                    console.log('zhouzhouyuanyuan');
    
                });
    }
    getTitleCategory() {
        storage.load({
            key: 'appToken',
        }).then(ret => {
            let parmeters = { params: {}, header: { "Authorization": "Bearer" + ret } };
            this.props.getCategory(parmeters)
                .then(res => {
                    
                    console.log(res);
                    if (res && res.code == 0) {
                        this.seletedSegmentItem(this.state.currentSegmentIndex);
                    }
                    else {
                        this.refs.toast.show(res.msg);
                    }
                }).catch(err => {
                    this.refs.toast.show("网络错误");
                    this.refs.loading.close();
                });
        }).catch(err => {

        })

        // this.props.getCategory();
    }
    clickCell(value,title,image) {
        
        this.props.navigation.dispatch(
            StackActions.push({
                routeName: "InfomationDetail",
                params: {
                    articleId: value,
                    articleTitle: title,
                    articleImage: image
                }
            })
        );

    }

    seletedSegmentItem(value) {
        console.log(value);
        this.refs[LIST_VIEW].scrollToOffset({animated: true, offset: 0});
        
        this.setState({
            page: 1,
            currentSegmentIndex: value,
            endReaching:false,
        })
        this.requestArticleList(value);
    }

    requestArticleList(value) {
        console.log('klklklklklklklklk');
        let cateId = this.props.getCategory_Info[value].cate_id;
        storage.load({
            key: 'appToken',
        }).then(ret => {
            let parmeters = {
                params: { "cate_id": cateId, "per_page": this.state.per_page, "page": this.state.page },
                header: { "Authorization": "Bearer" + ret }
            };
            this.props.getArticleList(parmeters)
                .then(res => {
                    this.setState({
                        total: res.data.total
                    })
                    if (res.data.list == null || res.data.list.length < 1) {
                        this.setState({
                            isRefresh: false,
                            isLoadMore: false,
                            endReaching: true,
                        })
                    }
                    this.setState({
                        isRefresh: false,
                        isLoadMore: false,
                        
                    })

                    console.log(res);
                    if (res && res.code == 0) {

                    }
                    else {
                        this.refs.toast.show(res.msg);
                    }
                }).catch(err => {
                    this.setState({
                        isRefresh: false,
                        isLoadMore: false,
                    })
                    this.refs.toast.show("网络错误");
                    this.refs.loading.close();
                });
        }).catch(err => {
            this.setState({
                isRefresh: false,
                isEndReaching: false,
            })
        })
    }
    _createEmptyView() {
        return (
            <View style={{height:400, alignItems: 'center', justifyContent: 'center'}}>
                <Text style={{ fontSize: 12, color: '#1989FA', marginTop: 10 }}>
                    暂无列表数据
                </Text>
            </View>
        );
    }
    genIndictor = () => {
        let { getCategory_Info, getArticle_list_Info } = this.props;
        
        if(!getArticle_list_Info){
            return <View></View>

        }
        return this.state.endReaching ?
            <View style={{ flexDirection: 'row', justifyContent: 'center', height: 30 }}>
                <Text style={{ fontSize: 13, color: '#666', marginTop: 5 }}>加载完成</Text>
            </View> :
            //  <View>
            //     <ActivityIndicator size={20} animating={true} />
            // </View>
            <View style={{ flexDirection: 'row', justifyContent: 'center', height: 60 }}>
                {/* <Image style={{ height: 30, width: 30, marginTop: 15 }} source={loadGif} /> */}
                <Text style={{ fontSize: 13, color: '#afafaf', marginTop: 20, marginLeft: 11 }}>上拉加载</Text>
            </View>
    };

    _onLoadMore() {
        console.log('_onLoadMore');
        console.log(this.state.total);
        

        let { getArticle_list_Info } = this.props;
        console.log(getArticle_list_Info.list.length);
        console.log(this.state.isLoadMore);
        if (!this.state.isLoadMore && getArticle_list_Info.list.length < this.state.total) {
            this.setState({
                
                page: this.state.page + 1,
            })
            this.requestArticleList(this.state.currentSegmentIndex);
        } else {
            this.setState({
                endReaching: true
            })
        }
    }
    _onRefresh() {
        console.log('_onRefresh');
       // 不处于 下拉刷新
       if (!this.state.isRefresh) {
        this.setState({
            endReaching: false,
            page: 1,
        })
        this.requestArticleList(this.state.currentSegmentIndex);

       }
    }
    render() {
        let { getCategory_Info, getArticle_list_Info } = this.props;
        
        return (

            <View style={styles.pageBox}>
                <Loading ref="loading" />
                <Toast ref="toast" />
                <View style={{ height: 80, backgroundColor: 'white' }}>
                    <Segment style={{ flex: 1 }}
                        index = {this.state.currentSegmentIndex}
                        titleData={getCategory_Info}
                        selectedItem={(value) => this.seletedSegmentItem(value)}></Segment>
                </View>
                <View style={{ height: 1, backgroundColor: 'rgba(240,240,240,1)' }}></View>
                <FlatList style = {{flex:1}}
                    ref={LIST_VIEW}
                    onEndReached={this._onLoadMore.bind(this)}
                    onEndReachedThreshold={0.01}
                    // 空布局
                    ListEmptyComponent={this._createEmptyView}
                    onRefresh={() => this._onRefresh()}
                    refreshing={this.state.isRefresh}
                    endReaching={this.state.endReaching}
                    ListFooterComponent={() => this.genIndictor()}
                    data={getArticle_list_Info ? getArticle_list_Info.list : []}
                    keyExtractor={(item) => String(item.article_id)}
                    renderItem={({ item }) => <TouchableOpacity 
                    onPress={this.clickCell.bind(this, item.article_id,item.title,item.cover_img)}>
                        <InfomationCell title={item.title}
                            author={item.author}
                            look={item.click_count}
                            avatar={item.avatar}
                            cover_img={item.cover_img}></InfomationCell>
                    </TouchableOpacity>}
                />
            </View>
        );
    }
}