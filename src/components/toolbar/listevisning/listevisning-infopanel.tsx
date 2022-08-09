import * as React from 'react';
import Lukknapp from 'nav-frontend-lukknapp';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {AppState} from '../../../reducer';
import {OversiktType, lukkInfopanel} from '../../../ducks/ui/listevisning';
import {selectMuligeAlternativer} from '../../../ducks/ui/listevisning-selectors';
import './listevisning.css';
import {Information} from '@navikt/ds-icons';
import {BodyShort} from '@navikt/ds-react';

interface StateProps {
    skalVises: boolean;
}

interface DispatchProps {
    lukkPanel: (oversiktType: OversiktType) => void;
}

interface OwnProps {
    oversiktType: OversiktType;
}

type ListevisningInfopanelProps = StateProps & DispatchProps & OwnProps;

const ListevisningInfoPanel = (props: ListevisningInfopanelProps) => {
    if (!props.skalVises) {
        return null;
    }

    return (
        <div className="alertstripe alertstripe--solid alertstripe--info">
            <BodyShort size="small" className="alertstripe__ikon" aria-label="info">
                <Information />
            </BodyShort>
            <div className="listevisning--infopanel" aria-live="assertive" role="alert" aria-atomic="true">
                <BodyShort size="small">
                    Du kan kun se fem kolonner av gangen. Klikk på “Velg Kolonner” og velg det du ønsker å se.
                </BodyShort>
                <Lukknapp
                    className="listevisning--infopanel__lukkKnapp"
                    onClick={() => props.lukkPanel(props.oversiktType)}
                >
                    Lukk
                </Lukknapp>
            </div>
        </div>
    );
};

const harLukketInfoPanel = (oversiktType: OversiktType, state: AppState) => {
    if (oversiktType === OversiktType.enhetensOversikt) {
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

const mapActionsToProps = dispatch => {
    return bindActionCreators(
        {
            lukkPanel: lukkInfopanel
        },
        dispatch
    );
};

export default connect(mapStateToProps, mapActionsToProps)(ListevisningInfoPanel);
