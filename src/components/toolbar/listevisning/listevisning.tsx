import * as React from 'react';
import { connect } from 'react-redux';
import Dropdown from '../../dropdown/dropdown';
import { avvelgAlternativ, Kolonne, ListevisningType, velgAlternativ } from '../../../ducks/ui/listevisning';
import { selectMuligeAlternativer, selectValgteAlternativer } from '../../../ducks/ui/listevisning-selectors';
import ListevisningRad from './listvisning-rad';
import './listevisning.less';
import { ReactComponent as VelgKolonneIkon } from '../../ikoner/settings.svg';

interface OwnProps {
    filtergruppe: ListevisningType;
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

    function dropdownNavn() {
        return (
            <>
                <VelgKolonneIkon/>
                <span className="velg-kolonner__tekst">Velg kolonner</span>
            </>
        );
    }

    return (
        <Dropdown
            name={dropdownNavn()}
            disabled={props.muligeAlternativer.length <= 5}
            className="dropdown--toolbar toolbar__velg-kolonner">
            <section>
                <ul
                    className="ustilet">
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

function mapDispatchToProps(dispatch): DispatchProps {
    return {
        velgAlternativ: (name: Kolonne, filtergruppe: ListevisningType) => dispatch(velgAlternativ(name, filtergruppe)),
        avvelgAlternativ: (name: Kolonne, filtergruppe: ListevisningType) => dispatch(avvelgAlternativ(name, filtergruppe))
    };
}

export default connect<StateProps, DispatchProps, OwnProps>(mapStateToProps, mapDispatchToProps)(Listevisning);
