import type { Measurement } from "./measurement";

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

    measurements: Measurement[];

    activeModeId: number;
    pumpActive: boolean;
    // grams per second
    flowRateGPS: number;
    soilWeightG: number;

    timerIntervalHours: number;
    timerWateringDurationSeconds: number;

    smartIdeal: number;
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

    measurements: [],

    activeModeId: 0,
    pumpActive: false,
    flowRateGPS: 20,
    soilWeightG: 2000,

    timerIntervalHours: 12,
    timerWateringDurationSeconds: 10,

    smartIdeal: 75,
    smartThreshold: 35
};
