import { writable } from "svelte/store";
import { DEFAULT_APP_STATE } from "./appState";

export const appState = writable({ ...DEFAULT_APP_STATE });
