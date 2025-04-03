import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import MainNavigator from "./navigation/mainNavigator";

const App = () => {
    return (
        <React.StrictMode>
            <SafeAreaProvider>
                <NavigationContainer>
                    <MainNavigator />
                </NavigationContainer>
            </SafeAreaProvider>
        </React.StrictMode>
    );
}

export default App;