<script lang="ts">
    import { appState } from "$lib/stores";
    import { onMount } from "svelte";

    let interval: number;
    let msPassed = 0;
    let isRunning = false;

    export let className = "";

    function formatTime(input: number) {
        return input.toString().padStart(2, "0");
    }

    function start() {
        if(!isRunning) {
            isRunning = true;
            interval = setInterval(() => {
                msPassed += 100;
            }, 100);
        }
    }

    function stop() {
        isRunning = false;
        clearInterval(interval);
    }

    function reset() {
        stop();
        msPassed = 0;
    }

    onMount(() => {
        return () => {
            clearInterval(interval);
        };
    });

    $: sPassed = (msPassed / 1000) - $appState.pumpOffsetS;

    export { start, stop, reset }
</script>

{#if sPassed > 0}
    &mdash;
    <div class="tabular-nums {className}">
        {formatTime(Math.floor(sPassed))}s
        &asymp;
        {((msPassed / 1000) * $appState.flowRateGPS).toFixed(1)}g
    </div>
{/if}
