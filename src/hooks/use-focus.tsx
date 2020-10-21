import {useEffect, useRef} from 'react';

export function useFocus<T extends HTMLElement>() {
    const focusRef = useRef<T | null>(null);

    const elem = focusRef.current;

    useEffect(() => {
        if (elem) {
            elem.focus();
        }
    }, [elem]);

    return {focusRef};
}
