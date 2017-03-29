import { PropTypes as PT, Component } from 'react';
import { connect } from 'react-redux';
import history from '../history';
import { settFiltervalg } from '../ducks/filtrering';
import { velgEnhetForVeileder } from '../ducks/enheter';
import { settEnhetIDekorator } from '../eventhandtering';
import { leggEnhetIUrl } from '../utils/utils';

const getLagretPath = () => {
    if (localStorage.previousEnhetState) {
        return JSON.parse(localStorage.previousEnhetState).path.split('/')[2];
    }
    return '';
};

const getLagretEnhet = () => {
    if (localStorage.previousEnhetState) {
        return JSON.parse(localStorage.previousEnhetState).valgtEnhet;
    }
    return '';
};

const getLagredeFiltervalg = () => {
    if (localStorage.previousEnhetState) {
        return JSON.parse(localStorage.previousEnhetState).filtervalg;
    }
    return '';
};

const sendUserToPreviousPage = () => {
    history.replace(getLagretPath());
    leggEnhetIUrl(getLagretEnhet().enhetId);
};

class TilbakenavigeringEnhet extends Component {
    componentWillMount() {
        const { settLagredeFiltervalg, velgEnhet } = this.props;
        if (getLagretEnhet() === '' || getLagretPath() === '') {
            window.location.href = '/veilarbportefoljeflatefs/enhet';
        }
        if (getLagredeFiltervalg() !== '') {
            settLagredeFiltervalg(getLagredeFiltervalg());
        }
        velgEnhet(getLagretEnhet());
        settEnhetIDekorator(getLagretEnhet().enhetId);
        sendUserToPreviousPage();
    }

    render() {
        return null;
    }
}

const mapToProps = () => ({
});
const mapDispatchToProps = (dispatch) => ({
    velgEnhet: (enhet) => dispatch(velgEnhetForVeileder(enhet)),
    settLagredeFiltervalg: (filtervalg) => dispatch(settFiltervalg(filtervalg))
});


TilbakenavigeringEnhet.propTypes = {
    velgEnhet: PT.func,
    settLagredeFiltervalg: PT.func
};

export default connect(mapToProps, mapDispatchToProps)(TilbakenavigeringEnhet);
