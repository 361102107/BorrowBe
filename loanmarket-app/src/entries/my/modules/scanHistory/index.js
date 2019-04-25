import { connect } from "react-redux";
import Root from "./container/index";
import actions from "../../../../models/actions";

export default connect(
    ({ recordList,
        apply,
    }) => ({
        recordList, apply
    }),
    {
        getRecordList: actions.getRecordList,
        singleCheckChange: actions.singleCheckChange,
        groupCheckChange: actions.groupCheckChange,
        deleteCheckedRecord: actions.deleteCheckedRecord,
        onApply: actions.apply,
    }
)(Root);