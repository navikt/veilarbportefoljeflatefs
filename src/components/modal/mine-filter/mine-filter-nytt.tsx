import {useState} from 'react';
import {AnyAction} from 'redux';
import {ThunkDispatch} from 'redux-thunk';
import {useDispatch, useSelector} from 'react-redux';
import {BodyShort, Button, TextField} from '@navikt/ds-react';
import {AppState} from '../../../reducer';
import {erTomtObjekt, feilValidering} from './mine-filter-utils';
import {LagretFilterValideringsError} from './mine-filter-modal';
import {ErrorModalType, MineFilterVarselModal} from './mine-filter-varsel-modal';
import {lagreNyttFilter} from '../../../ducks/mine-filter';
import {useRequestHandler} from '../../../hooks/use-request-handler';
import {OversiktType} from '../../../ducks/ui/listevisning';
import {SidebarTabs} from '../../../store/sidebar/sidebar-view-store';
import {endreValgtSidebarTab} from '../../sidebar/sidebar';

interface LagreNyttMineFilterProps {
    oversiktType: OversiktType;
    lukkModal: () => void;
}

export function LagreNyttMineFilter({lukkModal, oversiktType}: LagreNyttMineFilterProps) {
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
                endreValgtSidebarTab({
                    dispatch: dispatch,
                    requestedTab: SidebarTabs.MINE_FILTER,
                    currentOversiktType: oversiktType
                });
            });
        }
    };

    return (
        <>
            <form
                onSubmit={e => doLagreNyttFilter(e)}
                data-testid="lagre-nytt-filter_modal_form"
                data-widget="accessible-autocomplete"
            >
                <BodyShort size="small">Du vil finne igjen filteret under "Mine filter".</BodyShort>
                <TextField
                    label="Navn:"
                    value={filterNavn}
                    onChange={e => setFilterNavn(e.target.value)}
                    error={feilmelding.filterNavn}
                    autoFocus
                    data-testid="lagre-nytt-filter_modal_navn-input"
                    size="small"
                />
                <div className="lagret-filter-knapp-wrapper">
                    <Button size="small" type="submit" data-testid="lagre-nytt-filter_modal_lagre-knapp">
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
    );
}
