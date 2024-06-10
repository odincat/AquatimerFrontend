import type { Chart, ChartTypeRegistry } from "chart.js";
import type { Measurement } from "./measurement";
import type { WateringStopwatchExports } from "src/components/modes/WateringStopwatch";

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
    wateringStopwatchResetTimeout: number;
    chart: Chart<keyof ChartTypeRegistry, number[], string> | null;

    measurements: Measurement[];

    activeModeId: "MANUALLY" | "TIMED" | "INTELLIGENT";
    pumpActive: boolean;
    measurementIntervalMinutes: number;
    // grams per second
    flowRateGPS: number;
    soilWeightG: number;
    pumpOffsetS: number;

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
    wsReconnectIntervalMs: 2000,

    accessToken: "",

    connectionStatus: "CONNECTING",
    lastMessage: null,
    url: "",
    wateringStopwatch: null,
    wateringStopwatchResetTimeout: 0,
    chart: null,

    measurements: [],

    activeModeId: "MANUALLY",
    pumpActive: false,
    measurementIntervalMinutes: 12,
    flowRateGPS: 39.52,
    soilWeightG: 2000,
    pumpOffsetS: 6,

    manualWateringDurationSeconds: 5,

    timerIntervalHours: 24 * 2,
    timerWateringDurationSeconds: 10,

    smartIdeal: 75,
    smartThreshold: 35
};
