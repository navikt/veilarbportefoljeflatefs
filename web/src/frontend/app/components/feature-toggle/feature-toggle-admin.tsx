import * as React from 'react';
import { connect } from 'react-redux';
import { Checkbox } from 'nav-frontend-skjema';
import { FeatureToggleState, settFeatureState } from './feature-toggle-reducer';
import { AppState } from '../../reducer';

interface FeatureProps {
    navn: string;
    erAktivert: boolean;
    onChange: (aktivert: boolean) => void;
}

function Feature(props: FeatureProps) {
    return (
        <li>
            <Checkbox
                label={props.navn}
                checked={props.erAktivert}
                onChange={(event) => props.onChange(event.currentTarget.checked)}
            />
        </li>
    );
}

interface FeatureToggleAdminProps {
    features: FeatureToggleState;
    doSettFeatureState: (navn: string, aktivert: boolean) => void;
}

function FeatureToggleAdmin(props: FeatureToggleAdminProps) {
    return (
        <section>
            <h1>Feature-toggles</h1>
            <ul>
                { Object.entries(props.features).map(([featureNavn, erAktivert]) => (
                    <Feature
                        key={featureNavn}
                        navn={featureNavn}
                        erAktivert={erAktivert}
                        onChange={(aktivert) => props.doSettFeatureState(featureNavn, aktivert)}
                    />
                ))}
            </ul>
        </section>
    );
}

function mapStateToProps(state: AppState) {
    return {
        features: state.features
    };
}

function mapDispatchToProps(dispatch) {
    return {
        doSettFeatureState: (navn, aktivert) => dispatch(settFeatureState(navn, aktivert))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(FeatureToggleAdmin);
