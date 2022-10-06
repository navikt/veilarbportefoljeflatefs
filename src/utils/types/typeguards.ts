export const isDefined = <T>(subject: T | undefined | null): subject is T => {
    return typeof subject !== 'undefined' && subject !== null;
};
