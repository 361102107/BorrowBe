import { connect } from "react-redux";
import Root from "./container/index";
import actions from "../../../../models/actions";

export default connect(
    ({ modifyMobileSend,
        modifyMobileVerify,
        modifyMobile }) => ({
            modifyMobileSend,
            modifyMobileVerify,
            modifyMobile
        }),
    {
        onModifyMobileSend: actions.modifyMobileSend,
        onModifyMobileVerify: actions.modifyMobileVerify,
        onModifyMobile: actions.modifyMobile,
    }
)(Root);