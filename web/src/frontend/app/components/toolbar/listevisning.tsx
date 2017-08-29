import * as React from 'react';
import Dropdown from "../dropdown/dropdown";
import { Checkbox } from 'nav-frontend-skjema';
import {FormattedMessage} from "react-intl";

interface ListevisningProps {

}

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
}

const ListevisningRad = (props: ListevisningRadProps) => (
    <li>
        <Checkbox
            label={<FormattedMessage id={props.tekstid} />}
            value={props.value}
            disabled={props.disabled}
        />
    </li>
);

const Listevisning = (props: ListevisningProps) => {

    return (
        <Dropdown name="Listevisning" className="dropdown--fixed dropdown--toolbar">
            <section className="radio-filterform__valg">
                <FormattedMessage id="listevisning.ingress" />
                <ul className="ustilet">
                    { alternativer.map(alternativ => <ListevisningRad {...alternativ} />) }
                </ul>
            </section>
        </Dropdown>
    );
};

export default Listevisning;
