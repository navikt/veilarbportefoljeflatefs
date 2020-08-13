import { MockHandler, MockRequest, MockResponse, MockContext } from 'yet-another-fetch-mock';

export const MOCK_CONFIG = {
    failureRate: -1,
    seed: 9001
};

export function rnd(start, stop) {
    return Math.round(Math.random() * (stop - start) + start);
}

export function randomFailure(fn) {
    return (...args) => {
        const shouldFail = Math.random() <= MOCK_CONFIG.failureRate;
        if (shouldFail) {
            return 500;
        }

        if (typeof fn === 'function') {
            return fn(...args);
        }
        return fn; // Trust me, its data
    };
}

export function delayed(ms: number, handler: MockHandler): MockHandler {
    return async (req, res, ctx) => {
        await ctx.delay(ms)({});
        return handler(req, res, ctx);
    }
}

export function jsonResponse(json: any): MockHandler {
    return (req: MockRequest, res: MockResponse, ctx: MockContext) => res(ctx.json(json))
}
