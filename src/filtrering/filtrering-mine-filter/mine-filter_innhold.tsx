import {Dispatch, SetStateAction, useEffect, useRef} from 'react';
import {BodyShort} from '@navikt/ds-react';
import {LagretFilter} from '../../ducks/lagret-filter';
import {OversiktType} from '../../ducks/ui/valgte-kolonner';
import {DragAndDrop} from './drag-and-drop/drag-and-drop';
import {OrNothing} from '../../utils/types/types';
import {Tiltak} from '../../ducks/enhettiltak';
import './mine-filter_innhold.css';
import '../../components/sidebar/sidebar.css';

export interface LagredeFilterInnholdProps {
    lagretFilter: LagretFilter[];
    oversiktType: OversiktType;
    fjernUtilgjengeligeFilter: (elem: LagretFilter) => void;
    isDraggable: boolean;
    setisDraggable: Dispatch<SetStateAction<boolean>>;
    enhettiltak: OrNothing<Tiltak>;
}

function isOverflown(element) {
    return element.scrollHeight > element.clientHeight || element.scrollWidth > element.clientWidth;
}

export function MineFilterInnhold({
    lagretFilter,
    oversiktType,
    fjernUtilgjengeligeFilter,
    isDraggable,
    setisDraggable,
    enhettiltak
}: LagredeFilterInnholdProps) {
    const outerDivRef = useRef<HTMLDivElement>(null);
    const aktiveFilter = () => {
        return lagretFilter.filter(elem => fjernUtilgjengeligeFilter(elem));
    };

    useEffect(() => {
        if (outerDivRef.current && isOverflown(outerDivRef.current)) {
            outerDivRef.current.style.borderTop = '1px solid #888888';
            outerDivRef.current.style.borderBottom = '1px solid #888888';
        }
    });

    const hentFiltrertListeinnhold = () => {
        return (
            <div className="mine-filter__valgfelt" ref={outerDivRef} data-testid="mine-filter_radio-container">
                <DragAndDrop
                    stateFilterOrder={aktiveFilter()}
                    oversiktType={oversiktType}
                    isDraggable={isDraggable}
                    setisDraggable={setisDraggable}
                    enhettiltak={enhettiltak}
                />
            </div>
        );
    };

    const getEmptyState = () => {
        return (
            <div className="mine-filter-emptystate">
                <BodyShort size="small" className="mine-filter-emptystate__tekst">
                    Ingen lagrede filter
                </BodyShort>
            </div>
        );
    };

    return aktiveFilter().length > 0 ? hentFiltrertListeinnhold() : getEmptyState();
}
