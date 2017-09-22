import * as React from 'react';
import {connect} from 'react-redux';
import {ChangeEvent} from 'react';
import Dropdown from '../../dropdown/dropdown';
import {Checkbox} from 'nav-frontend-skjema';
import {FormattedMessage} from 'react-intl';
import {AppState} from '../../../reducer';
import {Action, bindActionCreators, Dispatch} from 'redux';
import {avvelgAlternativ, Kolonne, ListevisningType, velgAlternativ} from '../../../ducks/ui/listevisning';
import { alternativerConfig } from './listevisning-utils';
import {selectMuligeAlternativer, selectValgteAlternativer} from '../../../ducks/ui/listevisning-selectors';

interface ListevisningRadProps {
    kolonne: Kolonne;
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

interface ListevisningOwnProps {
    filtergruppe: ListevisningType;
    skalVises: boolean;
}

interface ListevisningProps extends ListevisningOwnProps {
    valgteAlternativ: Kolonne[];
    muligeAlternativer: Kolonne[];
    velgAlternativ: (name: Kolonne, filtergruppe: ListevisningType) => void;
    avvelgAlternativ: (name: Kolonne, filtergruppe: ListevisningType) => void;
}

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

    if (!props.skalVises) {
        return null;
    }

    return (
        <Dropdown name="Listevisning" disabled={props.muligeAlternativer.length <= 5}
                  className="dropdown--fixed dropdown--toolbar">
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

function mapStateToProps(state: AppState, ownProps: ListevisningOwnProps) {
    return {
        valgteAlternativ: selectValgteAlternativer(state, ownProps.filtergruppe),
        muligeAlternativer: selectMuligeAlternativer(state, ownProps.filtergruppe)
    };
}

function mapDispatchToProps(dispatch: Dispatch<Action>) {
    return {
        velgAlternativ: (name: Kolonne, filtergruppe: ListevisningType) => dispatch(velgAlternativ(name, filtergruppe)),
        avvelgAlternativ: (name: Kolonne, filtergruppe: ListevisningType) => dispatch(avvelgAlternativ(name, filtergruppe))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Listevisning);
