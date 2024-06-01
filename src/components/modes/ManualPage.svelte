<script lang="ts">
    import { modes } from "../../lib/models/modes";
    import { appState } from "../../lib/stores";

    let mode = modes[0];
</script>

{#if $appState.activeModeId !== 0}
    <div class="italic text-center">
        Cannot be used while another mode is active.
    </div>
{/if}

<div class:disabled-area={$appState.activeModeId !== 0} class="flex flex-col items-center gap-2">
    <label class="relative inline-flex items-center cursor-pointer">
        <input bind:checked={$appState.pumpActive} type="checkbox" value="" class="sr-only peer">
        <div class="w-[60px] h-8 rounded-full bg-gray-400 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-7 after:w-7 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
    </label>

    <b class="text-xl">Toggle Pump</b>
</div>
