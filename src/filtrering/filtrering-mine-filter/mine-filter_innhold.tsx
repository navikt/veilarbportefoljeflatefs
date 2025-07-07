import {Dispatch, SetStateAction, useEffect, useRef} from 'react';
import {useDispatch} from 'react-redux';
import {Alert, BodyShort, Heading, List} from '@navikt/ds-react';
import {LagretFilter} from '../../ducks/lagret-filter';
import {OversiktType} from '../../ducks/ui/listevisning';
import {DragAndDrop} from './drag-and-drop/drag-and-drop';
import {slettFilter} from '../../ducks/mine-filter';
import {OrNothing} from '../../utils/types/types';
import {Tiltak} from '../../ducks/enhettiltak';
import {AlertVistLoggdata, loggVisningAvAlert} from '../../amplitude/logg-visning-av-alert';
import './mine-filter_innhold.css';
import '../../components/sidebar/sidebar.css';

const loggdataForAlerter: {[key: string]: AlertVistLoggdata} = {
    filterMedArbeidsliste: {
        tekst: 'Du har filter med gammel arbeidsliste',
        variant: 'warning'
    },
    harInaktiveFilter: {
        tekst: '[Navn på lagret filter] er slettet fordi filteret [filterverdi] er fjernet',
        variant: 'info'
    }
} as const;

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
    const dispatch = useDispatch();

    const filtrertListe = () => {
        return lagretFilter.filter(elem => fjernUtilgjengeligeFilter(elem));
    };

    const aktiveFilter = () => {
        return filtrertListe().filter(elem => elem.aktiv);
    };

    const inaktiveFilter = () => {
        return filtrertListe().filter(elem => !elem.aktiv);
    };

    const visArbeidslisteEllerKategoriAlertOgLoggTilAmplitude = () => {
        const harArbeidslisteEllerKategori =
            filtrertListe().filter(elem => elem.filterValg.ferdigfilterListe.includes('MIN_ARBEIDSLISTE')).length > 0;

        if (harArbeidslisteEllerKategori) {
            loggVisningAvAlert(loggdataForAlerter.filterMedArbeidsliste);
        }
        return harArbeidslisteEllerKategori;
    };

    const lagraFilterMedArbeidslisteEllerKategori = filtrertListe().filter(elem =>
        elem.filterValg.ferdigfilterListe.includes('MIN_ARBEIDSLISTE')
    );

    function visHarInaktiveFilterAlertOgLoggTilAmplitude() {
        const harInaktiveFilter = inaktiveFilter().length !== 0;
        if (harInaktiveFilter) {
            loggVisningAvAlert(loggdataForAlerter.harInaktiveFilter);
        }
        return harInaktiveFilter;
    }

    useEffect(() => {
        if (outerDivRef.current && isOverflown(outerDivRef.current)) {
            outerDivRef.current.style.borderTop = '1px solid #888888';
            outerDivRef.current.style.borderBottom = '1px solid #888888';
        }
    });

    const hentFiltrertListeinnhold = () => {
        return (
            <>
                {visArbeidslisteEllerKategoriAlertOgLoggTilAmplitude() && (
                    <Alert
                        variant={loggdataForAlerter.filterMedArbeidsliste.variant}
                        className="mine-filter_alertstripe filter-med-arbeidsliste-alert"
                        data-testid="mine-filter_alertstripe-arbeidsliste"
                        size="small"
                    >
                        <Heading size="xsmall" level="3" className="filter-med-arbeidsliste-heading">
                            {loggdataForAlerter.filterMedArbeidsliste.tekst}
                        </Heading>
                        <BodyShort spacing={true}>
                            Lagrede filter med Min arbeidsliste fungerer ikke lenger. Slett det lagrede filteret og lag
                            et nytt.
                        </BodyShort>
                        <BodyShort spacing={true}>
                            Filtrene slettes 1. september 2025 dersom de inneholder Min arbeidsliste.
                        </BodyShort>

                        <Heading size="xsmall" level="4" className="filter-med-arbeidsliste-heading">
                            Filter som prøver å filtrere på Min arbeidsliste:
                        </Heading>
                        <List className="filter-med-arbeidsliste-list">
                            {lagraFilterMedArbeidslisteEllerKategori.map(it => {
                                return <List.Item key={it.filterId}>{it.filterNavn}</List.Item>;
                            })}
                        </List>
                    </Alert>
                )}
                {visHarInaktiveFilterAlertOgLoggTilAmplitude() && (
                    <Alert
                        variant={loggdataForAlerter.harInaktiveFilter.variant}
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
