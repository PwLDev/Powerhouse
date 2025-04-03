import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import MainNavigator from "./navigation/mainNavigator";

import { I18nextProvider } from "react-i18next";
import i18n from "./locales/i18n";

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