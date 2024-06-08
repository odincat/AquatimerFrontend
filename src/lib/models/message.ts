export interface Message<T> {
    actionName: string;
    payload?: T;
    key?: string;
}
