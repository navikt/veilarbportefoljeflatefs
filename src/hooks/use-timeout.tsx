import { DependencyList, useEffect, useRef } from 'react';

export function useTimeOut(handler: TimerHandler, timeout: number, deps?: DependencyList) {
    const ref = useRef<number>(-1);
    useEffect(()=> {
        if(ref.current !== -1) {
            clearTimeout(ref.current);
            ref.current = -1;
        }
        ref.current = window.setTimeout(handler, timeout);
        return () => {
            clearTimeout(ref.current);
            ref.current = -1;
        };

    },deps);
}
