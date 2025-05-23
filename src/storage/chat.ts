import { ChatCompletionMessage, TextFeedParams } from "../services/types/text";

export type SavedChatMessage = ChatCompletionMessage & {
    id: string
}

export interface ChatStorageObject {
    title: string;
    messages: SavedChatMessage[];
    responses?: TextFeedParams[];
}