import type { Chart, ChartTypeRegistry } from "chart.js";
import type { Measurement } from "../models/measurement";

type CChart = Chart<keyof ChartTypeRegistry, number[], string>;

export function pushChartData(chart: CChart, measurements: Measurement[]) {
    if (chart == null || chart.data.labels == null) {
        throw new Error("chart undefined");
    }

    chart.data.labels.push(...measurements.map(m => m.timestamp));

    chart.data.datasets[0].data.push(...measurements.map(m => m.moisture));

    chart.update();
}

export function setChartData(chart: CChart, measurements: Measurement[]) {
    if (chart == null || chart.data.labels == null) {
        return;
    }

    chart.data.labels = measurements.map(m => m.timestamp);

    chart.data.datasets[0].data = measurements.map(m => m.moisture);

    chart.update();
}

export function setChartMoistureThreshold(chart: CChart, value: number) {
    if (chart == null || chart.data.labels == null) {
        return;
    }

    chart.options.plugins.annotation.annotations.thresholdLine.yMin = value;
    chart.options.plugins.annotation.annotations.thresholdLine.yMax= value;

    chart.update();
}
