import React, { useState } from "react";
import { Text, useColorScheme } from "react-native";

import { ChatSelectNavigationProps } from "../../navigation/screens";
import { AdaptiveView } from "../../components/navigation/view";

const ChatSelect = ({ navigation, route }: ChatSelectNavigationProps) => {
    const scheme = useColorScheme();

    return (
        <AdaptiveView>
            <Text
                selectable
                selectionColor="#c59fe3"
                style={{
                    color: scheme == "dark" ? "white" : "black",
                    fontFamily: "Inter Regular",
                    fontSize: 16,
                    margin: 20
                }}>
                {route.params.text}
            </Text>
        </AdaptiveView>
    );
}

export default ChatSelect;