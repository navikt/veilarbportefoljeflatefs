import {useRef, useEffect, memo} from 'react';
import {ReactComponent as DragIcon} from './dragIcon.svg';
import {FlyttKnappWrapper} from './flytt-knapp-wrapper';
import {kebabCase} from '../../../utils/utils';
import {trackAmplitude} from '../../../amplitude/amplitude';

interface DragAndDropRowProps {
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
            data-testid={`drag-drop_rad_${kebabCase(filterNavn)}`}
        >
            <DragIcon aria-disabled={true} />
            {filterNavn}
            <FlyttKnappWrapper
                showUpBtn={idx !== 0}
                showDownBtn={!isLastRow}
                onClickUp={() => {
                    trackAmplitude({
                        name: 'knapp klikket',
                        data: {knapptekst: 'Endre rekkefølge (pil) - mine filter', effekt: 'Flyttet filter opp'}
                    });
                    onClick(idx, idx - 1);
                }}
                onClickDown={() => {
                    trackAmplitude({
                        name: 'knapp klikket',
                        data: {knapptekst: 'Endre rekkefølge (pil) - mine filter', effekt: 'Flyttet filter ned'}
                    });
                    onClick(idx, idx + 1);
                }}
                idx={idx}
            />
        </li>
    );
}

export default memo(DragAndDropRow);
