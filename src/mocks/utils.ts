export function rnd(start, stop) {
    return Math.round(Math.random() * (stop - start) + start);
}

export const MOCK_CONFIG = {
    failureRate: -1,
    seed: 9001
};
