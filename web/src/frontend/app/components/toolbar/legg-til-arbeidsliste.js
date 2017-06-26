import React, { PropTypes as PT } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';

function LeggTilArbeidsliste({ skalSkjules }) {
    if (skalSkjules) {
        return null;
    }

    return (
        <div className="toolbar_btnwrapper">
            <button type="button" className="toolbar_btn" >
                <FormattedMessage id="portefolje.legg.til.arbeidsliste.button"/>
            </button>
        </div>
    );
}

LeggTilArbeidsliste.propTypes = {
    skalSkjules: PT.bool.isRequired
};

const mapStateToProps = ({ ui }) => ({
    skalSkjules: (ui.side.side || '') !== 'veilederoversikt'
});

export default connect(mapStateToProps)(LeggTilArbeidsliste);
