import React, {Component, PropTypes as PT} from 'react';
import { connect } from 'react-redux';
import { settVisningsmodus } from '../ducks/veilederpaginering';

const ButtonRadiogroup = ({visningsmodus, handleClick}) => {
    console.log("bg", visningsmodus);
    return (
        <div className="visningsgruppe">
            <input
                id="diagramvisning"
                name="visningsmodus"
                type="radio"
                onChange={() => handleClick('diagram')}
                value="diagramvisning"
                checked={visningsmodus === 'diagram'}
            />
            <label htmlFor="diagramvisning" className="typo-undertekst">Vis som diagram</label>
            <input
                id="tabellvisning"
                name="visningsmodus"
                type="radio"
                onChange={() => handleClick('tabell')}
                value="tabellvisning"
                checked={visningsmodus === 'tabell'}
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
