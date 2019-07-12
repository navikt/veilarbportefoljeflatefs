import { DependencyList, useEffect } from 'react';

export function useMouseDownListener(handleMouseDown: (event?: any) => void, deps?: DependencyList) {
    useEffect(() => {
        document.addEventListener('mousedown', handleMouseDown, false);
        return () => {
            document.removeEventListener('mousedown', handleMouseDown, false);
        };
    }, deps);
}
