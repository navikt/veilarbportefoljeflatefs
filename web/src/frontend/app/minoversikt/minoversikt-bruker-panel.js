import React, { PropTypes as PT, Component } from 'react';
import { FormattedMessage } from 'react-intl';
import Hybridpanel from '../components/tabell/hybridpanel/hybridpanel';
import Brukerinformasjon from '../components/tabell/brukerinformasjon';
import MinoversiktDatokolonner from './minoversikt-datokolonner';
import Etiketter from '../components/tabell/etiketter';
import { filtervalgShape, brukerShape } from './../proptype-shapes';
import ArbeidslisteModalRediger from '../modal/arbeidsliste-modal-rediger';

class MinoversiktBrukerPanel extends Component {

    constructor(props) {
        super(props);
        this.state = { redigerArbeidslisteModalIsOpen: false };
        this.redigerOnClickHandler = this.redigerOnClickHandler.bind(this);
        this.lukkRedigerArbeidslisteModal = this.lukkRedigerArbeidslisteModal.bind(this);
    }

    redigerOnClickHandler() {
        this.setState({ redigerArbeidslisteModalIsOpen: true });
    }

    lukkRedigerArbeidslisteModal() {
        this.setState({ redigerArbeidslisteModalIsOpen: false });
    }

    render() {
        const { bruker, settMarkert, enhetId, filtervalg, innloggetVeileder } = this.props;
        const { ytelse } = filtervalg;
        const childrenHead =
        (<div className="brukerpanel">
            <Brukerinformasjon
                bruker={bruker}
                enhetId={enhetId}
                settMarkert={settMarkert}
            />
            <MinoversiktDatokolonner bruker={bruker} ytelse={ytelse} filtervalg={filtervalg} />
            <Etiketter bruker={bruker} />
        </div>);

        const sistEndretDato = new Date(bruker.arbeidsliste.endringstidspunkt).toLocaleDateString();
        const sistEndretAv = bruker.arbeidsliste.sistEndretAv.veilederId;
        const childrenBody =
            (<div className="brukerpanel__body">
                <h5>
                    <FormattedMessage id="arbeidsliste.kommentar.header" />
                </h5>
                {bruker.arbeidsliste.kommentar}
                <p className="arbeidsliste--panel-footer typo-undertekst">
                    <FormattedMessage
                        id="arbeidsliste.kommentar.footer"
                        values={{
                            dato: sistEndretDato,
                            veileder: sistEndretAv
                        }}
                    />
                    <button
                        className="lenke lenke--frittstående arbeidsliste--rediger-lenke"
                        onClick={this.redigerOnClickHandler}
                    >
                        <FormattedMessage id="arbeidsliste.kommentar.footer.knapp" />
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
            <Hybridpanel childrenHead={childrenHead} childrenBody={childrenBody} />
            :
            <div className="panel_hode">{childrenHead}</div>
        );
    }
}

MinoversiktBrukerPanel.propTypes = {
    bruker: brukerShape,
    settMarkert: PT.func.isRequired,
    enhetId: PT.string.isRequired,
    filtervalg: filtervalgShape.isRequired,
    innloggetVeileder: PT.string.isRequired
};

export default MinoversiktBrukerPanel;
