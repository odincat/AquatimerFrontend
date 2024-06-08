export interface Mode {
    name: string;
    description: string;
    id: string;
    iconClass: string;
    colorCode: string;
}

export const modes: Mode[] = [
    {
        name: "Manual",
        description: "Allows manual watering. Please note that it takes a while for the moisture to settle in and get picked up by the sensor.",
        id: "MANUALLY",
        iconClass: "ph-fill ph-toggle-right",
        colorCode: "#0ea5e9"
    },
    {
        name: "Timed",
        description: "Executes a watering cycle periodically for a set amount of time.",
        id: "TIMED",
        iconClass: "ph-fill ph-timer",
        colorCode: "#0284c7"
    },
    {
        name: "Intelligent",
        description: "Monitors the moisture content of the soil and keeps it in the desired range.",
        id: "INTELLIGENT",
        iconClass: "ph-fill ph-cpu",
        colorCode: "#0369a1"
    }
];
