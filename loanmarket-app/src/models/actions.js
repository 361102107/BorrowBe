import * as MineActions from "./mine/action";
import * as LoginActions from "./login/action";
import * as HomeActions from "./home/action";
import * as InfomationActions from "./infomation/action";
import * as recordActions from "./record/action";

export default {
    ...MineActions,
    ...LoginActions,
    ...HomeActions,
    ...InfomationActions,
    ...recordActions,
};
