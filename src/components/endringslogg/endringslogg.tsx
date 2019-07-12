import {default as React, Ref, RefObject, useEffect, useRef, useState} from 'react';
import { ReactComponent as AlarmIcon } from './icon_v3.svg';
import EndringsloggInnhold from './endringslogg-innhold';
import { connect } from 'react-redux';
import { ENDRINGSLOGG } from '../../konstanter';
import { sjekkFeature } from '../../ducks/features';
import TransitionContainer from './transition-container';
import { logEvent } from '../../utils/frontend-logger';
import { harLestEndringslogg, sjekkHarSettEndringslogg, hentVeilederHash } from './endringslogg-utils';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import EndringsloggContainer from "./endringslogg-container";
import {useTimer} from "../../hooks/use-timer";

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
    const ref = useRef<HTMLDivElement>(null);

    const {harFeature} = props;
    const harRiktigFeatures = harFeature(ENDRINGSLOGG);
    if (!harRiktigFeatures) {
        return null;
    }

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


    const klikk = () => {
        setLocalstorageAndOpenStatus(!open);
    };

    return (
        <div className="endringslogg" >
            <EndringsloggKnapp klikk={klikk} open={open} nyeNotifikasjoner={nyeNotifikasjoner} ref={ref}/>
            <TransitionContainer visible={open}>
                <EndringsloggContainer buttonRef={ref} onClose={()=>setLocalstorageAndOpenStatus(false)}>
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
                </EndringsloggContainer>
            </TransitionContainer>
        </div>
    );
}

interface Apa {
    klikk: (e?:any ) => void;
    open: boolean;
    nyeNotifikasjoner: boolean;
}

const EndringsloggKnapp = React.forwardRef((props: Apa, ref: Ref<HTMLDivElement>) =>
    <div className={'endringslogg-knapp'} ref={ref}>
        <button className={`endringslogg-dropDown ${props.open && 'endringslogg-dropDown-active'}`}
                onClick={props.klikk}>
            <AlarmIcon/>
            {props.nyeNotifikasjoner && <div className={'endringslogg-nye-notifikasjoner-ikon'}/>}
        </button>
    </div>
);

function EndringsloggHeader() {
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
