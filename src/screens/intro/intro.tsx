import React from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, Text, TouchableNativeFeedback, View } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import Swiper from "react-native-swiper";
import { useNavigation } from "@react-navigation/native";

import { Slide1 } from "./slides";
import { AppIntroNavigationProp } from "../../navigation/screens";

const AppIntro = () => {
    const { t, i18n } = useTranslation();
    const navigation = useNavigation<AppIntroNavigationProp>();

    return (
        <LinearGradient
            colors={["#668ee6", "#a154df"]}
            start={{ x: 0.3, y: 0 }}
            style={{ flex: 1 }}>
            <SafeAreaView style={{ flex: 1 }}>
                <Swiper
                    loop={false}
                    showsButtons={true}
                    style={{ flex: 1 }}>
                    <Slide1 />
                </Swiper>
                <TouchableNativeFeedback
                    onPress={() => navigation.popTo("Chat", { id: undefined })}>
                    <View style={styles.button}>
                        <Text
                            style={{ fontFamily: "Inter Regular", fontSize: 18 }}>{t("intro.button")}</Text>
                    </View>
                </TouchableNativeFeedback>
            </SafeAreaView>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    button: {
        alignItems: "center",
        backgroundColor: "white",
        borderRadius: 12,
        bottom: 50,
        left: "12%",
        position: "absolute",
        marginBottom: 20,
        paddingVertical: 10,
        width: "75%"
    }
});

export default AppIntro;