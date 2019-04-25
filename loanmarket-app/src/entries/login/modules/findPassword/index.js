import { connect } from "react-redux";
import Root from "./container/index";
import actions from "../../../../models/actions";

export default connect(
    ({ find_verify_info,find_getCode_info }) => ({
        find_verify_info,
        find_getCode_info
    }),
    {
        getCode: actions.find_getCode,
        verify: actions.find_verify
    }
)(Root);