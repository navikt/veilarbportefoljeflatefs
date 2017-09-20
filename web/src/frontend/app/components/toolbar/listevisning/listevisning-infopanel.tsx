import * as React from 'react';
import Lukknapp from 'nav-frontend-lukknapp';
import {AlertStripeInfoSolid} from 'nav-frontend-alertstriper';
import { FormattedMessage } from 'react-intl';
import {Action, bindActionCreators, Dispatch} from 'redux';
import {connect} from 'react-redux';
import {AppState} from '../../../reducer';
import {lukkInfopanel} from '../../../ducks/ui/listevisning';

interface ListevisningInfopanelProps {
    skalVises: boolean;
    lukkPanel: () => void;
}

const ListevisningInfoPanel = (props: ListevisningInfopanelProps) => {
    if (!props.skalVises) {
        return null;
    }

    return (
        <AlertStripeInfoSolid className="blokk-m">
            <div className="listevisning--infopanel">
                <FormattedMessage id="listevisning.infopanel" tagName="p" />
                <Lukknapp className="listevisning--infopanel__lukkKnapp" onClick={props.lukkPanel}>Lukk</Lukknapp>
            </div>
        </AlertStripeInfoSolid>
    );
};

const mapStateToProps = (state: AppState) => {
    const antallMulige = state.ui.listevisning.mulige.length;
    const harIkkeLukketInfopanel = !state.ui.listevisning.lukketInfopanel;

    return {
        skalVises: antallMulige > 5 && harIkkeLukketInfopanel
    };
};

const mapActionsToProps = (dispatch: Dispatch<Action>) => {
    return bindActionCreators({
        lukkPanel: lukkInfopanel
    }, dispatch)
};

export default connect(mapStateToProps, mapActionsToProps)(ListevisningInfoPanel);
