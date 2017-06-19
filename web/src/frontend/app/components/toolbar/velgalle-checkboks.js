import React, { PropTypes as PT } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Checkbox } from 'nav-frontend-skjema';
import { markerAlleBrukere } from './../../ducks/portefolje';

function VelgalleCheckboks({ markerAlleBrukere, alleMarkert }) {
    const onClickHandler = () => markerAlleBrukere(!alleMarkert);

    return (
        <Checkbox label="Velg alle" className="velgalle-checkboks" checked={alleMarkert} onClick={onClickHandler} />
    );
}

const mapStateToProps = (state) => {
    const alleMarkert = state.portefolje.data.brukere.every((bruker) => bruker.markert === true);
    return { alleMarkert };
};
const mapDispatchToProps = (dispatch) => bindActionCreators({ markerAlleBrukere }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(VelgalleCheckboks);
