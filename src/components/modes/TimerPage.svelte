<script lang="ts">
    import Slider from "$lib/shadcn/ui/slider/slider.svelte";
    import { modes } from "../../lib/models/modes";
    import { appState } from "../../lib/stores";

    export let debouncedSave: () => void;

    let mode = modes[1];

    const MIN_INTERVAL = 12;
    const MAX_INTERVAL = 24 * 7;

    const MIN_WATERING_DURATION_SECONDS = 1;
    const MAX_WATERING_DURATION_SECONDS = 20;

    function onIntervalChange(newValues: number[]) {
        let newInterval = newValues[0];

        if (newInterval == null) {
            return;
        }

        $appState.timerIntervalHours = newInterval;

        debouncedSave();
    }

    function onWateringDurationChange(newValues: number[]) {
        let newDuration = newValues[0];

        if (newDuration == null) {
            return;
        }

        $appState.timerWateringDurationSeconds = newDuration;

        debouncedSave();
    }
</script>

<div class="relative">
    <label for="medium-range" class="block mb-2 text-sm font-medium text-gray-900">
        Interval
        <span class="text-gray-500">
            &mdash;
            {#if $appState.timerIntervalHours >= 24}
                {Math.floor($appState.timerIntervalHours / 24)}d
                {#if Math.floor($appState.timerIntervalHours % 24) != 0}
                {Math.floor($appState.timerIntervalHours % 24)}h
                {/if}
                {:else}
                {$appState.timerIntervalHours}h
            {/if}
        </span>
    </label>

    <Slider class="cursor-pointer" value={[$appState.timerIntervalHours]} onValueChange={onIntervalChange} step={12} min={MIN_INTERVAL} max={MAX_INTERVAL} />

    <span class="text-sm text-gray-500 absolute start-0 -bottom-6">{MIN_INTERVAL}h</span>
    <span class="text-sm text-gray-500 absolute end-0 -bottom-6">{MAX_INTERVAL / 24}d</span>
</div>

<div class="relative">
    <label for="medium-range" class="block mb-2 text-sm font-medium text-gray-900">
        Duration
        <span class="text-gray-500">
            &mdash;
            {$appState.timerWateringDurationSeconds}s
            &asymp;
            {($appState.timerWateringDurationSeconds * $appState.flowRateGPS).toFixed(1)}g
        </span>
    </label>

    <Slider class="cursor-pointer" value={[$appState.timerWateringDurationSeconds]} onValueChange={onWateringDurationChange} step={1} min={MIN_WATERING_DURATION_SECONDS} max={MAX_WATERING_DURATION_SECONDS} />

    <span class="text-sm text-gray-500 absolute start-0 -bottom-6">{MIN_WATERING_DURATION_SECONDS}s</span>
    <span class="text-sm text-gray-500 absolute end-0 -bottom-6">{MAX_WATERING_DURATION_SECONDS}s</span>
</div>
