import * as React from 'react';
import Lukknapp from 'nav-frontend-lukknapp';
import Ikon from 'nav-frontend-ikoner-assets';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { AppState } from '../../../reducer';
import { ListevisningType, lukkInfopanel } from '../../../ducks/ui/listevisning';
import { selectMuligeAlternativer } from '../../../ducks/ui/listevisning-selectors';

interface StateProps {
    skalVises: boolean;
}

interface DispatchProps {
    lukkPanel: (name: ListevisningType) => void;
}

interface OwnProps {
    name: ListevisningType;
}

type ListevisningInfopanelProps = StateProps & DispatchProps & OwnProps;

const ListevisningInfoPanel = (props: ListevisningInfopanelProps) => {
    if (!props.skalVises) {
        return null;
    }

    return (
        <div className="alertstripe alertstripe--solid alertstripe--info blokk-m">
            <span className="alertstripe__ikon" aria-label="info">
                <Ikon kind="info-sirkel-fylt" size="1.5em" />
            </span>
            <div className="listevisning--infopanel" aria-live="assertive" role="alert" aria-atomic="true">
                <span>
                    Listen kan kun vise 5 kolonner av gangen. Du har valgt mer enn ett filter som inneholder visning av dato.
                    Klikk på Velg Kolonner og velg det du ønsker å se.
                    Selv om filtervalgene med dato ikke vises i listen, ligger de likevel til grunn for utrekket av brukere.
                </span>
                <Lukknapp className="listevisning--infopanel__lukkKnapp" onClick={() => props.lukkPanel(props.name)}>Lukk</Lukknapp>
            </div>
        </div>
    );
};

const harLukketInfoPanel = (name: ListevisningType, state: AppState) => {
    if (name === ListevisningType.enhetensOversikt) {
        return state.ui.listevisningEnhetensOversikt.lukketInfopanel;
    }
    return state.ui.listevisningMinOversikt.lukketInfopanel;
};

const mapStateToProps = (state, ownProps) => {
    const antallMulige = selectMuligeAlternativer(state, ownProps.name).length;

    return {
        skalVises: antallMulige > 5 && !harLukketInfoPanel(ownProps.name, state)
    };
};

const mapActionsToProps = (dispatch) => {
    return bindActionCreators({
        lukkPanel: lukkInfopanel
    }, dispatch);
};

export default connect(mapStateToProps, mapActionsToProps)(ListevisningInfoPanel);
