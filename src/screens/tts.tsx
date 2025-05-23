import React from "react";
import { useTranslation } from "react-i18next";
import { KeyboardAvoidingView, Platform, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { AdaptiveView } from "../components/navigation/view";
import { TTSNavigationProps } from "../navigation/screens";
import { EngineDropdown } from "../components/tts/dropdown";

const TTS = ({ route, navigation }: TTSNavigationProps) => {
    const { t } = useTranslation();
    const insets = useSafeAreaInsets();
    
    return (
        <AdaptiveView>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                keyboardVerticalOffset={Platform.OS == "ios" ? 90 : 30}
                style={{
                    flex: 1,
                    paddingBottom: insets.bottom,
                    paddingLeft: insets.left,
                    paddingRight: insets.right
                }}>
                <View style={styles.container}>
                    <EngineDropdown
                        label={t("tts.engine")} />
                </View>
            </KeyboardAvoidingView>
        </AdaptiveView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: "flex",
        flexDirection: "column"
    }
});

export default TTS;