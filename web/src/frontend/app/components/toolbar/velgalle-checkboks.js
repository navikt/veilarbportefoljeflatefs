import React, { PropTypes as PT } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Checkbox } from 'nav-frontend-skjema';
import { markerAlleBrukere } from './../../ducks/portefolje';

function VelgalleCheckboks({ skalSkjules, disabled, markerAlleBrukere, alleMarkert }) {
    if (skalSkjules) {
        return null;
    }
    const onClickHandler = () => markerAlleBrukere(!alleMarkert);

    return (
        <Checkbox
            label="Velg alle"
            className="velgalle-checkboks"
            checked={alleMarkert}
            disabled={disabled}
            onClick={onClickHandler}
        />
    );
}

const mapStateToProps = (state) => {
    const brukere = state.portefolje.data.brukere;
    const alleMarkert = brukere.length > 0 && brukere.every((bruker) => bruker.markert === true);
    const skalSkjules = state.ui.side.side === 'veiledere';
    const disabled = brukere.length === 0;

    return { skalSkjules, alleMarkert, disabled };
};
const mapDispatchToProps = (dispatch) => bindActionCreators({ markerAlleBrukere }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(VelgalleCheckboks);
