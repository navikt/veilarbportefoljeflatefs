import * as React from 'react';
import { connect } from 'react-redux';
import { sjekkFeature } from './ducks/features';
import { FLYTT_FILTER_VENSTRE } from './konstanter';
import Routes from './routes';
import RoutesVenstreToggle from './routes-venstre-toggle';

interface RouterProps {
    flyttFilterVenstreToggle: boolean;
}

// Dette er en dårlig måte å komme seg rundt feilen "You cannot change <Router routes>; it will be ignored"
// Når vi oppdaterer til react-router v4, så kan logikken flyttes til routes, og denne komponenten kan fjernes
class Router extends React.Component<RouterProps> {
    render() {
        if (this.props.flyttFilterVenstreToggle) {
            return <RoutesVenstreToggle/>;
        } else {
            return <Routes/>;
        }
    }
}

const mapStateToProps = (state) => ({
    flyttFilterVenstreToggle: sjekkFeature(state, FLYTT_FILTER_VENSTRE)
});

export default connect(mapStateToProps)(Router);
