import {useMemo} from 'react';
import {useSelector} from 'react-redux';
import {Toolbar} from '../components/toolbar/toolbar';
import {VeilederoversiktTabell} from './veilederoversikt-tabell';
import {selectFraIndex, selectSeFlere, selectSidestorrelse} from '../components/toolbar/paginering/paginering-selector';
import {OversiktType} from '../ducks/ui/listevisning';
import {VeilederModell} from '../typer/enhet-og-veiledere-modeller';
import {AppState} from '../reducer';
import {sorterVeilederoversikt} from './sortering';
import './veilederoversikt.css';
import {FacetResults, PortefoljeStorrelser} from '../ducks/portefoljestorrelser';

function finnValgteVeiledere(valgteVeiledere: string[]): (veileder: VeilederModell) => boolean {
    if (valgteVeiledere?.length > 0) {
        return veileder => valgteVeiledere.includes(veileder.ident);
    }
    return () => true; // Ikke valgt noe filter, så alle skal være med.
}

interface VeilederMedPortefoljestorrelse extends VeilederModell {
    portefoljestorrelse: number;
}

function medPortefoljestorrelse(
    portefoljeStorrelse: PortefoljeStorrelser
): (veileder: VeilederModell) => VeilederMedPortefoljestorrelse {
    if (portefoljeStorrelse.status !== 'OK') {
        // Før vi har fått portefoljestorrele har alle 0
        return (veileder: VeilederModell) => ({...veileder, portefoljestorrelse: 0});
    }
    const mapIdentOgPortefoljestorrelser: {[ident: string]: number} = portefoljeStorrelse.data.facetResults.reduce(
        (acc: {[ident: string]: number}, {value: ident, count}: FacetResults) => ({...acc, [ident]: count}),
        {}
    );

    return (veileder: VeilederModell) => ({
        ...veileder,
        portefoljestorrelse: mapIdentOgPortefoljestorrelser[veileder.ident] || 0
    });
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
            .filter(finnValgteVeiledere(veilederFilter))
            .map(medPortefoljestorrelse(portefoljestorrelser))
            .sort(sorterVeilederoversikt(sortering.property, sortering.direction));
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
