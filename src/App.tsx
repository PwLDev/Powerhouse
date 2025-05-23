import React from "react";
import { I18nextProvider } from "react-i18next";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";

import i18n from "./locales/i18n";
import MainNavigator from "./navigation/mainNavigator";

const App = () => {
    return (
        <NavigationContainer>
            <SafeAreaProvider>
                <I18nextProvider i18n={i18n}>
                    <MainNavigator />
                </I18nextProvider>
            </SafeAreaProvider>
        </NavigationContainer>
    );
}

export default App;

declare global {
    interface RequestInit {
        /**
         * @description Polyfilled to enable text ReadableStream for React Native:
         * @link https://github.com/facebook/react-native/issues/27741#issuecomment-2362901032
         */
        reactNative?: {
            textStreaming: boolean;
        };
    }
}