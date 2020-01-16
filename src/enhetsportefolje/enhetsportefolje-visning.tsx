import React from 'react';
import { connect } from 'react-redux';
import { hentPortefoljeForEnhet, settSortering } from '../ducks/portefolje';
import { getSorteringsFeltFromUrl, getSorteringsRekkefolgeFromUrl, updateLastPath } from '../utils/url-utils';
import EnhetTabell from './enhetsportefolje-tabell';
import { ASCENDING, DESCENDING } from '../konstanter';
import { FiltervalgModell, ValgtEnhetModell } from '../model-interfaces';
import { selectSideStorrelse } from '../components/toolbar/paginering/paginering-selector';
import { ModalEnhetSideController } from '../components/modal/modal-enhet-side-controller';
import Innholdslaster from '../innholdslaster/innholdslaster';
import { STATUS } from '../ducks/utils';

interface EnhetsportefoljeVisningProps {
    valgtEnhet: ValgtEnhetModell;
    portefolje: any;
    hentPortefolje: (enhetid: string | undefined, sorteringsrekkefolge: string, sorteringsfelt: string, filtervalg: FiltervalgModell) => any;
    veiledere: any;
    doSettSortering: (sorteringsrekkefolge: string, felt: string) => void;
    sorteringsrekkefolge: string;
    sorteringsfelt: string;
    filtervalg: FiltervalgModell;
    visningsmodus: string;
    sideStorrelse: number;
}

class EnhetsportefoljeVisning extends React.Component<EnhetsportefoljeVisningProps> {
    componentWillMount() {
        const {
            valgtEnhet, hentPortefolje, filtervalg
        } = this.props;

        const sorteringsfelt = getSorteringsFeltFromUrl();
        const sorteringsrekkefolge = getSorteringsRekkefolgeFromUrl();
        this.props.doSettSortering(sorteringsrekkefolge, sorteringsfelt);

        hentPortefolje(
            valgtEnhet.enhet!.enhetId,
            sorteringsrekkefolge,
            sorteringsfelt,
            filtervalg
        );
        this.settSorteringOgHentPortefolje = this.settSorteringOgHentPortefolje.bind(this);
    }

    settSorteringOgHentPortefolje(felt) {
        const {
            sorteringsrekkefolge,
            sorteringsfelt,
            doSettSortering,
            valgtEnhet,
            hentPortefolje,
            filtervalg,
        } = this.props;

        let valgtRekkefolge = '';

        if (felt !== sorteringsfelt) {
            valgtRekkefolge = ASCENDING;
        } else {
            valgtRekkefolge = sorteringsrekkefolge === ASCENDING ? DESCENDING : ASCENDING;
        }
        doSettSortering(valgtRekkefolge, felt);
        hentPortefolje(
            valgtEnhet.enhet!.enhetId,
            valgtRekkefolge,
            felt,
            filtervalg,
        );
    }

    render() {
        const {
            veiledere,
            portefolje,

        } = this.props;

        updateLastPath();

        const tilordningerStatus = portefolje.tilordningerstatus !== STATUS.RELOADING ? STATUS.OK : STATUS.RELOADING;

        return (
            <Innholdslaster
                avhengigheter={[portefolje, veiledere, {status: tilordningerStatus}]}>
                <div className="portefolje__container">
                    <EnhetTabell
                        veiledere={veiledere.data.veilederListe}
                        settSorteringOgHentPortefolje={this.settSorteringOgHentPortefolje}
                    />
                    <ModalEnhetSideController/>
                </div>
            </Innholdslaster>
        );
    }
}

const mapStateToProps = (state) => ({
    portefolje: state.portefolje,
    valgtEnhet: state.enheter.valgtEnhet,
    veiledere: state.veiledere,
    sorteringsrekkefolge: state.portefolje.sorteringsrekkefolge,
    sorteringsfelt: state.portefolje.sorteringsfelt,
    filtervalg: state.filtrering,
    visningsmodus: state.paginering.visningsmodus,
    sideStorrelse: selectSideStorrelse(state),
});

const mapDispatchToProps = (dispatch) => ({
    hentPortefolje: (enhet, rekkefolge, sorteringsfelt, filtervalg) =>
        dispatch(hentPortefoljeForEnhet(enhet, rekkefolge, sorteringsfelt, filtervalg)),
    doSettSortering: (rekkefolge, felt) => dispatch(settSortering(rekkefolge, felt)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EnhetsportefoljeVisning);
