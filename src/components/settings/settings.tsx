import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface SettingsSectionProps {
    children: React.ReactNode | React.ReactNode[];
    name: string;
}

interface BooleanOptionProps {
    defaultValue: boolean;
    name: string;
    description: string;
}

export const SettingsSection = ({ children, name }: SettingsSectionProps) => {
    return (
        <View style={styles.section}>
            <View style={styles.header}>
                <Text style={styles.title}>{name}</Text>
            </View>
            {children}
        </View>
    )
}

export const BooleanOption = ({ defaultValue, name, description }: BooleanOptionProps) => {
    return (
        <View style={styles.option}>

        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        paddingVertical: 5
    },
    option: {
        paddingVertical: 10,
        width: "auto"
    },
    section: {
        width: "100%"
    },
    title: {
        fontFamily: "Inter Italic",
        fontSize: 16
    }
});