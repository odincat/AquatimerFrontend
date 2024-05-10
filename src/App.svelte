<script lang="ts">
    import "@fontsource-variable/sora";
    import "@phosphor-icons/web/fill";

    import Chart, { type ChartTypeRegistry } from "chart.js/auto";
    import { initWebSocket } from "./lib/communication/webSocketEvents";
    import annotationPlugin from "chartjs-plugin-annotation";
    import { onMount } from "svelte";
    import Navigation from "./components/Navigation.svelte";
    import Footer from "./components/Footer.svelte";
    import { appState } from "./lib/stores";
    import { chartConfig } from "./lib/chart/chartConfig";
    import { setChartData, setChartMoistureThreshold } from "./lib/chart/chartUtils";
    import type { Measurement } from "./lib/models/measurement";
    import ModePage from "./components/modes/ModePage.svelte";
    import { modes } from "./lib/models/modes";
    import ManualPage from "./components/modes/ManualPage.svelte";
    import ModeSelector from "./components/modes/ModeSelector.svelte";
    import { deserializeAction } from "./lib/communication/parsing";

    Chart.register(annotationPlugin);

    var chart: Chart<keyof ChartTypeRegistry, number[], string> | null = null;

    let chartCanvas: HTMLElement | null;

    onMount(() => {
        // initial setting of services
        Chart.register(annotationPlugin);

        if (chartCanvas == null) {
            throw new Error("chart canvas element does not exist.");
        }

        chart = new Chart(chartCanvas, chartConfig);

        const testHistoryData: Measurement[] = [
            { timestamp: "14:32", moisture: 1050 },
            { timestamp: "15:02", moisture: 1183 },
            { timestamp: "15:32", moisture: 1317 },
            { timestamp: "16:02", moisture: 1450 },
            { timestamp: "16:32", moisture: 1583 },
            { timestamp: "17:02", moisture: 1717 },
            { timestamp: "17:32", moisture: 1850 },
            { timestamp: "18:02", moisture: 1983 },
            { timestamp: "18:32", moisture: 2117 },
            { timestamp: "19:02", moisture: 2250 },
        ];

        setChartData(chart, testHistoryData);

        // will reconnect automatically
        $appState.wsClient = initWebSocket($appState.wsUrl);
    });

    $: activeModeId = $appState.activeModeId;

    let modePreviewId = activeModeId ?? 0;
</script>

<Navigation />

<main class="flex-[1] grid lg:grid-cols-main grid-cols-1 gap-8 w-nav py-8">
    <div class="m-auto w-full flex flex-col justify-center gap-4">
        <!-- <div> -->
        <!--   <div class="flex justify-center items-center gap-1 text-4xl"> -->
        <!--       <i class="ph-fill ph-drop text-3xl text-blue-500"></i> -->
        <!--       <div class="text-blue-500 font-bold"> -->
        <!--           1200 -->
        <!--       </div> -->
        <!--   </div> -->
        <!-- </div> -->

        <div class="w-full relative">
            <canvas bind:this={chartCanvas}></canvas>
        </div>
    </div>

    <div class="flex flex-col gap-8">
        <ModeSelector bind:previewId={modePreviewId} />

        <ModePage mode={modes[modePreviewId]}>
            {#if modePreviewId === 0}
                    <ManualPage />
            {:else if modePreviewId === 1}
                timer page
            {:else if modePreviewId === 2}
                smart page
            {/if}
        </ModePage>
    </div>
</main>

<Footer />
