import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {AppState} from '../../../reducer';
import {erTomtObjekt, feilValidering} from './mine-filter-utils';
import {LagretFilterValideringsError} from './mine-filter-modal';
import {ErrorModalType, MineFilterVarselModal} from './varsel-modal';
import {lagreNyttFilter} from '../../../ducks/mine-filter';
import {useRequestHandler} from '../../../hooks/use-request-handler';
import {OversiktType} from '../../../ducks/ui/listevisning';
import {ThunkDispatch} from 'redux-thunk';
import {AnyAction} from 'redux';
import {SidebarTabInfo} from '../../../store/sidebar/sidebar-view-store';
import {endreSideBar} from '../../sidebar/sidebar';
import {BodyShort, Button, TextField} from '@navikt/ds-react';
import {LasterModal} from '../lastermodal/laster-modal';

export function LagreNyttMineFilter(props: {oversiktType: string; lukkModal; laster: boolean}) {
    const {lukkModal, oversiktType, laster} = props;

    const filterValg = useSelector((state: AppState) =>
        oversiktType === OversiktType.minOversikt ? state.filtreringMinoversikt : state.filtreringEnhetensOversikt
    );
    const data = useSelector((state: AppState) => state.mineFilter.data);

    const [filterNavn, setFilterNavn] = useState('');
    const [feilmelding, setFeilmelding] = useState({} as LagretFilterValideringsError);

    const dispatch: ThunkDispatch<AppState, any, AnyAction> = useDispatch();
    const requestHandler = useRequestHandler((state: AppState) => state.mineFilter.status, lukkModal);

    const doLagreNyttFilter = event => {
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
                    currentOversiktType: oversiktType
                });
            });
        }
    };

    return (
        <>
            {laster ? (
                <LasterModal />
            ) : (
                <>
                    <form
                        onSubmit={e => doLagreNyttFilter(e)}
                        data-testid="lagre-nytt-filter_modal_form"
                        data-widget="accessible-autocomplete"
                    >
                        <BodyShort>Du vil finne igjen filteret under "Mine filter".</BodyShort>
                        <TextField
                            label="Navn:"
                            value={filterNavn}
                            onChange={e => setFilterNavn(e.target.value)}
                            error={feilmelding.filterNavn}
                            autoFocus
                            data-testid="lagre-nytt-filter_modal_navn-input"
                        />
                        <div className="lagret-filter-knapp-wrapper">
                            <Button type="submit" data-testid="lagre-nytt-filter_modal_lagre-knapp">
                                Lagre
                            </Button>
                        </div>
                    </form>
                    <MineFilterVarselModal
                        filterNavn={filterNavn}
                        erApen={requestHandler.errorModalErApen}
                        setErrorModalErApen={requestHandler.setErrorModalErApen}
                        modalType={ErrorModalType.LAGRE}
                    />
                </>
            )}
        </>
    );
}
