import { connect } from "react-redux";
import Root from "./container/index";
import actions from "../../../../models/actions";

export default connect(
    ({ message }) => ({
        message
    }),
    {
        getMessage: actions.message
    }
)(Root);