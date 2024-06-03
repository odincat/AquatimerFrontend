export interface Message<T> {
    actionName: string;
    payload?: T;
    accessToken?: string;
}
