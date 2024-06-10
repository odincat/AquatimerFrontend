<script lang="ts">
    import { serializeMessage } from "$lib/communication/parsing";
    import { useWebSocket } from "$lib/communication/ws-utils";
    import { Button } from "$lib/shadcn/ui/button";
    import { Slider } from "$lib/shadcn/ui/slider";
    import { Switch } from "$lib/shadcn/ui/switch";
    import { modes } from "../../lib/models/modes";
    import { appState } from "../../lib/stores";

    export let debouncedSave: () => void;

    let mode = modes[0];

    const MIN_WATERING_DURATION_SECONDS = 1;
    const MAX_WATERING_DURATION_SECONDS = 20;

    function onWateringDurationChange(newValues: number[]) {
        let newDuration = newValues[0];

        if (newDuration == null) {
            return;
        }

        $appState.manualWateringDurationSeconds = newDuration;

        debouncedSave();
    }

    function toggleWatering(active: boolean) {
        $appState.pumpActive = active;

        let messageBody = {
            active
        };
        let message = serializeMessage("setWaterPumpState", messageBody);

        let result = useWebSocket(conn => {
            conn.send(message);
        });
    }
</script>

{#if $appState.activeModeId !== "MANUALLY"}
    <div class="italic text-center">
        Cannot be used while another mode is active.
    </div>
{/if}

<div class="relative">
    <label for="medium-range" class="block mb-2 text-sm font-medium text-gray-900">
        Duration
        <span class="text-gray-500">
            &mdash;
            {$appState.manualWateringDurationSeconds}s
            &asymp;
            {($appState.manualWateringDurationSeconds * $appState.flowRateGPS).toFixed(1)}g
        </span>
    </label>

    <Slider class="cursor-pointer" value={[$appState.manualWateringDurationSeconds]} onValueChange={onWateringDurationChange} step={1} min={MIN_WATERING_DURATION_SECONDS} max={MAX_WATERING_DURATION_SECONDS} />

    <span class="text-sm text-gray-500 absolute start-0 -bottom-6">{MIN_WATERING_DURATION_SECONDS}s</span>
    <span class="text-sm text-gray-500 absolute end-0 -bottom-6">{MAX_WATERING_DURATION_SECONDS}s</span>
</div>

<div class:disabled-area={$appState.activeModeId !== "MANUALLY" || $appState.accessToken === ""} class="flex flex-col gap-2">
    {#if !$appState.pumpActive}
        <Button on:click={() => toggleWatering(true)}>
            <i class="ph ph-drop text-lg mr-1"></i>
            Trigger Watering
        </Button>
    {:else}
        <Button variant="secondary" on:click={() => toggleWatering(false)}>
            <i class="ph ph-drop text-lg mr-1"></i>
            Cancel
        </Button>
    {/if}
</div>

