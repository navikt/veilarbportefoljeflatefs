import * as React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {VIS_ARBEIDSLISTE_MODAL, visArbeidslisteModal} from '../../ducks/modal';
import './toolbar.css';
import {useLocation, useParams} from 'react-router';
import {AppState} from '../../reducer';
import {useIdentSelector} from '../../hooks/redux/use-innlogget-ident';
import ArbeidslisteModal from '../modal/arbeidsliste/arbeidsliste-modal';
import {BodyShort, Button} from '@navikt/ds-react';
import {Bookmark} from '@navikt/ds-icons';
import {IdentParam} from '../../model-interfaces';
import {MIN_ARBEIDSLISTE} from '../../filtrering/filter-konstanter';
import {oppdaterBrukerfeil} from '../../ducks/brukerfeilmelding';

interface LeggTilArbeidslisteProps {
    visesAnnenVeiledersPortefolje: boolean;
}

function ArbeidslisteKnapp(props: LeggTilArbeidslisteProps) {
    const portefolje = useSelector((state: AppState) => state.portefolje.data);
    const modalSkalVises = useSelector((state: AppState) => state.modal.modal) === VIS_ARBEIDSLISTE_MODAL;
    const innloggetVeileder = useIdentSelector();
    const dispatch = useDispatch();

    const {ident} = useParams<IdentParam>();
    const location = useLocation();
    const pathname = location.pathname;

    const valgteBrukere = portefolje.brukere.filter(bruker => bruker.markert === true);

    const skalSkjules =
        innloggetVeileder && pathname === '/portefolje' ? (ident ? ident !== innloggetVeileder.ident : false) : true;
    const arbeidslisteValgt = useSelector((state: AppState) =>
        state.filtreringMinoversikt.ferdigfilterListe.includes(MIN_ARBEIDSLISTE)
    );
    const inneholderBrukerMedArbeidsliste = valgteBrukere.some(bruker => bruker.arbeidsliste.arbeidslisteAktiv);
    const inneholderBrukerMedOgUtenArbeidsliste =
        (inneholderBrukerMedArbeidsliste && valgteBrukere.some(bruker => !bruker.arbeidsliste.arbeidslisteAktiv)) ||
        (!arbeidslisteValgt && valgteBrukere.some(bruker => bruker.arbeidsliste.arbeidslisteAktiv)) ||
        arbeidslisteValgt;

    if (skalSkjules) {
        return null;
    }

    const klikk = () => {
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
                icon={<Bookmark className="toolbar-knapp__ikon" id="arbeidsliste-svg" />}
                iconPosition="left"
                onClick={() => klikk()}
                data-testid={
                    inneholderBrukerMedOgUtenArbeidsliste ? 'fjern-fra-arbeidsliste_knapp' : 'legg-i-arbeidsliste_knapp'
                }
            >
                <BodyShort size="small" className="toolbar-knapp__tekst">
                    {inneholderBrukerMedOgUtenArbeidsliste ? 'Fjern fra arbeidsliste' : 'Legg i arbeidsliste'}
                </BodyShort>
            </Button>
            {modalSkalVises && <ArbeidslisteModal isOpen={modalSkalVises} valgteBrukere={valgteBrukere} />}
        </>
    );
}

export default ArbeidslisteKnapp;
