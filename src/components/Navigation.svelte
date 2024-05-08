<script lang="ts">
    import { onMount } from "svelte";
    import ConnectionStatus from "./ConnectionStatus.svelte";
    import { modes } from "../lib/modes";
    import { appState } from "../lib/stores";

    $: activeMode = modes[$appState.activeModeId];
    $: pumpActive = $appState.pumpActive;

    let navbar: Element | null = null;
    let stuck = false;

    onMount(() => {
        if (navbar != null) {
            const observer = new IntersectionObserver( 
              ([e]) => stuck = (e?.intersectionRatio ?? 0) < 1,
              {threshold: [1]}
            );

            observer.observe(navbar);
        }
    });
</script>

<nav bind:this={navbar} class:stuck={stuck} class="sticky transition-all duration-200 top-[-1px] flex items-center w-[95%] mx-auto my-4 rounded-sm outline outline-1 outline-gray-700 z-50">
    <div class="h-full bg-gradient-to-r from-sky-500 to-sky-700 text-white font-bold px-2 py-1">
        <h1>Aquatimer</h1>
    </div>

    <div class="px-2 py-1 flex items-center w-full gap-4">
        <div class="flex items-center gap-1">
            <i class="ph-fill ph-drop text-xl text-blue-500"></i>
            <div class="text-sm text-blue-500">
                1200
            </div>
        </div>

        <div class="flex items-center gap-1">
            <i class="{activeMode.iconClass} text-xl" style="color: {activeMode.colorCode};"></i>
            <div class="text-sm" style="color: {activeMode.colorCode};">
                {activeMode.name}
            </div>
        </div>

        <div class="flex items-center gap-1" class:text-orange-500={pumpActive === false} class:text-green-500={pumpActive === true}>
            <i class="ph-fill  text-xl" class:ph-lightning={pumpActive} class:ph-lightning-slash={!pumpActive}></i>
            <div class="text-sm">
                {#if $appState.pumpActive}
                    Pump active
                {:else}
                    Pump inactive
                {/if}
            </div>
        </div>

        <div class="ml-auto flex gap-4">
            <ConnectionStatus />
        </div>
    </div>
</nav>

<style>
    .stuck {
        width: 100%;
        background-color: rgb(220 220 220 / 0.8);
        backdrop-filter: blur(2px);
        border-radius: 0px;
    }
</style>
