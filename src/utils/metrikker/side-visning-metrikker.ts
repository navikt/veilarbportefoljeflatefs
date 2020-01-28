import { logEvent } from '../frontend-logger';
import { Side } from './skjerm-metrikker';
import { hexString, krypterVeilederident } from '../../components/endringslogg/utils/endringslogg-utils';
import {OrNothing} from "../types/types";
import {VeilederModell} from "../../model-interfaces";

export const loggSideVisning = (veilederIdent: OrNothing<VeilederModell>, side: Side): void => {
    if (veilederIdent) {
        krypterVeilederident(veilederIdent.ident)
            .then(buffer => {
                const identHash = hexString(buffer);
                logEvent('portefolje.metrikker.side-visning', {veilederId: identHash, side});
            });
    }
};
