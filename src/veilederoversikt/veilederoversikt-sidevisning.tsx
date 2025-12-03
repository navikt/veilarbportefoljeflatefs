import {useMemo} from 'react';
import {useSelector} from 'react-redux';
import {Toolbar} from '../components/toolbar/toolbar';
import {VeilederoversiktTabell} from './veilederoversikt-tabell';
import {sorterVeilederoversikt} from './sortering';
import {selectFraIndex, selectSeFlere, selectSidestorrelse} from '../components/toolbar/paginering/paginering-selector';
import {OversiktType} from '../ducks/ui/listevisning';
import {VeilederModell} from '../typer/enhet-og-veiledere-modeller';
import {AppState} from '../reducer';
import './veilederoversikt.css';
import {VeilederoversiktSortering} from '../ducks/sortering';

function erValgtHvisFiltrering(veiledere: string[]) {
    if (veiledere?.length > 0) {
        return veileder => veiledere.includes(veileder.ident);
    }
    return () => true; // Ikke valgt noe filter, så alle skal være med.
}

function medPortefoljestorrelse(portefoljeStorrelse) {
    if (portefoljeStorrelse.status !== 'OK') {
        // Før vi har fått portefoljestorrele har alle 0
        return veileder => ({...veileder, portefoljestorrelse: 0});
    }
    const storrelseMap = portefoljeStorrelse.data.facetResults.reduce(
        (acc, {value: ident, count}) => ({...acc, [ident]: count}),
        {}
    );

    return veileder => ({
        ...veileder,
        portefoljestorrelse: storrelseMap[veileder.ident] || 0
    });
}

function propertySort({property, direction}: VeilederoversiktSortering) {
    return sorterVeilederoversikt(property, direction);
}

interface VeilederoversiktSidevisningProps {
    veilederFilter: string[];
    veiledere: VeilederModell[];
}

export function VeilederoversiktSidevisning({veilederFilter, veiledere}: VeilederoversiktSidevisningProps) {
    const fra = useSelector(selectFraIndex);
    const sidestorrelse = useSelector(selectSidestorrelse);
    const seAlle = useSelector(selectSeFlere);
    const sortering = useSelector((state: AppState) => state.sortering);
    const portefoljestorrelser = useSelector((state: AppState) => state.portefoljestorrelser);

    const veilederListe = useMemo(() => {
        return veiledere
            .filter(erValgtHvisFiltrering(veilederFilter))
            .map(medPortefoljestorrelse(portefoljestorrelser))
            .sort(propertySort(sortering));
    }, [veilederFilter, portefoljestorrelser, veiledere, sortering]);

    function getValgteVeiledere() {
        if (seAlle) {
            return veilederListe;
        }
        return veilederListe.slice(fra, fra + sidestorrelse);
    }

    return (
        <>
            <Toolbar
                oversiktType={OversiktType.veilederOversikt}
                antallTotalt={veiledere.length}
                sokVeilederSkalVises={false}
                id="veilederside-toolbar"
                antallValgteVeiledere={getValgteVeiledere().length}
            />
            <VeilederoversiktTabell veiledere={getValgteVeiledere()} currentSortering={sortering} />
        </>
    );
}
