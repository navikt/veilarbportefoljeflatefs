import React, { Component } from 'react';
import { connect } from 'react-redux';
import { guid } from 'nav-frontend-js-utils';
import { settVisningsmodus } from '../ducks/paginering';
import { DIAGRAMVISNING, MinoversiktVisning, TABELLVISNING } from '../minoversikt/minoversikt-konstanter';

interface ButtonRadiogroupProps {
    visningsmodus: MinoversiktVisning;
    endreVisningsmodus: (visning: MinoversiktVisning)=> void;
}

class ButtonRadiogroup extends Component<ButtonRadiogroupProps> {
     guid: string;

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
                        Vis som diagram
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
                        Vis som tabell
                    </label>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    visningsmodus: state.paginering.visningsmodus
});

const mapDispatchToProps = (dispatch) => ({
    endreVisningsmodus: (modus) => {
        dispatch(settVisningsmodus(modus));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(ButtonRadiogroup);
