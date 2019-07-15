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
    const stringToBeEncoded = `${veileder} - ${versjon}`;
    const utf8Arr: Uint8Array = encodeString(stringToBeEncoded);
    const hash = await window.crypto.subtle.digest('SHA-256', utf8Arr).then((res) => hexString(res));
    return hash;
}

function encodeString(stringToBeEncoded: string) {
    let data;
    // @ts-ignore
    if (window.TextEncoder) {
        const encoder = new TextEncoder();
        data = encoder.encode();
    } else {
        const utf8 = unescape(encodeURIComponent(stringToBeEncoded));
        data = new Uint8Array(utf8.length);
        for (let i = 0; i < utf8.length; i++) {
            data[i] = utf8.charCodeAt(i);
        }
    }
    return data;
}

const ENDRING_PREFIX = 'Endringslogg';

export function sjekkHarSettEndringslogg(versjon: string) {
    const senesteVersjonSett = window.localStorage.getItem(ENDRING_PREFIX) || false;
    return senesteVersjonSett && senesteVersjonSett === versjon;
}

export function harLestEndringslogg(versjon) {
    window.localStorage.setItem(ENDRING_PREFIX, versjon);
}
