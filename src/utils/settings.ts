import AsyncStorage from "@react-native-async-storage/async-storage";

/**
 * ## Powerhouse Settings Utility
 * Easily parses the `AsyncStorage` string based preferences into typed settings. 
 * 
 * Booleans are represented in `AsyncStorage` as 0/1
 */
class PowerhouseSettings {
    static async getBoolean(key: string, defaultValue: boolean = false): Promise<boolean> {
        const value = await AsyncStorage.getItem(key);
    
        if (value != null) {
            const numericValue = parseInt(value);

            if (isNaN(numericValue)) {
                return Boolean(numericValue);
            } else {
                return defaultValue;
            }
        };
        return defaultValue;
    }

    static async toggleBoolean(key: string, defaultValue: boolean = false): Promise<boolean> {
        const value = await PowerhouseSettings.getBoolean(key, defaultValue);
        const stringValue = !value ? "1" : "0";

        await AsyncStorage.setItem(key, stringValue);
        return !value;
    }
}

export default PowerhouseSettings;