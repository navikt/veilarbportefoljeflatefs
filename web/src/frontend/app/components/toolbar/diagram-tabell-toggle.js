import React, { PropTypes as PT } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { FormattedMessage } from 'react-intl';
import { ToggleGruppe, ToggleKnapp } from 'nav-frontend-toggle';
import { settVisningsmodus } from './../../ducks/veilederpaginering';
import * as VK from './../../minoversikt/minoversikt-konstanter';

function DiagramTabellToggle({ visningsmodus, endreVisningsmodus, skalSkjules }) {
    if (skalSkjules) {
        return null;
    }

    const onChange = (e) => endreVisningsmodus(e.target.value);

    return (
        <ToggleGruppe name="DiagramTabellToggle" onChange={onChange}>
            <ToggleKnapp value={VK.TABELLVISNING} checked={visningsmodus === VK.TABELLVISNING}>
                <FormattedMessage id="paginering.vis.som.tabell" />
            </ToggleKnapp>
            <ToggleKnapp value={VK.DIAGRAMVISNING} checked={visningsmodus === VK.DIAGRAMVISNING}>
                <FormattedMessage id="paginering.vis.som.diagram"/>
            </ToggleKnapp>
        </ToggleGruppe>
    );
}

const mapStateToProps = (state, ownProps) => {
    const stateSlice = ownProps.filtergruppe === 'enhet' ? 'filtrering' : 'filtreringVeileder';
    const ytelse = state[stateSlice].ytelse;

    return ({
        visningsmodus: state.veilederpaginering.visningsmodus,
        skalSkjules: ytelse === null || ytelse === undefined || ytelse === 'APP_MAXTID'
    });
};

const mapDispatchToProps = (dispatch) => bindActionCreators({
    endreVisningsmodus(modus) {
        return settVisningsmodus(modus);
    }
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(DiagramTabellToggle);
