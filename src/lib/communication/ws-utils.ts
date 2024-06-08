import { appState } from "$lib/stores";
import toast from "svelte-french-toast";
import { get } from "svelte/store";

export function useWebSocket(closure: (wsClient: WebSocket) => void): boolean {
    let as = get(appState);

    if (as.wsClient == null || as.connectionStatus !== "CONNECTED") {
        console.log("WebSocket connection doesn't exist.")
        toast.error("Failed to connect to Aquatimer. You may try refreshing the page.")

        return false;
    }

    closure(as.wsClient);

    return true;
}
