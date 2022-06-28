import * as React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {VIS_ARBEIDSLISTE_MODAL, visArbeidslisteModal} from '../../ducks/modal';
import './toolbar.less';
import {useLocation, useParams} from 'react-router';
import {AppState} from '../../reducer';
import {useIdentSelector} from '../../hooks/redux/use-innlogget-ident';
import ArbeidslisteModal from '../modal/arbeidsliste/arbeidsliste-modal';
import {BodyShort, Button} from '@navikt/ds-react';
import {Bookmark} from '@navikt/ds-icons';
import {IdentParam} from '../../model-interfaces';

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

    const inneholderBrukerMedArbeidsliste = valgteBrukere.some(bruker => bruker.arbeidsliste.arbeidslisteAktiv);
    const inneholderBrukerMedOgUtenArbeidsliste =
        inneholderBrukerMedArbeidsliste && valgteBrukere.some(bruker => !bruker.arbeidsliste.arbeidslisteAktiv);

    if (skalSkjules) {
        return null;
    }

    return (
        <div className="toolbar_btnwrapper">
            <Button
                variant="tertiary"
                className="toolbar_btn"
                disabled={
                    valgteBrukere.length < 1 ||
                    props.visesAnnenVeiledersPortefolje ||
                    inneholderBrukerMedOgUtenArbeidsliste
                }
                onClick={() => dispatch(visArbeidslisteModal())}
                data-testid={
                    inneholderBrukerMedArbeidsliste ? 'fjern-fra-arbeidsliste_knapp' : 'legg-i-arbeidsliste_knapp'
                }
            >
                <Bookmark className="toolbar-knapp__ikon" id="arbeidsliste-svg" />
                <BodyShort size="small" className="toolbar-knapp__tekst">
                    {inneholderBrukerMedArbeidsliste ? 'Fjern fra arbeidsliste' : 'Legg i arbeidsliste'}
                </BodyShort>
            </Button>
            {modalSkalVises && <ArbeidslisteModal isOpen={modalSkalVises} valgteBrukere={valgteBrukere} />}
        </div>
    );
}
export default ArbeidslisteKnapp;
