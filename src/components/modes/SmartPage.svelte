<script lang="ts">
    import { modes } from "../../lib/models/modes";
    import { appState } from "../../lib/stores";

    const MIN_THRESHOLD = 1000;
    const MAX_THRESHOLD = 2000;

    const THRESHOLD_STEP = 100;

    let mode = modes[1];
</script>

<div class="relative">
    <label for="medium-range" class="block mb-2 text-sm font-medium text-gray-900">
        Moisture Threshold
        <span class="text-gray-500">- {$appState.smartThreshold}</span>
    </label>
    <input min={MIN_THRESHOLD} max={MAX_THRESHOLD} step={THRESHOLD_STEP} id="medium-range" type="range" bind:value={$appState.smartThreshold} class="w-full h-2 mb-1 bg-gray-200 rounded-lg appearance-none cursor-pointer">
    <span class="text-sm text-gray-500 absolute start-0 -bottom-6">Min ({MIN_THRESHOLD})</span>
    <span class="text-sm text-gray-500 absolute end-0 -bottom-6">Max ({MAX_THRESHOLD})</span>
</div>
