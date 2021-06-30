import * as React from 'react';
import classNames from 'classnames';
import {connect} from 'react-redux';
import './tilbakemelding-fab.less';
import {sjekkFeature} from '../../ducks/features';
import {SPOR_OM_TILBAKEMELDING} from '../../konstanter';
import TilbakemeldingModal, {BegrensetCheckboxValgProps, Tilbakemelding} from './tilbakemelding-modal';
import {logEvent} from '../../utils/frontend-logger';
import {useRef, useState} from 'react';
import {useEventListener} from '../../hooks/use-event-listener';
import tilbakemeldingBilde from './tilbakemelding.svg';
import lukkBilde from './lukk.svg';
import {TilbakemeldingCheckboxProps} from "./familiemedlem-checkboxvalg";
// FAB = Floating Action Button
interface TilbakemeldingFabProps {
    harFeature: (feature: string) => boolean;
}

function TilbakemeldingFab({harFeature}: TilbakemeldingFabProps) {
    const TILBAKEMELDING_PREFIX = 'tilbakemelding';
    const TILBAKEMELDING_FEATURE_TAG = 'opplysninger_om_familiemedlemmer'; // TODO: Husk å endre for hver nye feature
    const TILBAKEMELDING_LOCALSTORAGE_NAME = `${TILBAKEMELDING_PREFIX}__${TILBAKEMELDING_FEATURE_TAG}`;

    const [hideFab, setHideFab] = useState(false);
    const [isModalOpen, setModalOpen] = useState(false);
    // eslint-disable-next-line
    const [ikkeVisIgjen, setIkkeVisIgjen] = useState(false);
    const wrapperRef = useRef<HTMLDivElement>(null);

    const handleClickOutside = e => {
        if (wrapperRef.current?.contains(e.target)) {
            return;
        }
        if (isModalOpen) {
            setModalOpen(false);
        }
    };

    useEventListener('mousedown', handleClickOutside);

    const startAutoClose = () => {
        setTimeout(() => {
            setModalOpen(false);
        }, 1500);
    };

    const harTidligereSendtTilbakemelding = () => {
        return window.localStorage.getItem(TILBAKEMELDING_LOCALSTORAGE_NAME) != null;
    };

    const handleFabClicked = () => {
        if (!isModalOpen) {
            logEvent('portefolje.tilbakemelding_modal_apnet');
        }
        setModalOpen(!isModalOpen);
    };

    const handleTilfredshetsTilbakemeldingSendt = (tilbakemelding: Tilbakemelding) => {
        window.localStorage.setItem(TILBAKEMELDING_LOCALSTORAGE_NAME, 'true');

        logEvent('portefolje.tilbakemelding', {
            feature: TILBAKEMELDING_FEATURE_TAG,
            ...tilbakemelding
        });
    };

    const handleBegrensetCheckboxValgSendt = (tilbakemelding: BegrensetCheckboxValgProps) => {
        window.localStorage.setItem(TILBAKEMELDING_LOCALSTORAGE_NAME, 'true');

        logEvent('portefolje.tilbakemelding', {
            feature: TILBAKEMELDING_FEATURE_TAG,
            ...tilbakemelding
        });

        tilbakemelding.checkboxverdi.forEach(verdi => {
            logEvent('portefolje.tilbakemelding.checkboxverdier', {
                feature: TILBAKEMELDING_FEATURE_TAG,
                verdi
            });
        });
    };

    const handleCheckboxValgSendt = (tilbakemelding: TilbakemeldingCheckboxProps, checkboxStatusListe: any) => {
        startAutoClose();
        setHideFab(true);
        window.localStorage.setItem(TILBAKEMELDING_LOCALSTORAGE_NAME, 'true');
        logEvent('portefolje.tilbakemelding.checkboxstatuser', {feature: TILBAKEMELDING_FEATURE_TAG, ...tilbakemelding, ...checkboxStatusListe});
    };

    const handleIkkeVisIgjen = () => {
        window.localStorage.setItem(TILBAKEMELDING_LOCALSTORAGE_NAME, 'true');
        logEvent('portefolje.ikke_vis_tilbakemelding_igjen');
        setIkkeVisIgjen(true);
    };

    const harRiktigFeatures = harFeature(SPOR_OM_TILBAKEMELDING); // NB: Husk å endre for hver feature
    const hide = !harRiktigFeatures || harTidligereSendtTilbakemelding() || hideFab;

    return (
        <div ref={wrapperRef}>
            {!hide && (
                <div
                    aria-label="Åpne tilbakemeldingsmodal"
                    className={classNames('tilbakemelding-fab', {'tilbakemelding-fab__trykket': isModalOpen})}
                    onClick={handleFabClicked}
                    data-testid={isModalOpen ? 'tilbakemelding_fab_knapp_trykket' : 'tilbakemelding_fab_knapp'}
                >
                    <img
                        alt="Åpne/Lukk tilbakemeldingform"
                        className={classNames({
                            'tilbakemelding-fab__ikon--lukke': isModalOpen,
                            'tilbakemelding-fab__ikon--apne': !isModalOpen
                        })}
                        src={isModalOpen ? lukkBilde : tilbakemeldingBilde}
                    />
                </div>
            )}
            <TilbakemeldingModal
               open={isModalOpen}
               onTilfredshetsTilbakemeldingSendt={handleTilfredshetsTilbakemeldingSendt}
               onCheckboxTilbakemeldingSend={handleCheckboxValgSendt}
               onBegrensetCheckboxValgSendt={handleBegrensetCheckboxValgSendt}
               onIkkeVisIgjen={handleIkkeVisIgjen}
            />
        </div>
    );
}

const mapStateToProps = state => ({
    harFeature: (feature: string) => sjekkFeature(state, feature)
});

export default connect(mapStateToProps)(TilbakemeldingFab);
