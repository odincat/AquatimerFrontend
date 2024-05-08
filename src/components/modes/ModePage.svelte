<script lang="ts">
    import type { Mode } from "../../lib/modes";
    import { appState } from "../../lib/stores";

    export let mode: Mode;

    async function updateActiveMode() {
        $appState.activeModeId = mode.id;
        // wait for server feedback
    }
</script>

<div class="flex flex-col gap-4">
    <div class="grid grid-cols-3">
        <div>
            {#if $appState.activeModeId === mode.id}
                <div class="bg-green-500 text-white rounded-sm flex items-center gap-2 p-2 font-bold w-full">
                    <i class="ph-fill ph-check-fat"></i>
                    Active
                </div>
            {:else}
                <button on:click={updateActiveMode} class="bg-gray-500 text-white rounded-sm flex items-center gap-2 p-2 font-bold w-full">
                    <i class="ph-fill ph-arrow-fat-right"></i>
                    Switch
                </button>
            {/if}
        </div>

        <div class="col-span-2 pl-4">
            {mode.description}
        </div>
    </div>

    <div class="">
        <slot />
    </div>
</div>
