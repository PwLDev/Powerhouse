import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import {
    Appearance,
    FlatList,
    KeyboardAvoidingView,
    Platform,
    StyleSheet, 
    Text,
    useColorScheme,
    View, 
} from "react-native";
import HapticFeedback from "react-native-haptic-feedback";
import Markdown from "react-native-markdown-display";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { ChatBar } from "../components/chat/bar";
import { ChatCursor, ChatImage, ChatMessage, ChatReply, markdownStyle } from "../components/chat/message";
import { ChatNavigationProps } from "../navigation/screens";
import { AdaptiveView } from "../components/navigation/view";
import { streamChatCompletion } from "../services/chat";
import { ChatPayload, PollinationsModel, StreamEvent } from "../services/types/text";
import { ChatStorageObject, SavedChatMessage } from "../storage/chat";
import { ChatStorage } from "../storage/storage";
import { delay } from "../utils/request";

const Chat = ({ navigation, route }: ChatNavigationProps) => {  
    const { t } = useTranslation();
    const chatList = useRef<FlatList | null>(null);
    const [messages, setMessages] = useState<SavedChatMessage[]>([]);
    const [name, setName] = useState(t("chat.new"))
    const [model, setModel] = useState<PollinationsModel | null>(null);
    const [typing, setTyping] = useState(false);

    const insets = useSafeAreaInsets();

    const sendMessage = (payload: ChatPayload) => {
        const userMessage: SavedChatMessage = {
            content: [],
            role: "user",
            id: Date.now().toString(16)
        }

        if (payload.image) {
            userMessage.content.push({
                type: "text",
                text: payload.text.trim()
            }, {
                type: "image_url",
                image_url: {
                    url: `data:image/${payload.image.type};base64,${payload.image.base64}`
                }
            });
        } else {
            userMessage.content.push({
                type: "text",
                text: payload.text.trim()
            });
        }

        setTyping(true);
        setMessages((prev) => {
            const updated = [...prev, userMessage];
            streamResponse(updated);

            return updated;
        });
    }

    const streamResponse = async (messages: SavedChatMessage[]) => {
        const apiMessages = messages.map((msg) => {
            return {
                role: msg.role,
                content: msg.content
            }
        })
        .filter((msg) => msg.role != "error");

        const modelName = model?.name || "openai-large";
        const stream = await streamChatCompletion(apiMessages, modelName);

        const assistantMessage: SavedChatMessage = {
            content: [{
                type: "text",
                text: ""
            }],
            role: "assistant",
            id: Date.now().toString(16)
        }

        setMessages((prev) => [...prev, assistantMessage]);

        if (stream) {
            if (chatList.current) {
                chatList.current.scrollToEnd({ animated: true });
            }

            try {
                const decoder = new TextDecoder("utf8");
                let partial = "";
                let response = "";
        
                while (stream) {
                    const { done, value } = await stream.read();
    
                    if (done) {
                        handleResponseEnd();
                        break;
                    }
    
                    partial += decoder.decode(value, { stream: true });
    
                    const lines = partial.split("\n\n");
                    partial = lines.pop() || partial;
    
                    for (const line of lines) {
                        if (line.startsWith("data: ")) {
                            const dataStr = line.substring(6).trim();
                            if (dataStr == "[DONE]") {
                                continue;
                            }
    
                            const chunk: StreamEvent = JSON.parse(dataStr);
                            if (!chunk.choices?.length) continue;

                            const content = chunk.choices[0].delta.content;
                            response += content || "";

                            // Add delay for typing feedback
                            await delay(50);
                            handleResponseUpdate(assistantMessage, response);
                        }
                    }
                }
            } catch (error: any) {
                console.error(error);
            }
        }
    }

    const handleResponseUpdate = (message: SavedChatMessage, response: string) => {
        if (Platform.OS == "ios") {
            HapticFeedback.trigger("selection");
        } else {
            HapticFeedback.trigger("soft");
        }
        
        setMessages((prev) => {
            const updated = [...prev];
            const lastIndex = updated.findIndex((msg) => msg.id === message.id);

            if (lastIndex !== -1) {
                updated[lastIndex] = {
                    ...updated[lastIndex],
                    content: [{
                        type: "text",
                        text: response
                    }],
                };
            }

            return updated;
        });
    }

    const handleResponseEnd = () => {
        HapticFeedback.trigger("impactLight");
        setTyping(false);
    }

    useEffect(() => {
        const chatId = route.params.id;

        if (chatId) {
            const chatPayload = ChatStorage.getString(`chat:${chatId}`);
            if (chatPayload) {
                const chatStorage: ChatStorageObject = JSON.parse(chatPayload);

                setMessages(chatStorage.messages);
                setName(chatStorage.title || t("chat.new"));
            }
        } else {
            setName(t("chat.temporary"));
        }
    }, []);

    useEffect(() => {
        navigation.setOptions({
            headerTitle: name
        });
    }, [name]);

    useEffect(() => {
        if (messages.length) {
            const lastMessage = messages[messages.length];

            if (lastMessage?.role == "user") {
                HapticFeedback.trigger("impactLight");
                if (chatList.current) {
                    chatList.current.scrollToItem({
                        animated: true,
                        item: lastMessage
                    });
                }
            }
        }
    }, [messages]);
    
    return (
        <AdaptiveView>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                keyboardVerticalOffset={Platform.OS == "ios" ? 90 : 25}
                style={{
                    flex: 1,
                    paddingBottom: insets.bottom,
                    paddingLeft: insets.left,
                    paddingRight: insets.right
                }}>
                <View style={styles.container}>
                    <FlatList
                        ref={chatList}
                        data={messages}
                        keyboardShouldPersistTaps="handled"
                        contentContainerStyle={{ flexGrow: 1 }}
                        renderItem={({ item }: { item: SavedChatMessage }) => {
                            const images = item.content.filter((i) => i.type == "image_url");

                            return (
                                item.role == "assistant" ?
                                (
                                    <View>
                                        {
                                            item.content[0].text?.length ?
                                            <ChatReply>
                                                {item.content[0].text}
                                            </ChatReply> :
                                            <ChatCursor />
                                        }
                                    </View>
                                ) :
                                (
                                    <ChatMessage>
                                        {
                                            images.length ?
                                            <View>
                                                <ChatImage uri={images[0].image_url?.url} />
                                                <Text style={styles.text}>{
                                                    item.content[0].text
                                                }</Text>
                                            </View> :
                                            <Text style={styles.text}>{
                                                item.content[0].text
                                            }</Text>
                                        }
                                    </ChatMessage>
                                )
                            );
                        }} />
                    <ChatBar
                        canSend={!typing}
                        onSend={sendMessage}
                        vision />
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
    },
    text: {
        color: Appearance.getColorScheme() == "dark" ? "white" : "black",
        fontFamily: "Inter Regular",
        fontSize: 16
    }
});

export default Chat;