import * as React from 'react';
import { connect } from 'react-redux';
import { settVisningsmodus } from '../ducks/veilederpaginering';

interface Props {
    visningsmodus: string,
    handleClick: (modus:string) => void
}

class ButtonRadiogroup extends React.Component<Props, any> {
    render() {
        const { visningsmodus, handleClick } = this.props;
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
    }
}

const mapStateToProps = (state) => ({
    visningsmodus: state.paginering.visningsmodus
});

const mapDispatchToProps = (dispatch) => ({
   handleClick: modus => {dispatch(settVisningsmodus(modus))},
});

export default connect(mapStateToProps, mapDispatchToProps)(ButtonRadiogroup)
