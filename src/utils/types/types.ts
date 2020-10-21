export type OrNothing<T> = T | undefined | null;

export interface Dictionary<T> {
    [key: string]: T;
}
