import * as React from 'react';
import * as classNames from 'classnames';
import { Hovedknapp } from 'nav-frontend-knapper';
import { Textarea } from 'nav-frontend-skjema';
import { Innholdstittel, Normaltekst } from 'nav-frontend-typografi';
import TilfredshetValg from './tilfredshet-valg';
import './tilbakemelding-modal.less';

export interface Tilbakemelding {
    tilfredshet: number;
    kommentar: string;
}

interface TilbakemeldingModalProps {
    open: boolean;
    onTilbakemeldingSendt: (tilbakemelding: Tilbakemelding) => void;
}

interface TilbakemeldingModalState {
    tilfredshet: number;
    kommentar: string;
    harSendt: boolean;
    harBlittVist: boolean;
}

class TilbakemeldingModal extends React.Component<TilbakemeldingModalProps, TilbakemeldingModalState> {

    private readonly KOMMENTAR_ROWS = 5;
    private readonly KOMMENTAR_MAX_CHAR = 500;

    constructor(props) {
        super(props);

        this.state = {
            tilfredshet: 0,
            kommentar: '',
            harSendt: false,
            harBlittVist: false
        };
    }

    handleKommentarChanged = (e) => {
        this.setState({ kommentar: e.target.value });
    }

    handleSendTilbakemeldingClicked = () => {
        const { tilfredshet, kommentar } = this.state;
        this.setState({ harSendt: true });
        this.props.onTilbakemeldingSendt({ tilfredshet, kommentar });
    }

    handleTilfredshetChanged = (tilfredshet: number) => {
        this.setState({ tilfredshet });
    }

    renderForm = () => {

        const { tilfredshet, kommentar } = this.state;
        const harBesvartTilfredshet = tilfredshet > 0;

        return (
            <div>
                <Innholdstittel className="blokk-xs">
                    Tilbakemelding
                </Innholdstittel>
                <Normaltekst className="tilbakemelding-modal__ingress">
                    Vi har endret layout i oversikten. Hvordan opplever du endringen? Svarene er anonyme.
                </Normaltekst>
                <div className="tilbakemelding-modal__tilfredshet">
                    <TilfredshetValg
                        onTilfredshetChanged={this.handleTilfredshetChanged}
                        defaultTilfredshet={tilfredshet}
                    />
                </div>
                {harBesvartTilfredshet && (
                    <div>
                        <div className="tilbakemelding-modal__kommentar">
                            <Textarea
                                className="tilbakemelding-modal__kommentar-felt"
                                label="Si gjerne litt mer om opplevelsen av endringen."
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
                <Normaltekst>
                    Takk for at du tok deg til til å gi tilbakemelding.
                    Vi bruker innspillene til å forbedre løsningen.
                </Normaltekst>
            </div>
        );
    }

    componentDidUpdate(prevProps: TilbakemeldingModalProps) {
        if (prevProps.open) {
            this.setState({ harBlittVist: true });
        }
    }

    render() {

        const { open } = this.props;
        const { harSendt, harBlittVist } = this.state;

        // Make sure that the animation will trigger when closing instead of returning null (no animation)
        if (!open && !harBlittVist) {
            return null;
        }

        return (
            <div className={classNames('tilbakemelding-modal',
                { 'tilbakemelding-modal--slide-in': open },
                { 'tilbakemelding-modal--slide-out': !open })}
            >
                <div className={classNames('tilbakemelding-modal__innhold',
                    { 'tilbakemelding-modal__innhold--takk': harSendt})}>
                    {harSendt ? this.renderTakkMelding() : this.renderForm()}
                </div>
            </div>
        );
    }
}

export default TilbakemeldingModal;
