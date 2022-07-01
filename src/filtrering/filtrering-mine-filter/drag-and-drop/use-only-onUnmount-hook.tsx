import React, {useEffect, useRef} from 'react';

function generateSetOnUnmount(onUnmountRef: React.MutableRefObject<() => void>) {
    return (newAction: () => void) => (onUnmountRef.current = newAction);
}

export function useOnlyOnUnmount(
    onUnmount?: () => void
): [React.MutableRefObject<() => void>, (newAction: any) => any] {
    /* eslint-disable react-hooks/exhaustive-deps */
    const onUnmountNotNull = onUnmount ? onUnmount : () => null;

    const onUnmountRef = useRef(() => {
        onUnmountNotNull();
    });

    useEffect(() => {
        onUnmountRef.current = () => onUnmountNotNull();
    }, [onUnmountNotNull]);

    const setOnUnmount = generateSetOnUnmount(onUnmountRef);
    return [onUnmountRef, setOnUnmount];
}
