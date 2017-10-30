import * as React from 'react';
import {MouseEvent} from 'react';

import {FormattedMessage} from 'react-intl';
import {UndertekstBold} from 'nav-frontend-typografi';
import ArbeidslisteButton from '../components/tabell/arbeidslistebutton';
import CheckBox from '../components/tabell/checkbox';
import ArbeidslisteIkon from '../components/tabell/arbeidslisteikon';
import Etiketter from '../components/tabell/etiketter';
import {brukerShape, filtervalgShape} from './../proptype-shapes';
import ArbeidslisteModalRediger from '../modal/arbeidsliste-modal-rediger';
import {BrukerModell, FiltervalgModell} from '../model-interfaces';
import Collapse from 'react-collapse';
import MinOversiktKolonner from "./minoversikt-kolonner";

interface MinOversiktBrukerPanelProps {
    bruker: BrukerModell;
    settMarkert: () => void;
    enhetId: string;
    filtervalg: FiltervalgModell;
    innloggetVeileder: string;
    onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
}

interface MinOversiktBrukerPanelState {
    redigerArbeidslisteModalIsOpen: boolean;
    apen: boolean;
}

class MinoversiktBrukerPanel extends React.Component<MinOversiktBrukerPanelProps, MinOversiktBrukerPanelState> {

    constructor(props) {
        super(props);
        this.state = {
            redigerArbeidslisteModalIsOpen: false,
            apen: false
        };
        this.redigerOnClickHandler = this.redigerOnClickHandler.bind(this);
        this.lukkRedigerArbeidslisteModal = this.lukkRedigerArbeidslisteModal.bind(this);
        this.handleArbeidslisteButtonClick = this.handleArbeidslisteButtonClick.bind(this)
    }

    handleArbeidslisteButtonClick(event) {
        event.preventDefault();
        this.setState({ apen: !this.state.apen });
        if (this.props.onClick) {
            this.props.onClick(event);
        }
    }

    redigerOnClickHandler() {
        this.setState({redigerArbeidslisteModalIsOpen: true});
    }

    lukkRedigerArbeidslisteModal() {
        this.setState({redigerArbeidslisteModalIsOpen: false});
    }

    render() {
        const {bruker, enhetId, filtervalg, innloggetVeileder, settMarkert, onClick} = this.props;
        const {ytelse} = filtervalg;
        const sistEndretDato = new Date(bruker.arbeidsliste.endringstidspunkt);
        const sistEndretAv = bruker.arbeidsliste.sistEndretAv.veilederId;
        const arbeidslisteAktiv = bruker.arbeidsliste.arbeidslisteAktiv;

        const arbeidslisteBody =
            (<span className="flex">
                    <span className="brukerliste__gutter-left brukerliste--min-width-3"/>
                    <span className="brukerliste__innhold brukerliste__arbeidslisteinnhold flex--grow">
                        <UndertekstBold>
                            <FormattedMessage id="arbeidsliste.kommentar.header"/>
                        </UndertekstBold>
                        <p>{bruker.arbeidsliste.kommentar}</p>
                        <p className="brukerliste__arbeidslisteinnhold-footer typo-undertekst">
                            <FormattedMessage
                                id="arbeidsliste.kommentar.footer"
                                values={{
                                    dato: sistEndretDato.toLocaleDateString(),
                                    veileder: sistEndretAv
                                }}
                            />
                            <button
                                className="lenke lenke--frittstående arbeidsliste--rediger-lenke"
                                onClick={this.redigerOnClickHandler}
                            >
                                <FormattedMessage id="arbeidsliste.kommentar.footer.knapp"/>
                            </button>
                            <ArbeidslisteModalRediger
                                bruker={bruker}
                                isOpen={this.state.redigerArbeidslisteModalIsOpen}
                                lukkModal={this.lukkRedigerArbeidslisteModal}
                                innloggetVeileder={innloggetVeileder}
                                sistEndretDato={sistEndretDato}
                                sistEndretAv={sistEndretAv}
                            />
                        </p>
                    </span>
                </span>
            );

        return (
            <li className="brukerliste--border-bottom-thin">
                <div className="brukerliste__element">
                    <div className="brukerliste__gutter-left brukerliste--min-width-3">
                        <CheckBox bruker={bruker} settMarkert={settMarkert} />
                        <ArbeidslisteIkon skalVises={arbeidslisteAktiv} />
                    </div>
                    <MinOversiktKolonner className="brukerliste__innhold flex flex--center" bruker={bruker} ytelse={ytelse} filtervalg={filtervalg} enhetId={enhetId}/>
                    <div className="brukerliste__gutter-right">
                        <ArbeidslisteButton skalVises={arbeidslisteAktiv} apen={this.state.apen} onClick={this.handleArbeidslisteButtonClick} />
                        <Etiketter bruker={bruker}/>
                    </div>
                </div>
                <Collapse isOpened={this.state.apen}>
                    <article className="brukerliste__arbeidslistepanel">{arbeidslisteBody}</article>
                </Collapse>
            </li>
        );
    }
}

export default MinoversiktBrukerPanel;
