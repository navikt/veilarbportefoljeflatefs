import {useState} from 'react';
import {useSelector} from 'react-redux';
import {HelpText} from '@navikt/ds-react';
import {SidebarTab} from './sidebar-tab';
import {OversiktType} from '../../ducks/ui/listevisning';
import {ToggleSwitch} from '../../filtrering/filtrering-mine-filter/toggle-switch/toggle-switch';
import {FiltreringMineFilter} from '../../filtrering/filtrering-mine-filter/filtrering-mine-filter';
import {AppState} from '../../reducer';
import {LagretFilter} from '../../ducks/lagret-filter';
import {OrNothing} from '../../utils/types/types';
import {Tiltak} from '../../ducks/enhettiltak';
import {trackAmplitude} from '../../amplitude/amplitude';
import {SidebarTabs} from '../../store/sidebar/sidebar-view-store';

function sortMineFilter(a: LagretFilter, b: LagretFilter) {
    if (a.sortOrder !== null) {
        if (b.sortOrder !== null) {
            return a.sortOrder - b.sortOrder;
        }
        return -1;
    }
    if (b.sortOrder !== null) {
        return 1;
    }
    return a.filterNavn.toLowerCase().localeCompare(b.filterNavn.toLowerCase(), undefined, {numeric: true});
}

interface Props {
    valgtFane: SidebarTabs;
    fanetittel: string;
    oversiktType: OversiktType;
    enhettiltak: OrNothing<Tiltak>;
}

export const MineFilterTab = ({valgtFane, fanetittel, oversiktType, enhettiltak}: Props) => {
    const [isMinefiltereDraggable, setIsMinefiltereDraggable] = useState(false);
    const mineFilterState = useSelector((state: AppState) => state.mineFilter);
    const mineFilter = mineFilterState.data;
    const erPaMinOversikt = oversiktType === OversiktType.minOversikt;
    const erPaEnhetensOversikt = oversiktType === OversiktType.enhetensOversikt;

    const fjernUtilgjengeligeFilter = (elem: LagretFilter) => {
        const arbeidsliste = elem.filterValg.ferdigfilterListe.includes('MIN_ARBEIDSLISTE');
        const arbeidslisteKategori = elem.filterValg.arbeidslisteKategori.length > 0;
        const nyeBrukere = elem.filterValg.ferdigfilterListe.includes('NYE_BRUKERE_FOR_VEILEDER');

        const veiledergrupper = elem.filterValg.veiledere.length > 0;
        const ufordelteBrukere = elem.filterValg.ferdigfilterListe.includes('UFORDELTE_BRUKERE');

        return !(
            (erPaEnhetensOversikt && (arbeidsliste || arbeidslisteKategori || nyeBrukere)) ||
            (erPaMinOversikt && (veiledergrupper || ufordelteBrukere))
        );
    };

    const hjelpeTekst = oversiktType => {
        switch (oversiktType) {
            case OversiktType.minOversikt:
                return 'Filter som inneholder Veiledergrupper og Ufordelte brukere er ikke tilgjengelig i Min oversikt.';
            case OversiktType.enhetensOversikt:
                return 'Filter som inneholder Arbeidslisten og Nye brukere er ikke tilgjengelig i Enhetens oversikt.';
            default:
                return ' ';
        }
    };

    return (
        <SidebarTab
            tittel={fanetittel}
            tab={valgtFane}
            oversiktType={oversiktType}
            headingChildren={
                <>
                    <HelpText placement="right" strategy="fixed">
                        {hjelpeTekst(oversiktType)}
                    </HelpText>
                    <ToggleSwitch
                        checked={isMinefiltereDraggable}
                        onChange={() => {
                            trackAmplitude({
                                name: 'knapp klikket',
                                data: {
                                    knapptekst: 'Endre rekkefølge - mine filter',
                                    effekt: `${isMinefiltereDraggable ? 'Lås' : 'Endre'} rekkefølge - mine filter`
                                }
                            });
                            setIsMinefiltereDraggable(prevState => !prevState);
                        }}
                        ariaLabel="Endre rekkefølge"
                    />
                </>
            }
        >
            <FiltreringMineFilter
                oversiktType={oversiktType}
                fjernUtilgjengeligeFilter={fjernUtilgjengeligeFilter}
                lagretFilter={mineFilter.sort(sortMineFilter)}
                isDraggable={isMinefiltereDraggable}
                setisDraggable={setIsMinefiltereDraggable}
                enhettiltak={enhettiltak}
            />
        </SidebarTab>
    );
};
