/**
 * @format
 */

import { AppRegistry } from "react-native";
import { polyfill as polyfillFetch } from "react-native-polyfill-globals/src/fetch";
import { ReadableStream as ReadableStreamPolyfill } from "web-streams-polyfill/dist/ponyfill";
import "text-encoding";

import App from "./src/App";
import { name as appName } from "./app.json";

// Add polyfills
polyfillFetch();
globalThis.ReadableStream = ReadableStreamPolyfill;

AppRegistry.registerComponent(appName, () => App);