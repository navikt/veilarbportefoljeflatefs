import * as React from 'react';
import { connect } from 'react-redux';
import { ChangeEvent } from 'react';
import Dropdown from '../../dropdown/dropdown';
import { Checkbox } from 'nav-frontend-skjema';
import { avvelgAlternativ, Kolonne, ListevisningType, velgAlternativ } from '../../../ducks/ui/listevisning';
import { alternativerConfig } from './listevisning-utils';
import { selectMuligeAlternativer, selectValgteAlternativer } from '../../../ducks/ui/listevisning-selectors';
import { ToolbarPosisjon } from '../toolbar';

interface ListevisningRadProps {
    kolonne: Kolonne;
    disabled: boolean;
    valgt: boolean;
    onChange: (name: Kolonne, checked: boolean) => void;
}

type Props = ListevisningRadProps;
const ListevisningRad = (props: Props) => {
    const alternativ = alternativerConfig.get(props.kolonne);
    if (alternativ == null) {
        return null;
    }

    return (
        <li>
            <Checkbox
                label={alternativ.tekstlabel}
                value={props.kolonne.toString()}
                checked={props.valgt}
                disabled={props.disabled || alternativ.checkboxDisabled}
                onChange={((e: ChangeEvent<HTMLInputElement>) => props.onChange(props.kolonne, e.target.checked))}
            />
        </li>
    );
};

interface OwnProps {
    filtergruppe: ListevisningType;
    toolbarPosisjon?: ToolbarPosisjon;
}

interface StateProps {
    valgteAlternativ: Kolonne[];
    muligeAlternativer: Kolonne[];
}

interface DispatchProps {
    velgAlternativ: (name: Kolonne, filtergruppe: ListevisningType) => void;
    avvelgAlternativ: (name: Kolonne, filtergruppe: ListevisningType) => void;
}

type ListevisningProps = OwnProps & StateProps & DispatchProps;

const Listevisning = (props: ListevisningProps) => {
    function handleChange(name, checked) {
        if (checked) {
            props.velgAlternativ(name, props.filtergruppe);
        } else {
            props.avvelgAlternativ(name, props.filtergruppe);
        }
    }

    function erValgt(kolonne: Kolonne) {
        return props.valgteAlternativ.indexOf(kolonne) > -1;
    }

    if (![ListevisningType.minOversikt, ListevisningType.enhetensOversikt].includes(props.filtergruppe)) {
        return null;
    }

    return (
        <Dropdown name="Velg kolonner" disabled={props.muligeAlternativer.length <= 5}
                  className="dropdown--fixed dropdown--toolbar">
            <section className="radio-filterform__valg">
                <div className="blokk-s">
                   Du kan velge hvilke kolonner du ønsker å se i listen. Men du kan maks vise 5 kolonner om gangen.
                </div>
                <ul className="ustilet">
                    {props.muligeAlternativer.map((kolonne) => (
                        <ListevisningRad
                            key={kolonne}
                            kolonne={kolonne}
                            valgt={erValgt(kolonne)}
                            disabled={props.valgteAlternativ.length >= 5 && !erValgt(kolonne)}
                            onChange={handleChange}
                        />
                    ))}
                </ul>
            </section>
        </Dropdown>
    );
};

function mapStateToProps(state, ownProps): StateProps {
    return {
        valgteAlternativ: selectValgteAlternativer(state, ownProps.filtergruppe),
        muligeAlternativer: selectMuligeAlternativer(state, ownProps.filtergruppe)
    };
}

function mapDispatchToProps(dispatch, props): DispatchProps {
    return {
        velgAlternativ: (name: Kolonne, filtergruppe: ListevisningType) => dispatch(velgAlternativ(name, filtergruppe, props.toolbarPosisjon)),
        avvelgAlternativ: (name: Kolonne, filtergruppe: ListevisningType) => dispatch(avvelgAlternativ(name, filtergruppe))
    };
}

export default connect<StateProps,DispatchProps,OwnProps>(mapStateToProps, mapDispatchToProps) (Listevisning);
