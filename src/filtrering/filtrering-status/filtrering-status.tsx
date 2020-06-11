import React from 'react';
import { useDispatch } from 'react-redux';
import { endreFiltervalg } from '../../ducks/filtrering';
import { fjernFerdigfilter, leggTilFerdigFilter } from './filter-utils';
import { FiltreringStatusContainer } from './filtrering-status-components/filtrering-wrapper';
import { FiltreringStatusBehovsVurdering } from './filtrering-status-components/behov-og-arbeidsevnevurdering';
import { FiltreringStatusAktiviteter } from './filtrering-status-components/aktiviteter';
import { FiltreringStatusDialog } from './filtrering-status-components/dialog-gruppe';
import { FiltreringStatusInavtiveBrukere } from './filtrering-status-components/inaktivebrukere';
import FiltreringStatusNyeBrukere from './filtrering-status-components/nyebrukere';
import FiltreringStatusUfordelteBrukere from './filtrering-status-components/ufordelte-brukere';
import FiltreringStatusAvtaltMoteMedNav from './filtrering-status-components/avtalt-mote-med-nav';
import FilterStatusMinArbeidsliste from './filtrering-status-components/arbeidsliste';
import { FiltervalgModell } from '../../model-interfaces';
import './filtrering-status.less';
import { pagineringSetup } from '../../ducks/paginering';
import FiltreringStatusIkkePermitterteEtterNiendeBrukere from './filtrering-status-components/ikke-permitterte-brukere';
import FiltreringStatusPermitterteEtterNiendeBrukere from './filtrering-status-components/permitterte-brukere';
import Hjelpetekst from 'nav-frontend-hjelpetekst';
import { MIN_ARBEIDSLISTE, } from '../filter-konstanter';
import { PopoverOrientering, PopoverProps } from 'nav-frontend-popover';

interface FiltreringStatusProps {
    filtervalg: FiltervalgModell;
    filtergruppe?: string;
}

export function FiltreringStatus(props: FiltreringStatusProps) {
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
        <FiltreringStatusContainer>
            <div className="filter-checkboks-container">
                <FiltreringStatusNyeBrukere
                    handleChange={handleCheckboxChange}
                    ferdigfilterListe={ferdigfilterListe}
                    hidden={props.filtergruppe !== 'veileder'}
                />
                <FiltreringStatusUfordelteBrukere
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
                    <FiltreringStatusIkkePermitterteEtterNiendeBrukere
                        handleChange={handleCheckboxChange}
                        ferdigfilterListe={ferdigfilterListe}
                    />
                    <FiltreringStatusPermitterteEtterNiendeBrukere
                        handleChange={handleCheckboxChange}
                        ferdigfilterListe={ferdigfilterListe}
                    />
                </div>
            </div>
            <FiltreringStatusBehovsVurdering
                ferdigfilterListe={ferdigfilterListe}
                handleChange={handleRadioButtonChange}
            />
            <FiltreringStatusDialog
                ferdigfilterListe={ferdigfilterListe}
                handleChange={handleRadioButtonChange}
            />
            <FiltreringStatusAvtaltMoteMedNav
                ferdigfilterListe={ferdigfilterListe}
                handleChange={handleRadioButtonChange}
            />
            <FiltreringStatusAktiviteter
                ferdigfilterListe={ferdigfilterListe}
                handleChange={handleRadioButtonChange}
            />
            <FiltreringStatusInavtiveBrukere
                ferdigfilterListe={ferdigfilterListe}
                handleChange={handleRadioButtonChange}
            />
            <FilterStatusMinArbeidsliste
                ferdigfilterListe={kategoriliste}
                handleChange={handleRadioButtonChange}
                handleChangeCheckbox={dispatchArbeidslisteKategoriChange}
                hidden={props.filtergruppe !== 'veileder'}
                filtervalg={props.filtervalg}
                endreFiltervalg={dispatchFiltreringStatusChanged}
                checked={ferdigfilterListe.includes(MIN_ARBEIDSLISTE)}
            />
        </FiltreringStatusContainer>
    );
}
