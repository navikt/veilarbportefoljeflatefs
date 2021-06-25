import React, {useMemo} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Toolbar from './../components/toolbar/toolbar';
import VeiledereTabell from './veiledere-tabell';
import {sortBy} from '../ducks/sortering';
import {sorter} from '../utils/sortering';
import {selectFraIndex, selectSeAlle, selectSideStorrelse} from '../components/toolbar/paginering/paginering-selector';
import {OversiktType} from '../ducks/ui/listevisning';
import {PortefoljeStorrelser} from '../ducks/portefoljestorrelser';
import './veiledere.less';
import {VeilederModell} from '../model-interfaces';
import {AppState} from '../reducer';
import {veiledere} from '../mocks/veiledere';

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

function propertySort({property, direction}) {
    return sorter(property, direction);
}

interface VeilederesideVisningProps {
    veilederFilter: string[];
    veiledere: VeilederModell[];
    portefoljestorrelser: PortefoljeStorrelser;
    antallVeiledere: number;
}

function VeilederesideVisning(props: VeilederesideVisningProps) {
    const dispatch = useDispatch();
    const fra = useSelector(selectFraIndex);
    const sideStorrelse = useSelector(selectSideStorrelse);
    const seAlle = useSelector(selectSeAlle);
    const sortering = useSelector((state: AppState) => state.sortering);

    const veilederListe = useMemo(() => {
        return props.veiledere
            .filter(erValgtHvisFiltrering(props.veilederFilter))
            .map(medPortefoljestorrelse(props.portefoljestorrelser))
            .sort(propertySort(sortering));
    }, [props.veilederFilter, props.portefoljestorrelser, props.veiledere, sortering]);

    function getVeiledere() {
        if (seAlle) {
            return veilederListe;
        }
        return veilederListe.slice(fra, fra + sideStorrelse);
    }

    return (
        <>
            <Toolbar
                oversiktType={OversiktType.veilederOversikt}
                antallTotalt={props.veiledere.length}
                sokVeilederSkalVises={false}
                id="veilederside-toolbar"
                antallSynligeVeiledere={getVeiledere().length}
            />
            <VeiledereTabell
                veiledere={getVeiledere()}
                currentSortering={sortering}
                sorterPaaEtternavn={() => dispatch(sortBy('etternavn'))}
                sorterPaaPortefoljestorrelse={() => dispatch(sortBy('portefoljestorrelse'))}
            />
        </>
    );
}

export default VeilederesideVisning;
