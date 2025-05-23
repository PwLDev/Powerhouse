import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
    Animated,
    Appearance, 
    Easing, 
    Image, 
    Keyboard,
    Platform,
    Pressable, 
    StyleSheet,
    TextInput, 
    TouchableWithoutFeedback, 
    useAnimatedValue, 
    useColorScheme, 
    View
} from "react-native";
import { Asset as ImageAsset, launchCamera, launchImageLibrary } from "react-native-image-picker";

import Add from "../../icons/ui/add.svg";
import Camera from "../../icons/ui/camera.svg";
import Close from "../../icons/ui/close.svg";
import Photos from "../../icons/ui/photos.svg";
import Send from "../../icons/ui/up.svg";

import { ChatPayload } from "../../services/types/text";

type ChatBarProps = {
    canSend: boolean;
    onSend: (payload: ChatPayload) => void;
    vision: boolean;
}

type ChatInputProps = {
    onFocus: () => void;
    onChange: (value: string) => void;
    value: string;
}

const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

const ChatInput = ({ onChange, onFocus, value }: ChatInputProps) => {
    const { t } = useTranslation();

    return (
        <AnimatedTextInput
            cursorColor="#a154df"
            editable
            multiline
            numberOfLines={8}
            placeholder={t("chat.input")}
            selectionHandleColor="#a154df"
            style={styles.input}
            textAlignVertical="top"
            onChangeText={onChange}
            onFocus={onFocus}
            onPress={onFocus}
            value={value} />
    );
}

export const ChatBar = ({ canSend, onSend, vision }: ChatBarProps) => {
    const animatedOpacity = useAnimatedValue(0);
    const animatedScale = useAnimatedValue(0);
    const animatedWidth = useAnimatedValue(1);
    const colorScheme = useColorScheme();
    const [fullToolbar, setFullToolbar] = useState(false);
    const [image, setImage] = useState<ImageAsset | undefined>(undefined);
    const [text, setText] = useState("");

    const send = () => {
        if (!canSend || !text.trim().length) return;
        Keyboard.dismiss();

        onSend({ text, image });
        
        setText("");
        removeAttachment();
    }

    const handleCameraUpload = async () => {
        const image = await launchCamera({
            mediaType: "photo",
            includeBase64: true,
            quality: 0.7
        });

        if (!image.didCancel) {
            if (image.assets && image.assets.length) {
                const asset = image.assets[0];
                setImage(asset);
            }
        }
    }

    const handlePhotoUpload = async () => {
        const image = await launchImageLibrary({
            mediaType: "photo",
            includeBase64: true,
            quality: 0.7
        });

        if (!image.didCancel) {
            if (image.assets && image.assets.length) {
                const asset = image.assets[0];
                setImage(asset);
            }
        }
    }

    const removeAttachment = () => {
        Animated.timing(animatedOpacity, {
            duration: 150,
            useNativeDriver: true,
            toValue: 0
        }).start(() => setImage(undefined));
    }

    useEffect(() => {
        if (fullToolbar) {
            Animated.parallel([
                Animated.timing(animatedScale, {
                    duration: 150,
                    toValue: 1,
                    useNativeDriver: false
                }),
                Animated.timing(animatedWidth, {
                    duration: 150,
                    toValue: 0,
                    useNativeDriver: false
                })
            ]).start();
        } else {
            Animated.parallel([
                Animated.timing(animatedScale, {
                    duration: 150,
                    toValue: 0,
                    useNativeDriver: false
                }),
                Animated.timing(animatedWidth, {
                    duration: 150,
                    toValue: 1,
                    useNativeDriver: false
                })
            ]).start();
        }
    }, [fullToolbar]);

    useEffect(() => {
        Animated.timing(animatedOpacity, {
            duration: 100,
            useNativeDriver: true,
            toValue: 1
        }).start();
    }, [image]);

    const interpolatedScale = animatedScale.interpolate({
        inputRange: [0, 1],
        outputRange: ["15%", "25%"]
    });

    const interpolatedWidth = animatedWidth.interpolate({
        inputRange: [0, 1],
        outputRange: ["85%", "100%"]
    });

    return (
        <View style={styles.bar}>
            {
                image &&
                <Animated.View
                    style={[styles.attachment, { opacity: animatedOpacity }]}>
                    <Image
                        height={125}
                        width={125}
                        resizeMode="cover"
                        source={{ uri: image.uri }}
                        style={styles.image} />
                    <Pressable
                        onPress={removeAttachment}
                        style={styles.close}>
                        <Close
                            fill={colorScheme == "dark" ? "white" : "black"}
                            style={{ margin: "auto" }}
                            width={15}
                            height={15} />
                    </Pressable>
                </Animated.View>
            }
            <View style={styles.container}>
                <Animated.View style={[styles.tools, { width: interpolatedScale }]}>
                    {
                        !fullToolbar ?
                        (
                            <Pressable
                                style={[
                                    styles.button,
                                    styles.attach,
                                    { opacity: vision ? 1 : 0.4 }
                                ]}
                                onPress={() => (!fullToolbar && vision) && setFullToolbar(true)}>
                                <Add
                                    fill={colorScheme == "dark" ? "white" : "black"}
                                    style={{ margin: "auto" }}
                                    width={25}
                                    height={25} />
                            </Pressable>
                        ) : (
                            <View style={styles.row}>
                                <Pressable
                                    style={styles.tool}
                                    onPress={handleCameraUpload}>
                                    <Camera
                                        fill={colorScheme == "dark" ? "white" : "black"}
                                        style={{ margin: "auto" }}
                                        width={25}
                                        height={25} />
                                </Pressable>
                                <Pressable
                                    style={styles.tool}
                                    onPress={handlePhotoUpload}>
                                    <Photos
                                        fill={colorScheme == "dark" ? "white" : "black"}
                                        style={{ margin: "auto" }}
                                        width={25}
                                        height={25} />
                                </Pressable>
                            </View>
                        )
                    }
                </Animated.View>
                <Animated.View
                    style={[styles.form, { width: interpolatedWidth }]}>
                    <ChatInput
                        onChange={setText}
                        onFocus={() => fullToolbar && setFullToolbar(false)}
                        value={text} />
                    <Pressable
                        onPress={send}>
                        <View style={
                            [styles.button, styles.send,
                            {
                                opacity: text.trim().length && canSend ? 1 : 0.6,
                            }]
                        }>
                            <Send
                                fill={"white"}
                                width={25}
                                height={25} />
                        </View>
                    </Pressable>
                </Animated.View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    attach: {
        backgroundColor: Appearance.getColorScheme() == "dark" ? "#666666" : "#dddddd",
    },
    attachment: {
        height: 125, 
        width: 125, 
        marginVertical: 25
    },
    bar: {
        display: "flex",
        flexDirection: "column",
        width: "100%",
        paddingVertical: Platform.select({
            ios: 20,
            android: 10
        }),
        paddingHorizontal: 5
    },
    button: {
        borderRadius: 26,
        margin: 5,
        padding: 9
    },
    close: {
        position: "absolute",
        top: 0,
        right: -20,
        padding: 5,
        backgroundColor: "white",
        borderRadius: 15,
        shadowOpacity: 0.1
    },
    container: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "flex-end",
        alignContent: "center",
        width: "100%",
    },
    form: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        marginLeft: "auto",
        gap: 5,
        transformOrigin: "right"
    },
    image: {
        borderRadius: 15,
        margin: 10
    },
    input: {
        width: "70%",
        paddingVertical: 10,
        paddingHorizontal: 12,
        borderRadius: 16,
        backgroundColor: Appearance.getColorScheme() == "dark" ? "#666666" : "#dddddd",
        color:  Appearance.getColorScheme() == "dark" ? "white" : "black",
        fontFamily: "Inter Regular",
        fontSize: 16
    },
    row: {
        display: "flex",
        flexDirection: "row"
    },
    send: {
        backgroundColor: Appearance.getColorScheme() == "dark" ? "#8342b8" : "#a154df",
    },
    tool: {
        padding: 10
    },
    tools: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
        transformOrigin: "left"
    },
});