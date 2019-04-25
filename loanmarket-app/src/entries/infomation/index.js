import { connect } from "react-redux";
import Root from "./container/index";
import actions from "../../models/actions";

export default connect(
    ({ getCategory_Info,getArticle_list_Info }) => ({
        getCategory_Info,
        getArticle_list_Info
    }),
    {
        getCategory: actions.getCategory,
        getArticleList: actions.getArticle_list
    }
)(Root);