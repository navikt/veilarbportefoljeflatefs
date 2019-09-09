import * as React from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { endreFiltervalg } from '../ducks/filtrering';
import { EnhetModell, FiltervalgModell, VeilederModell } from '../model-interfaces';
import FiltreringFilter from './filtrering-filter';
import FiltreringNavnellerfnr from './filtrering-navnellerfnr';
import MetrikkEkspanderbartpanel from '../components/toolbar/metrikk-ekspanderbartpanel';
import { FiltreringStatus } from './filtrering-status/filtrering-status';
import { useEffect, useState } from 'react';
import { hentVeilederGrupperForEnhet } from '../ducks/veilerder-grupper';
import { AppState } from '../reducer';
import FilteringVeilederGrupper from './filrering-veileder-grupper';
import Innholdslaster from '../innholdslaster/innholdslaster';

const defaultVeileder: VeilederModell = {
    ident: '',
    navn: '',
    fornavn: '',
    etternavn: ''
};

interface FiltreringContainerProps {
    enhettiltak: EnhetModell;
    filtervalg: FiltervalgModell;
    filtergruppe?: string;
    veileder: VeilederModell;
    actions: {
        endreFiltervalg: (filterId: string, filterVerdi: string) => void;
    };
}

function FiltreringContainer({ filtergruppe, filtervalg, veileder = defaultVeileder, actions, enhettiltak }: FiltreringContainerProps) {
   const [harTilgangTilEnheten, setHarTilgangTilEnheten] = useState(false);
   const valgtEnhet = useSelector((state: AppState) => state.veiledere.data.enhet.enhetId );
   const dispatch = useDispatch();

   useEffect(() => {
       // hentTilgangTilEnhet.then(resp => {
       // if (resp){
       //  ;
       // }
       // })

       dispatch(hentVeilederGrupperForEnhet(valgtEnhet));
   }, []);
   return (
        <div className="blokk-m">
            <FiltreringNavnellerfnr
                filtervalg={filtervalg}
                actions={actions}
            />
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
                apen
                tittel="Veiledergrupper"
                tittelProps="undertittel"
                lamellNavn="status"
                skalVises={harTilgangTilEnheten && filtergruppe !== 'enhet'}
            >
                <FilteringVeilederGrupper/>

            </MetrikkEkspanderbartpanel>
            <MetrikkEkspanderbartpanel
                apen={filtergruppe !== 'veileder'}
                tittel="Filter"
                tittelProps="undertittel"
                lamellNavn="filtergruppe"
            >
                <FiltreringFilter
                    actions={actions}
                    filtervalg={filtervalg}
                    enhettiltak={enhettiltak}
                />
            </MetrikkEkspanderbartpanel>
        </div>
    );
}

const mapDispatchToProps = (dispatch, ownProps) => ({
    actions: {
        endreFiltervalg: (filterId: string, filterVerdi: string) => {
            dispatch(endreFiltervalg(filterId, filterVerdi, ownProps.filtergruppe, ownProps.veileder && ownProps.veileder.ident));
        }
    }
});

export default connect(null, mapDispatchToProps)(FiltreringContainer);
