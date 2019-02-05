import * as React from 'react';
import { connect } from 'react-redux';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import FiltreringStatus from './filtrering-status';
import { endreFiltervalg } from '../ducks/filtrering';
import { EnhetModell, FiltervalgModell, VeilederModell } from '../model-interfaces';
import FiltreringFilterVenstreToggle from './filtrering-filter-venstre-toggle';
import FiltreringNavnellerfnrVenstreToggle from './filtrering-navnellerfnr-venstre-toggle';
import PanelBase from 'nav-frontend-paneler';

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

function FiltreringContainerVenstreToggle({ filtergruppe, filtervalg, veileder= defaultVeileder, actions, enhettiltak }: FiltreringContainerProps) {
    return (
        <div className="blokk-m">
            <PanelBase className="blokk-xxxs">
                <FiltreringNavnellerfnrVenstreToggle
                    filtervalg={filtervalg}
                    actions={actions}
                />
            </PanelBase>
            <Ekspanderbartpanel
                apen
                tittel="Status"
                tittelProps="undertittel"
            >
                <FiltreringStatus
                    filtergruppe={filtergruppe ? filtergruppe : ''}
                    veileder={veileder}
                    filtervalg={filtervalg}
                    sjekkFeature={{} as any} // TODO: FIX
                    statustall={{} as any} // TODO: FIX
                    endreFilter={{} as any} // TODO: FIX
                />
            </Ekspanderbartpanel>
            <Ekspanderbartpanel
                apen={filtergruppe !== 'veileder'}
                tittel="Filter"
                tittelProps="undertittel"
            >
                <FiltreringFilterVenstreToggle
                    actions={actions}
                    filtervalg={filtervalg}
                    enhettiltak={enhettiltak}
                />
            </Ekspanderbartpanel>
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

export default connect(null, mapDispatchToProps)(FiltreringContainerVenstreToggle);
