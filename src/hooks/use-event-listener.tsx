import { DependencyList, useEffect } from 'react';

export function useEventListener(eventName: string, handleEvent: (event?: any) => void, deps?: DependencyList) {
   useEffect(() => {
       document.addEventListener(eventName, handleEvent, false);
       return () => {
           document.removeEventListener(eventName, handleEvent, false);
       };
   }, deps);
}
