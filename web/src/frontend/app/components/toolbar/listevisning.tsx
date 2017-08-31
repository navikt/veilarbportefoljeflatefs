import * as React from 'react';
import {ChangeEvent, FormEvent, SyntheticEvent} from "react";
import Dropdown from "../dropdown/dropdown";
import { Checkbox } from 'nav-frontend-skjema';
import {FormattedMessage} from "react-intl";

interface alternativ {
    value: string;
    tekstid: string;
}

const alternativer: alternativ[] = [
    {value: 'bruker', tekstid: 'listevisning.valg.bruker'},
    {value: 'fodselsnr', tekstid: 'listevisning.valg.fodselsnr'},
    {value: 'veileder', tekstid: 'listevisning.valg.veileder'},
    {value: 'navident', tekstid: 'listevisning.valg.navident'},
    {value: 'ventersvar', tekstid: 'listevisning.valg.ventersvar'},
    {value: 'utlopytelse', tekstid: 'listevisning.valg.utlopytelse'},
    {value: 'utlopaktivitet', tekstid: 'listevisning.valg.utlopaktivitet'},
];

interface ListevisningRadProps extends alternativ {
    disabled?: boolean;
    onChange: (name: string, checked: boolean) => void;
}

const ListevisningRad = (props: ListevisningRadProps) => (
    <li>
        <Checkbox
            label={<FormattedMessage id={props.tekstid} />}
            value={props.value}
            disabled={props.disabled}
            onChange={((e: ChangeEvent<HTMLInputElement>) => props.onChange(props.value, e.target.value === props.value))}
        />
    </li>
);

interface ListevisningProps {

}

const Listevisning = (props: ListevisningProps) => {
    function handleChange(name, checked) {
        console.log("pow", name, checked);
    }

    return (
        <Dropdown name="Listevisning" className="dropdown--fixed dropdown--toolbar">
            <section className="radio-filterform__valg">
                <FormattedMessage id="listevisning.ingress" />
                <ul className="ustilet">
                    { alternativer.map(alternativ => <ListevisningRad {...alternativ} onChange={handleChange} />) }
                </ul>
            </section>
        </Dropdown>
    );
};

export default Listevisning;
