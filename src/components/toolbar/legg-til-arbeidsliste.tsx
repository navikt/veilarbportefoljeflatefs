import * as React from 'react';
import { connect } from 'react-redux';
import ArbeidslisteModal from '../modal/arbeidsliste/arbeidsliste-modal';
import {VIS_ARBEIDSLISTE_MODAL, visModal} from '../../ducks/modal';
import { PortefoljeState } from '../../ducks/portefolje';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { ReactComponent as ArbeidslisteIkonLinje } from './arbeidslisteikon-linje.svg';

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
}

type LeggTilArbeidslisteProps = StateProps & DispatchProps & OwnProps & RouteComponentProps<{ ident: string }> ;

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
        const arbeidslisteButton = (tekst) => (
            <button
                type="button"
                className="toolbar_btn"
                disabled={valgteBrukere.length < 1 || this.props.visesAnnenVeiledersPortefolje}
                onClick={this.onClickHandler}
            >
                {tekst}
                <ArbeidslisteIkonLinje className="toolbar__arbeidsliste-ikon"/>
            </button>
        );

        if (inneholderBrukerMedArbeidsliste) {
            return arbeidslisteButton('Fjern fra arbeidsliste');
        }

        return arbeidslisteButton('Legg i arbeidsliste');
    }

    render() {
        const {portefolje} = this.props;
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
            <div className="toolbar_btnwrapper dropdown--toolbar">
                {this.arbeidslisteButton(valgteBrukere)}
                {modalSkalVises && <ArbeidslisteModal isOpen={modalSkalVises} valgteBrukere={valgteBrukere}/>}
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    visModal: state.modal.modal === VIS_ARBEIDSLISTE_MODAL,
    portefolje: state.portefolje,
    veilederIdent: state.enheter.ident
});

const mapDispatchToProps = (dispatch) => ({
    visArbeidslisteModal: () => dispatch(visModal()),
});

export default connect<StateProps, DispatchProps, OwnProps>(mapStateToProps, mapDispatchToProps)(withRouter(LeggTilArbeidsliste));
