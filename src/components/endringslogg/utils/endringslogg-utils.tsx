import { getCrypto } from './crypto';
import { fetchHarSettInnlegg, registrerSettInnlegg } from './endringslogg-api';
import { EndringsloggInnleggMedSettStatus } from './endringslogg-custom';

export function hexString(buffer) {
    const byteArray = new Uint8Array(buffer);

    const hexCodes = [...byteArray].map((value) => {
        const hexCode = value.toString(16);
        const paddedHexCode = hexCode.padStart(2, '0');
        return paddedHexCode;
    });

    return hexCodes.join('');
}

export function krypterVeilederident(veileder: string): Promise<ArrayBuffer> {
    const stringToBeEncoded = `${veileder} - 0.1.9`;
    const utf8Arr: Uint8Array = encodeString(stringToBeEncoded);

    return getCrypto().subtle.digest('SHA-256', utf8Arr);
}

function encodeString(stringToBeEncoded: string): Uint8Array {
    let data;
    // @ts-ignore
    if (typeof TextEncoder === 'undefined') {
        const utf8 = unescape(encodeURIComponent(stringToBeEncoded));
        data = new Uint8Array(utf8.length);
        for (let i = 0; i < utf8.length; i++) {
            data[i] = utf8.charCodeAt(i);
        }
    } else {
        const encoder = new TextEncoder();
        data = encoder.encode(stringToBeEncoded);
    }
    return data;
}

const ENDRING_PREFIX = 'Endringslogg';
export function hentSetteVersjonerLocalstorage(): string[] {
    const setteVersjoner: string[] = [];
    const localstorageInnhold = localStorage.getItem(ENDRING_PREFIX);
    if (localstorageInnhold) {
        try {
            const parsedLocalstorage = JSON.parse(localstorageInnhold);
            if (Array.isArray(parsedLocalstorage)) {
                setteVersjoner.push(...parsedLocalstorage);
            } else {
                setteVersjoner.push(parsedLocalstorage);
            }
        } catch (e) {
            // Error handling pga. tidligere versjon som bare lagret en string i LS.
            setteVersjoner.push(localstorageInnhold);
        }
    }
    return setteVersjoner;
}

export async function hentSetteVersjonerRemotestorage(): Promise<string[]> {
    const temp = await(fetchHarSettInnlegg());
    let result: string[] = [];
    if (temp.endringslogg !== undefined) {
        result = temp.endringslogg.split(',');
    }
    return result;
}

export async function registrerInnholdIRemoteStorage(endringslogg: EndringsloggInnleggMedSettStatus[]) {
    const message: string[] = [];
    endringslogg.forEach( (e)=> {
        if(!message.includes(e.versjonId) && e.sett) {
            message.push(e.versjonId);
        }
    });
    await(registrerSettInnlegg(message.join(',')));
}
