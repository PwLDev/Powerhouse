import React, { useState, useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";

import AppIntro from "../screens/Intro";

const Stack = createNativeStackNavigator();

const MainNavigator = () => {
    const [initialRoute, setInitialRoute] = useState<string | null>(null);

    // useEffect(() => {
    //     const checkLaunched = async () => {
    //         const hasLaunched = AsyncStorage.getItem("launched");

    //         if (hasLaunched == null) {
    //             await AsyncStorage.setItem("launched", "true");
    //             setInitialRoute("AppIntro");
    //         } else {
    //             setInitialRoute("ModeSelection");
    //         }
    //     }

    //     checkLaunched();
    // }, []);

    // if (initialRoute == null) return;

    return (
        <Stack.Navigator
            screenOptions={{ headerShown: false }}
            initialRouteName="AppIntro">
            <Stack.Screen
                name="AppIntro"
                component={AppIntro} />
        </Stack.Navigator>
    )
}

export default MainNavigator;