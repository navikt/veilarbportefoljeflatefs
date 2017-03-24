import { PropTypes as PT, Component } from 'react';
import { connect } from 'react-redux';
import history from '../history';
import { velgEnhetForVeileder } from '../ducks/enheter';
import { settEnhetIDekorator } from '../eventhandtering';
import { settValgtVeileder } from '../ducks/portefolje';
import { leggEnhetIUrl } from '../utils/utils';

const getLagretPath = () => {
    if (localStorage.previousVeilederState) {
        return JSON.parse(localStorage.previousVeilederState).path.split('/')[2];
    }
    return '';
}
    ;

const getLagretVeielder = () => {
    if (localStorage.previousVeilederState) {
        return JSON.parse(localStorage.previousVeilederState).veileder;
    }
    return '';
};

const getLagretEnhet = () => {
    if (localStorage.previousVeilederState) {
        return JSON.parse(localStorage.previousVeilederState).valgtEnhet;
    }
    return '';
};

const sendUserToPreviousPage = () => {
    history.replace(getLagretPath());
    leggEnhetIUrl(getLagretEnhet().enhetId);
};


class TilbakenavigeringPortefolje extends Component {
    componentWillMount() {
        const { velgEnhet, velgVeileder } = this.props;
        if (getLagretEnhet() === '' || getLagretPath() === '' || getLagretVeielder() === '') {
            window.location.href = '/veilarbportefoljeflatefs/portefolje';
        }
        velgEnhet(getLagretEnhet());
        settEnhetIDekorator(getLagretEnhet().enhetId);
        velgVeileder(getLagretVeielder());
        sendUserToPreviousPage();
    }

    render() {
        return null;
    }
}

const mapToProps = () => ({
});

const mapDispatchToProps = dispatch => ({
    velgEnhet: enhet => dispatch(velgEnhetForVeileder(enhet)),
    velgVeileder: veileder => dispatch(settValgtVeileder(veileder))
});


TilbakenavigeringPortefolje.propTypes = {
    velgEnhet: PT.func,
    velgVeileder: PT.func
};

export default connect(mapToProps, mapDispatchToProps)(TilbakenavigeringPortefolje);
