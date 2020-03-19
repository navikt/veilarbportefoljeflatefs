import * as React from 'react';
import { useDispatch } from 'react-redux';
import { endreFiltervalg } from '../ducks/filtrering';
import { FiltervalgModell } from '../model-interfaces';
import FiltreringFilter from './filtrering-filter';
import FiltreringNavnellerfnr from './filtrering-navnellerfnr';
import MetrikkEkspanderbartpanel from '../components/toolbar/metrikk-ekspanderbartpanel';
import { FiltreringStatus } from './filtrering-status/filtrering-status';
import FilteringVeilederGrupper from './filtrering-veileder-grupper/filrering-veileder-grupper';
import { OrNothing } from '../utils/types/types';
import { Tiltak } from '../ducks/enhettiltak';
import { pagineringSetup } from '../ducks/paginering';
import CheckboxFilterform from '../components/checkbox-filterform/checkbox-filterform';
import { registreringstype } from './filter-konstanter';
import { ReactComponent as InfoIkon } from '../components/ikoner/info-ikon.svg';
import { Normaltekst } from 'nav-frontend-typografi';

interface FiltreringContainerProps {
    enhettiltak: OrNothing<Tiltak>;
    filtervalg: FiltervalgModell;
    filtergruppe?: string;
}

function FiltreringContainer({filtergruppe, filtervalg, enhettiltak}: FiltreringContainerProps) {

    const dispatch = useDispatch();

    const doEndreFiltervalg = (filterId: string, filterVerdi: any) => {
        dispatch(pagineringSetup({side: 1}));
        dispatch(endreFiltervalg(filterId, filterVerdi, filtergruppe));
    };

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
                <FilteringVeilederGrupper filtergruppe={filtergruppe}/>

            </MetrikkEkspanderbartpanel>
            <MetrikkEkspanderbartpanel
                apen={false}
                tittel="Registrering"
                tittelProps="undertittel"
                lamellNavn="registrering"
                hidden={filtergruppe === 'registrering'}
            >
                <div className="registreringsfilter__infocontainer">
                    <InfoIkon className="registreringsfilter__infoikon"/>
                    <Normaltekst className="registreringsfilter__infotekst">
                        Situasjonen brukeren oppgir på registreringstidspunktet.
                    </Normaltekst>
                </div>
                <CheckboxFilterform
                    form="registreringstype"
                    filtervalg={filtervalg}
                    valg={registreringstype}
                    endreFilterValg={doEndreFiltervalg}
                    className="registreringstype"
                />
            </MetrikkEkspanderbartpanel>
            <MetrikkEkspanderbartpanel
                apen
                tittel="Status"
                tittelProps="undertittel"
                lamellNavn="status"
            >
                <FiltreringStatus
                    filtergruppe={filtergruppe}
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
