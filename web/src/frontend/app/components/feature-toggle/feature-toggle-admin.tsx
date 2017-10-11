import * as React from 'react';
import { connect } from 'react-redux';
import {Checkbox} from 'nav-frontend-skjema';
import {FeatureToggleState, settFeatureState} from './feature-toggle-reducer';
import {AppState} from '../../reducer';

interface FeatureToggleAdminProps {
    features: FeatureToggleState;
    doSettFeatureState: (navn: string, aktivert: boolean) => void;
}

function FeatureToggleAdmin(props: FeatureToggleAdminProps) {

    return (
        <ul>
            {
                Object.entries(props.features).map(([featureNavn, erAktivert]) => (
                    <li>
                        <Checkbox label={featureNavn} checked={erAktivert} onChange={(event) => props.doSettFeatureState(featureNavn, event.currentTarget.checked)}/>
                    </li>
                ))
            }
        </ul>
    );
}

function mapStateToProps (state: AppState) {
    return {
        features: state.features
    }
}

function mapDispatchToProps(dispatch) {
    return {
        doSettFeatureState: (navn, aktivert) => dispatch(settFeatureState(navn, aktivert))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(FeatureToggleAdmin);
