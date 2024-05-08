export interface Mode {
    name: string;
    description: string;
    id: number;
    iconClass: string;
    colorCode: string;
}

export const modes: Mode[] = [
    {
        name: "Manual",
        description: "Lorem ipsum ipsum ipsum ipsumipsum ipsumipsum",
        id: 0,
        iconClass: "ph-fill ph-toggle-right",
        colorCode: "#0ea5e9"
    },
    {
        name: "Timer",
        description: "Lorem ipsum",
        id: 1,
        iconClass: "ph-fill ph-timer",
        colorCode: "#0284c7"
    },
    {
        name: "Smart",
        description: "Lorem ipsum",
        id: 2,
        iconClass: "ph-fill ph-cpu",
        colorCode: "#0369a1"
    },
];
