import {logEvent} from '../frontend-logger';
import {Side} from './skjerm-metrikker';
import {OrNothing} from '../types/types';
import {InnloggetVeilederModell} from '../../typer/enhet-og-veiledere-modeller';
import {getCrypto} from './crypto';

export const loggSideVisning = (veilederIdent: OrNothing<InnloggetVeilederModell>, side: Side): void => {
    if (veilederIdent) {
        krypterVeilederident(veilederIdent.ident).then(buffer => {
            const identHash = hexString(buffer);
            logEvent('portefolje.metrikker.side-visning', {
                veilederId: identHash,
                side
            });
        });
    }
};

function hexString(buffer) {
    const byteArray = new Uint8Array(buffer);

    const hexCodes = [...byteArray].map(value => {
        const hexCode = value.toString(16);
        const paddedHexCode = hexCode.padStart(2, '0');
        return paddedHexCode;
    });

    return hexCodes.join('');
}

function krypterVeilederident(veileder: string): Promise<ArrayBuffer> {
    const stringToBeEncoded = `${veileder} - 0.1.9`;
    const utf8Arr: Uint8Array = encodeString(stringToBeEncoded);

    return getCrypto().subtle.digest('SHA-256', utf8Arr);
}

function encodeString(stringToBeEncoded: string): Uint8Array {
    let data;
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
