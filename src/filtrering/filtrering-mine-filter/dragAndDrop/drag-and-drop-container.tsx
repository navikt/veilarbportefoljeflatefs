import React, {useRef, useState, useEffect, useCallback} from 'react';
import {useEventListener} from '../../../hooks/use-event-listener';
import DragAndDropRow from './drag-and-drop-row';
import './drag-and-drop.less';
import {MineFilter} from '../../../ducks/mine-filter';
import {Hovedknapp, Flatknapp, Knapp} from 'nav-frontend-knapper';
import {Element} from 'nav-frontend-typografi';
import classNames from 'classnames';

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
    const [requestRowInFocuse, setRequestRowInFocuse] = useState(0);
    const [ariaTekst, setAriaTekst] = useState('');
    const [dragIsInsideElement, setdDragIsInsideElement] = useState(false);
    const dragContainer = useRef<HTMLUListElement>(null);

    const onOnmountRef = useRef(onOnmount);
    const dragAndDropOrderRef = useRef(dragAndDropOrder);

    useEffect(() => {
        onOnmountRef.current = onOnmount;
        dragAndDropOrderRef.current = dragAndDropOrder;
    }, [onOnmount, dragAndDropOrder]);
    useEffect(() => () => onOnmountRef.current(), []);

    const eventIsInsideContainer = (e) => dragContainer.current && dragContainer.current.contains(e.target);

    const alfabetiskSort = () => {
        dragAndDropOrder.sort((a: MineFilter, b: MineFilter) => {
            return a.filterNavn.toLowerCase().localeCompare(b.filterNavn.toLowerCase(), undefined, {numeric: true});
        });
        setAriaTekst('Filtre har blitt sortert i alfabetisk rekkefølge.');
        setDragAndDropOrder([...dragAndDropOrder]);
    };

    const requestNewOrder = useCallback(
        (from: number, to: number) => {
            if (to !== from && to !== -1 && from !== -1 && to < dragAndDropOrderRef.current.length) {
                if (from < to)
                    setAriaTekst(
                        dragAndDropOrderRef.current[from].filterNavn +
                            ' flyttet under ' +
                            dragAndDropOrderRef.current[to].filterNavn +
                            ', til posisjon ' +
                            (to + 1) +
                            '.'
                    );
                else
                    setAriaTekst(
                        dragAndDropOrderRef.current[from].filterNavn +
                            ' flyttet over ' +
                            dragAndDropOrderRef.current[to].filterNavn +
                            ', til posisjon ' +
                            (to + 1) +
                            '.'
                    );
                flyttElementIArray(dragAndDropOrderRef.current, from, to);

                setDragAndDropOrder([...dragAndDropOrderRef.current]);
                setDropIndex(to);
                setRequestRowInFocuse(to);
            } else {
                setDropIndex(-1);
            }
            setSrcIndex(-1);
            setDestIndex(-1);
        },
        [dragAndDropOrderRef, setDragAndDropOrder]
    );

    const handleDragEnter = (e) => {
        if (eventIsInsideContainer(e)) {
            setdDragIsInsideElement(true);
        } else {
            setdDragIsInsideElement(false);
        }
    };

    const handleDragStart = (e) => {
        if (eventIsInsideContainer(e)) {
            setSrcIndex(e.target.value);
        }
    };

    const handleDragEnd = (e) => {
        if (dragIsInsideElement) {
            requestNewOrder(srcIndex, destIndex);
        }
        setSrcIndex(-1);
        setDestIndex(-1);
    };

    const handleOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (eventIsInsideContainer(e)) {
            if (typeof e.target.value === 'number') {
                setDestIndex(e.target.value);
            }
        } else {
            setDestIndex(-1);
        }
    };

    const requestFocus = useCallback((row: number) => {
        if (row !== -1) setDropIndex(-1);
        setSrcIndex(-1);
        setDestIndex(-1);
        setRequestRowInFocuse(row);
    }, []);

    const handleKeyDown = (e) => {
        if (dragContainer.current && dragContainer.current.contains(e.target)) {
            if (e.keyCode === 38 || e.keyCode === 40) {
                e.preventDefault();
                if (e.keyCode === 38) {
                    if (e.altKey) {
                        setSrcIndex(e.target.value);
                        setDestIndex(e.target.value - 1);
                    } else {
                        requestFocus(e.target.value - 1);
                    }
                } else {
                    if (e.altKey) {
                        // CSS endring
                        setSrcIndex(e.target.value);
                        setDestIndex(e.target.value + 1);
                    } else {
                        requestFocus(e.target.value + 1);
                    }
                    setSrcIndex(e.target.value);
                }
                setDropIndex(-1);
            } else if (e.keyCode === 32) e.preventDefault();
        }
    };

    const handleKeyUp = (e) => {
        if (dragContainer.current && dragContainer.current.contains(e.target)) {
            if (e.altKey && (e.keyCode === 38 || e.keyCode === 40)) {
                // Piltast opp og ned
                if (e.keyCode === 38) {
                    requestNewOrder(e.target.value, e.target.value - 1);
                } else {
                    requestNewOrder(e.target.value, e.target.value + 1);
                }
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
            setDestIndex(-1);
            setSrcIndex(-1);
        }
    };

    useEventListener('dragenter', handleDragEnter);
    useEventListener('dragend', handleDragEnd);
    useEventListener('keyup', handleKeyUp);
    useEventListener('keydown', handleKeyDown);
    useEventListener('dragover', handleOver);
    useEventListener('dragstart', handleDragStart);

    return (
        <>
            <span aria-live="assertive" className="assistive-text">
                {ariaTekst}
            </span>
            <Element tag={'h3'}>Endre rekkefølge</Element>
            <ul ref={dragContainer} className="drag-and-drop-container" role={'listbox'}>
                {dragAndDropOrder.map((filter, idx) => (
                    <DragAndDropRow
                        key={idx}
                        idx={idx}
                        filterNavn={filter.filterNavn}
                        isLastRow={idx === dragAndDropOrder.length - 1}
                        shouldBeFocused={idx === requestRowInFocuse}
                        requestFocus={requestFocus}
                        onClick={requestNewOrder}
                        className={classNames({
                            'drag-and-drop-row': true,
                            dropped: dropIndex === idx,
                            'drag-elem': srcIndex === idx,
                            'over-from-above': destIndex === idx && srcIndex < destIndex,
                            'over-from-below': destIndex === idx && srcIndex > destIndex
                        })}
                    ></DragAndDropRow>
                ))}
            </ul>
            <div className="drag-and-drop-knapper">
                <Hovedknapp
                    className="drag-and-drop-knapp-lagre"
                    aria-label="Lagre sortering"
                    mini
                    onClick={(e) => lagreRekkefølge()}
                >
                    Lagre
                </Hovedknapp>
                <Knapp
                    className="drag-and-drop-knapp-avbryt"
                    aria-label="Avbryt sortering"
                    mini
                    onClick={(e) => avbryt()}
                >
                    Avbryt
                </Knapp>
                <Flatknapp
                    className="drag-and-drop-knapp-nullstill"
                    aria-label="Nullstill til alfabetisk sortering"
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
