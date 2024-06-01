import { appState } from "./stores";

const ACCESS_TOKEN_LS_KEY = "ACCESS_TOKEN";

export function loadAccessToken() {
    let retrievedToken = localStorage.getItem(ACCESS_TOKEN_LS_KEY);

    if (retrievedToken != null) {
        appState.update(as => {
            as.accessToken = retrievedToken;
            return as;
        });
    }
}

export function saveAccessToken(newToken: string) {
    localStorage.setItem(ACCESS_TOKEN_LS_KEY, newToken);
}
