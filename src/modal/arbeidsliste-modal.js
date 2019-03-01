import React, { Component} from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import NavFrontendModal from 'nav-frontend-modal';
import { Normaltekst, Innholdstittel } from 'nav-frontend-typografi';
import { FormattedMessage } from 'react-intl';
import { skjulModal } from '../ducks/modal';
import { markerAlleBrukere } from '../ducks/portefolje';
import LeggTilArbeidslisteForm from './arbeidsliste/legg-til-arbeidslisteform';
import FjernFraArbeidslisteForm from './fjern-fra-arbeidsliste-form';

NavFrontendModal.setAppElement('#applikasjon');

class ArbeidslisteModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isOpen: this.props.isOpen,
            formIsDirty: false

        };
        this.lukkModal = this.lukkModal.bind(this);
        this.setFormIsDirty = this.setFormIsDirty.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.isOpen !== this.state.isOpen) {
            this.setState({ isOpen: nextProps.isOpen });
        }
    }

    setFormIsDirty(formIsDirty) {
        this.setState({...this.state,formIsDirty})
    }

    lukkModal() {
        const { intl, skjulArbeidslisteModal, fjernMarkerteBrukere } = this.props;
        const dialogTekst = intl.formatMessage({
            id: 'arbeidsliste-skjema.lukk-advarsel',
        });
        if (!this.state.formIsDirty || window.confirm(dialogTekst)) {
            this.setState({ isOpen: false });
            fjernMarkerteBrukere();
            skjulArbeidslisteModal();
        }
    }

    leggTilModal(valgteBrukere) {
        return (
            <div className="arbeidsliste__modal">
                <div className="arbeidsliste-info-tekst">
                    <Innholdstittel tag="h1" className="blokk-xs">
                        <FormattedMessage id="modal.legg.til.arbeidsliste.tittel" />
                    </Innholdstittel>
                    <Normaltekst className="blokk-s">
                        <FormattedMessage
                            id="modal.legg.til.arbeidsliste.infotekst"
                            values={{ antall: valgteBrukere.length }}
                        />
                    </Normaltekst>
                </div>
                <LeggTilArbeidslisteForm
                    valgteBrukere={valgteBrukere}
                    lukkModal={this.lukkModal}
                    innloggetVeileder={this.props.innloggetVeileder}
                    setFormIsDirty={this.setFormIsDirty}
                />
            </div>
        );
    }

    fjernFraModal(valgteBrukere) {
        const brukereSomSkalFjernes = valgteBrukere.filter((bruker) => bruker.arbeidsliste.arbeidslisteAktiv);

        return (
            <div className="arbeidsliste__modal">
                <div className="arbeidsliste-info-tekst">
                    <Innholdstittel tag="h1" className="blokk-xs">
                        <FormattedMessage id="modal.fjern.fra.arbeidsliste.tittel" />
                    </Innholdstittel>
                    <Normaltekst className="blokk-s">
                        <FormattedMessage
                            id="modal.fjern.fra.arbeidsliste.infotekst"
                            values={{ antall: brukereSomSkalFjernes.length }}
                        />
                    </Normaltekst>
                </div>
                <FjernFraArbeidslisteForm
                    valgteBrukere={brukereSomSkalFjernes}
                    lukkModal={this.lukkModal}
                />
            </div>
        );
    }

    render() {
        const { valgteBrukere } = this.props;
        const fjerne = valgteBrukere.some((bruker) => bruker.arbeidsliste.arbeidslisteAktiv);
        console.log('fjerne', fjerne);
        return (
            <NavFrontendModal
                className={'arbeidsliste-modal'}
                contentLabel="arbeidsliste"
                isOpen={this.state.isOpen || false}
                onRequestClose={this.lukkModal}
                closeButton
            >
                <div className="modal-header-wrapper">
                    <header className="modal-header" />
                </div>
                { fjerne ? this.fjernFraModal(valgteBrukere) : this.leggTilModal(valgteBrukere) }
            </NavFrontendModal>);
    }
}

/*
ArbeidslisteModal.propTypes = {
    isOpen: PT.bool.isRequired,
    valgteBrukere: PT.arrayOf(brukerShape).isRequired,
    skjulArbeidslisteModal: PT.func.isRequired,
    fjernMarkerteBrukere: PT.func.isRequired,
    innloggetVeileder: PT.string.isRequired,
    formIsDirty: PT.bool.isRequired,
    intl: intlShape.isRequired,
};
*/

const mapStateToProps = (state) => ({
    visModal: state.modal.visModal,
    innloggetVeileder: state.enheter.ident,
});

const mapDispatchToProps = (dispatch) => ({
    skjulArbeidslisteModal: () => dispatch(skjulModal()),
    fjernMarkerteBrukere: () => dispatch(markerAlleBrukere(false))
});

export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(ArbeidslisteModal));
