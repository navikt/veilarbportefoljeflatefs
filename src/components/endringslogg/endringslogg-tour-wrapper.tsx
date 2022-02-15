import Endringslogg from './endringslogg';
import {default as React} from 'react';
import {hentEndringslogg} from './utils/endringslogg-custom';
import {useIdentSelector} from '../../hooks/redux/use-innlogget-ident';
import {useTimer} from '../../hooks/use-timer';
import {hexString, krypterVeilederident} from './utils/endringslogg-utils';
import {logEvent} from '../../utils/frontend-logger';
import './endringslogg.less';
import './collapse-container-transition.less';

const innhold = hentEndringslogg();

function EndringsloggTourWrapper() {
    const veilederIdent = useIdentSelector()!.ident;
    const {startTimer, stoppTimer} = useTimer();

    const onClose = () => {
        const tidBrukt = stoppTimer();
        if (veilederIdent) {
            krypterVeilederident(veilederIdent)
                .then(res =>
                    logEvent(
                        'portefolje.endringslogg',
                        {
                            feature: 'mine-filter', //Husk å endre denne ved bytte
                            tidBrukt,
                            nyeNotifikasjoner: false
                        },
                        {hash: hexString(res)}
                    )
                )
                .catch(e => console.log(e)); // tslint:disable-line
        }
    };

    return <Endringslogg innhold={innhold} onOpen={startTimer} onClose={onClose} />;
}

export default EndringsloggTourWrapper;
