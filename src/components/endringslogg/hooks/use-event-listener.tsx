import {useEffect} from 'react';

export const useEventListener = (eventName: string, handleEvent: (event?: any) => void) => {
    useEffect(() => {
        document.addEventListener(eventName, handleEvent, false);
        return () => {
            document.removeEventListener(eventName, handleEvent, false);
        };
    }, [eventName, handleEvent]);
};
