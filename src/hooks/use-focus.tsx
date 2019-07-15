import { RefObject, useEffect, DependencyList } from 'react';

export function useFocus(loggNode: RefObject<any>, deps?: DependencyList) {
    useEffect(() => {
        if (loggNode.current) {
            loggNode.current.focus();
        }
    },deps);
}
