import * as React from 'react';

import { FormattedMessage } from 'react-intl';
import { UndertekstBold } from 'nav-frontend-typografi';
import BrukerNavn from '../components/tabell/brukernavn';
import BrukerFnr from '../components/tabell/brukerfnr';
import ArbeidslisteButton from '../components/tabell/arbeidslistebutton';
import CheckBox from '../components/tabell/checkbox';
import ArbeidslisteIkon from '../components/tabell/arbeidslisteikon';
import MinoversiktDatokolonner from './minoversikt-datokolonner';
import Etiketter from '../components/tabell/etiketter';
import { filtervalgShape, brukerShape } from './../proptype-shapes';
import ArbeidslisteModalRediger from '../modal/arbeidsliste-modal-rediger';
import { BrukerModell, FiltervalgModell, VeilederModell } from '../model-interfaces';
import { MouseEvent } from 'react';
import Collapse from 'react-collapse';
import * as classnames from 'classnames';

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
        const arbeidslisteBruker = bruker.arbeidsliste.arbeidslisteAktiv;

        const arbeidslisteBody =
            ( <div>
                <div className="col col-xs-1"/>
                <div className="col col-xs-1"/>
                <div className="col col-xs-9">
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
                </div>
                <div className="col col-xs-1"/>
                </div>
            );

        return (
            <div>
                <li key={bruker.fnr} className="brukerliste__element brukerliste--border-bottom-thin">
                    <CheckBox className="flex col col-xs-1" bruker={bruker} settMarkert={settMarkert} />
                    <ArbeidslisteIkon className="col col-xs-1" skalVises={arbeidslisteBruker} />
                    <BrukerNavn bruker={bruker} enhetId={enhetId} />
                    <BrukerFnr bruker={bruker} />
                    <MinoversiktDatokolonner bruker={bruker} ytelse={ytelse} filtervalg={filtervalg}/>
                    <Etiketter bruker={bruker}/>
                    <ArbeidslisteButton skalVises={arbeidslisteBruker} apen={this.state.apen} onClick={this.handleArbeidslisteButtonClick} className="col col-xs-1"/>
                    <Collapse isOpened={this.state.apen}>
                        <article className="brukerliste__arbeidslisteinnhold">{arbeidslisteBody}</article>
                    </Collapse>
                </li>
            </div>
        );
    }
}

export default MinoversiktBrukerPanel;
