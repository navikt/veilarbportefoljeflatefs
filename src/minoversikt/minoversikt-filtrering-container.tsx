import * as React from 'react';
import { connect } from 'react-redux';
import { endreFiltervalg } from '../ducks/filtrering';
import { EnhetModell, FiltervalgModell, VeilederModell } from '../model-interfaces';
import MetrikkEkspanderbartpanel from '../components/toolbar/metrikk-ekspanderbartpanel';
import { FiltreringStatusMinOversikt } from './filtrering-status-min-oversikt';
import FiltreringNavnellerfnr from '../filtrering/filtrering-navnellerfnr';

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
                <FiltreringStatusMinOversikt/>
            </MetrikkEkspanderbartpanel>
            <MetrikkEkspanderbartpanel
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
