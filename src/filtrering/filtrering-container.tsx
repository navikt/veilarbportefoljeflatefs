import * as React from 'react';
import { connect } from 'react-redux';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import FiltreringStatus from './filtrering-status';
import { endreFiltervalg } from '../ducks/filtrering';
import { EnhetModell, FiltervalgModell, VeilederModell } from '../model-interfaces';
import FiltreringNavnOgFnr from './filtrering-navnellerfnr';
import FiltreringFilter from './filtrering-filter';

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
                <FiltreringFilter
                    actions={actions}
                    filtervalg={filtervalg}
                    enhettiltak={enhettiltak}
                />
            </Ekspanderbartpanel>
            <Ekspanderbartpanel
                apen
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
