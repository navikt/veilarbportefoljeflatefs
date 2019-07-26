import { getCrypto } from './crypto';
import { fetchHarSettInnlegg, registrerSettInnlegg } from '../../middleware/api';
import { EndringsloggInleggMedSettStatus } from './endringslogg-custom';

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
export function hentSetteVersjonerLocalstorage(): string[] | string {
    let setteVersjoner: string[] = [];
    const tmp = localStorage.getItem(ENDRING_PREFIX);
    if (tmp) {
        try {
            setteVersjoner = JSON.parse(tmp);
        } catch (e) {
            // Error handling pga. tidligere versjon som bare lagret en string i LS.
            setteVersjoner.push(tmp);
            return setteVersjoner;
        }
    }
    return setteVersjoner;
}

export async function hentSetteVersjonerRemotestorage(): Promise<string[] | null> {
    const temp = await(fetchHarSettInnlegg());
    let result: string[];
    if (temp === null) {
        return null;
    } else if (temp.Endringslogg === undefined) {
        result = [];
    } else {
        result = temp.Endringslogg.split(',');
    }

    // For å overføre tidligere data fra local storage, kjøres bare hvis remote er tom.
    if (result.length === 0) {
        const fraLocal = hentSetteVersjonerLocalstorage();
        if (fraLocal instanceof String) {
            // @ts-ignore
            result.push(fraLocal);
        } else {
            result.push(...fraLocal);
        }
        registrerSettInnlegg(result.join(','));
    }
    return result;
}

export async function registrerInnholdIRemoteStorage(endringslogg: EndringsloggInleggMedSettStatus[]) {
    const messege: string[] = [];
    endringslogg.forEach( (e)=> {
        if(messege.length === 0) {
            messege.push(e.id);
        } else if(!messege.includes(e.id)) {
            messege.push(e.id);
        }
    });
    await(registrerSettInnlegg(messege.join(',')));
}
