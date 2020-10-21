import {EffectCallback, useEffect} from 'react';

export function useOnUnmount(effect: EffectCallback) {
    useEffect(
        () => () => {
            effect();
        },
        [effect]
    );
}
