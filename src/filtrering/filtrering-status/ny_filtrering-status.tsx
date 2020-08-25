import React from 'react';
import {useDispatch} from 'react-redux';
import {endreFiltervalg} from '../../ducks/filtrering';
import {fjernFerdigfilter, leggTilFerdigFilter} from './filter-utils';
import {FiltervalgModell} from '../../model-interfaces';
import './filtrering-status.less';
import {pagineringSetup} from '../../ducks/paginering';
import Hjelpetekst from 'nav-frontend-hjelpetekst';
import {MIN_ARBEIDSLISTE,} from '../filter-konstanter';
import {PopoverOrientering} from 'nav-frontend-popover';
import {NyFiltreringStatusContainer} from "./filtrering-status-components/ny_filtrering-wrapper";
import {NyFiltreringStatusAktiviteter} from "./filtrering-status-components/ny_aktiviteter";
import NyFiltreringStatusNyeBrukere from "./filtrering-status-components/ny_nye-brukere";
import NyFiltreringStatusUfordelteBrukere from "./filtrering-status-components/ny_ufordelte-brukere";
import NyFiltreringStatusPermitterteEtterNiendeBrukere from "./filtrering-status-components/ny_permitterte-brukere";
import {NyFiltreringStatusBehovsVurdering} from "./filtrering-status-components/ny_behov-og-arbeidsevnevurdering";
import {NyFiltreringStatusDialog} from "./filtrering-status-components/ny_dialog-gruppe";
import NyFiltreringStatusAvtaltMoteMedNav from "./filtrering-status-components/ny_avtalt-mote-med-nav";
import {NyFiltreringStatusInavtiveBrukere} from "./filtrering-status-components/ny_inaktive-brukere";
import NyFilterStatusMinArbeidsliste from "./filtrering-status-components/ny_arbeidsliste";
import NyFiltreringStatusIkkePermitterteEtterNiendeBrukere
    from "./filtrering-status-components/ny_ikke-permitterte-brukere";

interface FiltreringStatusProps {
    filtervalg: FiltervalgModell;
    filtergruppe: string;
}

export function NyFiltreringStatus(props: FiltreringStatusProps) {
    const ferdigfilterListe = props.filtervalg.ferdigfilterListe;
    const kategoriliste = props.filtervalg.arbeidslisteKategori;
    const dispatch = useDispatch();

    function dispatchFiltreringStatusChanged(ferdigFilterListe) {
        dispatch(pagineringSetup({side: 1}));
        dispatch(endreFiltervalg(
            'ferdigfilterListe', ferdigFilterListe, props.filtergruppe));
    }

    function dispatchArbeidslisteKategoriChange(e: React.ChangeEvent<HTMLInputElement>) {
        dispatch(pagineringSetup({side: 1}));
        const nyeFerdigfilterListe = e.target.checked
            ? [...kategoriliste, e.target.value]
            : kategoriliste.filter((elem) => elem !== e.target.value);
        dispatch(endreFiltervalg(
            'arbeidslisteKategori', nyeFerdigfilterListe, props.filtergruppe));
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
            dispatch(endreFiltervalg(
                'arbeidslisteKategori', [], props.filtergruppe));
        }
    }

    return (
        <NyFiltreringStatusContainer>
            <div className="filter-checkboks-container">
                <NyFiltreringStatusNyeBrukere
                    handleChange={handleCheckboxChange}
                    ferdigfilterListe={ferdigfilterListe}
                    hidden={props.filtergruppe !== 'veileder'}
                />
                <NyFiltreringStatusUfordelteBrukere
                    handleChange={handleCheckboxChange}
                    ferdigfilterListe={ferdigfilterListe}
                    hidden={props.filtergruppe === 'veileder'}
                />
                <div className="permittering_checkboksgruppe">
                    <div className="hjelpetekst__wrapper">
                        <Hjelpetekst id="hjelpetekst" type={PopoverOrientering.Over}>
                            <p><b>Alle utenom permitterte etter 09.03.2020:</b> Alle brukere, uavhengig av situasjon
                                ved registrering og tidspunkt for registrering, men ekskludert de som har registrert seg
                                som permittert etter 9. mars 2020.
                            </p>
                            <p><b>Permitterte etter 09.03.2020:</b> Brukere som har registrert seg etter 9. mars og som
                                har svart at de er permittert.</p>
                            <p>Merk at situasjonen kan ha endret seg for permitterte brukere.</p>
                        </Hjelpetekst>
                    </div>
                    <NyFiltreringStatusIkkePermitterteEtterNiendeBrukere
                        handleChange={handleCheckboxChange}
                        ferdigfilterListe={ferdigfilterListe}
                    />
                    <NyFiltreringStatusPermitterteEtterNiendeBrukere
                        handleChange={handleCheckboxChange}
                        ferdigfilterListe={ferdigfilterListe}
                    />
                </div>
            </div>
            <NyFiltreringStatusBehovsVurdering
                ferdigfilterListe={ferdigfilterListe}
                handleChange={handleRadioButtonChange}
            />
            <NyFiltreringStatusDialog
                ferdigfilterListe={ferdigfilterListe}
                handleChange={handleRadioButtonChange}
            />
            <NyFiltreringStatusAvtaltMoteMedNav
                ferdigfilterListe={ferdigfilterListe}
                handleChange={handleRadioButtonChange}
            />
            <NyFiltreringStatusAktiviteter
                ferdigfilterListe={ferdigfilterListe}
                handleChange={handleRadioButtonChange}
            />
            <NyFiltreringStatusInavtiveBrukere
                ferdigfilterListe={ferdigfilterListe}
                handleChange={handleRadioButtonChange}
            />
            <NyFilterStatusMinArbeidsliste
                ferdigfilterListe={kategoriliste}
                handleChange={handleRadioButtonChange}
                handleChangeCheckbox={dispatchArbeidslisteKategoriChange}
                hidden={props.filtergruppe !== 'veileder'}
                filtervalg={props.filtervalg}
                endreFiltervalg={dispatchFiltreringStatusChanged}
                checked={ferdigfilterListe.includes(MIN_ARBEIDSLISTE)}
            />
        </NyFiltreringStatusContainer>
    );
}
