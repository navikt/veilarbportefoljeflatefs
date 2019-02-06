import * as React from 'react';
import * as classNames from 'classnames';
import { connect } from 'react-redux';
import './tilbakemelding-fab.less';
import { sjekkFeature } from '../../ducks/features';
import { FLYTT_FILTER_VENSTRE, SPOR_OM_TILBAKEMELDING } from '../../konstanter';
import TilbakemeldingModal, { Tilbakemelding } from './tilbakemelding-modal';
import { logEvent } from '../../utils/frontend-logger';

// FAB = Floating Action Button

interface StateProps {
    harFeature: (feature: string) => boolean;
}

interface TilbakemeldingFabState {
    isModalOpen: boolean;
    harSendtTilbakemelding: boolean;
    ikkeVisIgjen: boolean;
}

class TilbakemeldingFab extends React.Component<StateProps, TilbakemeldingFabState> {

    private readonly TILBAKEMELDING_PREFIX = 'har_sendt_tilbakemelding';
    private readonly TILBAKEMELDING_FEATURE_TAG = 'flytt_filter_venstre'; // NB: Husk å endre for hver nye feature

    private wrapperRef;

    constructor(props: StateProps) {
        super(props);

        this.state = {
            isModalOpen: false,
            harSendtTilbakemelding: false,
            ikkeVisIgjen: false
        };
    }

    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }

    handleClickOutside = (e) => {
        if (this.state.isModalOpen && this.wrapperRef && !this.wrapperRef.contains(e.target)) {
            this.setState({ isModalOpen: false });
        }
    }

    tilbakemeldingLocalStorageName = () => {
        return `${this.TILBAKEMELDING_PREFIX}__${this.TILBAKEMELDING_FEATURE_TAG}`;
    }

    harTidligereSendtTilbakemelding = () => {
        return window.localStorage.getItem(this.tilbakemeldingLocalStorageName()) != null;
    }

    handleFabClicked = () => {

        if (!this.state.isModalOpen) {
            logEvent('portefolje.tilbakemelding_modal_apnet');
        }

        this.setState((prevState: TilbakemeldingFabState) => {
            return { isModalOpen: !prevState.isModalOpen };
        });

    }

    handleTilbakemeldingSendt = (tilbakemelding: Tilbakemelding) => {
        window.localStorage.setItem(this.tilbakemeldingLocalStorageName(), 'true');
        logEvent('portefolje.tilbakemelding',
            { feature: this.TILBAKEMELDING_FEATURE_TAG, ...tilbakemelding });
    }

    handleIkkeVisIgjen = () => {
        window.localStorage.setItem(this.tilbakemeldingLocalStorageName(), 'true');
        logEvent('portefolje.ikke_vis_tilbakemelding_igjen');
        this.setState({ ikkeVisIgjen: true });
    }

    render() {

        const { harFeature } = this.props;
        const { isModalOpen, harSendtTilbakemelding, ikkeVisIgjen } = this.state;
        const harRiktigFeatures = harFeature(SPOR_OM_TILBAKEMELDING) && harFeature(FLYTT_FILTER_VENSTRE); // NB: Husk å endre for hver feature

        if (ikkeVisIgjen || !harRiktigFeatures || harSendtTilbakemelding || this.harTidligereSendtTilbakemelding()) {
            return null;
        }

        const lukkeIkon = 'data:img/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAaCAQAAAADQ4RFAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QAAKqNIzIAAAAJcEhZcwAACxIAAAsSAdLdfvwAAAAHdElNRQfjAgQNMjf0s2WWAAAAeElEQVQ4y7WUUQ6AMAhDG+/Sw3H/f/TDJW5RpDZxfxt9hHQAABCEeoaWSCRCQgKJBE9ol7AYSs6XkJAoH3qkx8pojb0mfA62pd8FkkmrSPN1EcrIjH1ALqxENjXPD+UZRhiWG59rtJHRsMZoGENojLu1WKwVZizLA5OtpXPPjPcAAAAAAElFTkSuQmCC';
        const apneIkon = 'data:img/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAkCAQAAABY3hDnAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QAAKqNIzIAAAAJcEhZcwAACxIAAAsSAdLdfvwAAAAHdElNRQfjAgQQGhbxeetBAAACLklEQVRIx8XWO0xUQRTG8d+urEp8xDc+OjXYiBE0kWBjIsFGYimVaEFprCy00MLORLFweyttxBg1NsTESsBHMEJMMIKxMEQhSkHh7uKOBQtBd+9F2Ztwppib+c75Z+6Zc88dYLusQQWhypE3KKtOyU6YrBq5cExqgzqTgvsOqlGtZTTqEUyqIyu4XzVyofUIsgwKGhMFNwoGyQsyiYIzgnxKQCpRMIF0jLzWE1O6K2rdpjy2Np4eIpSbpfJpKlOaSsqNaGbcjk+W5qNlytxKe3RwHHhXaZ4pU2b+8vhP8FhpHipThv7yiMpHhNIpCHorar2CoDOOGQ2mTYfaikqtjtmOEAVeljquypYBfMx3F2Njz5h2PC4flQ/vkDETDkTG7TXkk8PRzChwyhXTXtpfUd1mXM71iGNfpNxWeizvq1NlCdvtqYJH1sdlIa6OM7J+mPDAaXtssc5Wza56b8YHG+LTGwemxjl9fsr76K033vkmGNVtU0xUEFKKUtKx8I1atdtntbSCKc89NKwY6Z9SFBgR1EvS6gUjaa/RlSi4C69okPPLpYR+qCtd9ktOQwrn3ZKWM6Lwh1NRt3ul5xWuxXSzOcvYZ5WiC27PLrTol69wWXoxv4+ef7699WthYcNcrf6PdOx3x4BmrPFQqx/O+rLIjgtG5BZ7rSOCfmzUJxjXkMgZzIN3GBKM2ZMUdhY8ZlQwbGdy2FlwEAzEfrxLBj+Lv0YtxTb77K5VSw3/DdK0H6HFZvnVAAAAAElFTkSuQmCC';

        return (
            <div ref={(ref) => { this.wrapperRef = ref; }}>
                <div className={classNames('tilbakemelding-fab', { 'tilbakemelding-fab__trykket': isModalOpen })} onClick={this.handleFabClicked}>
                    <img
                        className={classNames({
                            'tilbakemelding-fab__ikon--lukke': isModalOpen,
                            'tilbakemelding-fab__ikon--apne': !isModalOpen
                        })}
                        src={isModalOpen ? lukkeIkon : apneIkon}
                    />
                </div>
                <TilbakemeldingModal
                    open={isModalOpen}
                    onTilbakemeldingSendt={this.handleTilbakemeldingSendt}
                    onIkkeVisIgjen={this.handleIkkeVisIgjen}
                />
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    harFeature: (feature: string) => sjekkFeature(state, feature)
});

export default connect(mapStateToProps)(TilbakemeldingFab);
