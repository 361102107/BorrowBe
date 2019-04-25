import { connect } from "react-redux";
import Root from "./container/index";
import actions from "../../../../models/actions";

export default connect(
    ({ modifyMobileOldSend,
        modifyMobileOldVerify }) => ({
            modifyMobileOldSend,
            modifyMobileOldVerify
        }),
    {
        onModifyMobileOldSend: actions.modifyMobileOldSend,
        onModifyMobileOldVerify: actions.modifyMobileOldVerify,
    }
)(Root);