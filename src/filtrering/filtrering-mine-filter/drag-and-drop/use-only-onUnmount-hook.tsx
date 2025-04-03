import {MutableRefObject, useEffect, useMemo, useRef} from 'react';

function generateSetOnUnmount(onUnmountRef: MutableRefObject<() => void>) {
    return (newAction: () => void) => (onUnmountRef.current = newAction);
}

export function useOnlyOnUnmount(onUnmount?: () => void): [MutableRefObject<() => void>, (newAction: any) => any] {
    const onUnmountNotNull = useMemo(() => {
        return onUnmount ? onUnmount : () => null;
    }, [onUnmount]);

    const onUnmountRef = useRef(() => {
        onUnmountNotNull();
    });

    useEffect(() => {
        onUnmountRef.current = () => onUnmountNotNull();
    }, [onUnmountNotNull]);

    const setOnUnmount = generateSetOnUnmount(onUnmountRef);
    return [onUnmountRef, setOnUnmount];
}
