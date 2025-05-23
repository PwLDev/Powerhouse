import React from "react";
import { useColorScheme, View } from "react-native"

export const AdaptiveView = ({ children }: { children?: React.ReactNode }) => {
    const scheme = useColorScheme();

    return (
        <View style={{
            flex: 1,
            backgroundColor: scheme == "dark" ? "#222222" : "#efefef"
        }}>
            {children}
        </View>
    );
}