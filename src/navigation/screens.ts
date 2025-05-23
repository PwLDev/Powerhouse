import type { NativeStackNavigationProp, NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "./types";

export type AppIntroNavigationProp = NativeStackNavigationProp<RootStackParamList, "AppIntro">;
export type ChatNavigationProp = NativeStackNavigationProp<RootStackParamList, "Chat">;
export type ChatNavigationProps = NativeStackScreenProps<RootStackParamList, "Chat">;
export type ChatSelectNavigationProps = NativeStackScreenProps<RootStackParamList, "ChatSelect">;
export type TTSNavigationProps = NativeStackScreenProps<RootStackParamList, "TTS">;