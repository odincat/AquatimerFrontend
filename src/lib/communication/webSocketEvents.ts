import toast from "svelte-french-toast";
import { appState } from "../stores";
import { deserializeMessage } from "./parsing";
import type { Measurement } from "$lib/models/measurement";
import { pushChartData, setChartData, setChartGuide } from "$lib/chart/chartUtils";
import { get } from "svelte/store";

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
            console.log(payload)

            let parsedMeasurements = JSON.parse(payload.data) as ServerMeasurement[];

            appState.update(as => {
                //as.timerIntervalHours = payload.settings.intervalTimer;
                // as.timerWateringDurationSeconds = payload.settings.wateringDuration;
                // as.smartThreshold = payload.settings.threshold;
                as.activeModeId = payload.mode;

                as.measurementIntervalMinutes = payload.settings.measurementTimer;
                as.smartThreshold = payload.settings.threshold;
                as.smartIdeal = payload.settings.ideal;

                setChartGuide(as.chart, "thresholdLine", payload.settings.threshold);
                setChartGuide(as.chart, "idealLine", payload.settings.ideal);

                as.manualWateringDurationSeconds = payload.settings.wateringDurationManually;
                as.timerWateringDurationSeconds = payload.settings.wateringDurationTimed;
                as.timerIntervalHours = payload.settings.Timedinterval

                as.pumpOffsetS = payload.plantSettings.pumpOffset;
                as.flowRateGPS = payload.plantSettings.waterPumpGPS;
                as.soilWeightG = payload.plantSettings.soilWeight;

                let convertedMeasurements = parsedMeasurements.map(m => {
                    let splitTime = m.time.split(":");
                    splitTime.pop()
                    let timestamp = splitTime.join(":");

                    let convertedMeasurement: Measurement = {
                        moisture: m.measurement,
                        timestamp: timestamp,
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
            let data = JSON.parse(payload.data) as ServerMeasurement;
            console.log(payload)
            console.log(data)

            appState.update(as => {
                let splitTime = data.time.split(":");
                splitTime.pop()
                let timestamp = splitTime.join(":");
                let convertedMeasurement: Measurement = {
                    moisture: data.measurement,
                    timestamp: timestamp,
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

            let currentAppState = get(appState);

            console.log("activating stopwatch")
            if (payload.active) {
                console.log("start")
                currentAppState.wateringStopwatch?.start();
                clearTimeout(currentAppState.wateringStopwatchResetTimeout);
            } else {
                console.log("stop")
                currentAppState.wateringStopwatch?.stop();
                    appState.update(as => {
                        as.wateringStopwatchResetTimeout = setTimeout(() => {
                            as.wateringStopwatch?.reset();
                        }, 20000);

                    return as;
                });
            }

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

                setChartGuide(as.chart, "idealLine", payload.ideal);
                setChartGuide(as.chart, "thresholdLine", payload.threshold);

                return as;
            });
        }
        break;

        case "publishPlantConfiguration": {
            let payload = message.payload as PublishPlantConfiguration;

            appState.update(as => {
                as.flowRateGPS = payload.waterPumpGPS;
                as.soilWeightG = payload.soilWeight;
                as.pumpOffsetS = payload.waterPumpOffset;

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
