import React, { Component, PropTypes as PT } from 'react';
import { connect } from 'react-redux';
import { IntlProvider, addLocaleData } from 'react-intl';
import nb from 'react-intl/locale-data/nb';
import { hentLedetekster } from '../ducks/ledetekster';
import Lenker from './../lenker/lenker';
import DevTools from './../devtools';
import { hentEnheterForSaksbehandler } from './../ducks/enheter';

addLocaleData(nb);
class Application extends Component {
    componentWillMount() {
        this.props.hentTekster();
        this.props.hentEnheter();
    }

    render() {
        const { ledetekster = {}, children } = this.props;
        return (
            <IntlProvider defaultLocale="nb" locale="nb" messages={ledetekster.data.nb}>
                <div className="portefolje">
                    <div className="container maincontent side-innhold">
                        <Lenker />
                        {children}
                    </div>
                    <div aria-hidden="true">
                        <DevTools />
                    </div>
                </div>
            </IntlProvider>
        );
    }
}

Application.propTypes = {
    children: PT.object,
    hentTekster: PT.func.isRequired,
    hentEnheter: PT.func.isRequired,
    ledetekster: PT.object
};

const mapStateToProps = state => ({
    ledetekster: state.ledetekster,
    enheter: state.enheter.data
});

const mapDispatchToProps = dispatch => ({
    hentTekster: () => dispatch(hentLedetekster()),
    hentEnheter: () => dispatch(hentEnheterForSaksbehandler())
});

export default connect(mapStateToProps, mapDispatchToProps)(Application);
