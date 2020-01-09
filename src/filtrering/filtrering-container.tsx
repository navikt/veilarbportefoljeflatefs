import * as React from 'react';
import { useDispatch } from 'react-redux';
import { endreFiltervalg } from '../ducks/filtrering';
import { FiltervalgModell, VeilederModell } from '../model-interfaces';
import FiltreringFilter from './filtrering-filter';
import FiltreringNavnellerfnr from './filtrering-navnellerfnr';
import MetrikkEkspanderbartpanel from '../components/toolbar/metrikk-ekspanderbartpanel';
import { FiltreringStatus } from './filtrering-status/filtrering-status';
import { useEffect } from 'react';
import { hentLagretFilterForEnhet } from '../ducks/lagret-filter';
import FilteringVeilederGrupper from './filtrering-veileder-grupper/filrering-veileder-grupper';
import { useFeatureSelector } from '../hooks/redux/use-feature-selector';
import { VIS_VEILEDER_GRUPPER } from '../konstanter';
import { useEnhetSelector } from '../hooks/redux/use-enhet-selector';
import { OrNothing } from '../utils/types/types';
import { Tiltak } from '../ducks/enhettiltak';

export const defaultVeileder: VeilederModell = {
    ident: '',
    navn: '',
    fornavn: '',
    etternavn: ''
};

interface FiltreringContainerProps {
    enhettiltak: OrNothing<Tiltak>;
    filtervalg: FiltervalgModell;
    filtergruppe?: string;
    veileder?: VeilederModell;
}

function FiltreringContainer({filtergruppe, filtervalg, veileder = defaultVeileder, enhettiltak}: FiltreringContainerProps) {

    const valgtEnhet = useEnhetSelector();
    const harVeilederGruppeFeature = useFeatureSelector()(VIS_VEILEDER_GRUPPER);
    const dispatch = useDispatch();

    useEffect(() => {
        if (harVeilederGruppeFeature && valgtEnhet) {
            dispatch(hentLagretFilterForEnhet(valgtEnhet));
        }
    }, [dispatch, valgtEnhet, harVeilederGruppeFeature]);

    const doEndreFiltervalg = (filterId: string, filterVerdi: string) =>
        dispatch(endreFiltervalg(filterId, filterVerdi, filtergruppe, veileder));

    return (
        <div className="blokk-m">
            <FiltreringNavnellerfnr
                filtervalg={filtervalg}
                endreFiltervalg={doEndreFiltervalg}
            />
            <MetrikkEkspanderbartpanel
                apen={false}
                tittel="Veiledergrupper"
                tittelProps="undertittel"
                lamellNavn="veiledergrupper"
                hidden={filtergruppe === 'veileder'}
            >
                <FilteringVeilederGrupper/>

            </MetrikkEkspanderbartpanel>
            <MetrikkEkspanderbartpanel
                apen
                tittel="Status"
                tittelProps="undertittel"
                lamellNavn="status"
            >
                <FiltreringStatus
                    filtergruppe={filtergruppe}
                    veileder={veileder}
                    filtervalg={filtervalg}
                />

            </MetrikkEkspanderbartpanel>
            <MetrikkEkspanderbartpanel
                apen={filtergruppe !== 'veileder'}
                tittel="Filter"
                tittelProps="undertittel"
                lamellNavn="filtergruppe"
            >
                <FiltreringFilter
                    endreFiltervalg={doEndreFiltervalg}
                    filtervalg={filtervalg}
                    enhettiltak={enhettiltak}
                />
            </MetrikkEkspanderbartpanel>
        </div>
    );
}

export default FiltreringContainer;
