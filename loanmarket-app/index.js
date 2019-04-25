/** @format */

import { AppRegistry } from "react-native";
import App from "./src/App";
import { name as appName } from "./app.json";
import { YellowBox } from 'react-native';

AppRegistry.registerComponent(appName, () => App);
YellowBox.ignoreWarnings(['Remote debugger']);