import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useColorScheme } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import About from "../screens/about";
import Chat from "../screens/chat";
import ChatSelect from "../screens/chat/select";
import AppIntro from "../screens/intro/intro";
import Settings from "../screens/settings";
import TTS from "../screens/tts";

import { RootStackParamList } from "./types";
import { BackButton, MenuButton } from "../components/navigation/buttons";

const Stack = createNativeStackNavigator<RootStackParamList>();
const headerLight = "white";
const headerDark = "#333333";

const MainNavigator = () => {
    // const [initialRoute, setInitialRoute] = useState<string | null>(null);
    const scheme = useColorScheme();
    const { t } = useTranslation();

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
            initialRouteName="Chat">
            <Stack.Screen
                name="AppIntro"
                component={AppIntro} />
            <Stack.Group
                screenOptions={{
                    headerShown: true,
                    headerLeft: () => <MenuButton />,
                    headerBackVisible: false, 
                    headerLargeTitle: false,
                    headerShadowVisible: false,
                    headerStyle: {
                        backgroundColor: scheme == "dark" ? headerDark : headerLight
                    },
                    headerTitleStyle: {
                        color: scheme == "dark" ? "white" : "black",
                        fontFamily: "Inter Regular"
                    },
                }}>
                <Stack.Screen
                    name="TTS"
                    component={TTS}
                    options={{ headerTitle: t("tts.title") }} />
            </Stack.Group>
            <Stack.Group
                screenOptions={{
                    // Disable Native iOS back
                    headerShown: true,
                    headerLeft: () => <BackButton />,
                    headerBackVisible: false, 
                    headerLargeTitle: false,
                    headerShadowVisible: false,
                    headerStyle: {
                        backgroundColor: scheme == "dark" ? headerDark : headerLight
                    },
                    headerTitleStyle: {
                        color: scheme == "dark" ? "white" : "black",
                        fontFamily: "Inter Regular"
                    },
                }}>
                    <Stack.Screen
                        name="About"
                        component={About}
                        options={{ headerTitle: t("about.title") }} />
                    <Stack.Screen
                        name="Chat"
                        component={Chat}
                        initialParams={{ id: undefined }} />
                    <Stack.Screen
                        name="ChatSelect"
                        component={ChatSelect}
                        options={{ headerTitle: t("chat.select") }} />
            </Stack.Group>
            <Stack.Group
                screenOptions={{
                    headerShown: true,
                    headerShadowVisible: false,
                    headerLargeTitle: true,
                    headerTitleStyle: {
                        fontFamily: "Inter Bold"
                    },
                }}>
                <Stack.Screen
                    name="Settings"
                    component={Settings} />
            </Stack.Group>
        </Stack.Navigator>
    )
}

export default MainNavigator;