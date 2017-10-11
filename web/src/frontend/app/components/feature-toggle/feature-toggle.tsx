import * as React from 'react';
import { connect } from 'react-redux';
import {AppState} from '../../reducer';

type Feature = React.ReactChild | React.ReactChildren;

interface FeatureToggleProps {
    isEnabled: boolean;
    name: string;
    children?: Feature;
}

interface FeatureToggleOwnProps {
    name: string;
    children?: Feature;
}

function FeatureToggle(props: FeatureToggleProps) {
    if (props.isEnabled) {
        return props.children;
    }
    return null;
}

function mapStateToProps (state: AppState, ownProps: FeatureToggleOwnProps) {
    return {
        isEnabled: state.features[ownProps.name]
    }
}

export default connect(mapStateToProps)(FeatureToggle);
