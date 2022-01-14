import React, {useEffect, useRef} from 'react';
import './mine-filter_innhold.less';
import '../../components/sidebar/sidebar.less';
import {LagretFilter} from '../../ducks/lagret-filter';
import {OversiktType} from '../../ducks/ui/listevisning';
import DragAndDrop from './drag-and-drop/drag-and-drop';
import Lukknapp from 'nav-frontend-lukknapp';
import {useDispatch} from 'react-redux';
import {slettFilter} from '../../ducks/mine-filter';
import {OrNothing} from '../../utils/types/types';
import {Tiltak} from '../../ducks/enhettiltak';
import {Alert, BodyShort} from '@navikt/ds-react';

interface LagredeFilterInnholdProps {
    lagretFilter: LagretFilter[];
    oversiktType: OversiktType;
    fjernUtilgjengeligeFilter: (elem: LagretFilter) => void;
    isDraggable: boolean;
    setisDraggable: React.Dispatch<React.SetStateAction<boolean>>;
    enhettiltak: OrNothing<Tiltak>;
}

function isOverflown(element) {
    return element.scrollHeight > element.clientHeight || element.scrollWidth > element.clientWidth;
}

function MineFilterInnhold(props: LagredeFilterInnholdProps) {
    const outerDivRef = useRef<HTMLDivElement>(null);

    const filtrertListe = () => {
        return props.lagretFilter.filter(elem => props.fjernUtilgjengeligeFilter(elem));
    };

    const aktiveFilter = () => {
        return filtrertListe().filter(elem => elem.aktiv);
    };

    const inaktiveFilter = () => {
        return filtrertListe().filter(elem => !elem.aktiv);
    };

    const dispatch = useDispatch();

    useEffect(() => {
        if (outerDivRef.current && isOverflown(outerDivRef.current)) {
            outerDivRef.current.style.borderTop = '1px solid #888888';
            outerDivRef.current.style.borderBottom = '1px solid #888888';
        }
    });

    const hentFiltrertListeinnhold = () => {
        return (
            <>
                {inaktiveFilter().length !== 0 && (
                    <Alert variant="info" className="mine-filter_alertstripe" data-testid="mine-filter_alertstripe">
                        {`'${inaktiveFilter()[0].filterNavn}' er slettet fordi filteret '${
                            inaktiveFilter()[0].note
                        }' er fjernet.`}
                        <Lukknapp
                            className="alertstripe_lukknapp"
                            onClick={() => dispatch(slettFilter(inaktiveFilter()[0].filterId))}
                            data-testid="mine-filter_alertstripe_knapp"
                        />
                    </Alert>
                )}
                <div className="mine-filter__valgfelt" ref={outerDivRef} data-testid="mine-filter_radio-container">
                    <DragAndDrop
                        stateFilterOrder={aktiveFilter()}
                        oversiktType={props.oversiktType}
                        isDraggable={props.isDraggable}
                        setisDraggable={props.setisDraggable}
                        enhettiltak={props.enhettiltak}
                    />
                </div>
            </>
        );
    };

    const getEmptyState = () => {
        return (
            <div className="mine-filter-emptystate">
                <BodyShort className="mine-filter-emptystate__tekst">Ingen lagrede filter</BodyShort>
            </div>
        );
    };

    return filtrertListe().length > 0 ? hentFiltrertListeinnhold() : getEmptyState();
}

export default MineFilterInnhold;
