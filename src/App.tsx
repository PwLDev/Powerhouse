import React from "react";
import { I18nextProvider } from "react-i18next";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";

import i18n from "./locales/i18n";
import MainNavigator from "./navigation/mainNavigator";

const App = () => {
    return (
        <React.StrictMode>
            <SafeAreaProvider>
                <NavigationContainer>
                    <I18nextProvider i18n={i18n}>
                        <MainNavigator />
                    </I18nextProvider>
                </NavigationContainer>
            </SafeAreaProvider>
        </React.StrictMode>
    );
}

export default App;