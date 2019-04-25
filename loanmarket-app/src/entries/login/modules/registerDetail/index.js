import { connect } from "react-redux";
import Root from "./container/index";
import actions from "../../../../models/actions";

export default connect(
    ({ register_complete_info }) => ({
        register_complete_info
    }),
    {
        complete: actions.register_complete
    }
)(Root);