import React, {useRef, useEffect} from 'react';
import {ReactComponent as DragIcon} from './dragIcon.svg';
import FlyttKnappWrapper from './flytt-knapp-wrapper';

interface DragAndDropRowProps {
    idx: number;
    filterNavn: string;
    isLastRow: boolean;
    shouldBeFocused: boolean;
    requestFocus: (number) => void;
    className: string;
    onClick: (from: number, to: number) => void;
}

function DragAndDropRow(props: DragAndDropRowProps) {

    const dragNode = useRef<HTMLLIElement>(null);

    useEffect(() => {
        if (props.shouldBeFocused) {
            dragNode.current?.focus();
            props.requestFocus(-1);
        }
    }, [props, props.shouldBeFocused, props.requestFocus]);

    const tabIndex = props.idx === 0 ? 0 : -1;

    return (
        <li
            onClick={props.requestFocus}
            ref={dragNode}
            className={props.className}
            draggable="true"
            tabIndex={tabIndex}
            role="option"
            aria-describedby="operation"
            aria-selected={true}
            value={props.idx}
            data-testid='drag-drop_rad'
        >
            <DragIcon aria-disabled={true}/>
            {props.filterNavn}
            <FlyttKnappWrapper
                showUpBtn={props.idx !== 0}
                showDownBtn={!props.isLastRow}
                onClickUp={() => props.onClick(props.idx, props.idx - 1)}
                onClickDown={() => props.onClick(props.idx, props.idx + 1)}
                idx={props.idx}
            />
        </li>
    );
}

export default React.memo(DragAndDropRow);
