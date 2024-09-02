import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useLocation, useParams} from 'react-router';
import {Button} from '@navikt/ds-react';
import {BookmarkIcon} from '@navikt/aksel-icons';
import {VIS_ARBEIDSLISTE_MODAL, visArbeidslisteModal} from '../../ducks/modal';
import {AppState} from '../../reducer';
import {useIdentSelector} from '../../hooks/redux/use-innlogget-ident';
import ArbeidslisteModal from '../modal/arbeidsliste/arbeidsliste-modal';
import {IdentParam} from '../../model-interfaces';
import {MIN_ARBEIDSLISTE} from '../../filtrering/filter-konstanter';
import {oppdaterBrukerfeil} from '../../ducks/brukerfeilmelding';
import './toolbar.css';

function ArbeidslisteKnapp() {
    const portefolje = useSelector((state: AppState) => state.portefolje.data);
    const modalSkalVises = useSelector((state: AppState) => state.modal.modal) === VIS_ARBEIDSLISTE_MODAL;
    const innloggetVeileder = useIdentSelector();
    const dispatch = useDispatch();

    const {ident} = useParams<IdentParam>();
    const location = useLocation();
    const pathname = location.pathname;

    const valgteBrukere = portefolje.brukere.filter(bruker => bruker.markert === true);

    const rettIdentTilAaSeKnapp = !ident ? true : ident === innloggetVeileder?.ident;
    const skalVises = innloggetVeileder && pathname === '/portefolje' ? rettIdentTilAaSeKnapp : false;

    const arbeidslisteValgt = useSelector((state: AppState) =>
        state.filtreringMinoversikt.ferdigfilterListe.includes(MIN_ARBEIDSLISTE)
    );
    const inneholderBrukerMedArbeidsliste = valgteBrukere.some(bruker => bruker.arbeidsliste.arbeidslisteAktiv);
    const inneholderBrukerMedOgUtenArbeidsliste =
        (inneholderBrukerMedArbeidsliste && valgteBrukere.some(bruker => !bruker.arbeidsliste.arbeidslisteAktiv)) ||
        (!arbeidslisteValgt && valgteBrukere.some(bruker => bruker.arbeidsliste.arbeidslisteAktiv)) ||
        arbeidslisteValgt;

    if (!skalVises) {
        return null;
    }

    const klikk = e => {
        e.preventDefault();
        if (valgteBrukere.length === 0) {
            dispatch(oppdaterBrukerfeil());
        } else {
            dispatch(visArbeidslisteModal());
        }
    };

    return (
        <>
            <Button
                size="small"
                variant="tertiary"
                className="toolbar_btn"
                icon={<BookmarkIcon aria-hidden={true} fontSize="1.5rem" />}
                iconPosition="left"
                onClick={klikk}
                data-testid={
                    inneholderBrukerMedOgUtenArbeidsliste ? 'fjern-fra-arbeidsliste_knapp' : 'legg-i-arbeidsliste_knapp'
                }
            >
                {inneholderBrukerMedOgUtenArbeidsliste ? 'Fjern fra arbeidsliste' : 'Legg i arbeidsliste'}
            </Button>
            {modalSkalVises && <ArbeidslisteModal isOpen={modalSkalVises} valgteBrukere={valgteBrukere} />}
        </>
    );
}

export default ArbeidslisteKnapp;
