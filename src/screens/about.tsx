import React, { useEffect } from "react";
import { useTranslation } from "react-i18next"; 
import { Animated, Easing, Linking, StyleSheet, Text, TouchableWithoutFeedback, useAnimatedValue, useColorScheme, View } from "react-native";
import DeviceInfo from "react-native-device-info";
import LinearGradient from "react-native-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";

import Pollinations from "../icons/about/pollinations.svg";
import Powerhouse from "../icons/powerhouse.svg";
import ReactAtom from "../icons/about/react.svg";

const About = () => {
    const animatedX = useAnimatedValue(0);
    const scheme = useColorScheme();
    const { t } = useTranslation();

    const openLink = async (url: string) => {
        const supported = await Linking.canOpenURL(url);

        if (supported) {
            await Linking.openURL(url);
        }
    }

    useEffect(() => {
        Animated.loop(
            Animated.timing(animatedX, {
                duration: 5000,
                easing: Easing.linear,
                useNativeDriver: true,
                toValue: 1
            })
        ).start();
    }, [animatedX]);

    const spin = animatedX.interpolate({
        inputRange: [0, 1],
        outputRange: ["0deg", "360deg"]
    });

    return (
        <LinearGradient
            colors={["#668ee6", "#a154df"]}
            start={{ x: 0, y: 0.3 }}
            style={{ flex: 1, opacity: scheme == "dark" ? 0.7 : 1 }}>
            <SafeAreaView style={styles.container}>
                <Powerhouse
                    style={styles.icon}
                    width={200}
                    height={200} />
                <View style={{ alignItems: "center" }}>
                    <Text style={styles.title}>Powerhouse</Text>
                    <Text style={styles.quote}>
                        {t("about.quote")}
                    </Text>
                </View>
                <View>
                    <Text style={styles.text}>
                        {`${t("about.version")} ${DeviceInfo.getVersion()} (${DeviceInfo.getBuildNumber()})`}
                    </Text>
                </View>
                <View style={{ alignItems: "center", gap: 10 }}>
                    <View style={styles.library}>
                        <Animated.View
                            style={{ transform: [{ rotateZ: spin }] }}>
                            <TouchableWithoutFeedback
                                onPress={() => openLink("https://reactnative.dev")}>
                                <ReactAtom
                                    width={40}
                                    height={40} />
                            </TouchableWithoutFeedback>
                        </Animated.View>
                        <View>
                            <Text style={styles.text}>{t("about.react")}</Text>
                        </View>
                    </View>
                    <View style={styles.library}>
                        <TouchableWithoutFeedback
                            onPress={() => openLink("https://pollinations.ai")}>
                            <Pollinations
                                width={40}
                                height={40} />
                        </TouchableWithoutFeedback>
                        <View>
                            <Text style={styles.text}>{t("about.pollinations")}</Text>
                        </View>
                    </View>
                </View>
            </SafeAreaView>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    bold: {
        color: "white",
        fontFamily: "Inter Bold",
        fontSize: 18
    },
    container: {
        flex: 1,
        alignItems: "center",
        gap: 25
    },
    icon: {
        marginTop: "5%"
    },
    library: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        marginHorizontal: "auto",
        gap: 10
    },
    quote: {
        color: "white",
        fontFamily: "Inter Italic",
        fontSize: 18,
        maxWidth: "90%"
    },
    title: {
        color: "white",
        fontFamily: "Inter Bold",
        fontSize: 34
    },
    text: {
        color: "white",
        fontFamily: "Inter Regular",
        fontSize: 18,
        textAlign: "center"
    }
});

export default About;