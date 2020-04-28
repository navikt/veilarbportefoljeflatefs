import * as React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { avvelgAlternativ, Kolonne, ListevisningType, velgAlternativ } from '../../../ducks/ui/listevisning';
import { selectMuligeAlternativer, selectValgteAlternativer } from '../../../ducks/ui/listevisning-selectors';
import ListevisningRad from './listvisning-rad';
import './listevisning.less';
import { ReactComponent as VelgKolonneIkon } from '../../ikoner/settings.svg';
import Dropdown from "../../dropdown/dropdown";
import {AppState} from "../../../reducer";

interface ListevisningProps {
    filtergruppe: ListevisningType;
}

function Listevisning (props: ListevisningProps) {

    const valgteAlternativ = useSelector((state: AppState) => selectValgteAlternativer(state, props.filtergruppe));
    const muligeAlternativer = useSelector((state: AppState) =>  selectMuligeAlternativer(state, props.filtergruppe));

    const dispatch = useDispatch();

    const handleChange = (name, checked) => {
        if (checked) {
            dispatch(velgAlternativ(name, props.filtergruppe));
        } else {
            dispatch(avvelgAlternativ(name, props.filtergruppe));
        }
    };

    const erValgt = (kolonne: Kolonne) => {
        return valgteAlternativ.indexOf(kolonne) > -1;
    };

    if (![ListevisningType.minOversikt, ListevisningType.enhetensOversikt].includes(props.filtergruppe)) {
        return null;
    }

    const DropdownNavn = () =>
        <>
            <VelgKolonneIkon/>
            <span className="velg-kolonner__tekst">Velg kolonner</span>
        </>;

    return (
        <Dropdown
            name={<DropdownNavn/>}
            disabled={muligeAlternativer.length <= 3}
            className="dropdown--toolbar toolbar__velg-kolonner"
            render={() =>
                <section>
                    <ul
                        className="ustilet">
                        {muligeAlternativer.map((kolonne) => (
                            <ListevisningRad
                                key={kolonne}
                                kolonne={kolonne}
                                valgt={erValgt(kolonne)}
                                disabled={valgteAlternativ.length >= 3 && !erValgt(kolonne)}
                                onChange={handleChange}
                            />
                        ))}
                    </ul>
                </section>
            }
        />
    );
};

export default Listevisning;
