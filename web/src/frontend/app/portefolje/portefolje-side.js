import React, { PropTypes as PT } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { hentPortefoljeForVeileder } from '../ducks/portefolje';
import VeilederPortefoljeVisning from '../portefolje/veileder-portefolje-visning';

function PortefoljeSide() {
    return (
        <div className="portefolje-side panel">
            <h1 className="typo-innholdstittel">
                <FormattedMessage
                    id="veileder.portefolje.tittel"
                />
            </h1>
            <VeilederPortefoljeVisning />
        </div>
    );
}

PortefoljeSide.propTypes = {
    ident: PT.string.isRequired,
    hentPortefolje: PT.func.isRequired,
    veilederident: PT.string.isRequired
};

const mapStateToProps = state => ({
    ident: state.enheter.ident,
    veilederident: state.portefolje.veilederident
});

const mapDispatchToProps = dispatch => ({
    hentPortefolje: (ident, veilederident) => dispatch(hentPortefoljeForVeileder(ident, veilederident))
});

export default connect(mapStateToProps, mapDispatchToProps)(PortefoljeSide);

