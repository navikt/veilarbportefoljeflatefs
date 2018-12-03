import * as React from 'react';
import { connect } from 'react-redux';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import { veilederShape, filtervalgShape } from '../proptype-shapes';
import FiltreringStatus from  './filtrering-status';
import FiltreringFilter from './filtrering-filter';
import { endreFiltervalg } from '../ducks/filtrering';
import { EnhetModell, FiltervalgModell, VeilederModell } from '../model-interfaces';
import FiltreringNavnOgFnr from "./filtrering-navnellerfnr";
import {sjekkFeature} from "../ducks/features";
import {NAVN_ELLER_FNR_SOK_FEATURE} from "../konstanter";

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
    sjekkFeature:(feature: string) => boolean;
}

function FiltreringContainer({ filtergruppe, filtervalg, veileder= defaultVeileder, actions, enhettiltak, sjekkFeature } : FiltreringContainerProps) {
    const harSokEllerFnrFeature = sjekkFeature(NAVN_ELLER_FNR_SOK_FEATURE);
    return (
        <div className="blokk-m">
            <Ekspanderbartpanel
                apen
                className="blokk-xxxs"
                tittel="Status"
                tittelProps="systemtittel"
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
                tittelProps="systemtittel"
            >
                <FiltreringFilter
                    actions={actions}
                    filtervalg={filtervalg}
                    enhettiltak={enhettiltak}
                />
            </Ekspanderbartpanel>
            {harSokEllerFnrFeature &&
            <Ekspanderbartpanel
                apen
                className="blokk-xxxs"
                tittel="Søk"
                tittelProps="systemtittel"
            >
                <FiltreringNavnOgFnr
                    filtervalg={filtervalg}
                    actions={actions}
                />
            </Ekspanderbartpanel>}
        </div>
    );
}

const mapStateToProps = (state) => ({
    sjekkFeature: (feature) => sjekkFeature(state, feature)
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    actions: {
        endreFiltervalg: (filterId: string, filterVerdi: string) => {
            dispatch(endreFiltervalg(filterId, filterVerdi, ownProps.filtergruppe, ownProps.veileder && ownProps.veileder.ident));
        }
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(FiltreringContainer);
