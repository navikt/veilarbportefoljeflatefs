import React, {Component, PropTypes as PT} from 'react';
import { connect } from 'react-redux';
import { settVisningsmodus } from '../ducks/veilederpaginering';
import { DIAGRAMVISNING, TABELLVISNING } from '../minoversikt/minoversikt-konstanter';

const ButtonRadiogroup = ({visningsmodus, handleClick}) => {
    return (
        <div className="visningsgruppe">
            <input
                id="diagramvisning"
                name="visningsmodus"
                type="radio"
                onChange={() => handleClick(DIAGRAMVISNING)}
                value="diagramvisning"
                checked={visningsmodus === DIAGRAMVISNING}
                aria-selected={visningsmodus === DIAGRAMVISNING}
            />
            <label htmlFor="diagramvisning" className="typo-undertekst">Vis som diagram</label>
            <input
                id="tabellvisning"
                name="visningsmodus"
                type="radio"
                onChange={() => handleClick(TABELLVISNING)}
                value="tabellvisning"
                checked={visningsmodus === TABELLVISNING}
                aria-selected={visningsmodus === TABELLVISNING}
            />
            <label htmlFor="tabellvisning" className="typo-undertekst">Vis som tabell</label>
        </div>
    );
};

const mapStateToProps = (state) => ({
    visningsmodus: state.veilederpaginering.visningsmodus
});

const mapDispatchToProps = (dispatch) => ({
   handleClick: modus => {dispatch(settVisningsmodus(modus))},
});

ButtonRadiogroup.PropTypes = {
    visningsmodus:  PT.string.isRequired,
    handleClick: PT.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(ButtonRadiogroup)
