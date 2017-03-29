import * as React from 'react';
import { connect } from 'react-redux'
import { settVisningsmodus } from '../ducks/paginering'

interface Props {
    visningsmodus: string,
    handleClick: (modus:string) => void
}

class ButtonRadiogroup extends React.Component<Props, any> {
    render() {
        const { visningsmodus, handleClick } = this.props;
        return (
            <span>
                <input
                    id="diagramvisning"
                    name="visningsmodus"
                    type="radio"
                    onClick={() => handleClick('diagram')}
                    value="diagramvisning"
                    checked={visningsmodus === 'diagram'}
                />
                <label htmlFor="diagramvisning">Vis som diagram</label>
                <input
                    id="tabellvisning"
                    name="visningsmodus"
                    type="radio"
                    onClick={() => handleClick('tabell')}
                    value="tabellvisning"
                    checked={visningsmodus === 'tabell'}
                />
                <label htmlFor="tabellvisning">Vis som tabell</label>
            </span>
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
