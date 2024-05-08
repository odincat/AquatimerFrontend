export type WebSocketConnection = "CONNECTING" | "CONNECTED" | "DISCONNECTED";

export interface AppState {
    wsClient: WebSocket | null;
    wsUrl: string;
    wsReconnectIntervalId: number | null;
    wsReconnectIntervalMs: number;

    connectionStatus: WebSocketConnection;
    lastMessage: Date | null;
    url: string;

    activeModeId: number;
    pumpActive: boolean;
}

export const DEFAULT_APP_STATE: AppState = {
    wsClient: null,
    //wsUrl: "ws://10.202.225.212:6969",
    wsUrl: "ws://localhost:8080",
    wsReconnectIntervalId: null,
    wsReconnectIntervalMs: 5000,

    connectionStatus: "CONNECTING",
    lastMessage: null,
    url: "",
    activeModeId: 0,
    pumpActive: false
};
