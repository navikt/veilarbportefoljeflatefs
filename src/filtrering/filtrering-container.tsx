import * as React from 'react';
import { connect } from 'react-redux';
import { endreFiltervalg } from '../ducks/filtrering';
import { EnhetModell, FiltervalgModell, VeilederModell } from '../model-interfaces';
import FiltreringFilter from './filtrering-filter';
import FiltreringNavnellerfnr from './filtrering-navnellerfnr';
import MetrikkEkspanderbartpanel from '../components/toolbar/metrikk-ekspanderbartpanel';
import { FiltreringStatus } from './filtrering-status/filtrering-status';
import ArbeidslisteFilter from "./filtrering-arbeidsliste";

export const defaultVeileder: VeilederModell = {
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
    endreFiltervalg: (filterId: string, filterVerdi: string) => void;
    harFlyttStatusFeature: boolean;
}

function FiltreringContainer({ filtergruppe, filtervalg, veileder = defaultVeileder, endreFiltervalg, enhettiltak, harFlyttStatusFeature }: FiltreringContainerProps) {
    return (
        <div className="blokk-m">
            <FiltreringNavnellerfnr
                filtervalg={filtervalg}
                endreFiltervalg={endreFiltervalg}
            />
            <ArbeidslisteFilter
                veileder={veileder}
                hidden={!(harFlyttStatusFeature && filtergruppe === 'veileder')}
            />
            <MetrikkEkspanderbartpanel
                apen
                tittel="Status"
                tittelProps="undertittel"
                lamellNavn="status"
                hidden={harFlyttStatusFeature}
            >
                <FiltreringStatus
                    filtergruppe={filtergruppe}
                    veileder={veileder}
                    filtervalg={filtervalg}
                />

            </MetrikkEkspanderbartpanel>
            <MetrikkEkspanderbartpanel
                apen={harFlyttStatusFeature ?  true : filtergruppe !== 'veileder'}
                tittel="Filter"
                tittelProps="undertittel"
                lamellNavn="filtergruppe"
            >
                <FiltreringFilter
                    endreFiltervalg={endreFiltervalg}
                    filtervalg={filtervalg}
                    enhettiltak={enhettiltak}
                />
            </MetrikkEkspanderbartpanel>
        </div>
    );
}

const mapDispatchToProps = (dispatch, ownProps) => ({
    endreFiltervalg: (filterId: string, filterVerdi: string) => {
        dispatch(endreFiltervalg(filterId, filterVerdi, ownProps.filtergruppe, ownProps.veileder && ownProps.veileder.ident));
    }
});

export default connect(null, mapDispatchToProps)(FiltreringContainer);
