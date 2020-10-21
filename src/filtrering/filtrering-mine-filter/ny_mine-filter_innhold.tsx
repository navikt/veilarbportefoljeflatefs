import React, {useEffect, useRef} from 'react';
import './ny_mine-filter-innhold.less';
import '../../components/sidebar/sidebar.less';
import {Normaltekst} from 'nav-frontend-typografi';
import DragAndDrop from './dragAndDrop/drag-and-drop';
import {LagretFilter} from '../../ducks/lagretFilter';
import {ListevisningType} from '../../ducks/ui/listevisning';

interface LagredeFilterInnholdProps {
    lagretFilter: LagretFilter[];
    filtergruppe: ListevisningType;
    fjernUtilgjengeligeFilter: (elem: LagretFilter) => void;
    isDraggable: boolean;
    setisDraggable: React.Dispatch<React.SetStateAction<boolean>>;
}

function isOverflown(element) {
    return element.scrollHeight > element.clientHeight || element.scrollWidth > element.clientWidth;
}

function NyLagredeFilterInnhold(props: LagredeFilterInnholdProps) {
    const outerDivRef = useRef<HTMLDivElement>(null);

    const filtrertListe = () => {
        return props.lagretFilter.filter(elem => props.fjernUtilgjengeligeFilter(elem));
    };

    useEffect(() => {
        if (outerDivRef.current && isOverflown(outerDivRef.current)) {
            outerDivRef.current.style.borderTop = '1px solid #888888';
            outerDivRef.current.style.borderBottom = '1px solid #888888';
        }
    });

    const hentFiltrertListeinnhold = () => {
        return (
            <div className="ny__mine-filter__valgfelt" ref={outerDivRef}>
                <DragAndDrop
                    stateFilterOrder={filtrertListe()}
                    filtergruppe={props.filtergruppe}
                    isDraggable={props.isDraggable}
                    setisDraggable={props.setisDraggable}
                />
            </div>
        );
    };

    const getEmptyState = () => {
        return (
            <div className="ny__mine-filter-emptystate">
                <Normaltekst className="ny__mine-filter-emptystate__tekst">Ingen lagrede filter</Normaltekst>
            </div>
        );
    };

    return filtrertListe().length > 0 ? hentFiltrertListeinnhold() : getEmptyState();
}

export default NyLagredeFilterInnhold;
