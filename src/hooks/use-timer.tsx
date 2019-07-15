import { useRef } from 'react';

export function useTimer(): { start: () => void, stopp: () => number } {
    const ref = useRef<number>(-1);

    function start() {
        ref.current = Date.now();
    }

    function stopp() {
        if (ref.current === -1) {
            return -1;
        }

        const ret = Date.now() - ref.current;
        ref.current = -1;
        return ret;
    }

    return {start, stopp};
}
