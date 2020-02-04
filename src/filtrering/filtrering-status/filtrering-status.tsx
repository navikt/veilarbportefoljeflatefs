import React from 'react';
import { useDispatch } from 'react-redux';
import { endreFiltervalg } from '../../ducks/filtrering';
import { fjernFerdigfilter, leggTilFerdigFilter } from './filter-utils';
import { FiltreringStatusContainer } from './filtrering-status-components/filtrering-wrapper';
import { FiltreringStatusTrengerVurderingEllerSykmeldt } from './filtrering-status-components/trenger-vurdering-sykemeldt';
import { FiltreringStatusAktiviteter } from './filtrering-status-components/aktiviteter';
import { FiltreringStatusDialog } from './filtrering-status-components/dialog-gruppe';
import { FiltreringStatusInavtiveBrukere } from './filtrering-status-components/inaktivebrukere';
import FiltreringStatusNyeBrukere from './filtrering-status-components/nyebrukere';
import FiltreringStatusUfordelteBrukere from './filtrering-status-components/ufordelte-brukere';
import FiltreringStatusAvtaltMoteMedNav from './filtrering-status-components/avtalt-mote-med-nav';
import FilterStatusMinArbeidsliste from './filtrering-status-components/arbeidsliste';
import { FiltervalgModell } from '../../model-interfaces';
import './filtrering-status.less';
import {leggSideIUrl} from "../../utils/url-utils";
import {pagineringSetup} from "../../ducks/paginering";

interface FiltreringStatusProps {
    filtervalg: FiltervalgModell;
    filtergruppe?: string;
}

export function FiltreringStatus(props: FiltreringStatusProps) {
    const ferdigfilterListe = props.filtervalg.ferdigfilterListe!;
    const dispatch = useDispatch();

    function dispatchFiltreringStatusChanged(ferdigFilterListe) {
        leggSideIUrl(1);
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
            <FiltreringStatusTrengerVurderingEllerSykmeldt
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
