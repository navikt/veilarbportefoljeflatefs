import {DependencyList, useEffect} from 'react';

export function useEventListener(eventName: string, handleEvent: (event?: any) => void, deps?: DependencyList) {
    useEffect(() => {
        const app = document.getElementById('applikasjon');
        if (app) {
            app.addEventListener(eventName, handleEvent, false);
            return () => {
                app.removeEventListener(eventName, handleEvent, false);
            };
        }
    }, [eventName, handleEvent]);
}
