import { hentAktivBruker } from '../enhet-context/context-api';

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
    const senesteVersjonSett = window.localStorage.getItem(ENDRING_PREFIX) || false;
    return senesteVersjonSett && senesteVersjonSett === versjon;
}

export function harLestEndringslogg(versjon) {
    window.localStorage.setItem(ENDRING_PREFIX, versjon);
}
