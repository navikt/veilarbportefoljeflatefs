import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {AppState} from '../../../reducer';
import {LagretFilterValideringsError} from './mine-filter-modal';
import {erTomtObjekt, feilValidering} from './mine-filter-utils';
import {ErrorModalType, MineFilterVarselModal} from './mine-filter-varsel-modal';
import BekreftSlettingModal from '../varselmodal/bekreft-sletting-modal';
import {lagreEndringer, slettFilter} from '../../../ducks/mine-filter';
import {useRequestHandler} from '../../../hooks/use-request-handler';
import {avmarkerSisteValgtMineFilter} from '../../../ducks/lagret-filter-ui-state';
import {OversiktType} from '../../../ducks/ui/listevisning';
import {ThunkDispatch} from 'redux-thunk';
import {AnyAction} from 'redux';
import {SidebarTabInfo} from '../../../store/sidebar/sidebar-view-store';
import {endreSideBar} from '../../sidebar/sidebar';
import {Button, TextField} from '@navikt/ds-react';
import {Delete} from '@navikt/ds-icons';

interface OppdaterMineFilterProps {
    oversiktType: OversiktType;
    lukkModal: () => void;
    gammeltFilterNavn: string;
    filterId: number;
}

export function OppdaterMineFilter({gammeltFilterNavn, filterId, lukkModal, oversiktType}: OppdaterMineFilterProps) {
    const dispatch: ThunkDispatch<AppState, any, AnyAction> = useDispatch();
    const filterValg = useSelector((state: AppState) =>
        oversiktType === OversiktType.minOversikt ? state.filtreringMinoversikt : state.filtreringEnhetensOversikt
    );
    const data = useSelector((state: AppState) => state.mineFilter.data);
    const [visBekreftSlettModal, setVisBekreftSlettModal] = useState(false);
    const [nyttFilterNavn, setNyttFilterNavn] = useState<string>(gammeltFilterNavn);

    const [feilmelding, setFeilmelding] = useState<LagretFilterValideringsError>({} as LagretFilterValideringsError);

    const requestHandlerOppdater = useRequestHandler((state: AppState) => state.mineFilter.status, lukkModal);
    const requestHandlerSlette = useRequestHandler((state: AppState) => state.mineFilter.status, lukkModal);

    const doLagreEndringer = event => {
        event.preventDefault();
        const trimmetFilterNavn = nyttFilterNavn.trim();
        const feilValideringResponse = feilValidering(trimmetFilterNavn, filterValg, data, filterId);
        setFeilmelding(feilValideringResponse);

        if (erTomtObjekt(feilValideringResponse)) {
            setNyttFilterNavn(trimmetFilterNavn);
            dispatch(
                lagreEndringer({
                    filterNavn: trimmetFilterNavn,
                    filterValg: filterValg,
                    filterId: filterId
                })
            ).then(() => {
                endreSideBar({
                    dispatch: dispatch,
                    requestedTab: SidebarTabInfo.MINE_FILTER,
                    currentOversiktType: oversiktType
                });
            });
            requestHandlerOppdater.setSaveRequestSent(true);
        }
    };

    const bekreftSletting = event => {
        event.preventDefault();
        setVisBekreftSlettModal(true);
    };

    const doSlettFilter = () => {
        dispatch(slettFilter(filterId));
        dispatch(avmarkerSisteValgtMineFilter(oversiktType));
        requestHandlerSlette.setSaveRequestSent(true);
    };

    return (
        <>
            <form onSubmit={e => doLagreEndringer(e)}>
                <TextField
                    label="Navn:"
                    value={nyttFilterNavn}
                    onChange={e => setNyttFilterNavn(e.target.value)}
                    error={feilmelding.filterNavn}
                    autoFocus
                    data-testid="redigere-filter-navn-input"
                />
                <div className="lagret-filter-knapp-wrapper">
                    <Button size="small" type="submit" data-testid="rediger-filter_modal_lagre-knapp">
                        Lagre
                    </Button>
                    <Button
                        size="small"
                        variant="danger"
                        onClick={e => bekreftSletting(e)}
                        icon={<Delete />}
                        data-testid="rediger-filter_modal_slett-knapp"
                    >
                        Slett
                    </Button>
                </div>
            </form>
            {visBekreftSlettModal && (
                <BekreftSlettingModal
                    isOpen={visBekreftSlettModal}
                    onRequestClose={() => setVisBekreftSlettModal(false)}
                    onSubmit={doSlettFilter}
                    tittel="Slette lagret filter"
                    navn={gammeltFilterNavn}
                />
            )}
            <MineFilterVarselModal
                filterNavn={nyttFilterNavn}
                erApen={requestHandlerOppdater.errorModalErApen}
                modalType={ErrorModalType.OPPDATERE}
                setErrorModalErApen={requestHandlerOppdater.setErrorModalErApen}
            />
            <MineFilterVarselModal
                filterNavn={nyttFilterNavn}
                erApen={requestHandlerSlette.errorModalErApen}
                modalType={ErrorModalType.SLETTE}
                setErrorModalErApen={requestHandlerSlette.setErrorModalErApen}
            />
        </>
    );
}
