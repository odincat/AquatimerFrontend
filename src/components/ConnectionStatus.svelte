<script lang="ts">
    import type { WebSocketConnection } from "../lib/models/appState";
    import { appState } from "../lib/stores";

    $: pingColor = getPingColor($appState.connectionStatus);

    function getPingColor(connection: WebSocketConnection): string {
        if (connection === "CONNECTING") {
            return "#d97706";
        } else if (connection === "CONNECTED") {
            return "#16a34a";
        } else if (connection === "DISCONNECTED") {
            return "#dc2626";
        } else {
            return "#2563eb";
        }
    }
</script>

<div class="flex items-center">
    <div class="flex items-center">
        <div class="w-3 h-3 rounded-full mr-2" style="background-color: {pingColor};">
            <div class="w-3 h-3 rounded-full animate-ping" style="background-color: {pingColor};"></div>
        </div>

        <div>
            {$appState.connectionStatus.toLowerCase()}
            {#if $appState.connectionStatus == "CONNECTING"}
                ...
            {/if}
        </div>
    </div>
</div>
