import * as React from 'react';
import { connect } from 'react-redux';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import { veilederShape, filtervalgShape } from '../proptype-shapes';
import FiltreringStatus from './filtrering-status';
import FiltreringFilter from './filtrering-filter';
import { endreFiltervalg } from '../ducks/filtrering';
import {EnhetModell, FiltervalgModell, VeilederModell} from '../model-interfaces';

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
                tittelProps="systemtittel"
            >
                <FiltreringStatus filtergruppe={filtergruppe} veileder={veileder} filtervalg={filtervalg} />
            </Ekspanderbartpanel>
            <Ekspanderbartpanel
                apen
                className="blokk-xxxs"
                tittel="Filter"
                tittelProps="systemtittel"
            >
                <FiltreringFilter
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
            dispatch(endreFiltervalg(filterId, filterVerdi, ownProps.filtergruppe, ownProps.veileder));
        }
    }
});

export default connect(null, mapDispatchToProps)(FiltreringContainer);
