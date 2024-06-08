<script lang="ts">
  import * as Dialog from "$lib/shadcn/ui/dialog";
  import { Button } from "$lib/shadcn/ui/button";
  import { Label } from "$lib/shadcn/ui/label";
  import { Input, type FormInputEvent } from "$lib/shadcn/ui/input";
  import { appState } from "$lib/stores";
  import { saveLocalSettings } from "$lib/localSettings";
  import toast from "svelte-french-toast";
  import debounce from "lodash.debounce";
  import { serializeMessage } from "$lib/communication/parsing";
  import { useWebSocket } from "$lib/communication/ws-utils";

  let accessTokenShown = false;
  let unsavedServerSettings = false;

  $: accessTokenInputType = accessTokenShown ? "text" : "password";

  let newAccessToken = "";

  const LOCAL_DEBOUNCE_DELAY_MS = 500;

  function setNewAccessToken() {
    $appState.accessToken = newAccessToken;
    newAccessToken = "";
    saveLocalSettings();
    toast.success("Access token has been set successfully");
  }

  function raiseUnsavedServerSettings() {
    unsavedServerSettings = true;
  }

  function pushSettingsToServer() {
    let newServerSettings = {
      flowRateGPS: $appState.flowRateGPS,
      soilWeightG: $appState.soilWeightG,
      measurementIntervalMinutes: $appState.measurementIntervalMinutes
    };

    let message = serializeMessage("changePlantSettings", newServerSettings);

    useWebSocket(conn => {
      conn.send(message);
    });
  }
</script>
 
<Dialog.Root>
  <Dialog.Trigger>
      <Button>
        <i class="ph-fill ph-gear text-white text-lg mr-2"></i>
        Settings
      </Button>
    </Dialog.Trigger>

  <Dialog.Content>
    <Dialog.Header>
      <Dialog.Title>Advanced Settings</Dialog.Title>
      <Dialog.Description>
        Aquatimer &mdash; ein Projekt vom Gymnasium am Kattenberge unter Leitung von K. Krutitsky.<br/>
        Code written by T. Korkisch (Backend) and F. Petershagen (Frontend).
      </Dialog.Description>
    </Dialog.Header>

    <div>
      <Dialog.Description class="mb-2">
        Local Configuration
      </Dialog.Description>

      <div class="grid gap-4 pb-4">
        <div class="grid grid-cols-5 items-center gap-4">
          <Label for="ws-url" class="text-right">Backend URL</Label>
          <Input id="ws-url" bind:value={$appState.wsUrl} type="text" class="col-span-4" />
        </div>
      </div>

      <div class="grid gap-4 pb-4">
        <div class="grid grid-cols-5 items-center gap-4">
          <Label for="access-token" class="text-right">Access Token</Label>
          <Input id="access-token" bind:value={newAccessToken} class="col-span-3" />
          <Button on:click={setNewAccessToken}>
            Set
          </Button>
        </div>
      </div>
    </div>

    <div>
      <Dialog.Description class="mb-2">
        Server-Side Configuration
      </Dialog.Description>

      <div class="grid gap-4 pb-4">
        <div class="grid grid-cols-5 items-center gap-4">
          <Label for="ws-url" class="text-right">
            Flow Rate
            <i class="text-gray-500">g/s</i>
          </Label>
          <Input id="ws-url" bind:value={$appState.flowRateGPS} on:input={raiseUnsavedServerSettings} type="number" inputmode="numeric" class="col-span-4" />
        </div>
      </div>

      <div class="grid gap-4 pb-4">
        <div class="grid grid-cols-5 items-center gap-4">
          <Label for="ws-url" class="text-right">
            Soil Weight
            <i class="text-gray-500">g</i>
          </Label>
          <Input id="ws-url" bind:value={$appState.soilWeightG} on:input={raiseUnsavedServerSettings} type="number" inputmode="numeric" class="col-span-4" />
        </div>
      </div>

      <div class="grid gap-4 pb-4">
        <div class="grid grid-cols-5 items-center gap-4">
          <Label for="ws-url" class="text-right">
            Measure&shy;ment Interval
            <i class="text-gray-500">s</i>
          </Label>
          <Input id="ws-url" bind:value={$appState.measurementIntervalMinutes} on:input={raiseUnsavedServerSettings} type="number" inputmode="numeric" class="col-span-4" />
        </div>
      </div>
    </div>

    <Dialog.Footer>
      {#if unsavedServerSettings}
        <div class="flex flex-col justify-center items-center mr-4 text-red-500 font-bold">
          You've got unsaved changes!
        </div>
      {/if}

      <Button on:click={pushSettingsToServer}>
          Push to Server
      </Button>
    </Dialog.Footer>
  </Dialog.Content>
</Dialog.Root>
