export const chartConfig = {
  type: 'line',
  data: {
    labels: [],
    datasets: [{
      label: 'moisture',
      data: [],
      fill: false,
      borderColor: 'rgb(34, 211, 238)',
      tension: 0.1
    }]
  },
  options: {
    scales: {
      y: {
        title: {
          text: "Moisture",
          display: true
        }
      }
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
            yMin: 1600,
            yMax: 1600,
            borderColor: 'rgb(29, 78, 216)',
            borderWidth: 2,
            label: {
              display: true,
              content: "Threshold",
              position: "start",
              backgroundColor: 'rgb(29, 78, 216)',
              color: "rgb(255, 255, 255)"
            }
          }
        }
      }
    }
  }
};
