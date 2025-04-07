/**
 * @format
 */

import { AppRegistry } from "react-native";
import "react-native-polyfill-globals/auto";
import "text-encoding";

import App from "./src/App";
import { name as appName } from "./app.json";

AppRegistry.registerComponent(appName, () => App);