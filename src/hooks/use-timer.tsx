import {useRef} from 'react';

export function useTimer(): {
    startTimer: () => void;
    stoppTimer: () => number;
} {
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

    return {startTimer: start, stoppTimer: stopp};
}
