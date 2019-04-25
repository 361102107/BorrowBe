import { connect } from "react-redux";
import Root from "./container/index";
import actions from "../../../../models/actions";

export default connect(
    ({ find_setPassword_info }) => ({
        find_setPassword_info
    }),
    {
        setPassword: actions.find_setPassword
    }
)(Root);