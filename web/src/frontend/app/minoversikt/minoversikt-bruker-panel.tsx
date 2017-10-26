import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { UndertekstBold } from 'nav-frontend-typografi';
import Hybridpanel from '../components/tabell/hybridpanel/hybridpanel';
import BrukerNavn from '../components/tabell/brukernavn';
import BrukerFnr from '../components/tabell/brukerfnr';
import CheckBox from '../components/tabell/checkbox';
import ArbeidslisteIkon from '../components/tabell/arbeidslisteikon';
import MinoversiktDatokolonner from './minoversikt-datokolonner';
import Etiketter from '../components/tabell/etiketter';
import { filtervalgShape, brukerShape } from './../proptype-shapes';
import ArbeidslisteModalRediger from '../modal/arbeidsliste-modal-rediger';
import { BrukerModell, FiltervalgModell, VeilederModell } from '../model-interfaces';

interface MinOversiktBrukerPanelProps {
    bruker: BrukerModell;
    settMarkert: () => void;
    enhetId: string;
    filtervalg: FiltervalgModell;
    innloggetVeileder: string;
}

interface MinOversiktBrukerPanelState {
    redigerArbeidslisteModalIsOpen: boolean;
}

class MinoversiktBrukerPanel extends React.Component<MinOversiktBrukerPanelProps, MinOversiktBrukerPanelState> {

    constructor(props) {
        super(props);
        this.state = {redigerArbeidslisteModalIsOpen: false};
        this.redigerOnClickHandler = this.redigerOnClickHandler.bind(this);
        this.lukkRedigerArbeidslisteModal = this.lukkRedigerArbeidslisteModal.bind(this);
    }

    redigerOnClickHandler() {
        this.setState({redigerArbeidslisteModalIsOpen: true});
    }

    lukkRedigerArbeidslisteModal() {
        this.setState({redigerArbeidslisteModalIsOpen: false});
    }

    render() {
        const {bruker, enhetId, filtervalg, innloggetVeileder, settMarkert} = this.props;
        const {ytelse} = filtervalg;
        const childrenHead =
            (<div className="brukerpanel">
                <CheckBox className="flex col col-xs-1" bruker={bruker} settMarkert={settMarkert} />
                <ArbeidslisteIkon bruker={bruker} className="col col-xs-1"/>
                <BrukerNavn bruker={bruker} enhetId={enhetId} />
                <BrukerFnr bruker={bruker}/>
                <MinoversiktDatokolonner bruker={bruker} ytelse={ytelse} filtervalg={filtervalg}/>
                <Etiketter bruker={bruker}/>
            </div>);

        const sistEndretDato = new Date(bruker.arbeidsliste.endringstidspunkt);
        const sistEndretAv = bruker.arbeidsliste.sistEndretAv.veilederId;
        const childrenBody =
            (<div className="brukerpanel__body">
                    <UndertekstBold>
                        <FormattedMessage id="arbeidsliste.kommentar.header"/>
                    </UndertekstBold>
                    <p className="arbeidsliste-kommentar-tekst">{bruker.arbeidsliste.kommentar}</p>
                    <p className="arbeidsliste--panel-footer typo-undertekst">
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

            );

        return (
            bruker.arbeidsliste.arbeidslisteAktiv ?
                <Hybridpanel childrenHead={childrenHead} childrenBody={childrenBody}/>
                :
                <div className="panel_hode">{childrenHead}</div>
        );
    }
}

export default MinoversiktBrukerPanel;
