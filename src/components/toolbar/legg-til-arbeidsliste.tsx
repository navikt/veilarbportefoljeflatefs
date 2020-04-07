import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ArbeidslisteModal from '../modal/arbeidsliste/arbeidsliste-modal';
import { VIS_ARBEIDSLISTE_MODAL, visArbeidslisteModal } from '../../ducks/modal';
import './toolbar.less';
import { useLocation, useParams } from 'react-router';
import { BrukerModell } from '../../model-interfaces';
import { AppState } from '../../reducer';
import { useIdentSelector } from '../../hooks/redux/use-inlogget-ident';
import { ReactComponent as ArbeidslisteIkonLinje } from './arbeidslisteikon-linje.svg';
import { Normaltekst } from 'nav-frontend-typografi';

interface LeggTilArbeidslisteProps {
    visesAnnenVeiledersPortefolje: boolean;
}

function LeggTilArbeidsliste(props: LeggTilArbeidslisteProps) {
    const portefolje = useSelector((state: AppState) => state.portefolje.data);
    const modalSkalVises = useSelector((state: AppState) => state.modal.modal) === VIS_ARBEIDSLISTE_MODAL;
    const inloggetVeielder = useIdentSelector();
    const dispatch = useDispatch();

    const {ident} = useParams();
    const location = useLocation();
    const pathname = location.pathname;

    const valgteBrukere = portefolje.brukere.filter((bruker) => bruker.markert === true);

    const skalSkjules = inloggetVeielder && pathname === '/portefolje'
        ? ident
            ? ident !== inloggetVeielder.ident
            : false
        : true;

    if (skalSkjules) {
        return null;
    }

    return (
        <div className="toolbar_btnwrapper">
            <ArbeidsListeKnapp
                valgteBrukere={valgteBrukere}
                onClickHandler={() => dispatch(visArbeidslisteModal())}
                visesAnnenVeiledersPortefolje={props.visesAnnenVeiledersPortefolje}
            />
            {modalSkalVises && <ArbeidslisteModal isOpen={modalSkalVises} valgteBrukere={valgteBrukere}/>}
        </div>
    );
}

function ArbeidsListeKnapp(props: { valgteBrukere: BrukerModell[], onClickHandler: () => void, visesAnnenVeiledersPortefolje: boolean }) {
    const inneholderBrukerMedArbeidsliste = props.valgteBrukere.some((bruker) => bruker.arbeidsliste.arbeidslisteAktiv);
    const inneholderBrukerMedOgUtenArbeidsliste = inneholderBrukerMedArbeidsliste && props.valgteBrukere.some((bruker) => !bruker.arbeidsliste.arbeidslisteAktiv);

    const arbeidslisteButton = (tekst) => (
        <button
            type="button"
            className='toolbar_btn toolbar_btn__arbeidsliste'
            disabled={props.valgteBrukere.length < 1 || props.visesAnnenVeiledersPortefolje}
            className="toolbar_btn"
            disabled={props.valgteBrukere.length < 1 || props.visesAnnenVeiledersPortefolje || inneholderBrukerMedOgUtenArbeidsliste}
            onClick={props.onClickHandler}
        >
            <ArbeidslisteIkonLinje className="toolbar__arbeidsliste-knapp__ikon"/>
            <Normaltekst className="toolbar__arbeidsliste-knapp__tekst">{tekst}</Normaltekst>
        </button>
    );

    if (inneholderBrukerMedArbeidsliste) {
        return arbeidslisteButton('Fjern fra arbeidsliste');
    }
    return arbeidslisteButton('Legg i arbeidsliste');
}

export default LeggTilArbeidsliste;
