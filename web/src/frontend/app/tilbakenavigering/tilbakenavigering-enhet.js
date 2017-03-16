import { PropTypes as PT, Component } from 'react';
import { connect } from 'react-redux';
import history from '../history';
import { settFiltervalg } from '../ducks/filtrering';
import { velgEnhetForVeileder } from '../ducks/enheter';
import { settEnhetIDekorator } from '../eventhandtering';

class TilbakenavigeringEnhet extends Component {
    componentWillMount() {
        const { settLagredeFiltervalg, lagredeFiltervalg, lagretValgtEnhet, velgEnhet } = this.props;
        if (lagredeFiltervalg) {
            settLagredeFiltervalg(lagredeFiltervalg);
        }
        velgEnhet(lagretValgtEnhet);
        settEnhetIDekorator(lagretValgtEnhet.enhetId);
        this.sendUserToPreviousPage();
    }

    sendUserToPreviousPage() {
        const { lagretPath } = this.props;
        history.replace(lagretPath);
    }

    render() {
        return null;
    }
}

const mapToProps = () => ({
    lagredeFiltervalg: JSON.parse(localStorage.previousEnhetState).filtervalg,
    lagretPath: JSON.parse(localStorage.previousEnhetState).path.split('/')[2],
    lagretValgtEnhet: JSON.parse(localStorage.previousEnhetState).valgtEnhet
});
const mapDispatchToProps = dispatch => ({
    velgEnhet: enhet => dispatch(velgEnhetForVeileder(enhet)),
    settLagredeFiltervalg: filtervalg => dispatch(settFiltervalg(filtervalg))
});


TilbakenavigeringEnhet.propTypes = {
    lagredeFiltervalg: PT.object,
    lagretPath: PT.string,
    lagretValgtEnhet: PT.object,
    velgEnhet: PT.func,
    settLagredeFiltervalg: PT.func
};

export default connect(mapToProps, mapDispatchToProps)(TilbakenavigeringEnhet);
