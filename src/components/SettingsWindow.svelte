<script lang="ts">
  import * as Dialog from "$lib/shadcn/ui/dialog";
  import { Button } from "$lib/shadcn/ui/button";
  import { Label } from "$lib/shadcn/ui/label";
  import { Input, type FormInputEvent } from "$lib/shadcn/ui/input";
    import { saveAccessToken } from "$lib/accessToken";
    import { appState } from "$lib/stores";

  let accessTokenShown = false;

  $: accessTokenInputType = accessTokenShown ? "text" : "password";

  function toggleAccessTokenVisibility() {
      accessTokenShown = !accessTokenShown;
  }

  function onAccessTokenInput(event: FormInputEvent<InputEvent>) {
      saveAccessToken(event.currentTarget.value ?? "");
  }

  function pushSettingsToServer() {
  }
</script>
 
<Dialog.Root>
  <Dialog.Trigger>
        <button class="bg-gray-900 aspect-square flex items-center justify-center p-1 rounded-md">
            <i class="ph-fill ph-gear text-white text-lg"></i>
        </button>
    </Dialog.Trigger>

  <Dialog.Content>
    <Dialog.Header>
      <Dialog.Title>Settings</Dialog.Title>
      <Dialog.Description>
        abc
      </Dialog.Description>
    </Dialog.Header>

    <div>
      <Dialog.Description>
        abc
      </Dialog.Description>

        <div class="grid gap-4 pb-4">
          <div class="grid grid-cols-5 items-center gap-4">
            <Label for="access-token" class="text-right">Access Token</Label>
            <Input id="access-token" bind:value={$appState.accessToken} on:input={onAccessTokenInput} type={accessTokenInputType} class="col-span-3" />
            <Button on:click={toggleAccessTokenVisibility}>
                <i class="ph-fill ph-eye text-xl"></i>
            </Button>
          </div>
        </div>
    </div>

    <Dialog.Footer>
        <Button on:click={pushSettingsToServer}>
            Push to Server
        </Button>
    </Dialog.Footer>
  </Dialog.Content>
</Dialog.Root>
