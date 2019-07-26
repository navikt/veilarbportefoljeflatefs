import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as VK from '../../minoversikt/minoversikt-konstanter';
import { AppState } from './../../reducer';
import { ListevisningType } from '../../ducks/ui/listevisning';
import { settVisningsmodus } from '../../ducks/paginering';
import { ToolbarPosisjon } from './toolbar';
import { ReactComponent as ListeIkon} from './liste.svg';
import { ReactComponent as StolpeIkon} from './stolpediagram.svg';
import {ToggleGruppe } from "nav-frontend-toggle";
import {MinoversiktVisning} from "../../minoversikt/minoversikt-konstanter";

interface OwnProps {
    filtergruppe: ListevisningType;
    toolbarPosisjon?: ToolbarPosisjon;
}

interface DispatchProps {
    endreVisningsmodus: (visning: MinoversiktVisning) => void;
}

interface StateProps {
    visningsmodus: MinoversiktVisning;
    skalSkjules: boolean;
}

type DiagramTabellToggleProps =
    & OwnProps
    & DispatchProps
    & StateProps;

function DiagramTabellToggle({ visningsmodus, endreVisningsmodus, skalSkjules }: DiagramTabellToggleProps) {
    if (skalSkjules) {
        return null;
    }
    return (
        <ToggleGruppe
            defaultToggles={[
                {
                    children: <ListeIkon/>,
                    pressed: visningsmodus === VK.TABELLVISNING,
                    onClick: () => endreVisningsmodus(VK.TABELLVISNING)
                },
                {
                    children: <StolpeIkon/>,
                    pressed: visningsmodus === VK.DIAGRAMVISNING,
                    onClick: () => endreVisningsmodus(VK.DIAGRAMVISNING)
                },
            ]as any}
        />
    );
}

function getFiltreringsstate(state: AppState, filtergruppe: ListevisningType) {
    if (filtergruppe === ListevisningType.enhetensOversikt) {
        return state.filtrering;
    } else if (filtergruppe === ListevisningType.minOversikt) {
        return state.filtreringMinoversikt;
    }
    return state.filtreringVeilederoversikt;
}

const mapStateToProps = (state: AppState, ownProps: OwnProps): StateProps => {
    const filtreringsstate = getFiltreringsstate(state, ownProps.filtergruppe);
    const ytelse = filtreringsstate.ytelse;

    return {
        visningsmodus: state.paginering.visningsmodus,
        skalSkjules: ytelse === null || ytelse === undefined
    };
};

const mapDispatchToProps = (dispatch, props: OwnProps): DispatchProps => bindActionCreators({
    endreVisningsmodus(modus: MinoversiktVisning) {
        return settVisningsmodus(modus, props.toolbarPosisjon);
    }
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(DiagramTabellToggle);
