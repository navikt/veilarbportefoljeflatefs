import { PropTypes as PT, Component } from 'react';
import { connect } from 'react-redux';
import history from '../history';
import { store } from '../index';
import { settFiltervalg } from '../ducks/filtrering';
import { velgEnhetForVeileder } from '../ducks/enheter';
import { settValgtVeilederIKonstruktor } from '../ducks/utils';

const settValgtEnhet = (enhetId) => {
    settValgtVeilederIKonstruktor(enhetId);
    store.dispatch(velgEnhetForVeileder(enhetId));
};

class TilbakenavigeringEnhet extends Component {
    componentWillMount() {
        const { settLagredeFiltervalg, lagredeFiltervalg, lagretValgtEnhet, velgEnhet } = this.props;
        settLagredeFiltervalg(lagredeFiltervalg);
        velgEnhet(lagretValgtEnhet);
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
    lagredeFiltervalg: JSON.parse(localStorage.previousEnhetState).filtrering.filtervalg,
    lagretPath: JSON.parse(localStorage.previousEnhetState).path.split('/')[2],
    lagretValgtEnhet: JSON.parse(localStorage.previousEnhetState).enheter.valgtEnhet.enhet
});
const mapDispatchToProps = dispatch => ({
    velgEnhet: enhet => dispatch(settValgtEnhet(enhet)),
    settLagredeFiltervalg: filtervalg => dispatch(settFiltervalg(filtervalg))
});


TilbakenavigeringEnhet.propTypes = {
    lagredeFiltervalg: PT.object,
    lagretPath: PT.String,
    lagretValgtEnhet: PT.object,
    velgEnhet: PT.func,
    settLagredeFiltervalg: PT.func
};

export default connect(mapToProps, mapDispatchToProps)(TilbakenavigeringEnhet);
