import { useEffect, useRef } from 'react';

export function useFocus<T extends HTMLElement>() {
    const focusRef = useRef<T | null>(null);

    useEffect(() => {
        const elem = focusRef.current;
        if (elem) {
            elem.focus();
        }
    },);

    return {focusRef};
}
