import type { Chart, ChartTypeRegistry } from "chart.js";
import type { Measurement } from "./measurement";
import type { WateringStopwatchExports } from "./WateringStopwatch";

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
    wateringStopwatch: WateringStopwatchExports | null;
    chart: Chart<keyof ChartTypeRegistry, number[], string> | null;

    measurements: Measurement[];

    activeModeId: "MANUALLY" | "TIMED" | "INTELLIGENT";
    pumpActive: boolean;
    measurementIntervalMinutes: number;
    // grams per second
    flowRateGPS: number;
    soilWeightG: number;

    manualWateringDurationSeconds: number;

    timerIntervalHours: number;
    timerWateringDurationSeconds: number;

    smartIdeal: number;
    smartThreshold: number;
}

export const DEFAULT_APP_STATE: AppState = {
    wsClient: null,
    wsUrl: "wss://aquatimer.tech-cat.dev/ws/",
    //wsUrl: "ws://localhost:8080",
    wsReconnectIntervalId: null,
    wsReconnectIntervalMs: 5000,

    accessToken: "",

    connectionStatus: "CONNECTING",
    lastMessage: null,
    url: "",
    wateringStopwatch: null,

    measurements: [],

    activeModeId: "MANUALLY",
    pumpActive: false,
    measurementIntervalMinutes: 12,
    flowRateGPS: 12,
    soilWeightG: 2000,

    manualWateringDurationSeconds: 5,

    timerIntervalHours: 24 * 2,
    timerWateringDurationSeconds: 10,

    smartIdeal: 75,
    smartThreshold: 35
};
