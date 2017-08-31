import * as React from 'react';
import {connect} from 'react-redux';
import {ChangeEvent} from "react";
import Dropdown from "../dropdown/dropdown";
import { Checkbox } from 'nav-frontend-skjema';
import {FormattedMessage} from "react-intl";
import {AppState} from "../../reducer";
import {Action, Dispatch} from "redux";
import {avvelgAlternativ, velgAlternativ} from "../../ducks/ui/listevisning";

interface alternativ {
    value: string;
    tekstid: string;
    allwaysDisabled?: boolean;
}

const alternativer: alternativ[] = [
    {value: 'bruker', tekstid: 'listevisning.valg.bruker', allwaysDisabled: true},
    {value: 'fodselsnr', tekstid: 'listevisning.valg.fodselsnr', allwaysDisabled: true},
    {value: 'veileder', tekstid: 'listevisning.valg.veileder'},
    {value: 'navident', tekstid: 'listevisning.valg.navident'},
    {value: 'ventersvar', tekstid: 'listevisning.valg.ventersvar'},
    {value: 'utlopytelse', tekstid: 'listevisning.valg.utlopytelse'},
    {value: 'utlopaktivitet', tekstid: 'listevisning.valg.utlopaktivitet'}
];

interface ListevisningRadProps extends alternativ {
    disabled: boolean;
    valgt: boolean;
    onChange: (name: string, checked: boolean) => void;
}

const ListevisningRad = (props: ListevisningRadProps) => (
    <li>
        <Checkbox
            label={<FormattedMessage id={props.tekstid} />}
            value={props.value}
            checked={props.valgt}
            disabled={props.disabled || props.allwaysDisabled}
            onChange={((e: ChangeEvent<HTMLInputElement>) => props.onChange(props.value, e.target.checked))}
        />
    </li>
);

interface ListevisningProps {
    valgteAlternativ: string[];
    dispatch: Dispatch<Action>;
}

const Listevisning = (props: ListevisningProps) => {
    function handleChange(name, checked) {
        if(checked) {
            props.dispatch(velgAlternativ(name));
        } else {
            props.dispatch(avvelgAlternativ(name));
        }
    }

    function erValgt(alternativ) {
        return props.valgteAlternativ.some(a => a === alternativ.value);
    }

    return (
        <Dropdown name="Listevisning" className="dropdown--fixed dropdown--toolbar">
            <section className="radio-filterform__valg">
                <div className="blokk-s">
                    <FormattedMessage id="listevisning.ingress" />
                </div>
                <ul className="ustilet">
                    { alternativer.map(alternativ => (
                        <ListevisningRad
                            {...alternativ}
                            valgt={erValgt(alternativ)}
                            disabled={props.valgteAlternativ.length >= 5 && !erValgt(alternativ)}
                            onChange={handleChange}
                        />
                    )) }
                </ul>
            </section>
        </Dropdown>
    );
};

function mapStateToProps(state: AppState) {
    return {
        valgteAlternativ: state.ui.listevisning.valgte
    }
}

export default connect(mapStateToProps)(Listevisning);
