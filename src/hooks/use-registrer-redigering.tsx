import {useEffect} from 'react';
import {avsluttRedigering, startRedigering} from '../utils/redigering-registry';

/**
 * Registrerer at en redigering er aktiv i redigering-registeret så lenge `erAktiv` er true.
 */
export function useRegistrerRedigering(erAktiv: boolean): void {
    useEffect(() => {
        if (!erAktiv) {
            return;
        }
        startRedigering();
        return () => avsluttRedigering();
    }, [erAktiv]);
}
