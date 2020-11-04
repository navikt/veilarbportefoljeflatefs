import React from 'react';
import {useDispatch} from 'react-redux';
import {endreFiltervalg} from '../../ducks/filtrering';
import {fjernFerdigfilter, leggTilFerdigFilter} from './filter-utils';
import {FiltervalgModell} from '../../model-interfaces';
import {pagineringSetup} from '../../ducks/paginering';
import {MIN_ARBEIDSLISTE} from '../filter-konstanter';
import {FiltreringStatusContainer} from './filtrering-status-components/filtrering-wrapper';
import FiltreringStatusNyeBrukere from './filtrering-status-components/nye-brukere';
import FiltreringStatusUfordelteBrukere from './filtrering-status-components/ufordelte-brukere';
import {FiltreringStatusBehovsVurdering} from './filtrering-status-components/behov-og-arbeidsevnevurdering';
import {FiltreringStatusDialog} from './filtrering-status-components/dialog-gruppe';
import FiltreringStatusAvtaltMoteMedNav from './filtrering-status-components/avtalt-mote-med-nav';
import {FiltreringStatusInavtiveBrukere} from './filtrering-status-components/inaktive-brukere';
import FilterStatusMinArbeidsliste from './filtrering-status-components/arbeidsliste';
import {ListevisningType} from '../../ducks/ui/listevisning';
import {FiltreringStatusAktiviteter} from './filtrering-status-components/aktiviteter';

interface FiltreringStatusProps {
    filtervalg: FiltervalgModell;
    filtergruppe: ListevisningType;
}

export function FiltreringStatus(props: FiltreringStatusProps) {
    const ferdigfilterListe = props.filtervalg.ferdigfilterListe;
    const kategoriliste = props.filtervalg.arbeidslisteKategori;
    const dispatch = useDispatch();

    function dispatchFiltreringStatusChanged(ferdigFilterListe) {
        dispatch(pagineringSetup({side: 1}));
        dispatch(endreFiltervalg('ferdigfilterListe', ferdigFilterListe, props.filtergruppe));
    }

    function dispatchArbeidslisteKategoriChange(e: React.ChangeEvent<HTMLInputElement>) {
        dispatch(pagineringSetup({side: 1}));
        const nyeFerdigfilterListe = e.target.checked
            ? [...kategoriliste, e.target.value]
            : kategoriliste.filter(elem => elem !== e.target.value);
        dispatch(endreFiltervalg('arbeidslisteKategori', nyeFerdigfilterListe, props.filtergruppe));
    }

    function handleCheckboxChange(e: React.ChangeEvent<HTMLInputElement>) {
        const nyeFerdigfilterListe = e.target.checked
            ? leggTilFerdigFilter(ferdigfilterListe!, e.target.value)
            : fjernFerdigfilter(ferdigfilterListe!, e.target.value);
        dispatchFiltreringStatusChanged(nyeFerdigfilterListe);
    }

    function handleRadioButtonChange(e: React.ChangeEvent<HTMLInputElement>) {
        const nyeFerdigfilterListe = leggTilFerdigFilter(ferdigfilterListe!, e.target.value);
        dispatchFiltreringStatusChanged(nyeFerdigfilterListe);
        if (e.target.value !== 'MIN_ARBEIDSLISTE') {
            dispatch(endreFiltervalg('arbeidslisteKategori', [], props.filtergruppe));
        }
    }

    return (
        <FiltreringStatusContainer>
            <div className="filter-checkboks-container">
                <FiltreringStatusNyeBrukere
                    handleChange={handleCheckboxChange}
                    ferdigfilterListe={ferdigfilterListe}
                    hidden={props.filtergruppe !== ListevisningType.minOversikt}
                />
                <FiltreringStatusUfordelteBrukere
                    handleChange={handleCheckboxChange}
                    ferdigfilterListe={ferdigfilterListe}
                    hidden={props.filtergruppe === ListevisningType.minOversikt}
                />
            </div>
            <FiltreringStatusBehovsVurdering
                ferdigfilterListe={ferdigfilterListe}
                handleChange={handleRadioButtonChange}
            />
            <FiltreringStatusDialog ferdigfilterListe={ferdigfilterListe} handleChange={handleRadioButtonChange} />
            <FiltreringStatusAvtaltMoteMedNav
                ferdigfilterListe={ferdigfilterListe}
                handleChange={handleRadioButtonChange}
            />
            <FiltreringStatusAktiviteter ferdigfilterListe={ferdigfilterListe} handleChange={handleRadioButtonChange} />
            <FiltreringStatusInavtiveBrukere
                ferdigfilterListe={ferdigfilterListe}
                handleChange={handleRadioButtonChange}
            />
            <FilterStatusMinArbeidsliste
                ferdigfilterListe={kategoriliste}
                handleChange={handleRadioButtonChange}
                handleChangeCheckbox={dispatchArbeidslisteKategoriChange}
                hidden={props.filtergruppe !== ListevisningType.minOversikt}
                filtervalg={props.filtervalg}
                endreFiltervalg={dispatchFiltreringStatusChanged}
                checked={ferdigfilterListe.includes(MIN_ARBEIDSLISTE)}
            />
        </FiltreringStatusContainer>
    );
}
