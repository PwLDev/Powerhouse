import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Alert, StyleSheet, useColorScheme, View } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";

import Gemini from "../../icons/models/gemini.svg";
import OpenAI from "../../icons/models/gpt.svg";
import Phi from "../../icons/models/microsoft.svg";
import Powerhouse from "../../icons/powerhouse.svg";

import { getChatModels } from "../../services/chat";
import { PollinationsModel } from "../../services/types/text";
import { ChatStorage } from "../../storage/storage";

/**
 * These special models are designed to have their own section.
 */
const specialModels = ["midijourney", "qwen-coder", "openai-audio"];

type ModelDropdownProps = {
    onChange: (model: PollinationsModel) => void;
}

type ChatEmptyProps = {
    temporary: boolean;
}

export const ModelDropdown = ({ onChange }: ModelDropdownProps) => {
    const [loading, setLoading] = useState(true);
    const [modelList, setModelList] = useState<PollinationsModel[]>([]);
    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState("openai");
    const scheme = useColorScheme();
    const { t } = useTranslation();

    const getSelectedModel = async (models: PollinationsModel[]) => {
        const selected = await ChatStorage.getString("chat_model") || "openai";

        const filtered = models.filter((m) => !specialModels.includes(m.name));
        const selectedModel = filtered.find((m) => m.name == selected);

        if (selectedModel) {
            setSelected(selected);
        };

        setModelList(filtered);
        setLoading(false);
    }

    const getModelIcon = (model: PollinationsModel) => {
        const width = 25, height = 25;
        const fillColour = scheme == "dark" ? "white" : undefined;

        if (model.name.startsWith("openai")) {
            return (
                <OpenAI
                    fill={fillColour}
                    width={width}
                    height={height} />
            );
        } else if (model.name.startsWith("gemini")) {
            return (
                <Gemini
                    fill={fillColour}
                    width={width}
                    height={height} />
            );
        } else if (model.name.startsWith("phi")) {
            return (
                <Phi
                    fill={fillColour}
                    width={width}
                    height={height} />
            );
        } else {
            return (
                <Powerhouse
                    fill={fillColour}
                    width={width}
                    height={height} />
            );
        }
    }

    useEffect(() => {
        getChatModels()
            .then(getSelectedModel)
            .catch((error: Error) => {
                console.error(error);
                return Alert.alert(t("error.connection.title"), t("error.connection.description"));
            });
    }, []);

    useEffect(() => {
        const model = modelList.find((m) => m.name == selected);
        if (model) onChange(model);
        
        ChatStorage.set("chat_model", selected);
    }, [selected]);

    return (
        <DropDownPicker
            open={open}
            items={modelList.map((model) => ({
                label: model.description,
                icon: () => getModelIcon(model),
                resizeMode: "contain",
                value: model.name
            }))}
            value={selected}
            loading={loading}
            multiple={false}
            setOpen={setOpen}
            setValue={setSelected}
            style={styles.list}
            containerStyle={styles.container}
            dropDownContainerStyle={styles.dropdown}
            textStyle={{ fontFamily: "Inter Regular" }}
            labelStyle={{ fontFamily: "Inter Bold" }} />
    );
}

export const ChatEmpty = ({ temporary }: ChatEmptyProps) => {
    const scheme = useColorScheme();
    const { t } = useTranslation();

    return (
        <View style={styles.empty}>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 10,
    },
    empty: {
        flex: 1,
        justifyContent: "center",
        alignContent: "center"
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-evenly",
        padding: 15,
        width: "100%"
    },
    dropdown: {
        borderWidth: 0,
        borderRadius: 8,
        width: "80%"
    },
    list: {
        borderWidth: 0,
        height: 36,
        width: "80%"
    },
    title: {
        fontFamily: "Inter Bold",
        fontSize: 24
    },
});