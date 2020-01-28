import {EffectCallback, useEffect} from 'react';

export function useOnMount(effect: EffectCallback) {
    useEffect(effect, []);
}