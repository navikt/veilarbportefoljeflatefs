import {Input} from 'nav-frontend-skjema';
import {Hovedknapp} from 'nav-frontend-knapper';
import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {AppState} from '../../../reducer';
import {Normaltekst} from 'nav-frontend-typografi';
import {erTomtObjekt, feilValidering} from './mine-filter-utils';
import {LagretFilterValideringsError} from './mine-filter-modal';
import {ErrorModalType, MineFilterVarselModal} from './varsel-modal';
import {lagreNyttFilter} from '../../../ducks/mine-filter';
import {useRequestHandler} from '../../../hooks/use-request-handler';
import {ListevisningType} from '../../../ducks/ui/listevisning';
import {ThunkDispatch} from 'redux-thunk';
import {AnyAction} from 'redux';
import {SidebarTabInfo} from '../../../store/sidebar/sidebar-view-store';
import {endreSideBar} from '../../sidebar/sidebar';

export function LagreNyttMineFilter(props: {filtergruppe: string; lukkModal}) {
    const filterValg = useSelector((state: AppState) =>
        props.filtergruppe === ListevisningType.minOversikt
            ? state.filtreringMinoversikt
            : state.filtreringEnhetensOversikt
    );
    const data = useSelector((state: AppState) => state.mineFilter.data);
    const [filterNavn, setFilterNavn] = useState('');
    const [feilmelding, setFeilmelding] = useState({} as LagretFilterValideringsError);

    const dispatch: ThunkDispatch<AppState, any, AnyAction> = useDispatch();
    const requestHandler = useRequestHandler((state: AppState) => state.mineFilter.status, props.lukkModal);

    const doLagreNyttFilter = (event) => {
        event.preventDefault();
        const feilValideringResponse = feilValidering(filterNavn, filterValg, data);
        setFeilmelding(feilValideringResponse);

        if (erTomtObjekt(feilValideringResponse)) {
            requestHandler.setSaveRequestSent(true);
            dispatch(
                lagreNyttFilter({
                    filterNavn: filterNavn,
                    filterValg: filterValg
                })
            ).then(() => {
                endreSideBar({
                    dispatch: dispatch,
                    requestedTab: SidebarTabInfo.MINE_FILTER,
                    currentListevisningsType: props.filtergruppe
                });
            });
        }
    };

    return (
        <>
            <form onSubmit={(e) => doLagreNyttFilter(e)}>
                <Normaltekst className="blokk-xs">Du vil finne igjen filteret under "Mine filter".</Normaltekst>
                <Input
                    label="Navn:"
                    value={filterNavn}
                    onChange={(e) => setFilterNavn(e.target.value)}
                    feil={feilmelding.filterNavn}
                    autoFocus={true}
                    maxLength={255}
                    data-testid="lagre-nytt-filter-navn-input"
                />
                <div className="lagret-filter-knapp-wrapper">
                    <Hovedknapp mini
                                htmlType="submit"
                                data-testid="lagre-nytt-filter-modal-lagre-knapp">
                        Lagre
                    </Hovedknapp>
                </div>
            </form>
            <MineFilterVarselModal
                filterNavn={filterNavn}
                erApen={requestHandler.errorModalErApen}
                setErrorModalErApen={requestHandler.setErrorModalErApen}
                modalType={ErrorModalType.LAGRE}
            />
        </>
    );
}
