import toast from "svelte-french-toast";
import { appState } from "../stores";
import { deserializeMessage } from "./parsing";
import type { Measurement } from "$lib/models/measurement";
import { pushChartData, setChartData } from "$lib/chart/chartUtils";

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
    var message = deserializeMessage(v.data);

    switch (message.actionName) {
        case "initialData": {
            let payload = message.payload as InitialData;

            appState.update(as => {
                //as.timerIntervalHours = payload.settings.intervalTimer;
                // as.timerWateringDurationSeconds = payload.settings.wateringDuration;
                // as.smartThreshold = payload.settings.threshold;
                as.measurementIntervalMinutes = payload.settings.measurementTimer;
                as.activeModeId = payload.mode;
                console.log(payload.mode)

                let convertedMeasurements = payload.data.map(m => {
                    let convertedMeasurement: Measurement = {
                        moisture: m.measurement,
                        timestamp: m.time,
                        temperature: 69
                    };
                    
                    return convertedMeasurement;
                });

                as.measurements = convertedMeasurements;
                setChartData(as.chart, convertedMeasurements);

                return as;
            });
        }
        break;

        case "publishMeasurement": {
            let payload = message.payload as PublishMeasurement;

            appState.update(as => {
                let convertedMeasurement: Measurement = {
                    moisture: payload.data.measurement,
                    timestamp: payload.data.time,
                    temperature: 69
                };

                as.measurements.push(convertedMeasurement);
                pushChartData(as.chart, [convertedMeasurement]);

                return as;
            });
        }
        break;

        case "showErr": {
            let payload = message.payload as ShowMessage;

            toast.error(payload.message);
        }
        break;

        case "showSuccess": {
            let payload = message.payload as ShowMessage;

            toast.success(payload.message);
        }
        break;

        case "publishMode": {
            let payload = message.payload as PublishMode;

            appState.update(as => {
                as.activeModeId = payload.currentMode;
                return as;
            });
        }
        break;

        case "publishPumpState": {
            let payload = message.payload as PublishPumpState;

            appState.update(as => {
                as.pumpActive = payload.active;
                return as
            });
        }
        break;

        case "publishManualModeSettings": {
            let payload = message.payload as PublishManualModeSettings;

            appState.update(as => {
                as.manualWateringDurationSeconds = payload.wateringDurationManually;

                return as;
            });
        }
        break;

        case "publishTimedModeSettings": {
            let payload = message.payload as PublishTimedModeSettings;

            appState.update(as => {
                as.timerIntervalHours = payload.timerInterval;
                as.timerWateringDurationSeconds = payload.wateringDurationTimed;

                return as;
            });
        }
        break;

        case "publishIntelligentModeSettings": {
            let payload = message.payload as PublishIntelligentModeSettings;

            appState.update(as => {
                as.smartIdeal = payload.ideal;
                as.smartThreshold = payload.threshold;

                return as;
            });
        }
        break;

        default:
            console.log(`${message.actionName}: ${JSON.stringify(message.payload)}`)
    }
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
