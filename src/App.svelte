<script lang="ts">
    import "@fontsource-variable/sora";
    import "@phosphor-icons/web/fill";
    import "@phosphor-icons/web/regular";

    import Chart, { type ChartTypeRegistry } from "chart.js/auto";
    import { initWebSocket } from "./lib/communication/webSocketEvents";
    import { onMount } from "svelte";
    import Navigation from "./components/Navigation.svelte";
    import Footer from "./components/Footer.svelte";
    import { appState } from "./lib/stores";
    import { chartConfig, setupChart } from "./lib/chart/chartConfig";
    import { setChartData, setChartGuide } from "./lib/chart/chartUtils";
    import type { Measurement } from "./lib/models/measurement";
    import ModePage from "./components/modes/ModePage.svelte";
    import { modes } from "./lib/models/modes";
    import ManualPage from "./components/modes/ManualPage.svelte";
    import TimerPage from "./components/modes/TimerPage.svelte";
    import ModeSelector from "./components/modes/ModeSelector.svelte";
    import SmartPage from "./components/modes/SmartPage.svelte";
    import { loadAccessToken } from "./lib/accessToken";

    var chart: Chart<keyof ChartTypeRegistry, number[], string> | null = null;

    let chartCanvas: HTMLCanvasElement | null;

    onMount(() => {
        // initial setting of services

        if (chartCanvas == null) {
            throw new Error("chart canvas element does not exist.");
        }

        chart = setupChart(chartCanvas);

        const testHistoryData: Measurement[] = [
            { timestamp: "14:32", moisture: 75, temperature: 24 },
            { timestamp: "15:02", moisture: 72, temperature: 24.5 },
            { timestamp: "15:32", moisture: 50, temperature: 24.4 },
            { timestamp: "16:02", moisture: 30, temperature: 28 },
            { timestamp: "16:32", moisture: 80, temperature: 18 },
            { timestamp: "17:02", moisture: 95, temperature: 15 },
            { timestamp: "17:32", moisture: 70, temperature: 10 },
            { timestamp: "18:02", moisture: 69, temperature: 30 },
            { timestamp: "18:32", moisture: 43, temperature: 23 },
            { timestamp: "19:02", moisture: 10, temperature: 25 },
        ];

        $appState.measurements = testHistoryData;

        setChartData(chart, testHistoryData);

        loadAccessToken();

        // will reconnect automatically
        $appState.wsClient = initWebSocket($appState.wsUrl);
    });

    $: activeModeId = $appState.activeModeId;

    $: $appState.smartIdeal && setChartGuide(chart, "idealLine", $appState.smartIdeal)
    $: $appState.smartThreshold && setChartGuide(chart, "thresholdLine", $appState.smartThreshold)

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

        <ModePage mode={modes[modePreviewId]} previewModeId={modePreviewId}>
            {#if modePreviewId === 0}
                <ManualPage />
            {:else if modePreviewId === 1}
                <TimerPage />
            {:else if modePreviewId === 2}
                <SmartPage />
            {/if}
        </ModePage>
    </div>
</main>

<Footer />
