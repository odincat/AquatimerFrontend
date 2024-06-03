<script lang="ts">
    import Button from "$lib/shadcn/ui/button/button.svelte";
import type { Mode } from "../../lib/models/modes";
    import { appState } from "../../lib/stores";

    export let mode: Mode;
    export let previewModeId: number;

    async function updateActiveMode() {
        $appState.activeModeId = mode.id;
        // wait for server feedback
    }
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

            {#if previewModeId != 0}
                <Button variant="secondary" class="w-full">
                    <i class="ph-fill ph-floppy-disk mr-1 text-xl"></i>
                    Save Settings
                </Button>
            {/if}
            <!-- <button on:click={updateActiveMode} class="bg-gray-500 text-white rounded-sm flex items-center gap-2 px-2 py-1 font-bold w-full mt-4 text-sm"> -->
            <!--     <i class="ph-fill ph-floppy-disk text-lg"></i> -->
            <!--     Save settings -->
            <!-- </button> -->
        </div>

        <div class="col-span-2 pl-4">
            {mode.description}
        </div>
    </div>

    <div class="flex flex-col gap-8">
        <slot />
    </div>
</div>
