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

function Listevisning(props: ListevisningProps) {
    const valgteAlternativ = useSelector((state: AppState) => selectValgteAlternativer(state, props.oversiktType));
    const muligeAlternativer = useSelector((state: AppState) => selectMuligeAlternativer(state, props.oversiktType));

    const dispatch = useDispatch();

    const handleChange = (oversiktType, checked) => {
        if (checked) {
            dispatch(velgAlternativ(oversiktType, props.oversiktType));
        } else {
            dispatch(avvelgAlternativ(oversiktType, props.oversiktType));
        }
    };

    const erValgt = (kolonne: Kolonne) => {
        return valgteAlternativ.indexOf(kolonne) > -1;
    };

    if (![OversiktType.minOversikt, OversiktType.enhetensOversikt].includes(props.oversiktType)) {
        return null;
    }

    return (
        <VelgKolonner
            className="dropdown--toolbar toolbar__velg-kolonner"
            render={() => (
                <ul className="ustilet">
                    {muligeAlternativer.map(kolonne => (
                        <ListevisningRad
                            key={kolonne}
                            kolonneoverskrift={kolonne}
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
