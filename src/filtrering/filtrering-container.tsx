import * as React from 'react';
import { connect } from 'react-redux';
import { endreFiltervalg } from '../ducks/filtrering';
import { EnhetModell, FiltervalgModell, VeilederModell } from '../model-interfaces';
import FiltreringFilter from './filtrering-filter';
import FiltreringNavnellerfnr from './filtrering-navnellerfnr';
import MetrikkEkspanderbartpanel from '../components/toolbar/metrikk-ekspanderbartpanel';
import { FiltreringStatus } from './filtrering-status/filtrering-status';

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
    endreFiltervalg: (filterId: string, filterVerdi: string) => void;
}

function FiltreringContainer({ filtergruppe, filtervalg, veileder = defaultVeileder, endreFiltervalg, enhettiltak }: FiltreringContainerProps) {
    return (
        <div className="blokk-m">
            <FiltreringNavnellerfnr
                filtervalg={filtervalg}
                endreFiltervalg={endreFiltervalg}
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
                apen={filtergruppe !== 'veileder'}
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
