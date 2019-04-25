import { connect } from "react-redux";
import Root from "./container/index";
import actions from "../../models/actions";

export default connect(
    ({ profile, logout, messageType }) => ({
        profile, logout,
        messageType
    }),
    {
        profile: actions.profile,
        onLogout: actions.logout,
        getMessageType: actions.messageType,
    }
)(Root);
