import * as React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {avvelgAlternativ, Kolonne, OversiktType, velgAlternativ} from '../../../ducks/ui/listevisning';
import {selectMuligeAlternativer, selectValgteAlternativer} from '../../../ducks/ui/listevisning-selectors';
import ListevisningRad from './listevisning-rad';
import './listevisning.css';
import {AppState} from '../../../reducer';
import VelgKolonner from '../velg-kolonner';

interface ListevisningProps {
    oversiktType: OversiktType;
}

function Listevisning({oversiktType}: ListevisningProps) {
    const valgteAlternativ = useSelector((state: AppState) => selectValgteAlternativer(state, oversiktType));
    const muligeAlternativer = useSelector((state: AppState) => selectMuligeAlternativer(state, oversiktType));

    const dispatch = useDispatch();

    const handleChange = (kolonne: Kolonne, checked: boolean) => {
        if (checked) {
            dispatch(velgAlternativ(kolonne, oversiktType));
        } else {
            dispatch(avvelgAlternativ(kolonne, oversiktType));
        }
    };

    const erValgt = (kolonne: Kolonne) => {
        return valgteAlternativ.indexOf(kolonne) > -1;
    };

    if (![OversiktType.minOversikt, OversiktType.enhetensOversikt].includes(oversiktType)) {
        return null;
    }

    return (
        <VelgKolonner
            render={() => (
                <ul className="ustilet">
                    {muligeAlternativer.map(kolonne => (
                        <ListevisningRad
                            key={kolonne}
                            kolonne={kolonne}
                            valgt={erValgt(kolonne)}
                            disabled={valgteAlternativ.length >= 3 && !erValgt(kolonne)}
                            onChange={handleChange}
                        />
                    ))}
                </ul>
            )}
        />
    );
}

export default Listevisning;
