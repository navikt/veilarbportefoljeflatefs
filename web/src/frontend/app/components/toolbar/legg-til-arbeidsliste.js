import React, { PropTypes as PT } from 'react';
import { connect } from 'react-redux';

function LeggTilArbeidsliste({ skalSkjules }) {
    if (skalSkjules) {
        return null;
    }

    return (
        <div>arbeidsliste</div>
    );
}

LeggTilArbeidsliste.propTypes = {
    skalSkjules: PT.bool.isRequired
};

const mapStateToProps = ({ ui }) => ({
    skalSkjules: (ui.side.side || '') !== 'veilederoversikt'
});

export default connect(mapStateToProps)(LeggTilArbeidsliste);
