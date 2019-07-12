import { default as React, useEffect, useRef, useState } from 'react';
import { ReactComponent as AlarmIcon } from './icon_v3.svg';
import EndringsloggInnhold from './endringslogg_innhold';
import { connect } from 'react-redux';
import { ENDRINGSLOGG } from '../../konstanter';
import { sjekkFeature } from '../../ducks/features';
import TransitionContainer from './transitionContainer';
import { logEvent } from '../../utils/frontend-logger';
import { harLestEndringslogg, sjekkHarSettEndringslogg, hentVeilederHash, useTimer } from './endringslogg_utils';

// Feature kan brukes for å måle før og etter tilbakemeldingskjemaet
const sendMetrikker = (metrikker: EndringsloggMetrikker) => {
    logEvent('portefolje.endringslogg', {
        feature: 'pre_tilbakemelding_2',
        tidBrukt: metrikker.tidBrukt,
        nyeNotifikasjoner: metrikker.nyeNotifikasjoner
    }, {hash: metrikker.hash});
};

interface EndringsloggMetrikker {
    tidBrukt: number;
    nyeNotifikasjoner: boolean;
    hash: string;
}

interface StateProps {
    harFeature: (feature: string) => boolean;
}

export function Endringslogg(props: StateProps) {
    const versjonsnummer = '0.1.9';
    const veilederHash = hentVeilederHash(versjonsnummer);
    const {start, stopp} = useTimer();
    const [open, setOpen] = useState(false);
    const loggNode = useRef<HTMLDivElement>(null);   // Referranse til omsluttende div rundt loggen
    const focusRef = useRef<HTMLDivElement>(null);
    const nyeNotifikasjoner = !sjekkHarSettEndringslogg(versjonsnummer);

    const setLocalstorageAndOpenStatus = (setOpenTo: boolean) => {
        if (setOpenTo) {
            start();
        } else {
            const tidBrukt = stopp();
            veilederHash.then((res) => {
                sendMetrikker({tidBrukt, nyeNotifikasjoner, hash: res});
            });
        }

        if (open && !setOpenTo) {
            harLestEndringslogg(versjonsnummer);
        }
        setOpen(setOpenTo);
    };

    const handleClickOutside = (e) => {
        if (loggNode.current && loggNode.current.contains(e.target)) {
            // Klikket er inne i komponenten
            return;
        }
        // Klikket er utenfor, oppdater staten
        setLocalstorageAndOpenStatus(false);
    };

    const escHandler = (event) => {
        if (event.keyCode === 27 && open) {
            setLocalstorageAndOpenStatus(false);
        }
    };

    const klikk = (event) => {
        event.stopPropagation();
        setLocalstorageAndOpenStatus(!open);
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('keydown', escHandler, false);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('keydown', escHandler, false);
        };
    }, [open]);

    useEffect(() => {
        if (focusRef.current) {
            focusRef.current.focus();
        }
    });

    const {harFeature} = props;
    const harRiktigFeatures = harFeature(ENDRINGSLOGG);
    if (!harRiktigFeatures) {
        return null;
    }

    return (
        <div ref={loggNode} className="endringslogg" >
            <EndringsloggKnapp klikk={klikk} open={open} nyeNotifikasjoner={nyeNotifikasjoner}/>
            <TransitionContainer visible={open} focusRef={focusRef}>
                <EndringsloggHeader/>
                <EndringsloggInnhold dato={'18. JUN. 2019'}
                                     innholdsOverskrift="Laste ned og skrive ut CV"
                                     innholdsTekst="Du kan nå laste ned brukerens CV i Detaljer og få bedre utskrift."
                                     nyeNotifikasjoner={nyeNotifikasjoner}
                />
                <EndringsloggInnhold dato={'06. JUN. 2019'}
                                     innholdsOverskrift="Visning av profilering i Detaljer"
                                     innholdsTekst="Nå finner du profileringsresultatet for brukeren under Registrering i Detaljer."
                                     nyeNotifikasjoner={nyeNotifikasjoner}
                />
                <EndringsloggInnhold dato={'29. MAR. 2019'}
                                     innholdsOverskrift="Manuell registrering"
                                     innholdsTekst="Du kan nå registrere brukere manuelt i Veilederverktøy (tannhjulet).  Arena-oppgaven «Motta person» skal ikke lenger benyttes. "
                                     nyeNotifikasjoner={nyeNotifikasjoner}
                                     linkTekst="Nyhetssak på Navet"
                                     url="https://navno.sharepoint.com/sites/intranett-prosjekter-og-utvikling/SitePages/Arena-oppgaven-%C2%ABMotta-person%C2%BB-erstattes-av-ny-l%C3%B8sning-for-manuell-registrering.aspx"
                />
            </TransitionContainer>
        </div>
    );
}

function EndringsloggKnapp(props) {
    return (
        <div className={'endringslogg-knapp'} onClick={props.klikk}>
            {props.nyeNotifikasjoner && <div className={'endringslogg-nye-notifikasjoner-ikon'}/>}
            <button className={`endringslogg-dropDown ${props.open && 'endringslogg-dropDown-active'}`}
                    onClick={props.klikk}>
                <AlarmIcon/>
            </button>
        </div>
    );
}

function EndringsloggHeader(props) {
    return (
        <div className={'collapse-header'}>
            Nytt i Arbeidsrettet oppfølging
        </div>
    );
}

const mapStateToProps = (state) => ({
    harFeature: (feature: string) => sjekkFeature(state, feature)
});

export default connect(mapStateToProps)(Endringslogg);
