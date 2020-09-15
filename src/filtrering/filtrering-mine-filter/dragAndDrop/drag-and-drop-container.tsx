import React, {useRef, useState, useEffect} from 'react';
import {useEventListener} from '../../../hooks/use-event-listener';
import DragAndDropRow from './drag-and-drop-row';
import './drag-and-drop.less';
import {MineFilter} from '../../../ducks/mine-filter';
import {Hovedknapp, Flatknapp, Knapp} from 'nav-frontend-knapper';

export interface DragAndDropContainerProps {
    dragAndDropOrder: MineFilter[];
    setDragAndDropOrder: React.Dispatch<React.SetStateAction<MineFilter[]>>;
    lagreRekkefølge: () => void;
    avbryt: () => void;
    onUnmount: () => void;
}

function DragAndDropContainer({
    dragAndDropOrder,
    setDragAndDropOrder,
    lagreRekkefølge,
    avbryt,
    onUnmount: onOnmount
}: DragAndDropContainerProps) {
    const [srcIndex, setSrcIndex] = useState(-1);
    const [destIndex, setDestIndex] = useState(-1);
    const [dropIndex, setDropIndex] = useState(-1);
    const [requestRowInFocuse, setRequestRowInFocuse] = useState(-1);
    const [updateRequest, setUpdateRequest] = useState(false);
    const [ariaTekst, setAriaTekst] = useState('');
    const [dragIsInsideElement, setdDragIsInsideElement] = useState(false);
    const dragContainer = useRef<HTMLUListElement>(null);

    useEffect(
        () => () => {
            onOnmount();
        },
        [onOnmount]
    );

    const alfabetiskSort = () => {
        dragAndDropOrder.sort((a: MineFilter, b: MineFilter) => {
            return a.filterNavn.toLowerCase().localeCompare(b.filterNavn.toLowerCase(), undefined, {numeric: true});
        });
        setAriaTekst('Filtre har blitt sortert i alfabetisk rekkefølge.');
        setDragAndDropOrder([...dragAndDropOrder]);
    };

    const orderIsRequestedToChange = () => {
        if (destIndex !== -1 && srcIndex !== -1 && destIndex < dragAndDropOrder.length) {
            if (srcIndex < destIndex)
                setAriaTekst(
                    dragAndDropOrder[srcIndex].filterNavn +
                        ' flyttet under ' +
                        dragAndDropOrder[destIndex].filterNavn +
                        ', til posisjon ' +
                        (destIndex + 1) +
                        '.'
                );
            else
                setAriaTekst(
                    dragAndDropOrder[srcIndex].filterNavn +
                        ' flyttet over ' +
                        dragAndDropOrder[destIndex].filterNavn +
                        ', til posisjon ' +
                        (destIndex + 1) +
                        '.'
                );
            flyttElementIArray(dragAndDropOrder, srcIndex, destIndex);

            setDragAndDropOrder([...dragAndDropOrder]);
            setdDragIsInsideElement(false);
            setDropIndex(destIndex);
            setRequestRowInFocuse(destIndex);
        }
        setSrcIndex(-1);
        setDestIndex(-1);
    };

    if (updateRequest) {
        orderIsRequestedToChange();
        setUpdateRequest(false);
    }

    const handleDragStart = (e) => {
        if (dragContainer.current && dragContainer.current.contains(e.target) && !dragIsInsideElement) {
            setdDragIsInsideElement(true);
            setDropIndex(-1);
        }
    };

    const handleDragLeave = (e) => {
        if (dragContainer.current && !dragContainer.current.contains(e.target) && dragIsInsideElement) {
            setdDragIsInsideElement(false);
        }
    };

    const handleDragEnd = (e) => {
        if (dragIsInsideElement) {
            orderIsRequestedToChange();
        } else {
            setSrcIndex(-1);
            setDestIndex(-1);
        }
    };

    const handleKeyUp = (e) => {
        if (dragContainer.current && dragContainer.current.contains(e.target)) {
            if (e.altKey && (e.keyCode === 38 || e.keyCode === 40)) {
                // Piltast opp og ned
                orderIsRequestedToChange();
            } else if (e.keyCode === 32) {
                // Space
                setAriaTekst(
                    'Bruk piltast opp eller ned for å velge et annet filter. Hold nede alt og press opp eller ned for å endre rekkefølgen til filter. Enter for å lagre. Escape for å avbryte.'
                );
            } else if (e.keyCode === 27) {
                // Esc.
                avbryt();
            } else if (e.keyCode === 13) {
                // Enter
                lagreRekkefølge();
            }
        }
    };

    useEventListener('dragenter', handleDragStart);
    useEventListener('dragleave', handleDragLeave);
    useEventListener('dragend', handleDragEnd);
    useEventListener('keyup', handleKeyUp);

    return (
        <>
            <span aria-live="assertive" className="assistive-text">
                {ariaTekst}
            </span>
            <ul ref={dragContainer} className="drag-and-drop-container" role={'listbox'}>
                {dragAndDropOrder.map((filter, idx) => (
                    <DragAndDropRow
                        key={idx}
                        idx={idx}
                        setIsDestination={setDestIndex}
                        setIsSource={setSrcIndex}
                        destIndex={destIndex}
                        sourceIndex={srcIndex}
                        dropIndex={dropIndex}
                        filterNavn={filter.filterNavn}
                        setRequestRowInFocuse={setRequestRowInFocuse}
                        setDropIndex={setDropIndex}
                        setRequestUpdate={setUpdateRequest}
                        shouldBeFocused={idx === requestRowInFocuse}
                        isLastRow={idx === dragAndDropOrder.length - 1}
                    ></DragAndDropRow>
                ))}
            </ul>
            <div className="drag-and-drop-knapper">
                <Hovedknapp
                    className="drag-and-drop-knapp-lagre"
                    aria-label="Lagre sortering."
                    mini
                    onClick={(e) => lagreRekkefølge()}
                >
                    Lagre
                </Hovedknapp>
                <Knapp
                    className="drag-and-drop-knapp-avbryt"
                    aria-label="Avbryt sortering."
                    mini
                    onClick={(e) => avbryt()}
                >
                    Avbryt
                </Knapp>
                <Flatknapp
                    className="drag-and-drop-knapp-nullstill"
                    aria-label="Nullstill til alfabetisk sortering."
                    mini
                    onClick={(e) => alfabetiskSort()}
                >
                    Nullstill
                </Flatknapp>
            </div>
        </>
    );
}

function flyttElementIArray(arr: any[], fromIndex: number, toIndex: number) {
    const verdiSomFlyttes = arr[fromIndex];
    arr.splice(fromIndex, 1);
    arr.splice(toIndex, 0, verdiSomFlyttes);
}

export default DragAndDropContainer;
