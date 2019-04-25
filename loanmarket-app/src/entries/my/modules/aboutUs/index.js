import { connect } from "react-redux";
import Root from "./container/index";
import actions from "../../../../models/actions";

export default connect(
    ({ helpCenter }) => ({
        helpCenter
    }),
    {
        getSetting: actions.helpCenter
    }
)(Root);