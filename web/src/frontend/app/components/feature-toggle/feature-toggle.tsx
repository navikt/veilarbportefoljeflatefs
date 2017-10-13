import * as React from 'react';
import { connect } from 'react-redux';
import {AppState} from '../../reducer';


interface FeatureToggleProps extends FeatureToggleOwnProps{
    isEnabled: boolean;
}

interface FeatureToggleOwnProps {
    name: string;
    children: React.ReactNode;
}

function FeatureToggle(props: FeatureToggleProps) {
    if (props.isEnabled) {
        return React.Children.only(props.children);
    }
    return null;
}

function mapStateToProps (state: AppState, ownProps: FeatureToggleOwnProps) {
    return {
        isEnabled: state.features[ownProps.name]
    }
}

export default connect(mapStateToProps)(FeatureToggle);
