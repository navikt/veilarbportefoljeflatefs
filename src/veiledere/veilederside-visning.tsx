import React, { useMemo } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import Toolbar from './../components/toolbar/toolbar';
import VeiledereTabell from './veiledere-tabell';
import { sortBy } from '../ducks/sortering';
import { sorter } from '../utils/sortering';
import {
    selectFraIndex,
    selectSeAlle,
    selectSideStorrelse
} from '../components/toolbar/paginering/paginering-selector';
import { ListevisningType } from '../ducks/ui/listevisning';
import { PortefoljeStorrelser } from '../ducks/portefoljestorrelser';
import './veiledere.less';
import {VeilederModell} from "../model-interfaces";
import {AppState} from "../reducer";

function erValgtHvisFiltrering(veiledere: string[]) {
    if (veiledere && veiledere.length > 0) {
        return (veileder) => veiledere.includes(veileder.ident);
    }
    return () => true; // Ikke valgt noe filter, så alle skal være med.
}

function medPortefoljestorrelse(portefoljeStorrelse) {
    if (portefoljeStorrelse.status !== 'OK') {
        // Før vi har fått portefoljestorrele har alle 0
        return (veileder) => ({...veileder, portefoljestorrelse: 0});
    }
    const storrelseMap = portefoljeStorrelse.data.facetResults
        .reduce((acc, {value: ident, count}) => ({...acc, [ident]: count}), {});

    return (veileder) => ({...veileder, portefoljestorrelse: storrelseMap[veileder.ident] || 0});
}

function propertySort({property, direction}) {
    return sorter(property, direction);
}

interface VeilederesideVisningProps {
    veilederFilter: string[];
    veiledere: VeilederModell[];
    portefoljestorrelser: PortefoljeStorrelser;
}

function VeilederesideVisning(props: VeilederesideVisningProps) {
    const dispatch = useDispatch();
    const fra = useSelector(selectFraIndex);
    const sideStorrelse = useSelector(selectSideStorrelse);
    const seAlle = useSelector(selectSeAlle);
    const sortering = useSelector((state: AppState)=> state.sortering);

    const veilederListe = useMemo(() => {
        return props.veiledere
            .filter(erValgtHvisFiltrering(props.veilederFilter))
            .map(medPortefoljestorrelse(props.portefoljestorrelser))
            .sort(propertySort(sortering));
    },[props.veilederFilter, props.portefoljestorrelser, props.veiledere, sortering]);

    function getVeiledere() {
        if (seAlle) {
            return veilederListe
        }
        return veilederListe.slice(fra, fra + sideStorrelse);
    }
    const veiledere = getVeiledere();

    return (
        <div>
            <Toolbar
                filtergruppe={ListevisningType.veilederOversikt}
                antallTotalt={veilederListe.length}
                sokVeilederSkalVises={false}
                id="veilederside-toolbar"
            />
            <VeiledereTabell
                veiledere={veiledere}
                currentSortering={sortering}
                sorterPaaEtternavn={() => dispatch(sortBy('etternavn'))}
                sorterPaaPortefoljestorrelse={() => dispatch(sortBy('portefoljestorrelse'))}
            />
        </div>
    );
}

export default VeilederesideVisning;
