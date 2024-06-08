<script lang="ts">
    import Button from "$lib/shadcn/ui/button/button.svelte";
    import toast from "svelte-french-toast";
    import { useWebSocket } from "../../lib/communication/ws-utils";
    import type { Mode } from "../../lib/models/modes";
    import { appState } from "../../lib/stores";
    import { serializeMessage } from "$lib/communication/parsing";
    import type { Message } from "$lib/models/message";
    import debounce from "lodash.debounce";

    export let mode: Mode;
    export let previewModeId: string;

    async function updateActiveMode() {
        //TODO: just use active preview mode
        $appState.activeModeId = mode.id;

        var messagePayload = {
            newModeId: $appState.activeModeId
        }
        var message = serializeMessage("changeMode", messagePayload);

        useWebSocket(conn => {
            conn.send(message);
        });
    }

    async function saveCurrentSettings() {
        console.log("hey")
        let actionName: string;
        let payload: any;

        if (previewModeId === "TIMED") {
            actionName = "changeTimedModeSettings";
            payload = {
                timerInterval: $appState.timerIntervalHours,
                timerWateringDuration: $appState.timerWateringDurationSeconds
            };
        } else if (previewModeId === "INTELLIGENT") {
            actionName = "changeIntelligentModeSettings"
            payload = {
                ideal: $appState.smartIdeal,
                threshold: $appState.smartThreshold
            };
        } else if (previewModeId === "MANUALLY"){
            actionName = "changeManualModeSettings";
            payload = {
                manualWateringDurationSeconds: $appState.manualWateringDurationSeconds
            };
        } else {
            return;
        }

        let updateMessage = serializeMessage(actionName, payload);

        useWebSocket(conn => {
            conn.send(updateMessage);
        });
    }

    let debouncedSave = debounce(saveCurrentSettings, 1000);
</script>

<div class="flex flex-col gap-4">
    <div class="grid grid-cols-3">
        <div class="flex flex-col gap-4">
            {#if $appState.activeModeId === mode.id}
                <Button class="w-full font-bold bg-green-500 hover:bg-green-500 text-lg cursor-default">
                    <i class="ph-fill ph-check-fat mr-2"></i>
                    Active
                </Button>
            {:else}
                <Button disabled={$appState.pumpActive} on:click={updateActiveMode} class="w-full text-lg">
                    <i class="ph-fill ph-arrow-fat-right mr-2"></i>
                    Switch
                </Button>
            {/if}

            <!-- <Button on:click={saveCurrentSettings} variant="secondary" class="w-full text-wrap break-words relative"> -->
            <!--     <i class="ph-fill ph-floppy-disk mr-1 text-xl"></i> -->
            <!--     Save -->
            <!-- </Button> -->
        </div>

        <div class="col-span-2 pl-4">
            {mode.description}
        </div>
    </div>

    <div class="flex flex-col gap-8">
        <slot {debouncedSave} />
    </div>
</div>
