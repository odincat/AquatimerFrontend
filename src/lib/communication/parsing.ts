// Web sockets are designed for transferring one data type.
// We however need to transfer different actions with different payloads.
// So we implement this simple parsing mechanism that needs to be used exclusively.

// Each message has the following schema:
// <ACTION_NAME>|<JSON_PAYLOAD>
// "|" is our separator here
// so an example message could be:
// UPDATE_THRESHOLD|5

const SEPARATOR_CHAR = "|";

export function serializeAction<T>(actionName: string, payload: T): string {
    return actionName + SEPARATOR_CHAR + JSON.stringify(payload);
}

interface Action<T> {
    name: string;
    payload: T;
}

export function deserializeAction<T>(input: string): Action<T> {
    if (!input.includes(SEPARATOR_CHAR)) {
        throw new Error(`Invalid action schema. Please use "<ACTION_NAME>|<JSON_PAYLOAD>"`);
    }

    const [actionName, ...rest] = input.split(SEPARATOR_CHAR);

    // allows us to still have our separator character in the payload
    const actionPayload = rest.join(SEPARATOR_CHAR);

    const parsedPayload: T = JSON.parse(actionPayload);

    const action: Action<T> = {
        name: actionName,
        payload: parsedPayload
    };

    return action;
}
