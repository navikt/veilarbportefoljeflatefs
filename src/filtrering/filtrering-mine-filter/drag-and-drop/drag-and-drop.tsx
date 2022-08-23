import React, {useCallback, useEffect, useState} from 'react';
import './drag-and-drop.css';
import {lagreSorteringForFilter} from '../../../ducks/mine-filter';
import DragAndDropContainer from './drag-and-drop-container';
import MineFilterRad from '../mine-filter-rad';
import {useDispatch, useSelector} from 'react-redux';
import {useOnlyOnUnmount} from './use-only-onUnmount-hook';
import {LagretFilter} from '../../../ducks/lagret-filter';
import {OversiktType} from '../../../ducks/ui/listevisning';
import {OrNothing} from '../../../utils/types/types';
import {Tiltak} from '../../../ducks/enhettiltak';
import {RadioGroup} from '@navikt/ds-react';
import {AppState} from '../../../reducer';
import {logEvent} from '../../../utils/frontend-logger';
import {finnSideNavn, mapVeilederIdentTilNonsens} from '../../../middleware/metrics-middleware';
import {apneFeilTiltakModal, avmarkerValgtMineFilter, markerMineFilter} from '../../../ducks/lagret-filter-ui-state';
import {velgMineFilter} from '../../../ducks/filtrering';

export interface DragAndDropProps {
    stateFilterOrder: LagretFilter[];
    oversiktType: OversiktType;
    isDraggable: boolean;
    setisDraggable: React.Dispatch<React.SetStateAction<boolean>>;
    enhettiltak: OrNothing<Tiltak>;
}

function DragAndDrop({stateFilterOrder, oversiktType, isDraggable, setisDraggable, enhettiltak}: DragAndDropProps) {
    const [dragAndDropOrder, setDragAndDropOrder] = useState([...stateFilterOrder]);
    const [onUnmountRef, setOnUnmount] = useOnlyOnUnmount();
    const [valgtFilter, setValgtFilter] = useState("")
    const dispatch = useDispatch();

    const veilederIdent = useSelector((state: AppState) => state.innloggetVeileder.data!);
    const valgtMineFilter = useSelector((state: AppState) =>
        oversiktType === OversiktType.minOversikt
            ? state.mineFilterMinOversikt.valgtMineFilter
            : state.mineFilterEnhetensOversikt.valgtMineFilter
    );

    const lagreRekkefolge = useCallback(() => {
        const idAndPriorities = dragAndDropOrder.map((filter, idx) => ({
            sortOrder: idx,
            filterId: filter.filterId
        }));
        if (harEndretRekkefolge(dragAndDropOrder, stateFilterOrder)) {
            dispatch(lagreSorteringForFilter(idAndPriorities));
        }
        setisDraggable(false);
    }, [dragAndDropOrder, stateFilterOrder, setisDraggable, dispatch]);

    const avbryt = () => {
        setOnUnmount(() => null);
        setDragAndDropOrder([...stateFilterOrder]);
        setisDraggable(false);
    };

    const lagre = () => {
        setisDraggable(false);
    };

    const velgFilter = (filterId: string) => {
        const filter: LagretFilter = dragAndDropOrder.find(sortertFilter => `${sortertFilter.filterId}` === filterId) as LagretFilter

        logEvent(
            'portefolje.metrikker.lagredefilter.valgt-lagret-filter',
            {},
            {
                filterId: filter.filterId,
                sideNavn: finnSideNavn(),
                id: mapVeilederIdentTilNonsens(veilederIdent.ident)
            }
        );

        const tiltaksfeil = filter.filterValg.tiltakstyper.some(
            tiltak => enhettiltak && enhettiltak[tiltak] === undefined
        );

        if (tiltaksfeil) {
            dispatch(markerMineFilter(filter, oversiktType));
            dispatch(apneFeilTiltakModal(oversiktType));
            dispatch(avmarkerValgtMineFilter(oversiktType));
        } else {
            dispatch(markerMineFilter(filter, oversiktType));
            dispatch(velgMineFilter(filter, oversiktType));
        }
    };

    useEffect(() => {
        setOnUnmount(lagreRekkefolge);
    }, [lagreRekkefolge, setOnUnmount]);

    useEffect(() => {
        setDragAndDropOrder([...stateFilterOrder]);
    }, [stateFilterOrder]);

    useEffect(() => {
        if(valgtMineFilter !== undefined && valgtMineFilter !== null) {
            setValgtFilter(`${valgtMineFilter.filterId}`)
        }
    }, [valgtMineFilter])

    if (isDraggable) {
        return (
            <DragAndDropContainer
                dragAndDropOrder={dragAndDropOrder}
                setDragAndDropOrder={setDragAndDropOrder}
                lagreRekkefolge={lagre}
                avbryt={avbryt}
                onUnmount={onUnmountRef}
            />
        );
    }

    return (
        <RadioGroup
            hideLegend
            legend=""
            onChange={velgFilter}
            value={valgtFilter}
            size="small"
        >
            {dragAndDropOrder.map((filter, idx) => (
                <MineFilterRad
                    key={idx}
                    filter={filter}
                    oversiktType={oversiktType}
                    erValgt={valgtMineFilter?.filterId === filter.filterId}
                />
            ))}
        </RadioGroup>
    );
}

function harEndretRekkefolge(a: LagretFilter[], b: LagretFilter[]) {
    return !(
        Array.isArray(a) &&
        Array.isArray(b) &&
        a.length === b.length &&
        a.every((val, index) => val.filterNavn === b[index].filterNavn)
    );
}

export default DragAndDrop;
