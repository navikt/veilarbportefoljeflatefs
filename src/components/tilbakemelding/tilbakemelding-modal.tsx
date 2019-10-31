import * as React from 'react';
import classNames from 'classnames/dedupe';
import { Flatknapp, Hovedknapp } from 'nav-frontend-knapper';
import { Textarea } from 'nav-frontend-skjema';
import { Element, Innholdstittel, Normaltekst } from 'nav-frontend-typografi';
import TilfredshetValg from './tilfredshet-valg';
import './tilbakemelding-modal.less';
import Lenke from "nav-frontend-lenker";

export interface Tilbakemelding {
    tilfredshet: number;
    kommentar: string;
}

interface TilbakemeldingModalProps {
    open: boolean;
    onTilbakemeldingSendt: (tilbakemelding: Tilbakemelding) => void;
    onIkkeVisIgjen: () => void;
}

interface TilbakemeldingModalState {
    tilfredshet: number;
    kommentar: string;
    harSendt: boolean;
    harBlittVist: boolean;
    ikkeVisIgjen: boolean;
}

class TilbakemeldingModal extends React.Component<TilbakemeldingModalProps, TilbakemeldingModalState> {

    private readonly KOMMENTAR_ROWS = 5;
    private readonly KOMMENTAR_MAX_CHAR = 750;

    constructor(props) {
        super(props);

        this.state = {
            tilfredshet: 0,
            kommentar: '',
            harSendt: false,
            harBlittVist: false,
            ikkeVisIgjen: false
        };
    }

    handleKommentarChanged = (e) => {

        const value = e.target.value;

        if (value.length <= this.KOMMENTAR_MAX_CHAR) {
            this.setState({kommentar: value});
        }

    }

    handleFormSubmitted = () => {
        const {tilfredshet, kommentar} = this.state;
        this.setState({harSendt: true});
        this.props.onTilbakemeldingSendt({tilfredshet, kommentar});
    }

    handleTilfredshetChanged = (tilfredshet: number) => {
        this.setState({tilfredshet});
    }

    handleIkkeVisIgjenClicked = () => {
        this.setState({harSendt: true, ikkeVisIgjen: true});
        this.props.onIkkeVisIgjen();
    }

    renderForm = () => {

        const {tilfredshet, kommentar} = this.state;
        const harBesvartTilfredshet = tilfredshet > 0;
        const styleTop = {marginTop: "1rem"};
        const styleBottom = {marginBottom: "1rem"};
        return (
            <div>
                <Innholdstittel className="blokk-xxs tilbakemelding-modal__tittel">
                    Tilbakemelding
                </Innholdstittel>
                <Normaltekst style={styleBottom} className="tilbakemelding-modal__ingress">
                    Vi jobber med en ny plassering av statusfiltrene i oversikten. Bruk lenken under for å se og prøve ut endringen. Kom tilbake hit og fortell oss hva du synes.
                </Normaltekst>
                <Normaltekst>
                <Lenke
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://veilarbportefoljeflatefs-pr-87.herokuapp.com/veilarbportefoljeflatefs/">
                    Demo av ny Modia oversikt
                </Lenke> (krever internett)
                </Normaltekst>
               <Normaltekst style={styleTop}>
                   Hvordan opplever du endringen? Svarene er anonyme.
               </Normaltekst>
                <div className="tilbakemelding-modal__tilfredshet">
                    <TilfredshetValg
                        className="blokk-xs"
                        onTilfredshetChanged={this.handleTilfredshetChanged}
                        defaultTilfredshet={tilfredshet}
                    />
                    {!harBesvartTilfredshet &&
                    <Flatknapp mini={true} onClick={this.handleIkkeVisIgjenClicked}>
                        Ikke vis dette igjen
                    </Flatknapp>}
                </div>
                {harBesvartTilfredshet && (
                    <form className="tilbakemelding-modal__ekspander" onSubmit={this.handleFormSubmitted}>
                        <div className="tilbakemelding-modal__kommentar">
                            <Textarea
                                className="tilbakemelding-modal__kommentar-felt"
                                label="Si gjerne litt mer om dette."
                                rows={this.KOMMENTAR_ROWS}
                                maxLength={this.KOMMENTAR_MAX_CHAR}
                                value={kommentar}
                                onChange={this.handleKommentarChanged}
                            />
                        </div>
                        <Hovedknapp role="submit" className="knapp--hoved">
                            Send
                        </Hovedknapp>
                    </form>
                )}
            </div>
        );
    }

    renderTakkMelding = () => {
        return (
            <div className="tilbakemelding-modal__takk-melding">
                <img
                    alt="Takk for din tilbakemelding"
                    className="tilbakemelding-modal__takk-ikon"
                    src="data:img/png;base64,iVBORw0KGgoAAAANSUhEUgAAADQAAAA0CAMAAADypuvZAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAABQVBMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABBQMAAAAAAAAAAAADCgYAAAAAAAACBgMAAAAAAAAAAQEAAAAAAAAFEQoAAAAAAAAAAAARMR0fWjYoc0UwilMzlVk2nV4VPCQmbkI1ml04oWEbTi81mFw0mFsWQCYykVcsgE0MIhQUOiI2m10xjlUIGA4JHBEIGQ8TOCIbTy8GEQoQMB0BBQMSNR8JGxAcUjEiYzwEDAcyklguhVA0lloXQigvh1EviFIXQygKHhINJhc3n18PLRsKHREqekkAAgEYRiogXDcnckQgXjgeWDUqeUkBBAIYRyoUOyQ0lVojZT0NJxcgXjkDCgYtg08ncEMwjFQBAwEDCQUMIxUHFAwlakAjZj4ZRysSMx8QLhwTOSIbTS4re0o3n2CSKFGVAAAAHXRSTlMAJWaVvN7s+S+M4jbA/r8kqv4E+v4Tvv4r3f5F8rmg0BYAAAABYktHRACIBR1IAAAACXBIWXMAAAsSAAALEgHS3X78AAAAB3RJTUUH4wIEDg4gBtUn9wAAAjlJREFUSMedVmdj2jAUFBuTQtgEwrFBEMxqQhLIJB1p0126917//wfUCEolGbDRfTvxDktvE2KGw+lye7w+n9fjdjkdxAb8WgACAprfQrJxzTAL5vKFYqlcLhUL+VzQOAhtrJBshoFIpVqjHGrVSgQIby6RRLUY4vUGNWGnHkdMiy7SJJJINXW6EHozhWTCrNlKI9OiS9HKIL0la7azaOt0BfQ2stvSd7LodOlKdDvICt9KpNGhluggzb0rmkS7ay3qtpH870MNGd1aY7wrA20e01iqZUdj+DAV+xflMJr2NJQ2EZ7lG+K2LscuGMc0D0Oo29VQWkeI1QIifL71ru/2eKve7h7PdyLwM9dVeKM+sM/zfaDP8wpzYABV/vAAOOT5IXDA8yoCRm0jKNTPABjyfAgMeF4LwkGcyAkvPQKOeX4MHAkGOTiJC3nh7ASnZzw/O8WJYJCHi7hREJ16PhL56FzkBbiJB0WbIZqhCA/xorSeqAQv8aG8nqgMn5pI6XpKjjC53AoTl8vBtcQkuHIaWWKSRnLCXtyQrW7e4hlLWLk0bl/ekUR3r3jGSkMuwnv3H4iah3jE02kRSuVOH+MJT5+OhT9pTMvd1Fie4fmLOXk5fiVkzKyxmFvY6/Gb+lv26HeXGAr9et7CzM3yff8DPl592hvg8xfxl3mzXNSWR1+/ff/x89fvP+Ix15aVBoDaqFEaamrjU21Qq60EasvHijWnsXzNIUoLFcvD9Vc3NhjXXxIZLNfRv/8qPkEO8w3mAAAAAElFTkSuQmCC"
                />
                <Element>
                    Takk for at du tok deg tid til å gi tilbakemelding.
                    Vi bruker innspillene til å forbedre løsningen.
                </Element>
            </div>
        );
    }

    componentDidUpdate(prevProps: TilbakemeldingModalProps) {
        if (prevProps.open && !this.state.harBlittVist) {
            this.setState({harBlittVist: true});
        }
    }

    render() {

        const {open} = this.props;
        const {harSendt, harBlittVist, ikkeVisIgjen} = this.state;

        // Make sure that the animation will trigger when closing instead of returning null (no animation)
        if ((!open && !harBlittVist) || ikkeVisIgjen) {
            return null;
        }

        return (
            <div className={classNames('tilbakemelding-modal',
                {'tilbakemelding-modal--slide-in': open},
                {'tilbakemelding-modal--slide-out': !open})}
            >
                <div className={classNames('tilbakemelding-modal__innhold',
                    {'tilbakemelding-modal__innhold--takk': harSendt})}>
                    {harSendt ? this.renderTakkMelding() : this.renderForm()}
                </div>
            </div>
        );
    }
}

export default TilbakemeldingModal;
