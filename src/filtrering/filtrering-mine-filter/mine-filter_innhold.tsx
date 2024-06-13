import React, {useEffect, useRef} from 'react';
import './mine-filter_innhold.css';
import '../../components/sidebar/sidebar.css';
import {LagretFilter} from '../../ducks/lagret-filter';
import {OversiktType} from '../../ducks/ui/listevisning';
import DragAndDrop from './drag-and-drop/drag-and-drop';
import {useDispatch} from 'react-redux';
import {slettFilter} from '../../ducks/mine-filter';
import {OrNothing} from '../../utils/types/types';
import {Tiltak} from '../../ducks/enhettiltak';
import {Alert, BodyShort} from '@navikt/ds-react';
import {useFeatureSelector} from '../../hooks/redux/use-feature-selector';
import {HUSKELAPP} from '../../konstanter';

export interface LagredeFilterInnholdProps {
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

function MineFilterInnhold({
    lagretFilter,
    oversiktType,
    fjernUtilgjengeligeFilter,
    isDraggable,
    setisDraggable,
    enhettiltak
}: LagredeFilterInnholdProps) {
    const isHuskelappToggleOn = useFeatureSelector()(HUSKELAPP);
    const outerDivRef = useRef<HTMLDivElement>(null);

    const filtrertListe = () => {
        return lagretFilter.filter(elem => fjernUtilgjengeligeFilter(elem));
    };

    const aktiveFilter = () => {
        return filtrertListe().filter(elem => elem.aktiv);
    };

    const inaktiveFilter = () => {
        return filtrertListe().filter(elem => !elem.aktiv);
    };
    const alertArbeidslisteEllerKategori = () => {
        return (
            filtrertListe().filter(elem => elem.filterValg.ferdigfilterListe.includes('MIN_ARBEIDSLISTE')).length > 0
        );
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
                {isHuskelappToggleOn && alertArbeidslisteEllerKategori() && (
                    <Alert
                        variant="info"
                        className="mine-filter_alertstripe"
                        data-testid="mine-filter_alertstripe-arbeidsliste"
                        size="small"
                    >
                        <b>Du har filter med arbeidsliste</b>
                        <br />
                        Disse kan vise færre brukere etter hvert som du bytter til ny huskelapp og nye kategorier. Det
                        kan være lurt å lage filtrene på nytt.
                    </Alert>
                )}
                {inaktiveFilter().length !== 0 && (
                    <Alert
                        variant="info"
                        className="mine-filter_alertstripe"
                        data-testid="mine-filter_alertstripe"
                        size="small"
                        closeButton={true}
                        onClose={() => dispatch(slettFilter(inaktiveFilter()[0].filterId))}
                    >
                        {`'${inaktiveFilter()[0].filterNavn}' er slettet fordi filteret '${
                            inaktiveFilter()[0].note
                        }' er fjernet.`}
                    </Alert>
                )}
                <div className="mine-filter__valgfelt" ref={outerDivRef} data-testid="mine-filter_radio-container">
                    <DragAndDrop
                        stateFilterOrder={aktiveFilter()}
                        oversiktType={oversiktType}
                        isDraggable={isDraggable}
                        setisDraggable={setisDraggable}
                        enhettiltak={enhettiltak}
                    />
                </div>
            </>
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

    return filtrertListe().length > 0 ? hentFiltrertListeinnhold() : getEmptyState();
}

export default MineFilterInnhold;
