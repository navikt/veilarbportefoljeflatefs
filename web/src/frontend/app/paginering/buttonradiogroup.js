import React, { Component, PropTypes as PT } from 'react';
import { connect } from 'react-redux';
import { settVisningsmodus } from '../ducks/veilederpaginering';
import { DIAGRAMVISNING, TABELLVISNING } from '../minoversikt/minoversikt-konstanter';

class ButtonRadiogroup extends Component {

    componentWillUnmount() {
        this.props.endreVisningsmodus(TABELLVISNING);
    }

    render() {
        const { visningsmodus, endreVisningsmodus } = this.props;
        return (
            <div className="visningsgruppe">
                <input
                    id="diagramvisning"
                    name="visningsmodus"
                    type="radio"
                    onChange={() => endreVisningsmodus(DIAGRAMVISNING)}
                    value="diagramvisning"
                    checked={visningsmodus === DIAGRAMVISNING}
                    aria-selected={visningsmodus === DIAGRAMVISNING}
                />
                <label htmlFor="diagramvisning" className="typo-undertekst">Vis som diagram</label>
                <input
                    id="tabellvisning"
                    name="visningsmodus"
                    type="radio"
                    onChange={() => endreVisningsmodus(TABELLVISNING)}
                    value="tabellvisning"
                    checked={visningsmodus === TABELLVISNING}
                    aria-selected={visningsmodus === TABELLVISNING}
                />
                <label htmlFor="tabellvisning" className="typo-undertekst">Vis som tabell</label>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    visningsmodus: state.veilederpaginering.visningsmodus
});

const mapDispatchToProps = (dispatch) => ({
    endreVisningsmodus: (modus) => { dispatch(settVisningsmodus(modus)); },
});

ButtonRadiogroup.propTypes = {
    visningsmodus: PT.string.isRequired,
    endreVisningsmodus: PT.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(ButtonRadiogroup);
