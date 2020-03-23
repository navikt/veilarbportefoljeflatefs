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
import FiltreringStatusPermitterteUtenOppfolgingsvedtak
    from './filtrering-status-components/permitterte-uten-oppfolgingsvedtak-brukere';
import { useFeatureSelector } from '../../hooks/redux/use-feature-selector';
import { PERM_UTEN_OPPFOLGINGSVEDTAK } from '../../konstanter';

interface FiltreringStatusProps {
    filtervalg: FiltervalgModell;
    filtergruppe?: string;
}

export function FiltreringStatus(props: FiltreringStatusProps) {
    const ferdigfilterListe = props.filtervalg.ferdigfilterListe!;
    const dispatch = useDispatch();

    function dispatchFiltreringStatusChanged(ferdigFilterListe) {
        dispatch(pagineringSetup({side: 1}));
        dispatch(endreFiltervalg(
            'ferdigfilterListe', ferdigFilterListe, props.filtergruppe));
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

                {useFeatureSelector()(PERM_UTEN_OPPFOLGINGSVEDTAK) ?
                    <FiltreringStatusPermitterteUtenOppfolgingsvedtak
                        handleChange={handleCheckboxChange}
                        ferdigfilterListe={ferdigfilterListe}
                    />
                    : null}
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
                ferdigfilterListe={ferdigfilterListe}
                handleChange={handleRadioButtonChange}
                hidden={props.filtergruppe !== 'veileder'}
            />
        </FiltreringStatusContainer>
    );
}
