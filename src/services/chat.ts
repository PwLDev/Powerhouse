import axios from "axios";
import {
    ChatCompletionParams, 
    ChatCompletionMessage, 
    PollinationsModel
} from "./types/text";

export const getChatModels = async () => {
    const response = await fetch("https://text.pollinations.ai/models", {
        reactNative: {
            textStreaming: true
        }
    });

    if (!response.ok) {
        const errorText = await response.text();
        console.error(`HTTP error! status: ${response.status}, message: ${errorText}`);
    }

    const models: PollinationsModel[] = await response.json();
    return models;
}

export const streamChatCompletion = async (
    messages: ChatCompletionMessage[],
    model: string = "openai"
) => {
    const completion: ChatCompletionParams = {
        messages,
        model,
        referrer: "AIPowerhouse",
        stream: true,
        private: true,
    }

    const response = await fetch("https://text.pollinations.ai/openai", {
        body: JSON.stringify(completion),
        headers: {
            "Content-Type": "application/json",
            Accept: "text/event-stream",
        },
        method: "POST",
        reactNative: {
            textStreaming: true
        }
    });

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
    }

    return response.body?.getReader();
}