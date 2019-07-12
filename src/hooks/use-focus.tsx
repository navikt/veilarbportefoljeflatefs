import { RefObject, useEffect } from 'react';

export function useFocus(loggNode: RefObject<any>) {
    useEffect(() => {
        if (loggNode.current) {
            loggNode.current.focus();
        }
    },[]);
}
