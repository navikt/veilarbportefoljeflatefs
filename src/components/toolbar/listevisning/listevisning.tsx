import * as React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {avvelgAlternativ, Kolonne, OversiktType, velgAlternativ} from '../../../ducks/ui/listevisning';
import {selectMuligeAlternativer, selectValgteAlternativer} from '../../../ducks/ui/listevisning-selectors';
import ListevisningRad from './listvisning-rad';
import './listevisning.less';
import {ReactComponent as VelgKolonneIkon} from '../../ikoner/settings.svg';
import Dropdown from '../../dropdown/dropdown';
import {AppState} from '../../../reducer';
import {CheckboxGroup} from '@navikt/ds-react';

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

    const DropdownNavn = () => (
        <>
            <VelgKolonneIkon />
            <span className="velg-kolonner__tekst">Velg kolonner</span>
        </>
    );

    return (
        <Dropdown
            name={<DropdownNavn />}
            id="velg-kolonner"
            disabled={muligeAlternativer.length <= 3}
            className="dropdown--toolbar toolbar__velg-kolonner"
            render={() => (
                <CheckboxGroup className="ustilet" legend="" hideLegend>
                    {muligeAlternativer.map(kolonne => (
                        <ListevisningRad
                            key={kolonne}
                            kolonneoverskrift={kolonne}
                            valgt={erValgt(kolonne)}
                            disabled={valgteAlternativ.length >= 3 && !erValgt(kolonne)}
                            onChange={handleChange}
                        />
                    ))}
                </CheckboxGroup>
            )}
        />
    );
}

export default Listevisning;
