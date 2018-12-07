import * as React from 'react';
import { MouseEvent } from 'react';
import * as classNames from 'classnames';
import ArbeidslisteButton from '../components/tabell/arbeidslistebutton';
import CheckBox from '../components/tabell/checkbox';
import ArbeidslisteIkon from '../components/tabell/arbeidslisteikon';
import Etiketter from '../components/tabell/etiketter';
import { BrukerModell, EtikettType, FiltervalgModell } from '../model-interfaces';
import Collapse from 'react-collapse';
import MinOversiktKolonner from './minoversikt-kolonner';
import ArbeidslistePanel from './minoversikt-arbeidslistepanel';
import { Kolonne } from '../ducks/ui/listevisning';
import Etikett from '../components/tabell/etikett';
import { FormattedMessage } from 'react-intl';

interface MinOversiktBrukerPanelProps {
    bruker: BrukerModell;
    settMarkert: () => void;
    enhetId: string;
    filtervalg: FiltervalgModell;
    innloggetVeileder: string;
    onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
    valgteKolonner: Kolonne[];
    varForrigeBruker?: boolean;
    erVurderingFeaturePa: boolean;
    erSykmeldtMedArbeidsgiverFeaturePa: boolean;
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
        this.setState({apen: !this.state.apen});
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
        const {bruker, enhetId, filtervalg, valgteKolonner, innloggetVeileder, settMarkert, varForrigeBruker } = this.props;

        const arbeidslisteAktiv = bruker.arbeidsliste.arbeidslisteAktiv;

        const classname  = classNames('brukerliste--border-bottom-thin ', {
            'brukerliste--forrigeBruker': varForrigeBruker,
        });

        return (
            <li className={classname}>
                <div className="brukerliste__element">
                    <div className="brukerliste__gutter-left brukerliste--min-width-minside">
                        <CheckBox bruker={bruker} settMarkert={settMarkert}/>
                        <ArbeidslisteIkon skalVises={arbeidslisteAktiv}/>
                    </div>
                    <MinOversiktKolonner
                        className="brukerliste__innhold flex flex--center"
                        bruker={bruker}
                        filtervalg={filtervalg}
                        valgteKolonner={valgteKolonner}
                        enhetId={enhetId}
                    />
                    <div className="brukerliste__gutter-right">
                        <ArbeidslisteButton
                            skalVises={arbeidslisteAktiv}
                            apen={this.state.apen}
                            onClick={this.handleArbeidslisteButtonClick}
                        />
                        <div>
                            <Etiketter
                                bruker={bruker}
                                erVurderingFeaturePa={this.props.erVurderingFeaturePa}
                                erSykmeldtMedArbeidsgiverFeaturePa={this.props.erSykmeldtMedArbeidsgiverFeaturePa}
                            />
                            <Etikett
                                type={EtikettType.NYBRUKER}
                                skalVises={bruker.nyForVeileder === true}
                            >
                                <FormattedMessage id="enhet.portefolje.tabelletikett.ny.bruker"/>
                            </Etikett>
                        </div>
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
