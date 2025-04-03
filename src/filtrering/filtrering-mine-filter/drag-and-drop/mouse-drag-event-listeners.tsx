import {Dispatch, SetStateAction} from 'react';
import {trackAmplitude} from '../../../amplitude/amplitude';

interface HandleDragEnterProps {
    setdDragIsInsideElement: Dispatch<SetStateAction<boolean>>;
    eventIsInsideContainer: (e: MouseEvent) => boolean;
}

interface HandleDragStartProps {
    setSrcIndex: Dispatch<SetStateAction<number>>;
    setDropIndex: Dispatch<SetStateAction<number>>;
    eventIsInsideContainer: (e: MouseEvent) => boolean;
}

interface HandleDragEndProps {
    srcIndex: number;
    destIndex: number;
    dragIsInsideElement: boolean;
    requestNewOrder: (from: number, to: number) => void;
    setSrcIndex: Dispatch<SetStateAction<number>>;
    setDestIndex: Dispatch<SetStateAction<number>>;
    eventIsInsideContainer: (e: MouseEvent) => boolean;
}

interface HandleDragOverProps {
    setDestIndex: Dispatch<SetStateAction<number>>;
    eventIsInsideContainer: (e: MouseEvent) => boolean;
}

export function handleDragEnter({eventIsInsideContainer, setdDragIsInsideElement}: HandleDragEnterProps) {
    return (e: MouseEvent) => {
        if (eventIsInsideContainer(e)) {
            setdDragIsInsideElement(true);
        } else {
            setdDragIsInsideElement(false);
        }
    };
}

export function handleDragStart({eventIsInsideContainer, setSrcIndex, setDropIndex}: HandleDragStartProps) {
    return e => {
        if (eventIsInsideContainer(e)) {
            if (typeof e.target.value === 'number') setSrcIndex(e.target.value);
            setDropIndex(-1);
        }
    };
}

export function handleDragEnd({
    srcIndex,
    destIndex,
    dragIsInsideElement,
    requestNewOrder,
    setSrcIndex,
    setDestIndex
}: HandleDragEndProps) {
    return e => {
        if (dragIsInsideElement) {
            trackAmplitude({
                name: 'knapp klikket',
                data: {knapptekst: 'Endre rekkefølge - mine filter', effekt: 'dragEnd'}
            });
            requestNewOrder(srcIndex, destIndex);
        }
        setSrcIndex(-1);
        setDestIndex(-1);
    };
}

export function handleDragOver({eventIsInsideContainer, setDestIndex}: HandleDragOverProps) {
    return e => {
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
}
