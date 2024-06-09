import type { Chart, ChartTypeRegistry } from "chart.js";
import type { Measurement } from "../models/measurement";

type CChart = Chart<keyof ChartTypeRegistry, number[], string>;

export function pushChartData(chart: CChart, measurements: Measurement[]) {
    if (chart == null || chart.data.labels == null) {
        throw new Error("chart undefined");
    }

    chart.data.labels.push(...measurements.map(m => m.timestamp));

    chart.data.datasets[0].data.push(...measurements.map(m => m.moisture));
    //chart.data.datasets[1].data.push(...measurements.map(m => m.temperature));

    chart.update();
}

export function setChartData(chart: CChart, measurements: Measurement[]) {
    if (chart == null || chart.data.labels == null) {
        return;
    }

    chart.data.labels = measurements.map(m => m.timestamp);

    chart.data.datasets[0].data = measurements.map(m => m.moisture);
    //chart.data.datasets[1].data = measurements.map(m => m.temperature);

    chart.update();
}

export function setChartGuide(chart: CChart, line: "thresholdLine" | "idealLine", value: number) {
    if (chart == null || chart.data.labels == null) {
        return;
    }

    // TODO: maybe reintroduce
    if (line === "idealLine") return;

    chart.options.plugins.annotation.annotations[line].yMin = value;
    chart.options.plugins.annotation.annotations[line].yMax= value;

    chart.update();
}
