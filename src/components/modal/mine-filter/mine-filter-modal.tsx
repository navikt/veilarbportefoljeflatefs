import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {AppState} from '../../../reducer';
import './mine-filter.css';
import {OppdaterMineFilter} from './mine-filter-oppdater';
import {LagreNyttMineFilter} from './mine-filter-nytt';
import {OrNothing} from '../../../utils/types/types';
import hiddenIf from '../../hidden-if/hidden-if';
import {Meny} from './mine-filter-meny';
import {MineFilterFnrFeil} from './mine-filter-fnr-feil';
import {lukkMineFilterModal} from '../../../ducks/lagret-filter-ui-state';
import {OversiktType} from '../../../ducks/ui/listevisning';
import EgenModal from '../egenModal';
import LasterModal from '../lastermodal/laster-modal';
import {STATUS} from '../../../ducks/utils';

export enum Visningstype {
    MENY,
    LAGRE_NYTT,
    OPPDATER,
    FNR_FEIL
}

export interface LagretFilterValideringsError {
    filterNavn: OrNothing<string>;
}

const VisningstypeToTittel = new Map<Visningstype, string>([
    [Visningstype.LAGRE_NYTT, 'Lagre nytt filter'],
    [Visningstype.OPPDATER, 'Endre filter'],
    [Visningstype.MENY, 'Lagre filter'],
    [Visningstype.FNR_FEIL, 'Lagre filter']
]);

const HiddenIfLasterModal = hiddenIf(LasterModal);
const HiddenIfMeny = hiddenIf(Meny);
const HiddenIfLagreNytt = hiddenIf(LagreNyttMineFilter);
const HiddenIfOppdaterFilter = hiddenIf(OppdaterMineFilter);
const HiddenIfFnrFeil = hiddenIf(MineFilterFnrFeil);

interface Props {
    oversiktType: OversiktType;
}

export function MineFilterModal({oversiktType}: Props) {
    const {sisteValgtMineFilter, valgtMineFilter, erModalApen} = useSelector((state: AppState) =>
        oversiktType === OversiktType.minOversikt ? state.mineFilterMinOversikt : state.mineFilterEnhetensOversikt
    );
    const data = useSelector((state: AppState) => state.mineFilter.data);
    const lagretFilterNavn = filterId =>
        data
            .filter(elem => elem.filterId === filterId)
            .map(elem => elem.filterNavn)
            .toString();
    const filterValg = useSelector((state: AppState) =>
        oversiktType === OversiktType.minOversikt ? state.filtreringMinoversikt : state.filtreringEnhetensOversikt
    );
    const [valgtVisningstype, setValgtVisningstype] = useState<Visningstype>(Visningstype.MENY);

    const dispatch = useDispatch();

    const lukkModal = () => {
        dispatch(lukkMineFilterModal(oversiktType));
    };

    const mineFilterStatus = useSelector((state: AppState) => state.mineFilter.status);
    const laster = mineFilterStatus !== undefined && mineFilterStatus === STATUS.PENDING;

    useEffect(() => {
        if (filterValg.navnEllerFnrQuery.trim().length > 0) setValgtVisningstype(Visningstype.FNR_FEIL);
        else if (valgtMineFilter) setValgtVisningstype(Visningstype.OPPDATER);
        else if (!sisteValgtMineFilter) setValgtVisningstype(Visningstype.LAGRE_NYTT);
        else setValgtVisningstype(Visningstype.MENY);
    }, [filterValg, valgtMineFilter, sisteValgtMineFilter, erModalApen]);

    return (
        <>
            {erModalApen && (
                <EgenModal
                    className="mine-filter-meny-modal"
                    open={erModalApen}
                    onClose={lukkModal}
                    tittel={VisningstypeToTittel.get(valgtVisningstype)}
                    modalWidth="small"
                >
                    <div className="modal-visningstype">
                        <HiddenIfLasterModal hidden={!laster} isOpen={laster} />
                        <HiddenIfMeny
                            hidden={valgtVisningstype !== Visningstype.MENY}
                            setValgtVisningstype={setValgtVisningstype}
                            sisteFilterNavn={lagretFilterNavn(sisteValgtMineFilter!)}
                        />
                        <HiddenIfLagreNytt
                            hidden={valgtVisningstype !== Visningstype.LAGRE_NYTT}
                            lukkModal={lukkModal}
                            oversiktType={oversiktType}
                        />
                        <HiddenIfOppdaterFilter
                            hidden={valgtVisningstype !== Visningstype.OPPDATER}
                            gammeltFilterNavn={lagretFilterNavn(sisteValgtMineFilter!)}
                            filterId={sisteValgtMineFilter!}
                            lukkModal={lukkModal}
                            oversiktType={oversiktType}
                        />
                        <HiddenIfFnrFeil hidden={valgtVisningstype !== Visningstype.FNR_FEIL} />
                    </div>
                </EgenModal>
            )}
        </>
    );
}
