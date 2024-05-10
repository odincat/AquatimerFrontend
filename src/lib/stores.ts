import { writable } from "svelte/store";
import { DEFAULT_APP_STATE } from "./models/appState";

export const appState = writable({ ...DEFAULT_APP_STATE });
