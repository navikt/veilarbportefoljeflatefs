import {EffectCallback, useEffect} from 'react';

export function useOnMount(effect: EffectCallback) {
    /* eslint-disable react-hooks/exhaustive-deps */
    useEffect(effect, []);
}
