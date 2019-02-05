import * as React from 'react';
import { connect } from 'react-redux';
import Dropdown from '../../dropdown/dropdown';
import { FormattedMessage, injectIntl, InjectedIntlProps } from 'react-intl';
import { AppState } from '../../../reducer';
import { Action, Dispatch } from 'redux';
import { avvelgAlternativ, Kolonne, ListevisningType, velgAlternativ } from '../../../ducks/ui/listevisning';
import { selectMuligeAlternativer, selectValgteAlternativer } from '../../../ducks/ui/listevisning-selectors';
import ListevisningRad from "./listvisning-rad";


interface StateProps {
    valgteAlternativ: Kolonne[];
    muligeAlternativer: Kolonne[];
}

interface DispatchProps {
    velgAlternativ: (name: Kolonne, filtergruppe: ListevisningType) => void;
    avvelgAlternativ: (name: Kolonne, filtergruppe: ListevisningType) => void;
}

interface OwnProps {
    filtergruppe: ListevisningType;
}

type ListevisningProps = OwnProps & StateProps & DispatchProps;

class Listevisning extends React.Component<any> {

     handleChange(name, checked) {
        if (checked) {
            this.props.velgAlternativ(name, this.props.filtergruppe);
        } else {
            this.props.avvelgAlternativ(name, this.props.filtergruppe);
        }
    }

     erValgt(kolonne: Kolonne) {
        return this.props.valgteAlternativ.indexOf(kolonne) > -1;
    }

    render() {

        if (![ListevisningType.minOversikt, ListevisningType.enhetensOversikt].includes(this.props.filtergruppe as ListevisningType)) {
            return null;
        }

        return (
            <Dropdown name= "Listevisning"
                      disabled={this.props.muligeAlternativer.length <= 5}
                      className="dropdown--fixed dropdown--toolbar">
                <section className="radio-filterform__valg">
                    <div className="blokk-s">
                        <FormattedMessage id="listevisning.ingress"/>
                    </div>
                    <ul className="ustilet">
                        {this.props.muligeAlternativer.map((kolonne) => (
                            <ListevisningRad
                                key={kolonne}
                                kolonne={kolonne}
                                valgt={this.erValgt(kolonne)}
                                disabled={this.props.valgteAlternativ.length >= 5 && !this.erValgt(kolonne)}
                                onChange={this.handleChange}
                            />
                        ))}
                    </ul>
                </section>
            </Dropdown>
        );
    }
};

function mapStateToProps(state, ownProps) {
    return {
        valgteAlternativ: selectValgteAlternativer(state, ownProps.filtergruppe),
        muligeAlternativer: selectMuligeAlternativer(state, ownProps.filtergruppe)
    };
}

function mapDispatchToProps(dispatch){
    return {
        velgAlternativ: (name: Kolonne, filtergruppe: ListevisningType) => dispatch(velgAlternativ(name, filtergruppe)),
        avvelgAlternativ: (name: Kolonne, filtergruppe: ListevisningType) => dispatch(avvelgAlternativ(name, filtergruppe))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Listevisning);
