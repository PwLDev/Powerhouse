import React from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, Text, View } from "react-native";

import Powerhouse from "../../icons/powerhouse.svg";

export const Slide1 = () => {
    const { t } = useTranslation();

    return (
        <View style={styles.container}>
            <Powerhouse
                height={270}
                style={styles.icon} />
            <Text style={styles.subtitle}>{t("intro.welcome")}</Text>
            <Text style={styles.title}>Powerhouse</Text>
            <Text style={styles.quote}>{t("intro.quote")}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 20
    },
    icon: {
        marginHorizontal: "auto",
        marginVertical: "25%"
    },
    gradient: {
        flex: 1,
    },
    quote: {
        color: "white",
        fontFamily: "Inter Italic",
        fontSize: 18,
        marginTop: 10
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