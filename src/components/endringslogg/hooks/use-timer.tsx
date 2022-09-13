import {useRef} from 'react';

export const useTimer = (): {
    startTimer: () => void;
    stopTimer: () => number;
} => {
    const ref = useRef<number>(-1);

    const start = () => {
        ref.current = Date.now();
    };

    const stop = () => {
        if (ref.current === -1) {
            return -1;
        }

        const ret = Date.now() - ref.current;
        ref.current = -1;
        return ret;
    };

    return {startTimer: start, stopTimer: stop};
};
