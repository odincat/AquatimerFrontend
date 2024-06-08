import { get } from "svelte/store";
import { appState } from "./stores";

const LS_KEY = "ACCESS_TOKEN";

interface LocalSettings {
    accessToken: string;
}

export function loadLocalSettings() {
    let retrievedSettings = localStorage.getItem(LS_KEY);

    if (retrievedSettings != null) {
        let parsed: LocalSettings = JSON.parse(retrievedSettings);

        appState.update(as => {
            as.accessToken = parsed.accessToken;

            return as;
        });
    } 
}

export function saveLocalSettings() {
    let as = get(appState);

    let localSettings: LocalSettings = {
        accessToken: as.accessToken
    };

    let serialized = JSON.stringify(localSettings)

    localStorage.setItem(LS_KEY, serialized);
}
