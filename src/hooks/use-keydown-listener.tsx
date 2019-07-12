import { DependencyList, useEffect } from 'react';

export function useKeyDownListener(handleKeyDown: (event?: any)=> void, deps?: DependencyList) {
    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown, false);
        return () => {
            document.removeEventListener('keydown', handleKeyDown, false);
        };
    }, deps);
}
