import { MMKV, Mode } from "react-native-mmkv";

export const AppStorage = new MMKV({
    id: "aipowerhouse.app",
    mode: Mode.SINGLE_PROCESS
});

export const ChatStorage = new MMKV({
    id: "aipowerhouse.chat",
    mode: Mode.SINGLE_PROCESS
});

export const ImageStorage = new MMKV({
    id: "aipowerhouse.image",
    mode: Mode.MULTI_PROCESS
});