import { useEffect, useRef } from 'react';

export function useFocus() {
    const htmlElemRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        if (htmlElemRef.current) {
            htmlElemRef.current.focus();
        }
    },[htmlElemRef]);

    return htmlElemRef;
}
