import React, { PropTypes as PT } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import VeilederPortefoljeVisning from './veileder-portefolje-visning';
import { veilederShape } from '../proptype-shapes';

function PortefoljeSide({ ident, veileder }) {
    const annenVeilederVarsel = ident === veileder.ident ?
            (<noScript />) :
            (<FormattedMessage
                id="annen.veileder.portefolje.advarsel"
                values={{
                    fornavn: veileder.fornavn,
                    etternavn: veileder.etternavn
                }}
            />);

    return (
        <div>
            {annenVeilederVarsel}
            <div className="portefolje-side panel">
                <h1 className="typo-innholdstittel">
                    <FormattedMessage
                        id="veileder.portefolje.tittel"
                    />
                </h1>
                <VeilederPortefoljeVisning />
            </div>
        </div>
    );
}

PortefoljeSide.propTypes = {
    ident: PT.string.isRequired,
    veileder: veilederShape.isRequired
};

const mapStateToProps = state => ({
    ident: state.enheter.ident,
    veileder: state.portefolje.veileder
});

export default connect(mapStateToProps)(PortefoljeSide);

