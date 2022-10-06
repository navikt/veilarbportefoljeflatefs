import {useEffect} from 'react';
import throttle from 'lodash.throttle';

const TI_SEKUNDER_I_MILLISEKUNDER = 10000;

export const useBrukeraktivitetLytter = (
    element: Element | Document = document,
    onBrukeraktivitet: () => void,
    skalThrottle: boolean = true,
    throttleDelay: number = TI_SEKUNDER_I_MILLISEKUNDER
): void => {
    useEffect(() => {
        const brukeraktivitetEvents = ['mousedown', 'mousemove', 'keydown', 'scroll'];

        const _onBrukeraktivitet = skalThrottle ? throttle(onBrukeraktivitet, throttleDelay) : onBrukeraktivitet;

        brukeraktivitetEvents.forEach((eventType: string) => element.addEventListener(eventType, _onBrukeraktivitet));

        return () => {
            brukeraktivitetEvents.forEach((eventType: string) =>
                element.removeEventListener(eventType, _onBrukeraktivitet)
            );
        };
    }, [element, onBrukeraktivitet, skalThrottle, throttleDelay]);
};
