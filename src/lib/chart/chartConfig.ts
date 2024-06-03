import Chart, { type ChartTypeRegistry } from "chart.js/auto";
import annotationPlugin from "chartjs-plugin-annotation";

const AXIS_LABEL_FONTSIZE = 24;
const AXIS_LABEL_PADDING = 10;
const MOISTURE_LINE_COLOR = "rgb(34, 211, 238)";
const TEMPERATURE_LINE_COLOR = "rgb(234, 88, 12)";

export function setupChart(canvasElement: HTMLCanvasElement): Chart<keyof ChartTypeRegistry, number[], string> {
  Chart.register(annotationPlugin);
  Chart.defaults.font.family = "Sora Variable"
  //Chart.defaults.font.size = 14;

  return new Chart(canvasElement, chartConfig)
}

export const chartConfig = {
  type: 'line',
  data: {
    labels: [],
    datasets: [
      {
        label: 'Moisture Content',
        data: [],
        fill: false,
        borderColor: MOISTURE_LINE_COLOR,
        tension: 0.1,
        yAxisID: 'y'
      },
      {
        label: 'Temperature',
        data: [],
        fill: false,
        borderColor: TEMPERATURE_LINE_COLOR,
        tension: 0.1,
        yAxisID: 'y2',
      },
    ]
  },
  options: {
    scales: {
      y: {
        type: "linear",
        title: {
          text: "Moisture Content",
          display: true,
          position: 'left',
          color: MOISTURE_LINE_COLOR,
          font: {
            size: AXIS_LABEL_FONTSIZE
          },
          padding: {
            bottom: AXIS_LABEL_PADDING
          }
        },
        ticks: {
          callback(value, index, ticks) {
            return `${value}%`
          },
        }
      },
      y2: {
        type: "linear",
        title: {
          text: "Temperature",
          display: true,
          color: TEMPERATURE_LINE_COLOR,
          font: {
            size: AXIS_LABEL_FONTSIZE
          },
          padding: {
            bottom: AXIS_LABEL_PADDING
          }
        },
        position: 'right',
        grid: {
          drawOnChartArea: false, // only want the grid lines for one axis to show up
        },
        ticks: {
          callback(value, index, ticks) {
            return `${value} °C`
          }
        }
      }
    },

    interaction: {
      mode: 'index',
      intersect: false,
    },

    plugins: {
      legend: {
        display: false,
        position: "bottom",
        onClick: () => {}
      },
      tooltips: {
        enabled: false
      },
      annotation: {
        annotations: {
          thresholdLine: {
            type: 'line',
            yMin: 30,
            yMax: 30,
            borderColor: '#dc2626',
            borderWidth: 2,
            label: {
              display: true,
              content: "Threshold",
              position: "start",
              backgroundColor: '#dc2626',
              color: "rgb(255, 255, 255)",
              padding: {
                x: 10,
                y: 5
              }
            },
          },
          idealLine: {
            type: 'line',
            yMin: 85,
            yMax: 85,
            borderColor: '#22c55e',
            borderWidth: 2,
            label: {
              display: true,
              content: "Ideal",
              position: "start",
              backgroundColor: '#22c55e',
              color: "rgb(255, 255, 255)",
              padding: {
                x: 10,
                y: 5
              }
            },
          }
        }
      }
    }
  }
};
