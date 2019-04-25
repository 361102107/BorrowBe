import { connect } from "react-redux";
import Root from "./container/index";
import actions from "../../models/actions";

export default connect(
    ({ productListInfo,
        adInfo,
        noticeInfo,
        toolInfo,
        apply,
        click,
    }) => ({
        productListInfo,
        adInfo,
        noticeInfo,
        toolInfo,
        apply,
        click,
    }),
    {
        productList: actions.productList,
        adList: actions.adList,
        getNotice: actions.getNotice,
        getTool: actions.toolList,
        onApply: actions.apply,
        onClick: actions.click
    }
)(Root);