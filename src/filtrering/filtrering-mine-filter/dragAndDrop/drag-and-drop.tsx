import React, {useState} from 'react';
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

    const lagreRekkefølge = () => {
        const idAndPriorities = dragAndDropOrder.map((filter, idx) => ({
            sortOrder: idx,
            filterId: filter.filterId
        }));
        if (!harSammeRekkefølge(dragAndDropOrder, stateFilterOrder)) {
            dispatch(lagreSorteringForFilter(idAndPriorities));
        }

        if (isDraggable) setisDraggable(false);
    };

    const avbryt = () => {
        setDragAndDropOrder([...stateFilterOrder]);
        setisDraggable(false);
    };

    const onUnmount = () => {
        if (!isDraggable) {
            lagreRekkefølge();
        }
    };

    if (isDraggable) {
        return (
            <DragAndDropContainer
                dragAndDropOrder={dragAndDropOrder}
                setDragAndDropOrder={setDragAndDropOrder}
                lagreRekkefølge={lagreRekkefølge}
                avbryt={avbryt}
                onUnmount={onUnmount}
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
