import * as React from 'react';
import { connect } from 'react-redux';
import PanelBase from 'nav-frontend-paneler';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import FiltreringStatus from './filtrering-status';
import { endreFiltervalg } from '../ducks/filtrering';
import { EnhetModell, FiltervalgModell, VeilederModell } from '../model-interfaces';
import FiltreringFilter from './filtrering-filter';
import FiltreringNavnellerfnr from './filtrering-navnellerfnr';
import MetrikkEkspanderbartpanel from '../components/metrikk-ekspanderbartpanel';

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

function FiltreringContainer({ filtergruppe, filtervalg, veileder= defaultVeileder, actions, enhettiltak }: FiltreringContainerProps) {
    return (
        <div className="blokk-m">
            <PanelBase className="blokk-xxxs">
                <FiltreringNavnellerfnr
                    filtervalg={filtervalg}
                    actions={actions}
                />
            </PanelBase>
            <MetrikkEkspanderbartpanel
                apen
                className="blokk-xxxs"
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
                className="blokk-xxxs"
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
