import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {AppState} from '../../../reducer';
import {LagretFilterValideringsError} from './mine-filter-modal';
import {erTomtObjekt, feilValidering} from './mine-filter-utils';
import {Input} from 'nav-frontend-skjema';
import {Hovedknapp, Knapp} from 'nav-frontend-knapper';
import {ErrorModalType, MineFilterVarselModal} from './varsel-modal';
import BekreftSlettingModal from '../bekreftelse-modal/bekreft-sletting-modal';
import {lagreEndringer, slettFilter} from '../../../ducks/mine-filter';
import {useRequestHandler} from '../../../hooks/use-request-handler';
import {avmarkerSisteValgtMineFilter} from '../../../ducks/lagret-filter-ui-state';
import {OversiktType} from '../../../ducks/ui/listevisning';
import {ThunkDispatch} from 'redux-thunk';
import {AnyAction} from 'redux';
import {SidebarTabInfo} from '../../../store/sidebar/sidebar-view-store';
import {endreSideBar} from '../../sidebar/sidebar';

export function OppdaterMineFilter(props: {gammeltFilterNavn; filterId; lukkModal; oversiktType}) {
    const dispatch: ThunkDispatch<AppState, any, AnyAction> = useDispatch();
    const filterValg = useSelector((state: AppState) =>
        props.oversiktType === OversiktType.minOversikt ? state.filtreringMinoversikt : state.filtreringEnhetensOversikt
    );
    const data = useSelector((state: AppState) => state.mineFilter.data);
    const [visBekreftSlettModal, setVisBekreftSlettModal] = useState(false);
    const [nyttFilterNavn, setNyttFilterNavn] = useState<string>(props.gammeltFilterNavn);

    const [feilmelding, setFeilmelding] = useState<LagretFilterValideringsError>({} as LagretFilterValideringsError);
    const {gammeltFilterNavn, filterId, lukkModal} = props;

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
                    currentOversiktType: props.oversiktType
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
        dispatch(avmarkerSisteValgtMineFilter(props.oversiktType));
        requestHandlerSlette.setSaveRequestSent(true);
    };

    return (
        <>
            <form onSubmit={e => doLagreEndringer(e)}>
                <Input
                    label="Navn:"
                    value={nyttFilterNavn}
                    onChange={e => setNyttFilterNavn(e.target.value)}
                    feil={feilmelding.filterNavn}
                    autoFocus
                    data-testid="redigere-filter-navn-input"
                />
                <div className="lagret-filter-knapp-wrapper">
                    <Hovedknapp mini htmlType="submit" data-testid="rediger-filter_modal_lagre-knapp">
                        Lagre
                    </Hovedknapp>
                    <Knapp mini onClick={e => bekreftSletting(e)} data-testid="rediger-filter_modal_slett-knapp">
                        Slett
                    </Knapp>
                </div>
            </form>
            <BekreftSlettingModal
                isOpen={visBekreftSlettModal}
                onRequestClose={() => setVisBekreftSlettModal(false)}
                onSubmit={doSlettFilter}
                tittel="Slette lagret filter"
                navn={gammeltFilterNavn}
            />
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
