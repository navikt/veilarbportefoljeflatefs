import * as React from 'react';
import { useDispatch } from 'react-redux';
import { endreFiltervalg } from '../ducks/filtrering';
import { FiltervalgModell, VeilederModell } from '../model-interfaces';
import FiltreringFilter from './filtrering-filter';
import FiltreringNavnellerfnr from './filtrering-navnellerfnr';
import MetrikkEkspanderbartpanel from '../components/toolbar/metrikk-ekspanderbartpanel';
import { FiltreringStatus } from './filtrering-status/filtrering-status';
import FilteringVeilederGrupper from './filtrering-veileder-grupper/filrering-veileder-grupper';
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
    veileder?: string;
}

function FiltreringContainer({filtergruppe, filtervalg, veileder = '', enhettiltak}: FiltreringContainerProps) {

    const dispatch = useDispatch();

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
