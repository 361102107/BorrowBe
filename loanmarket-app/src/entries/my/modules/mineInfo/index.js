import { connect } from "react-redux";
import Root from "./container/index";
import actions from "../../../../models/actions";

export default connect(
    ({ updateResult,
        upload_head, profile, }) => ({
            updateResult,
            upload_head, profile,
        }),
    {
        updateInfo: actions.updateInfo,
        uploadHead: actions.upload_head,
        profile: actions.profile,
    }
)(Root);