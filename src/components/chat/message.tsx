import React, { useEffect } from "react";
import { Animated, Appearance, Image, Pressable, StyleSheet, useAnimatedValue, useColorScheme, View } from "react-native";
import Markdown from "react-native-markdown-display";
import { useNavigation } from "@react-navigation/native";
import { ChatNavigationProp } from "../../navigation/screens";

export const ChatCursor = () => {
    const animatedScale = useAnimatedValue(0);
    const colorScheme = useColorScheme();

    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(animatedScale, {
                    toValue: 0,
                    duration: 700,
                    useNativeDriver: true
                }),
                Animated.timing(animatedScale, {
                    toValue: 1,
                    duration: 700,
                    useNativeDriver: true
                })
            ]),
            { resetBeforeIteration: false }
        ).start();
    }, []);

    const interpolatedScale = animatedScale.interpolate({
        inputRange: [0, 1],
        outputRange: [1, 1.25]
    });

    return (
        <Animated.View style={[
            styles.cursor,
            {
                backgroundColor: colorScheme == "dark" ? "white" : "black",
                transform: [{ scale: interpolatedScale }]
            }
        ]} />
    );
}

export const ChatImage = ({ uri }: { uri: string | undefined }) => {
    return (
        <Image
            height={125}
            width={125}
            source={{ uri }}
            style={styles.image} />
    );
}

export const ChatMessage = ({ children }: { children: React.ReactNode }) => {
    return (
        <View style={styles.message}>
            {children}
        </View>
    )
}

export const ChatReply = ({ children }: { children: React.ReactNode }) => {
    const navigation = useNavigation<ChatNavigationProp>();
    const scheme = useColorScheme();

    return (
        <Pressable
            onLongPress={() => children && navigation.navigate("ChatSelect", { text: children.toString() })}
            android_ripple={{ color: scheme == "dark" ? "#222" : "#ccc" }}>
            <View style={styles.container}>
                <Markdown style={{
                    ...markdownStyle,
                    body: { color: scheme == "dark" ? "white" : "black" }
                }}>
                    {children}
                </Markdown>
            </View>
        </Pressable>
    )
}

export const markdownStyle = StyleSheet.create({
    body: {
        fontSize: 16
    },
    paragraph: {
        fontFamily: "Inter Regular",
        fontSize: 16
    },
    strong: {
        fontFamily: "Inter Bold",
        fontWeight: "bold"
    },
    em: {
        fontFamily: "Inter Italic",
        fontStyle: "italic"
    },
    code_block: {
        backgroundColor: "#333333",
        borderRadius: 10,
        borderWidth: 1,
        color: "white",
        paddingHorizontal: 10
    },
    fence: {
        backgroundColor: "#333333",
        borderRadius: 10,
        borderWidth: 1,
        color: "white",
        paddingHorizontal: 10
    }
});

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20
    },
    cursor: {
        width: 10,
        height: 10,
        marginHorizontal: 20,
        marginVertical: 10,
        borderRadius: "50%"
    },
    image: {
        borderRadius: 12,
        marginVertical: 5
    },
    message: {
        marginLeft: "auto",
        marginRight: 15,
        marginVertical: 15,
        maxWidth: "60%",
        paddingVertical: 8,
        paddingHorizontal: 14,
        borderRadius: 15,
        backgroundColor: Appearance.getColorScheme() == "dark" ? "#666666" : "#dddddd"
    }
});