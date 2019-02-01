import * as React from 'react';
import { connect } from 'react-redux';
import './tilbakemelding-fab.less';
import { sjekkFeature } from '../../ducks/features';
import { FLYTT_FILTER_VENSTRE, SPOR_OM_TILBAKEMELDING } from '../../konstanter';
import TilbakemeldingModal, { Tilbakemelding } from './tilbakemelding-modal';

// FAB = Floating Action Button

interface StateProps {
    harFeature: (feature: string) => boolean;
}

interface TilbakemeldingFabState {
    isModalOpen: boolean;
    harSendtTilbakemelding: boolean;
}

class TilbakemeldingFab extends React.Component<StateProps, TilbakemeldingFabState> {

    private readonly TILBAKEMELDING_PREFIX = 'har_sendt_tilbakemelding';
    private readonly TILBAKEMELDING_FEATURE_TAG = 'flytt_filter_venstre'; // NB: Husk å endre for hver nye feature

    constructor(props: StateProps) {
        super(props);

        this.state = {
            isModalOpen: false,
            harSendtTilbakemelding: false
        };
    }

    tilbakemeldingLocalStorageName = () => {
        return `${this.TILBAKEMELDING_PREFIX}__${this.TILBAKEMELDING_FEATURE_TAG}`;
    }

    harTidligereSendtTilbakemelding = () => {
        return window.localStorage.getItem(this.tilbakemeldingLocalStorageName()) != null;
    }

    handleFabClicked = () => {
        this.setState((prevState: TilbakemeldingFabState) => {
            return { isModalOpen: !prevState.isModalOpen };
        });
    }

    handleTilbakemeldingSendt = (tilbakemelding: Tilbakemelding) => {
        window.localStorage.setItem(this.tilbakemeldingLocalStorageName(), 'true');
        (window as any).frontendlogger.event('portefolje.tilbakemelding',
            { feature: this.TILBAKEMELDING_FEATURE_TAG, ...tilbakemelding }, {});
    }

    render() {

        const { harFeature } = this.props;
        const { isModalOpen, harSendtTilbakemelding } = this.state;
        const harRiktigFeatures = harFeature(SPOR_OM_TILBAKEMELDING) && harFeature(FLYTT_FILTER_VENSTRE); // NB: Husk å endre for hver feature

        if (!harRiktigFeatures || harSendtTilbakemelding || this.harTidligereSendtTilbakemelding()) {
            return null;
        }

        return (
            <div>
                <div className="tilbakemelding-fab" onClick={this.handleFabClicked}>
                    <span className="tilbakemelding-fab__ikon">+</span>
                </div>
                <TilbakemeldingModal
                    open={isModalOpen}
                    onTilbakemeldingSendt={this.handleTilbakemeldingSendt}
                />
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    harFeature: (feature: string) => sjekkFeature(state, feature)
});

export default connect(mapStateToProps)(TilbakemeldingFab);
