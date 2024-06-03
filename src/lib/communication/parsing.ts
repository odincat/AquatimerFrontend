// Web sockets are designed for transferring one data type.
// We however need to transfer different actions with different payloads.
// So we implement this simple parsing mechanism that needs to be used exclusively.

import type { Message } from "$lib/models/message";
import { appState } from "$lib/stores";
import { get } from "svelte/store";

// Each message has the following schema:
// <ACTION_NAME>|<JSON_PAYLOAD>
// "|" is our separator here
// so an example message could be:
// UPDATE_THRESHOLD|5

export function serializeMessage<T>(actionName: string, payload: T | undefined = undefined): string {
    let as = get(appState);

    let message: Message<T> = {
        actionName,
        payload,
        accessToken: as.accessToken
    };

    return JSON.stringify(message);
}

export function deserializeMessage<T>(input: string): Message<T> {
    let parsed: Message<T> = JSON.parse(input);

    return parsed;
}
