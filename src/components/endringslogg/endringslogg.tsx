import { default as React, useEffect, useRef, useState, RefObject } from 'react';
import { ReactComponent as AlarmIcon } from './icon-v3.svg';
import EndringsloggInnhold from './endringslogg-innhold';
import { ENDRINGSLOGG, VIS_MOTER_MED_NAV } from '../../konstanter';
import { sjekkFeature } from '../../ducks/features';
import TransitionContainer from './transition-container';
import { logEvent } from '../../utils/frontend-logger';
import {
    registrerHarLestEndringslogg,
    krypterVeilederident,
    hexString
} from './endringslogg-utils';
import { useTimer } from '../../hooks/use-timer';
import { useEventListener } from '../../hooks/use-event-listener';
import { hentAktivBruker } from '../enhet-context/context-api';
import Undertittel from 'nav-frontend-typografi/lib/undertittel';
import { connect } from 'react-redux';
import { Endring } from './endringslogg-custom';

// Feature kan brukes for å måle før og etter tilbakemeldingskjemaet
const sendMetrikker = (metrikker: EndringsloggMetrikker) => {
    logEvent('portefolje.endringslogg', {
        feature: 'pre_tilbakemelding_3',
        tidBrukt: metrikker.tidBrukt,
        nyeNotifikasjoner: metrikker.nyeNotifikasjoner,
    }, { hash: metrikker.hash });
};

interface EndringsloggMetrikker {
    tidBrukt: number;
    nyeNotifikasjoner: boolean;
    hash: string;
}

interface StateProps {
    harFeature: (feature: string) => boolean;
}

interface EndringsProps {
    innhold: Endring[];
}

export function Endringslogg(props: StateProps & EndringsProps) {
    const { harFeature } = props;
    const feature = harFeature(VIS_MOTER_MED_NAV);
    const { start, stopp } = useTimer();

    const [endringsloggApen, setEndringsloggApen] = useState(false);
    const [veilederIdent, setVeilderIdent] = useState('');
    const overordnetNotifikasjon = props.innhold.some((e) => !e.sett);

    const loggNode = useRef<HTMLDivElement>(null);   // Referranse til omsluttende div rundt loggen
    const focusRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        hentAktivVeileder();
    }, []);

    const hentAktivVeileder = async () => {
        const veilederId = await hentAktivBruker();
        setVeilderIdent(veilederId);
    };

    const setLocalstorageAndOpenStatus = (setOpenTo: boolean) => {
        if (setOpenTo) {
            start();
        } else {
            const tidBrukt = stopp();
            krypterVeilederident(veilederIdent)
                .then((res) => sendMetrikker({ tidBrukt, nyeNotifikasjoner: overordnetNotifikasjon, hash: hexString(res) }))
                .catch((e) => console.log(e)); // tslint:disable-line
            props.innhold.forEach((elem) => registrerHarLestEndringslogg(elem.id));
        }
        setEndringsloggApen(setOpenTo);
    };

    const handleClickOutside = (e) => {
        if (loggNode.current && loggNode.current.contains(e.target)) {
            // Klikket er inne i komponenten
            return;
        }
        // Klikket er utenfor, oppdater staten
        if (endringsloggApen) {
            setLocalstorageAndOpenStatus(false);
        }
    };

    const escHandler = (event) => {
        if (event.keyCode === 27 && endringsloggApen) {
            setLocalstorageAndOpenStatus(false);
            if (buttonRef.current) {
                buttonRef.current.focus();
            }
        }
    };

    const klikk = (event) => {
        event.stopPropagation();
        setLocalstorageAndOpenStatus(!endringsloggApen);
        if (!endringsloggApen) {
            if (buttonRef.current) {
                buttonRef.current.focus();
            }
        }
    };

    useEventListener('mousedown', handleClickOutside, [endringsloggApen]);
    useEventListener('keydown', escHandler, [endringsloggApen]);
    const harRiktigFeatures = harFeature(ENDRINGSLOGG);
    if (!harRiktigFeatures) {
        return null;
    }

    return (
        <div ref={loggNode} className="endringslogg">
            <EndringsloggKnapp klikk={klikk} open={endringsloggApen} nyeNotifikasjoner={overordnetNotifikasjon}
                buttonRef={buttonRef} />
            <TransitionContainer visible={endringsloggApen} focusRef={focusRef}>
                <EndringsloggHeader />
                <EndringsloggInnhold innhold={props.innhold} />
            </TransitionContainer>
        </div>
    );
}

interface EndringsloggKnappProps {
    buttonRef: RefObject<HTMLButtonElement>;
    open: boolean;
    nyeNotifikasjoner: boolean;
    klikk: (e?: any) => void;
}

function EndringsloggKnapp(props: EndringsloggKnappProps) {
    return (
        <button ref={props.buttonRef}
            className={`endringslogg-knapp endringslogg-dropDown ${props.open && 'endringslogg-dropDown-active'}`}
            onClick={props.klikk}>
            <AlarmIcon />
            {props.nyeNotifikasjoner && <div className={'endringslogg-nye-notifikasjoner-ikon'} />}
        </button>
    );
}

function EndringsloggHeader() {
    return (
        <Undertittel className="collapse-header" tag="h2">
            Nytt i Arbeidsrettet oppfølging
        </Undertittel>
    );
}

const mapStateToProps = (state) => ({
    harFeature: (feature: string) => sjekkFeature(state, feature)
});

export default connect(mapStateToProps)(Endringslogg);
