import React, { PropTypes as PT, Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import LeggTilArbeidslisteModal from '../../modal/legg-til-arbeidsliste-modal';

class LeggTilArbeidsliste extends Component {
    constructor(props) {
        super(props);
        const { skalSkjules } = this.props;
        if (skalSkjules) {
            return null;
        }
        this.onClickHandler = this.onClickHandler.bind(this);
        this.state = { visArbeidslisteModal: this.props.visArbeidslisteModal };
    }

    onClickHandler() {
       this.setState({ visArbeidslisteModal: true });
    }

    componentWillReceiveProps() {

    }

    render() {
        console.log("render");
        console.log(this.state);
        const { visArbeidslisteModal } = this.state;
        return (
            <div className="toolbar_btnwrapper">
                <button type="button" className="toolbar_btn" onClick={this.onClickHandler}>
                    <FormattedMessage id="portefolje.legg.til.arbeidsliste.button"/>
                </button>
                <LeggTilArbeidslisteModal isOpen={visArbeidslisteModal} />
            </div>
        );
    }
}

LeggTilArbeidsliste.propTypes = {
    skalSkjules: PT.bool.isRequired,
    visArbeidslisteModal: PT.bool
};

LeggTilArbeidsliste.defaultProps = {
    visArbeidslisteModal: false
};

const mapStateToProps = ({ ui }) => ({
    skalSkjules: (ui.side.side || '') !== 'veilederoversikt',
});


export default connect(mapStateToProps)(LeggTilArbeidsliste);
