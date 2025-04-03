import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import MainNavigator from "./navigation/MainNavigator";
import { Text } from "react-native";

const App = () => {
    return (
        <React.StrictMode>
            <NavigationContainer>
                <MainNavigator />
            </NavigationContainer>
        </React.StrictMode>
    );
}

export default App;