import React, {useState, useRef, useEffect, useCallback} from 'react';
import './drag-and-drop.less';
import {MineFilter, lagreSorteringForFilter} from '../../../ducks/mine-filter';
import DragAndDropContainer from './drag-and-drop-container';
import NyMineFilterRad from '../ny_mine-filter-rad';
import {useDispatch} from 'react-redux';

export interface DragAndDropProps {
    stateFilterOrder: MineFilter[];
    filtergruppe: string;
    isDraggable: boolean;
    setisDraggable: React.Dispatch<React.SetStateAction<boolean>>;
}

function DragAndDrop({stateFilterOrder, filtergruppe, isDraggable, setisDraggable}: DragAndDropProps) {
    const [dragAndDropOrder, setDragAndDropOrder] = useState([...stateFilterOrder]);
    const dispatch = useDispatch();

    const lagreRekkefølge = useCallback(() => {
        const idAndPriorities = dragAndDropOrder.map((filter, idx) => ({
            sortOrder: idx,
            filterId: filter.filterId
        }));
        if (!harSammeRekkefølge(dragAndDropOrder, stateFilterOrder)) {
            dispatch({type: 'sortering_endre/OK'});
            dispatch(lagreSorteringForFilter(idAndPriorities));
        }
        setisDraggable(false);
    }, [dragAndDropOrder, stateFilterOrder, setisDraggable, dispatch]);

    const onUnmountRef = useRef(() => {
        lagreRekkefølge();
    });

    useEffect(() => {
        onUnmountRef.current = () => lagreRekkefølge();
    }, [lagreRekkefølge]);

    const avbryt = () => {
        onUnmountRef.current = () => null;
        setDragAndDropOrder([...stateFilterOrder]);
        setisDraggable(false);
    };

    const lagre = () => {
        // Automatisk lagring på onUnmount.
        setisDraggable(false);
    };

    if (isDraggable) {
        return (
            <DragAndDropContainer
                dragAndDropOrder={dragAndDropOrder}
                setDragAndDropOrder={setDragAndDropOrder}
                lagreRekkefølge={lagre}
                avbryt={avbryt}
                onUnmount={onUnmountRef}
            />
        );
    }

    return (
        <>
            {dragAndDropOrder.map((filter, idx) => (
                <NyMineFilterRad key={idx} filter={filter} filtergruppe={filtergruppe} />
            ))}
        </>
    );
}

function harSammeRekkefølge(a: MineFilter[], b: MineFilter[]) {
    return (
        Array.isArray(a) &&
        Array.isArray(b) &&
        a.length === b.length &&
        a.every((val, index) => val.filterNavn === b[index].filterNavn)
    );
}

export default DragAndDrop;
