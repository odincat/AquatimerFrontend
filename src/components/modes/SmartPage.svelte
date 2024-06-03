<script lang="ts">
    import Slider from "$lib/shadcn/ui/slider/slider.svelte";
    import { modes } from "../../lib/models/modes";
    import { appState } from "../../lib/stores";

    // TODO: make this a server side setting
    const MIN_DIFFERENCE = 10;

    const MIN_IDEAL = 40;
    const MAX_IDEAL = 90;
    const IDEAL_STEP = 5;

    const MIN_THRESHOLD = 10;
    const MAX_THRESHOLD = MAX_IDEAL - MIN_DIFFERENCE;
    const THRESHOLD_STEP = 5;

    let mode = modes[1];

    function onIdealChange(newValues: number[]) {
        let newIdeal = newValues[0] ?? 85;

        if ($appState.smartThreshold >= newIdeal - MIN_DIFFERENCE) {
            $appState.smartThreshold = newIdeal - MIN_DIFFERENCE;
        }

        $appState.smartIdeal = newIdeal;
    }

    function onThresholdChange(newValues: number[]) {
        let newThreshold = newValues[0] ?? 35;

        if ($appState.smartIdeal <= newThreshold + MIN_DIFFERENCE) {
            $appState.smartIdeal = newThreshold + MIN_DIFFERENCE;
        }

        $appState.smartThreshold = newThreshold;
    }
</script>

<div class="relative">
    <label for="medium-range" class="block mb-2 text-sm font-medium text-gray-900">
        Ideal Moisture Content
        <span class="text-gray-500">&mdash; {$appState.smartIdeal} %</span>
    </label>

    <Slider class="cursor-pointer" value={[$appState.smartIdeal]} onValueChange={onIdealChange} step={IDEAL_STEP} min={MIN_IDEAL} max={MAX_IDEAL} />

    <span class="text-sm text-gray-500 absolute start-0 -bottom-6">{MIN_IDEAL} %</span>
    <span class="text-sm text-gray-500 absolute end-0 -bottom-6">{MAX_IDEAL} %</span>
</div>

<div class="relative">
    <label for="medium-range" class="block mb-2 text-sm font-medium text-gray-900">
        Moisture Threshold
        <span class="text-gray-500">&mdash; {$appState.smartThreshold} %</span>
    </label>

    <Slider class="cursor-pointer" value={[$appState.smartThreshold]} onValueChange={onThresholdChange} step={THRESHOLD_STEP} min={MIN_THRESHOLD} max={MAX_THRESHOLD} />

    <span class="text-sm text-gray-500 absolute start-0 -bottom-6">{MIN_THRESHOLD} %</span>
    <span class="text-sm text-gray-500 absolute end-0 -bottom-6">{MAX_THRESHOLD} %</span>
</div>