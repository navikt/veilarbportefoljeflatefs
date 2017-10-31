import * as React from 'react';
import { MouseEvent } from 'react';
import ArbeidslisteButton from '../components/tabell/arbeidslistebutton';
import CheckBox from '../components/tabell/checkbox';
import ArbeidslisteIkon from '../components/tabell/arbeidslisteikon';
import Etiketter from '../components/tabell/etiketter';
import { brukerShape, filtervalgShape } from './../proptype-shapes';
import { BrukerModell, FiltervalgModell } from '../model-interfaces';
import Collapse from 'react-collapse';
import MinOversiktKolonner from './minoversikt-kolonner';
import ArbeidslistePanel from './minoversikt-arbeidslistepanel';

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
        this.handleArbeidslisteButtonClick = this.handleArbeidslisteButtonClick.bind(this);
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
        const {bruker, enhetId, filtervalg, innloggetVeileder, settMarkert} = this.props;

        const arbeidslisteAktiv = bruker.arbeidsliste.arbeidslisteAktiv;

        return (
            <li className="brukerliste--border-bottom-thin">
                <div className="brukerliste__element">
                    <div className="brukerliste__gutter-left brukerliste--min-width-minside">
                        <CheckBox bruker={bruker} settMarkert={settMarkert} />
                        <ArbeidslisteIkon skalVises={arbeidslisteAktiv} />
                    </div>
                    <MinOversiktKolonner
                        className="brukerliste__innhold flex flex--center"
                        bruker={bruker}
                        filtervalg={filtervalg}
                        enhetId={enhetId}
                    />
                    <div className="brukerliste__gutter-right">
                        <ArbeidslisteButton
                            skalVises={arbeidslisteAktiv}
                            apen={this.state.apen}
                            onClick={this.handleArbeidslisteButtonClick}
                        />
                        <Etiketter bruker={bruker}/>
                    </div>
                </div>
                <Collapse isOpened={this.state.apen}>
                    <ArbeidslistePanel
                        bruker={bruker}
                        innloggetVeileder={innloggetVeileder}
                        redigerArbeidslisteModalIsOpen={this.state.redigerArbeidslisteModalIsOpen}
                        lukkRedigerArbeidslisteModal={this.lukkRedigerArbeidslisteModal}
                        redigerOnClickHandler={this.redigerOnClickHandler}
                    />
                </Collapse>
            </li>
        );
    }
}

export default MinoversiktBrukerPanel;
