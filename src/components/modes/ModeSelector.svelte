<script lang="ts">
    import { fade } from "svelte/transition";
    import { modes } from "../../lib/models/modes";
    import { appState } from "../../lib/stores";

    export let previewId: string;

    function setModePreview(id: string) {
        previewId = id;
    }
</script>

<div>
    <div class="w-full grid grid-cols-3 border rounded-md overflow-hidden bg-slate-200 p-1 gap-1">
        {#each modes as mode, index}
            <button on:click={() => setModePreview(mode.id)}
                class="relative w-full flex flex-col gap-1 items-center transition-colors p-2 hover:bg-slate-100 rounded-md overflow-hidden"
                class:active={previewId === mode.id}>

                <i class="{mode.iconClass} text-2xl" style="color: {mode.colorCode};"></i>

                <div style="color: {mode.colorCode};">
                    {mode.name}
                </div>

                {#if $appState.activeModeId === mode.id}
                    <div transition:fade class="absolute w-full h-1 bg-green-500 bottom-0" class:animate-pulse={$appState.pumpActive}></div>
                {/if}
            </button>
        {/each}
    </div>
</div>

<style lang="postcss">
    .active {
        @apply bg-white shadow-md;
    }

    .active:hover {
        @apply bg-white;
    }
</style>
