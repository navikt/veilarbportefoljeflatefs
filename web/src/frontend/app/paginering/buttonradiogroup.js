import React, { Component, PropTypes as PT } from 'react';
import { connect } from 'react-redux';
import { guid } from 'nav-frontend-js-utils';
import { FormattedMessage } from 'react-intl';
import { settVisningsmodus } from '../ducks/veilederpaginering';
import { DIAGRAMVISNING, TABELLVISNING } from '../minoversikt/minoversikt-konstanter';

class ButtonRadiogroup extends Component {
    constructor(props) {
        super(props);

        this.guid = guid();
    }

    render() {
        const { visningsmodus, endreVisningsmodus } = this.props;

        return (
            <div className="visningsgruppe">
                <div className="visningsgruppe__knapp">
                    <input
                        id={`diagramvisning-${this.guid}`}
                        name={`visningsmodus-${this.guid}`}
                        type="radio"
                        onChange={() => endreVisningsmodus(DIAGRAMVISNING)}
                        value="diagramvisning"
                        checked={visningsmodus === DIAGRAMVISNING}
                        aria-selected={visningsmodus === DIAGRAMVISNING}
                        className="diagramvisning__radio__input"
                    />
                    <label htmlFor={`diagramvisning-${this.guid}`} className="typo-undertekst">
                        <FormattedMessage id="paginering.vis.som.diagram" />
                    </label>
                </div>
                <div className="visningsgruppe__knapp">
                    <input
                        id={`tabellvisning-${this.guid}`}
                        name={`visningsmodus-${this.guid}`}
                        type="radio"
                        onChange={() => endreVisningsmodus(TABELLVISNING)}
                        value="tabellvisning"
                        checked={visningsmodus === TABELLVISNING}
                        aria-selected={visningsmodus === TABELLVISNING}
                        className="diagramvisning__radio__input"
                    />
                    <label htmlFor={`tabellvisning-${this.guid}`} className="typo-undertekst">
                        <FormattedMessage id="paginering.vis.som.tabell" />
                    </label>
                </div>
            </div>
        );
    }
}

ButtonRadiogroup.defaultProps = {
    visningsmodus: TABELLVISNING
};

const mapStateToProps = (state) => ({
    visningsmodus: state.veilederpaginering.visningsmodus
});

const mapDispatchToProps = (dispatch) => ({
    endreVisningsmodus: (modus) => {
        dispatch(settVisningsmodus(modus));
    }
});

ButtonRadiogroup.propTypes = {
    visningsmodus: PT.string.isRequired,
    endreVisningsmodus: PT.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(ButtonRadiogroup);
