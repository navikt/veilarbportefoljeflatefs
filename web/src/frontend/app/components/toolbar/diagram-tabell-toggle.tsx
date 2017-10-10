import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ToggleGruppe, ToggleKnapp } from 'nav-frontend-toggle';
import { settVisningsmodus } from './../../ducks/veilederpaginering';
import * as VK from './../../minoversikt/minoversikt-konstanter';
import { AppState } from './../../reducer';
import { ListevisningType } from '../../ducks/ui/listevisning';

interface DiagramTabellToggleOwnProps {
    filtergruppe: ListevisningType;
}

interface DiagramTabellToggleProps extends DiagramTabellToggleOwnProps {
    visningsmodus: string;
    endreVisningsmodus: (visning: string) => void;
    skalSkjules: boolean;
}

function DiagramTabellToggle({ visningsmodus, endreVisningsmodus, skalSkjules }: DiagramTabellToggleProps) {
    if (skalSkjules) {
        return null;
    }

    const onChange = (e) => endreVisningsmodus(e.target.value);

    return (
        <ToggleGruppe name="DiagramTabellToggle" onChange={onChange}>
            <ToggleKnapp
                value={VK.TABELLVISNING}
                className="toggle--tabell"
                checked={visningsmodus === VK.TABELLVISNING}
                ariaLabel="Vis som tabell"
            >
                <span className="visuallyhidden">Vis som tabell</span>
            </ToggleKnapp>
            <ToggleKnapp
                value={VK.DIAGRAMVISNING}
                className="toggle--diagram"
                checked={visningsmodus === VK.DIAGRAMVISNING}
            >
                <span className="visuallyhidden">Vis som diagram</span>
            </ToggleKnapp>
        </ToggleGruppe>
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

const mapStateToProps = (state, ownProps: DiagramTabellToggleOwnProps) => {
    const filtreringsstate = getFiltreringsstate(state, ownProps.filtergruppe);
    const ytelse = filtreringsstate.ytelse;

    return ({
        visningsmodus: state.veilederpaginering.visningsmodus,
        skalSkjules: ytelse === null || ytelse === undefined || ytelse === 'AAP_UNNTAK'
    });
};

const mapDispatchToProps = (dispatch) => bindActionCreators({
    endreVisningsmodus(modus) {
        return settVisningsmodus(modus);
    }
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(DiagramTabellToggle);
