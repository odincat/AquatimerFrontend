<script lang="ts">
    import { onMount } from "svelte";
    import ConnectionStatus from "./ConnectionStatus.svelte";
    import { modes } from "../lib/models/modes";
    import { appState } from "../lib/stores";
    import WateringStopwatch from "./modes/WateringStopwatch.svelte";
    import type { WateringStopwatchExports } from "./modes/WateringStopwatch.svelte";

    $: activeMode = modes.find(m => m.id === $appState.activeModeId) ?? modes[0];
    $: pumpActive = $appState.pumpActive;

    let navbar: Element | null = null;
    let stuck = false;
    let stopwatch: WateringStopwatchExports | null;

    let resetTimeout: number;

    appState.subscribe(as => {
        if (as.pumpActive) {
            stopwatch?.start();
            clearTimeout(resetTimeout)
        } else {
            stopwatch?.stop();
            resetTimeout = setTimeout(() => {
                stopwatch?.reset();
            }, 20000);
        }
    })

    onMount(() => {
        if (navbar != null) {
            const observer = new IntersectionObserver( 
              ([e]) => stuck = (e?.intersectionRatio ?? 0) < 1,
              {threshold: [1]}
            );

            observer.observe(navbar);
        }
    });

    $: currentMeasurement = $appState.measurements.at(-1)
</script>

<nav bind:this={navbar} class:stuck={stuck} class="sticky transition-all duration-200 top-[-1px] flex items-center w-[95%] mx-auto my-4 rounded-sm outline outline-1 outline-gray-700 z-50 shadow-md">
    <div class="h-full text-lg bg-gradient-to-r from-sky-500 to-sky-700 text-white font-bold px-2 py-1">
        <h1>Aquatimer</h1>
    </div>

    <div class="px-2 py-1 flex sm:flex-row flex-col sm:items-center items-end w-full gap-4">
        <div class="flex items-center gap-1 text-cyan-400">
            <i class="ph ph-drop text-xl"></i>
            <b>
                {currentMeasurement?.moisture.toFixed(1) ?? 0} %
            </b>
        </div>

        <!-- <div class="flex items-center gap-1 text-orange-600"> -->
        <!--     <i class="ph ph-thermometer text-xl"></i> -->
        <!--     <b> -->
        <!--         {currentMeasurement?.temperature} °C -->
        <!--     </b> -->
        <!-- </div> -->

        <div class="flex items-center gap-1">
            <i class="{activeMode.iconClass} text-xl" style="color: {activeMode.colorCode};"></i>
            <div style="color: {activeMode.colorCode};">
                {activeMode.name}
            </div>
        </div>

        <div class="flex items-center gap-1" class:text-slate-500={pumpActive === false} class:text-green-500={pumpActive === true}>
            <i class="ph-fill text-xl" class:animate-pulse={pumpActive} class:ph-lightning={pumpActive} class:ph-lightning-slash={!pumpActive}></i>
            <div class="text-inherit">
                {#if $appState.pumpActive}
                    Pump Active
                {:else}
                    Pump Inactive
                {/if}
            </div>

            <!-- <WateringStopwatch bind:this={$appState.wateringStopwatch} /> -->
        </div>

        <div class="ml-auto flex gap-4">
            <ConnectionStatus />
        </div>
    </div>
</nav>

<style>
    .stuck {
        width: 100%;
        background-color: rgb(230 230 230 / 0.8);
        backdrop-filter: blur(2px);
        border-radius: 0px;
    }
</style>
