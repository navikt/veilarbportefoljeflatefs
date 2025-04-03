import {Dispatch, MouseEvent, SetStateAction} from 'react';
import {keyCodes} from '../../../utils/utils';

interface HandleKeyDownProps {
    eventIsInsideContainer: (e: MouseEvent) => boolean;
    setDropIndex: Dispatch<SetStateAction<number>>;
    prepFlyttOpp: (index: number) => void;
    prepFlyttNed: (index: number) => void;
    requestFocus: (index: number) => void;
}

interface HandleKeyUpProps {
    eventIsInsideContainer: (e: MouseEvent) => boolean;
    requestNewOrder: (from: number, to: number) => void;
    lagreRekkefolge: () => void;
    avbryt: () => void;
    setDestIndex: Dispatch<SetStateAction<number>>;
    setSrcIndex: Dispatch<SetStateAction<number>>;
}

export function handleKeyDown({
    eventIsInsideContainer,
    setDropIndex,
    prepFlyttOpp,
    prepFlyttNed,
    requestFocus
}: HandleKeyDownProps) {
    return e => {
        if (eventIsInsideContainer(e)) {
            if (e.keyCode === keyCodes.up) {
                e.preventDefault();
                if (e.shiftKey) {
                    prepFlyttOpp(e.target.value);
                } else {
                    requestFocus(e.target.value - 1);
                }
            } else if (e.keyCode === keyCodes.down) {
                e.preventDefault();
                if (e.shiftKey) {
                    prepFlyttNed(e.target.value);
                } else {
                    requestFocus(e.target.value + 1);
                }
            }
            setDropIndex(-1);
        }
    };
}

export function handleKeyUp({
    eventIsInsideContainer,
    requestNewOrder,
    setDestIndex,
    setSrcIndex,
    avbryt,
    lagreRekkefolge
}: HandleKeyUpProps) {
    return e => {
        if (eventIsInsideContainer(e)) {
            if (e.shiftKey && (e.keyCode === keyCodes.up || e.keyCode === keyCodes.down)) {
                if (e.keyCode === keyCodes.up) {
                    requestNewOrder(e.target.value, e.target.value - 1);
                } else {
                    requestNewOrder(e.target.value, e.target.value + 1);
                }
            } else if (e.keyCode === keyCodes.esc) {
                avbryt();
            } else if (e.keyCode === keyCodes.enter) {
                lagreRekkefolge();
            }
            setDestIndex(-1);
            setSrcIndex(-1);
        }
    };
}
