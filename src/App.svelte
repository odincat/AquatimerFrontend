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
    import toast, { Toaster } from "svelte-french-toast";
    import { loadLocalSettings, saveLocalSettings } from "$lib/localSettings";

    let chartCanvas: HTMLCanvasElement | null;

    onMount(() => {
        let setAccessTokenParam = "setAccessToken";
        let queryString = window.location.search;
        let queryParams = new URLSearchParams(queryString);

        if (queryParams.has(setAccessTokenParam)) {
            let newAccessToken = queryParams.get(setAccessTokenParam) ?? "";

            $appState.accessToken = newAccessToken;

            const url = new URL(window.location.href);
            url.search = '';

            window.history.replaceState({}, document.title, url);
            saveLocalSettings();
            toast.success("Access token has been set successfully");
        }

        if (chartCanvas == null) {
            throw new Error("chart canvas element does not exist.");
        }

        $appState.chart = setupChart(chartCanvas);

        $appState.chart.update();

        loadLocalSettings();

        // will reconnect automatically
        $appState.wsClient = initWebSocket($appState.wsUrl);
    });

    let modePreviewId = $appState.activeModeId ?? 0;

    $: activePreviewMode = modes.find(m => m.id === modePreviewId) ?? modes[0];
</script>

<Navigation />

<Toaster position="bottom-left" />

<main class="flex-[1] grid lg:grid-cols-main grid-cols-1 gap-8 w-nav py-8">
    <div class="m-auto w-full flex flex-col justify-center gap-4 mt-0">
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

        <ModePage mode={activePreviewMode} previewModeId={modePreviewId} let:debouncedSave>
            {#if modePreviewId === "MANUALLY"}
                <ManualPage {debouncedSave} />
            {:else if modePreviewId === "TIMED"}
                <TimerPage {debouncedSave} />
            {:else if modePreviewId === "INTELLIGENT"}
                <SmartPage {debouncedSave} />
            {/if}
        </ModePage>
    </div>
</main>

<Footer />
