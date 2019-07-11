import { hentAktivBruker } from '../enhet-context/context-api';
import { useRef } from 'react';

export function useTimer(): { start: () => void, stopp: () => number } {
    const ref = useRef<number>(-1);

    function start() {
        ref.current = Date.now();
    }

    function stopp() {
        if (ref.current === -1) {
            return -1;
        }

        const ret = Date.now() - ref.current;
        ref.current = -1;
        return ret;
    }

    return {start, stopp};
}

function hexString(buffer) {
    const byteArray = new Uint8Array(buffer);

    const hexCodes = [...byteArray].map((value) => {
        const hexCode = value.toString(16);
        const paddedHexCode = hexCode.padStart(2, '0');
        return paddedHexCode;
    });

    return hexCodes.join('');
}

export async function hentVeilederHash(versjon: string) {
    const veileder = await hentAktivBruker();
    const encoder = new TextEncoder();
    const data = encoder.encode(`${veileder} - ${versjon}`);
    const hash = await window.crypto.subtle.digest('SHA-256', data).then((res) => hexString(res));
    return hash;
}

const ENDRING_PREFIX = 'Endringslogg';

export function sjekkHarSettEndringslogg(versjon: string) {
    const senesteVersjonSett = window.localStorage.getItem(ENDRING_PREFIX);
    return senesteVersjonSett != null && senesteVersjonSett === versjon;
}

export function harLestEndringslogg(versjon) {
    window.localStorage.setItem(ENDRING_PREFIX, versjon);
}
