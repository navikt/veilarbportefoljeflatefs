import * as React from 'react';
import {connect} from 'react-redux';
import {ChangeEvent} from 'react';
import Dropdown from '../../dropdown/dropdown';
import {Checkbox} from 'nav-frontend-skjema';
import {FormattedMessage} from 'react-intl';
import {AppState} from '../../../reducer';
import {Action, Dispatch} from 'redux';
import {avvelgAlternativ, Kolonne, velgAlternativ} from '../../../ducks/ui/listevisning';
import {alternativerConfig} from "./listevisning-utils";

interface ListevisningRadProps {
    kolonne: Kolonne
    disabled: boolean;
    valgt: boolean;
    onChange: (name: Kolonne, checked: boolean) => void;
}

const ListevisningRad = (props: ListevisningRadProps) => {
    const alternativ = alternativerConfig.get(props.kolonne);
    if (alternativ == null) {
        return null;
    }

    return (
        <li>
            <Checkbox
                label={<FormattedMessage id={alternativ.tekstid}/>}
                value={props.kolonne.toString()}
                checked={props.valgt}
                disabled={props.disabled || alternativ.checkboxDisabled}
                onChange={((e: ChangeEvent<HTMLInputElement>) => props.onChange(props.kolonne, e.target.checked))}
            />
        </li>
    );
};

interface ListevisningProps {
    valgteAlternativ: Kolonne[];
    muligeAlternativer: Kolonne[];
    dispatch: Dispatch<Action>;
}

const Listevisning = (props: ListevisningProps) => {
    function handleChange(name, checked) {
        if (checked) {
            props.dispatch(velgAlternativ(name));
        } else {
            props.dispatch(avvelgAlternativ(name));
        }
    }

    function erValgt(kolonne: Kolonne) {
        return props.valgteAlternativ.indexOf(kolonne) > -1;
    }

    return (
        <Dropdown name="Listevisning" className="dropdown--fixed dropdown--toolbar">
            <section className="radio-filterform__valg">
                <div className="blokk-s">
                    <FormattedMessage id="listevisning.ingress"/>
                </div>
                <ul className="ustilet">
                    {props.muligeAlternativer.map((kolonne) => (
                        <ListevisningRad
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

function mapStateToProps(state: AppState) {
    return {
        valgteAlternativ: state.ui.listevisning.valgte
    };
}

export default connect(mapStateToProps)(Listevisning);
