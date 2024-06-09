interface ServerMeasurement {
    time: string;
    measurement: number;
}

interface InitialData {
    data: string;
    mode: string;
    settings: {
        intervalTimer: number;
        measurementTimer: number;
        wateringDuration: number;
        threshold: number;
        ideal: number;
        wateringDurationManually: number;
        wateringDurationTimed: number;
        Timedinterval: number;
    }
}

interface PublishMode {
    currentMode: string;
}

interface ShowMessage {
    message: string;
}

interface PublishManualModeSettings {
    wateringDurationManually: number;
}

interface PublishTimedModeSettings {
    timerInterval: number;
    wateringDurationTimed: number;
}

interface PublishIntelligentModeSettings {
    ideal: number;
    threshold: number;
}

interface PublishPumpState {
    active: boolean;
}

interface PublishMeasurement {
    data: string;
}
