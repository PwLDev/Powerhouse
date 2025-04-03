import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { LinearGradient } from "react-native-linear-gradient";

const AppIntro = () => {
    return (
        <LinearGradient
            colors={["#668ee6", "#a154df"]}
            start={{ x: 0.35, y: 0 }}
            style={styles.view}>
                <View style={styles.container}>

                </View>
        </LinearGradient>
    );
}
const styles = StyleSheet.create({
    container: {
        alignContent: "center",
        display: "flex",
        margin: 15
    },
    subtitle: {
        color: "white",
        fontFamily: "Inter Bold",
        fontSize: 16
    },
    title: {
        color: "white",
        fontFamily: "Inter Bold",
        fontSize: 36,
        fontWeight: "600"
    },
    view: {
        flex: 1
    }
});

export default AppIntro;