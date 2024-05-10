import { appState } from "../stores";

export function initWebSocket(url: string): WebSocket {
    var ws = new WebSocket(url);

    ws.onopen = onOpen;
    ws.onclose = onClose;
    ws.onerror = onError;
    ws.onmessage = onMessage;

    return ws;
}

export function onOpen() {
    console.log("connected!")

    appState.update(as => {
        if (as.wsReconnectIntervalId != null) {
            clearInterval(as.wsReconnectIntervalId);
        }

        as.wsReconnectIntervalId = null;

        as.connectionStatus = "CONNECTED";

        return as;
    });
}

export function onMessage(v: MessageEvent) {
    console.log(v)
}

export function onError() {
    console.log("error")
}

function tryReconnect() {
    appState.update(as => {
        as.wsClient = initWebSocket(as.wsUrl);

        return as;
    });
}

export function onClose() {
    appState.update(as => {
        as.connectionStatus = "CONNECTING";

        if (as.wsReconnectIntervalId == null) {
            as.wsReconnectIntervalId = setInterval(tryReconnect, as.wsReconnectIntervalMs);
        }

        return as;
    });
}
