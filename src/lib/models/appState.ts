export type WebSocketConnection = "CONNECTING" | "CONNECTED" | "DISCONNECTED";

export interface AppState {
    wsClient: WebSocket | null;
    wsUrl: string;
    wsReconnectIntervalId: number | null;
    wsReconnectIntervalMs: number;

    accessToken: string;

    connectionStatus: WebSocketConnection;
    lastMessage: Date | null;
    url: string;

    activeModeId: number;
    pumpActive: boolean;

    timerIntervalHours: number;
    timerWateringDurationSeconds: number;

    smartThreshold: number;
}

export const DEFAULT_APP_STATE: AppState = {
    wsClient: null,
    wsUrl: "ws://10.202.229.68:6969",
    //wsUrl: "ws://localhost:8080",
    wsReconnectIntervalId: null,
    wsReconnectIntervalMs: 5000,

    accessToken: "",

    connectionStatus: "CONNECTING",
    lastMessage: null,
    url: "",
    activeModeId: 0,
    pumpActive: false,

    timerIntervalHours: 12,
    timerWateringDurationSeconds: 10,

    smartThreshold: 1600
};
