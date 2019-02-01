import * as React from 'react';
import NavFrontendModal from 'nav-frontend-modal';
import './tilbakemelding-modal.less';
import { Hovedknapp } from 'nav-frontend-knapper';
import { ReactChildren } from 'react';

export interface Tilbakemelding {
    tilfredshet: number;
    kommentar: string;
}

interface TilbakemeldingModalProps {
    open: boolean;
    onRequestClose: () => void;
    onTilbakemeldingSendt: (tilbakemelding: Tilbakemelding) => void;
}

interface TilbakemeldingModalState {
    tilfredshet: number;
    kommentar: string;
    harSendt: boolean;
}

class TilbakemeldingModal extends React.Component<TilbakemeldingModalProps, TilbakemeldingModalState> {

    private readonly KOMMENTAR_ROWS = 5;
    private readonly KOMMENTAR_MAX_CHAR = 500;

    constructor(props) {
        super(props);

        this.state = {
            tilfredshet: 0,
            kommentar: '',
            harSendt: false
        };
    }

    handleKommentarChanged = (e) => {
        this.setState({ kommentar: e.target.value });
    }

    handleSendTilbakemeldingClicked = () => {
        const { tilfredshet, kommentar } = this.state;
        this.props.onTilbakemeldingSendt({ tilfredshet, kommentar });
        this.setState({ harSendt: true });
    }

    handleTilfredshetChanged = (e) => {
        this.setState({ tilfredshet: parseInt(e.target.value, 10) });
    }

    renderTilfredshetValg = () => {
        const { tilfredshet } = this.state;
        const valg: React.ReactChild[] = [];

        for (let i = 1; i <= 5; i++) {
            valg.push(<input
                type="radio"
                name="satisfactionLevel"
                key={i}
                value={i.toString()}
                checked={tilfredshet === i}
                onChange={this.handleTilfredshetChanged}
            />);
        }

        return valg;
    }

    renderForm = () => {

        const { tilfredshet, kommentar } = this.state;
        const harBesvartTilfredshet = tilfredshet > 0;

        return (
            <div>
                <p>Vi har endret layout i oversikten. Hvordan opplever du endringen? Svarene er anonyme.</p>
                <div className="tilbakemelding-modal__tilfredshet">
                    {this.renderTilfredshetValg()}
                </div>
                {harBesvartTilfredshet && (
                    <div>
                        <div className="tilbakemelding-modal__kommentar">
                            <p>Si gjerne litt mer om opplevelsen av endringen.</p>
                            <textarea
                                className="tilbakemelding-modal__kommentar-felt"
                                rows={this.KOMMENTAR_ROWS}
                                maxLength={this.KOMMENTAR_MAX_CHAR}
                                value={kommentar}
                                onChange={this.handleKommentarChanged}
                            />
                        </div>
                        <Hovedknapp onClick={this.handleSendTilbakemeldingClicked}>
                            Send
                        </Hovedknapp>
                    </div>
                )}
            </div>
        );
    }

    renderTakkMelding = () => {
        return (
            <div className="tilbakemelding-modal__takk-melding">
                <p>Takk for at du tok deg til til å gi tilbakemelding. Vi bruker innspillene til å forbedre løsningen.</p>
            </div>
        );
    }

    render() {

        const { open, onRequestClose } = this.props;
        const { harSendt } = this.state;

        return (
            <NavFrontendModal
                className="tilbakemelding-modal"
                isOpen={open}
                contentLabel="label"
                onRequestClose={onRequestClose}>
                <div className="modal-header-wrapper">
                    <header className="modal-header"/>
                </div>
                {harSendt ? this.renderTakkMelding() : this.renderForm()}
            </NavFrontendModal>
        );
    }
}

export default TilbakemeldingModal;
