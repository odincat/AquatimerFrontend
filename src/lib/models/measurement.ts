export interface Measurement {
  timestamp: string;
  moisture: number;
  temperature: number;
  wateringOccurred: boolean;
  // TODO: temperature & air moisture
}

interface MinMaxAvgValues {
  min: number;
  max: number;
  avg: number;
}

interface Result {
  temperature: MinMaxAvgValues;
  moisture: MinMaxAvgValues;
}

export function findMinMaxAvgValues(measurements: Measurement[]): Result {
  if (measurements.length === 0) {
    return {
      temperature: {
        min: 0,
        max: 0,
        avg: 0,
      },
      moisture: {
        min: 0,
        max: 0,
        avg: 0,
      },
    };
  }

  let tempMin = measurements[0].temperature;
  let tempMax = measurements[0].temperature;
  let tempSum = 0;
  let moistureMin = measurements[0].moisture;
  let moistureMax = measurements[0].moisture;
  let moistureSum = 0;

  for (const measurement of measurements) {
    if (measurement.temperature < tempMin) {
      tempMin = measurement.temperature;
    }

    if (measurement.temperature > tempMax) {
      tempMax = measurement.temperature;
    }

    tempSum += measurement.temperature;

    if (measurement.moisture < moistureMin) {
      moistureMin = measurement.moisture;
    }

    if (measurement.moisture > moistureMax) {
      moistureMax = measurement.moisture;
    }

    moistureSum += measurement.moisture;
  }

  const tempAvg = tempSum / measurements.length;
  const moistureAvg = moistureSum / measurements.length;

  return {
    temperature: {
      min: tempMin,
      max: tempMax,
      avg: tempAvg,
    },
    moisture: {
      min: moistureMin,
      max: moistureMax,
      avg: moistureAvg,
    },
  };
}
