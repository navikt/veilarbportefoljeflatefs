import React, { PropTypes as PT } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ToggleGruppe, ToggleKnapp } from 'nav-frontend-toggle';
import { settVisningsmodus } from './../../ducks/veilederpaginering';
import * as VK from './../../minoversikt/minoversikt-konstanter';
import { nameToStateSliceMap } from './../../reducer';

function DiagramTabellToggle({ visningsmodus, endreVisningsmodus, skalSkjules }) {
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

DiagramTabellToggle.propTypes = {
    visningsmodus: PT.string.isRequired,
    endreVisningsmodus: PT.func.isRequired,
    skalSkjules: PT.bool.isRequired
};

const mapStateToProps = (state, ownProps) => {
    const stateSlice = nameToStateSliceMap[ownProps.filtergruppe];
    const ytelse = state[stateSlice].ytelse;

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
