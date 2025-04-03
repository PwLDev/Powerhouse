import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Swiper from "react-native-swiper";

import { Slide1 } from "./slides";

const AppIntro = () => {
    return (
        <Swiper
            style={styles.swiper}>
                <Slide1 />
        </Swiper>
    );
}

const styles = StyleSheet.create({
    swiper: {
        flex: 1
    }
});

export default AppIntro;