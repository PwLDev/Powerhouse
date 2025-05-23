import React from "react";
import { Pressable, StyleSheet, TouchableWithoutFeedback, useColorScheme, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

import Back from "../../icons/ui/back.svg";
import Menu from "../../icons/ui/menu.svg";

export const BackButton = () => {
    const navigation = useNavigation();
    const scheme = useColorScheme();

    return (
        <Pressable
            onPress={() => navigation.goBack()}>
            <View style={styles.topButton}>
                <Back   
                    fill={scheme == "dark" ? "white" : "black"}
                    height={25}
                    width={25} />
            </View>
        </Pressable>
    )
}

export const MenuButton = () => {
    const navigation = useNavigation();
    const scheme = useColorScheme();

    return (
        <TouchableWithoutFeedback
            onPress={() => navigation.goBack()}>
            <View style={styles.topButton}>
                <Menu   
                    fill={scheme == "dark" ? "white" : "black"}
                    height={25}
                    width={25} />
            </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    topButton: {
        marginRight: 10,
        marginVertical: "auto",
        padding: 5
    }
});