import React from 'react';
import { AppState } from '../reducer';
import { useDispatch, useSelector } from 'react-redux';
import { fjernFerdigfilter, leggTilFerdigFilter } from '../filtrering/filter-utils';
import { FiltreringStatusInavtiveBrukere } from '../filtrering/filtrering-status/inaktiv-gruppe';
import { FiltreringStatusTrengerVurderingEllerSykmeldt } from '../filtrering/filtrering-status/nb-gruppe';
import { FiltreringStatusAktiviteter } from '../filtrering/filtrering-status/aktivitet-gruppe';
import { FiltreringStatusDialog } from '../filtrering/filtrering-status/dialog-gruppe';
import { endreFiltervalg } from '../ducks/filtrering';
import { VeilederModell } from '../model-interfaces';
import { FiltreringStatusContainer } from '../filtrering/filtrering-status/filtrering-wrapper';
import { FiltreringStatusNyeBrukere } from '../filtrering/filtrering-status/nyebrukere';
import { FiltreringStatusAvtaltMoteMedNav } from '../filtrering/filtrering-status/avtalt-mote-med-nav';
import { FilterStatusMinArbeidsliste } from '../filtrering/filtrering-status/arbeidsliste';

export const selectStatusTallData = (state: AppState) => state.statustall.data;
const selectFerdigFilterListe = (state: AppState) => state.filtreringMinoversikt.ferdigfilterListe;

const defaultVeileder: VeilederModell = {
    ident: '',
    navn: '',
    fornavn: '',
    etternavn: ''
};

export function FiltreringStatusMinOversikt() {
    const ferdigfilterListe = useSelector<AppState, string[]>((state) =>
        selectFerdigFilterListe(state));

    const dispatch = useDispatch();

    function dispatchFiltreringStatusChanged(ferdigFilterListe) {
        dispatch(endreFiltervalg(
            'ferdigfilterListe', ferdigFilterListe, 'veileder', defaultVeileder));
    }

    function handleCheckboxChange(e) {
        const nyeFerdigfilterListe = e.target.checked
            ? leggTilFerdigFilter(ferdigfilterListe, e.target.value)
            : fjernFerdigfilter(ferdigfilterListe, e.target.value);
        dispatchFiltreringStatusChanged(nyeFerdigfilterListe);

    }

    function handleRadioButtonChange(e) {
        const nyeFerdigfilterListe = e.target.checked
            ? leggTilFerdigFilter(ferdigfilterListe, e.target.value)
            : fjernFerdigfilter(ferdigfilterListe, e.target.value);
        dispatchFiltreringStatusChanged(nyeFerdigfilterListe);
    }

    return (
        <FiltreringStatusContainer>
            <FiltreringStatusNyeBrukere
                handleChange={handleCheckboxChange}
                ferdigfilterListe={ferdigfilterListe}
            />
            <FiltreringStatusTrengerVurderingEllerSykmeldt
                ferdigfilterListe={ferdigfilterListe}
                handleChange={handleRadioButtonChange}
            />
            <FiltreringStatusAktiviteter
                ferdigfilterListe={ferdigfilterListe}
                handleChange={handleRadioButtonChange}
            />
            <FiltreringStatusAvtaltMoteMedNav
                ferdigfilterListe={ferdigfilterListe}
                handleChange={handleRadioButtonChange}
            />
            <FiltreringStatusDialog
                ferdigfilterListe={ferdigfilterListe}
                handleChange={handleRadioButtonChange}
            />
            <FiltreringStatusInavtiveBrukere
                ferdigfilterListe={ferdigfilterListe}
                handleChange={handleRadioButtonChange}
            />
            <FilterStatusMinArbeidsliste
                ferdigfilterListe={ferdigfilterListe}
                handleChange={handleRadioButtonChange}
            />
        </FiltreringStatusContainer>
    );
}
