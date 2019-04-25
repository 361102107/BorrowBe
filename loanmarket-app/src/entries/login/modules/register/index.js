import { connect } from "react-redux";
import Root from "./container/index";
import actions from "../../../../models/actions";

export default connect(
    ({ register_getCode_info,register_verify_info }) => ({
        register_getCode_info,
        register_verify_info
    }),
    {
        getCode: actions.register_getCode,
        verify: actions.register_verify
    }
)(Root);