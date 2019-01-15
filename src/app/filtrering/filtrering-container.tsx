import * as React from 'react';
import { connect } from 'react-redux';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import FiltreringStatus from './filtrering-status';
import { endreFiltervalg } from '../ducks/filtrering';
import { EnhetModell, FiltervalgModell, VeilederModell } from '../model-interfaces';
import FiltreringNavnOgFnr from './filtrering-navnellerfnr';
import FiltreringFilterVenstreToggle from './filtrering-filter-venstre-toggle';

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
            <Ekspanderbartpanel
                apen
                className="blokk-xxxs"
                tittel="Status"
                tittelProps="undertittel"
            >
                <FiltreringStatus
                    filtergruppe={filtergruppe}
                    veileder={veileder}
                    filtervalg={filtervalg}
                />
            </Ekspanderbartpanel>
            <Ekspanderbartpanel
                apen={filtergruppe !== 'veileder'}
                className="blokk-xxxs"
                tittel="Filter"
                tittelProps="undertittel"
            >
                <FiltreringFilterVenstreToggle
                    actions={actions}
                    filtervalg={filtervalg}
                    enhettiltak={enhettiltak}
                />
            </Ekspanderbartpanel>
            <Ekspanderbartpanel
                apen
                className="blokk-xxxs"
                tittel="Søk"
                tittelProps="undertittel"
            >
                <FiltreringNavnOgFnr
                    filtervalg={filtervalg}
                    actions={actions}
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

export default connect(null, mapDispatchToProps)(FiltreringContainer);
