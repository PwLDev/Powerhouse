import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Animated, StyleSheet, Text, useAnimatedValue, View } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import Svg, { Image } from "react-native-svg";

export const Slide1 = () => {
    const { t, i18n } = useTranslation();

    return (
        <LinearGradient
            colors={["#668ee6", "#a154df"]}
            start={{ x: 0.2, y: -0.2 }}
            style={styles.gradient}>
            <View style={styles.container}>
                <Svg
                    width={200}
                    height={200}>
                    <Image href={require("./icons/powerhouse.svg")}/>
                </Svg>

                <Text style={styles.subtitle}>{t("intro.welcome")}</Text>
                <Text style={styles.title}>Powerhouse</Text>
            </View>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 20
    },
    gradient: {
        flex: 1,
    },
    subtitle: {
        color: "white",
        fontFamily: "Inter Regular",
        fontSize: 18
    },
    title: {
        color: "white",
        fontSize: 40,
        fontFamily: "Inter Bold"
    }
});