import * as React from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import ArbeidslisteModal from '../../modal/arbeidsliste-modal';
import {  visModal } from '../../ducks/modal';
import { PortefoljeState } from '../../ducks/portefolje';
import { ToolbarPosisjon } from './toolbar';
import {withRouter, RouteComponentProps} from "react-router-dom";

interface StateProps {
    portefolje: PortefoljeState;
    visModal?: boolean;
    veilederIdent: string;
}

interface DispatchProps {
    visArbeidslisteModal: () => void;
}

interface OwnProps {
    visesAnnenVeiledersPortefolje: boolean;
    toolbarPosisjon?: ToolbarPosisjon;
}

type LeggTilArbeidslisteProps = StateProps & DispatchProps & OwnProps & RouteComponentProps< {ident: string}> ;

class LeggTilArbeidsliste extends React.Component<LeggTilArbeidslisteProps> {
    constructor(props) {
        super(props);
        this.onClickHandler = this.onClickHandler.bind(this);
    }

    onClickHandler() {
        this.props.visArbeidslisteModal();
    }

    arbeidslisteButton(valgteBrukere) {
        const inneholderBrukerMedArbeidsliste = valgteBrukere.some((bruker) => bruker.arbeidsliste.arbeidslisteAktiv);
        const arbeidslisteButton = (id) => (
            <button
                type="button"
                className="toolbar_btn"
                disabled={valgteBrukere.length < 1 || this.props.visesAnnenVeiledersPortefolje}
                onClick={this.onClickHandler}
            >
                <FormattedMessage id={id} />
            </button>
        );

        if (inneholderBrukerMedArbeidsliste) {
            return arbeidslisteButton('portefolje.slett.arbeidsliste.button');
        }

        return arbeidslisteButton('portefolje.legg.til.arbeidsliste.button');
    }

    render() {
        const { portefolje } = this.props;
        const valgteBrukere = portefolje.data.brukere.filter((bruker) => bruker.markert === true);
        const path = this.props.match.path.split('/')[1];
        const skalSkjules =
            path === 'portefolje' ?
                this.props.match.params.ident ?
                    this.props.match.params.ident !== this.props.veilederIdent : false
                : true;
        const modalSkalVises = this.props.visModal === true;

        if (skalSkjules) {
            return null;
        }
        return (
            <div className="toolbar_btnwrapper">
                { this.arbeidslisteButton(valgteBrukere) }
                {modalSkalVises && <ArbeidslisteModal isOpen={modalSkalVises} valgteBrukere={valgteBrukere} />}
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    visModal: state.modal.visModal,
    portefolje: state.portefolje,
    veilederIdent: state.enheter.ident
});

const mapDispatchToProps = (dispatch, props) => ({
    visArbeidslisteModal: () => dispatch(visModal(props.toolbarPosisjon)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LeggTilArbeidsliste));
