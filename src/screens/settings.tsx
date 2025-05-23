import React from "react";
import { useTranslation } from "react-i18next";
import { ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { BooleanOption, SettingsSection } from "../components/settings/settings";

const Settings = () => {
    const { t } = useTranslation();

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView
                contentContainerStyle={styles.container}>
                <SettingsSection
                    name={t("settings.sections.general")}>
                        <BooleanOption
                            defaultValue
                            name={t("settings.haptics.name")}
                            description={t("settings.haptics.description")}/>
                </SettingsSection>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        flexDirection: "column",
        marginHorizontal: 20
    }
});

export default Settings;