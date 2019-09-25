import { logEvent } from '../frontend-logger';
import { Side } from './skjerm-metrikker';
import { hexString, krypterVeilederident } from '../../components/endringslogg/utils/endringslogg-utils';

export const loggSideVisning = (veilederIdent: string | undefined, side: Side): void => {
    if (veilederIdent) {
        krypterVeilederident(veilederIdent)
            .then(buffer => {
                const identHash = hexString(buffer);
                logEvent('portefolje.metrikker.side-visning', {veilederId: identHash, side});
            });
    }
};
