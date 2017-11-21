import * as React from 'react';
import Lukknapp from 'nav-frontend-lukknapp';
import Ikon from 'nav-frontend-ikoner-assets';
import { FormattedMessage } from 'react-intl';
import { Action, bindActionCreators, Dispatch } from 'redux';
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
                <FormattedMessage id="listevisning.infopanel" />
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

const mapStateToProps = (state: AppState, ownProps: OwnProps): StateProps => {
    const antallMulige = selectMuligeAlternativer(state, ownProps.name).length;

    return {
        skalVises: antallMulige > 5 && !harLukketInfoPanel(ownProps.name, state)
    };
};

const mapActionsToProps = (dispatch: Dispatch<Action>): DispatchProps => {
    return bindActionCreators({
        lukkPanel: lukkInfopanel
    }, dispatch);
};

export default connect(mapStateToProps, mapActionsToProps)(ListevisningInfoPanel);
