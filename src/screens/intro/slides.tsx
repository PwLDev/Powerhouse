import React from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, Text, View } from "react-native";
import LinearGradient from "react-native-linear-gradient";

export const Slide1 = () => {
    const { t, i18n } = useTranslation();

    return (
        <LinearGradient
            colors={["#668ee6", "#a154df"]}
            start={{ x: 0.35, y: 0 }}
            style={styles.gradient}>
            <View style={styles.container}>
                <Text>{t("intro.welcome")}</Text>
                <Text style={styles.title}>Powerhouse</Text>
            </View>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        margin: 15
    },
    gradient: {
        flex: 1,
        color: "white"
    },
    title: {
        color: "white",
        fontSize: 36,
        fontFamily: "Inter Bold"
    }
});