import * as React from 'react';
import classNames from 'classnames';
import {connect} from 'react-redux';
import './tilbakemelding-fab.less';
import {sjekkFeature} from '../../ducks/features';
import {SPOR_OM_TILBAKEMELDING} from '../../konstanter';
import TilbakemeldingModal, {Tilbakemelding} from './tilbakemelding-modal';
import {logEvent} from '../../utils/frontend-logger';
import {useRef, useState} from 'react';
import {useEventListener} from '../../hooks/use-event-listener';

// FAB = Floating Action Button
interface TilbakemeldingFabProps {
    harFeature: (feature: string) => boolean;
}

function TilbakemeldingFab({harFeature}: TilbakemeldingFabProps) {
    const TILBAKEMELDING_PREFIX = 'har_sendt_tilbakemelding';
    const TILBAKEMELDING_FEATURE_TAG = 'generell_tilfredshet_desember2020'; // NB: Husk å endre for hver nye feature

    const [isModalOpen, setModalOpen] = useState(false);
    const harSendtTilbakemelding = false;
    const [ikkeVisIgjen, setIkkeVisIgjen] = useState(false);
    const wrapperRef = useRef<HTMLDivElement>(null);

    const handleClickOutside = e => {
        if (wrapperRef.current && wrapperRef.current.contains(e.target)) {
            return;
        }
        if (isModalOpen) {
            setModalOpen(false);
        }
    };

    useEventListener('mousedown', handleClickOutside);

    const tilbakemeldingLocalStorageName = `${TILBAKEMELDING_PREFIX}__${TILBAKEMELDING_FEATURE_TAG}`;

    const harTidligereSendtTilbakemelding = () => {
        return window.localStorage.getItem(tilbakemeldingLocalStorageName) != null;
    };

    const handleFabClicked = () => {
        if (!isModalOpen) {
            logEvent('portefolje.tilbakemelding_modal_apnet');
        }

        setModalOpen(!isModalOpen);
    };

    const handleTilbakemeldingSendt = (tilbakemelding: Tilbakemelding) => {
        window.localStorage.setItem(tilbakemeldingLocalStorageName, 'true');

        logEvent('portefolje.tilbakemelding', {
            feature: TILBAKEMELDING_FEATURE_TAG,
            ...tilbakemelding
        });
    };

    const handleIkkeVisIgjen = () => {
        window.localStorage.setItem(tilbakemeldingLocalStorageName, 'true');
        logEvent('portefolje.ikke_vis_tilbakemelding_igjen');
        setIkkeVisIgjen(true);
    };

    const harRiktigFeatures = harFeature(SPOR_OM_TILBAKEMELDING); // NB: Husk å endre for hver feature
    if (ikkeVisIgjen || !harRiktigFeatures || harSendtTilbakemelding || harTidligereSendtTilbakemelding()) {
        return null;
    }

    const lukkeIkon =
        'data:img/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAaCAQAAAADQ4RFAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QAAKqNIzIAAAAJcEhZcwAACxIAAAsSAdLdfvwAAAAHdElNRQfjAgQNMjf0s2WWAAAAeElEQVQ4y7WUUQ6AMAhDG+/Sw3H/f/TDJW5RpDZxfxt9hHQAABCEeoaWSCRCQgKJBE9ol7AYSs6XkJAoH3qkx8pojb0mfA62pd8FkkmrSPN1EcrIjH1ALqxENjXPD+UZRhiWG59rtJHRsMZoGENojLu1WKwVZizLA5OtpXPPjPcAAAAAAElFTkSuQmCC';
    const apneIkon =
        'data:img/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAkCAQAAABY3hDnAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QAAKqNIzIAAAAJcEhZcwAACxIAAAsSAdLdfvwAAAAHdElNRQfjAgQQGhbxeetBAAACLklEQVRIx8XWO0xUQRTG8d+urEp8xDc+OjXYiBE0kWBjIsFGYimVaEFprCy00MLORLFweyttxBg1NsTESsBHMEJMMIKxMEQhSkHh7uKOBQtBd+9F2Ztwppib+c75Z+6Zc88dYLusQQWhypE3KKtOyU6YrBq5cExqgzqTgvsOqlGtZTTqEUyqIyu4XzVyofUIsgwKGhMFNwoGyQsyiYIzgnxKQCpRMIF0jLzWE1O6K2rdpjy2Np4eIpSbpfJpKlOaSsqNaGbcjk+W5qNlytxKe3RwHHhXaZ4pU2b+8vhP8FhpHipThv7yiMpHhNIpCHorar2CoDOOGQ2mTYfaikqtjtmOEAVeljquypYBfMx3F2Njz5h2PC4flQ/vkDETDkTG7TXkk8PRzChwyhXTXtpfUd1mXM71iGNfpNxWeizvq1NlCdvtqYJH1sdlIa6OM7J+mPDAaXtssc5Wza56b8YHG+LTGwemxjl9fsr76K033vkmGNVtU0xUEFKKUtKx8I1atdtntbSCKc89NKwY6Z9SFBgR1EvS6gUjaa/RlSi4C69okPPLpYR+qCtd9ktOQwrn3ZKWM6Lwh1NRt3ul5xWuxXSzOcvYZ5WiC27PLrTol69wWXoxv4+ef7699WthYcNcrf6PdOx3x4BmrPFQqx/O+rLIjgtG5BZ7rSOCfmzUJxjXkMgZzIN3GBKM2ZMUdhY8ZlQwbGdy2FlwEAzEfrxLBj+Lv0YtxTb77K5VSw3/DdK0H6HFZvnVAAAAAElFTkSuQmCC';

    return (
        <div ref={wrapperRef}>
            <div
                className={classNames('tilbakemelding-fab', {
                    'tilbakemelding-fab__trykket': isModalOpen
                })}
                onClick={handleFabClicked}
                data-testid={isModalOpen ? 'tilbakemelding_fab_knapp_trykket' : 'tilbakemelding_fab_knapp'}
            >
                <img
                    alt="Åpne/Lukk tilbakemeldingform"
                    className={classNames({
                        'tilbakemelding-fab__ikon--lukke': isModalOpen,
                        'tilbakemelding-fab__ikon--apne': !isModalOpen
                    })}
                    src={isModalOpen ? lukkeIkon : apneIkon}
                />
            </div>
            <TilbakemeldingModal
                open={isModalOpen}
                onTilbakemeldingSendt={handleTilbakemeldingSendt}
                onIkkeVisIgjen={handleIkkeVisIgjen}
            />
        </div>
    );
}

const mapStateToProps = state => ({
    harFeature: (feature: string) => sjekkFeature(state, feature)
});

export default connect(mapStateToProps)(TilbakemeldingFab);
