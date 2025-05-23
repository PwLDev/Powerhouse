import { createTextService } from "pollinationsai";
import { Asset as ImageAsset } from "react-native-image-picker";

export interface ChatContent {
    type: "text" | "image_url",
    text?: string;
    image_url?: {
        url: string
    }
}

export interface ChatPayload {
    text: string;
    image?: ImageAsset;
}

export interface ChatCompletionMessage {
    role: "assistant" | "system" | "user" | "error";
    content: ChatContent[];
}

export interface ChatCompletionParams {
    messages: ChatCompletionMessage[];
    model?: string;
    seed?: number;
    jsonMode?: boolean;
    system?: string;
    stream?: boolean;
    private?: boolean;
    referrer?: string;
}

// Types extracted from:
// https://github.com/fqueis/pollinationsai
export interface PollinationsModel {
    name: string;
    type: string;
    censored: boolean;
    description: string;
    baseModel: string;
    vision?: boolean;
    reasoning?: boolean;
    provider?: string;
    audio?: boolean;
    voices?: string[];
}

export interface TextFeedParams {
    messages: ChatCompletionMessage[];
    jsonMode: boolean;
    seed: number;
    model: string;
    temperature?: number;
    isImagePollinationsReferrer: boolean;
    isRobloxReferrer: boolean;
    referrer: string;
    stream: boolean;
    isPrivate: boolean;
    voice: string;
    prompt_tokens: number;
    prompt_tokens_details: TokensDetail;
    completion_tokens: number;
    completion_tokens_details: TokensDetail;
    total_tokens: number;
}

export interface TokensDetail {
    accepted_prediction_tokens?: number;
    audio_tokens?: number;
    cached_tokens?: number;
    reasoning_tokens?: number;
    rejected_prediction_tokens?: number;
}

export interface StreamEvent {
    choices: StreamChoice[];
    created: number;
    id: string;
    model: string;
    object: string;
    system_fingerprint: string;
    prompt_filter_results: ContentFilterResults[];
}

export interface ContentFilterResults {
    prompt_index: number;
    content_filter_results: FilterResults;
}

export interface FilterResults {
    hate: {
        filtered: boolean;
        severity?: string;
        detected?: boolean;
    };
    self_harm: {
        filtered: boolean;
        severity?: string;
        detected?: boolean;
    };
    sexual: {
        filtered: boolean;
        severity?: string;
        detected?: boolean;
    };
    violence: {
        filtered: boolean;
        severity?: string;
        detected?: boolean;
    };
}

export interface StreamChoice {
    content_filter_results: FilterResults;
    delta: {
        content: string;
    };
    finish_reason: string;
    index: number;
}