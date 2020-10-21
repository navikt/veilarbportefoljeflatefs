import React, {useRef, useEffect} from 'react';
import {ReactComponent as DragIcon} from './dragIcon.svg';
import FlyttKnappWrapper from './flytt-knapp-wrapper';

export interface DragAndDropRowProps {
    idx: number;
    filterNavn: string;
    isLastRow: boolean;
    shouldBeFocused: boolean;
    requestFocus: (number) => void;
    className: string;
    onClick: (from: number, to: number) => void;
}

function DragAndDropRow({
    idx,
    filterNavn,
    isLastRow,
    shouldBeFocused,
    requestFocus,
    className,
    onClick
}: DragAndDropRowProps) {
    const dragNode = useRef<HTMLLIElement>(null);
    useEffect(() => {
        if (shouldBeFocused) {
            dragNode.current?.focus();
            requestFocus(-1);
        }
    }, [shouldBeFocused, requestFocus]);

    const tabIndex = idx === 0 ? 0 : -1;
    return (
        <li
            ref={dragNode}
            className={className}
            draggable="true"
            tabIndex={tabIndex}
            role="option"
            aria-describedby="operation"
            aria-selected={true}
            value={idx}
        >
            <DragIcon aria-disabled={true} />
            {filterNavn}
            <FlyttKnappWrapper
                showUpBtn={idx !== 0}
                showDownBtn={!isLastRow}
                onClickUp={() => onClick(idx, idx - 1)}
                onClickDown={() => onClick(idx, idx + 1)}
                idx={idx}
            />
        </li>
    );
}

export default React.memo(DragAndDropRow);
