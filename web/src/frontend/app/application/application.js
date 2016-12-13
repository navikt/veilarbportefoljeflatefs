import React, { Component, PropTypes as PT } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { IntlProvider, addLocaleData, FormattedMessage } from 'react-intl';
import nb from 'react-intl/locale-data/nb';
import { hentLedetekster } from '../ducks/ledetekster';
import DevTools from './../devtools';

addLocaleData(nb);
class Application extends Component {
    componentWillMount() {
        this.props.hentTekster();
    }

    render() {
        const { ledetekster = {}, children } = this.props;
        return (
            <IntlProvider defaultLocale="nb" locale="nb" messages={ledetekster.data.nb}>
                <div className="portefolje">
                    <div className="pagewrapper">
                       <h1>Hello</h1>
                        <FormattedMessage id="fot.nav.tittel" />
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


 };

 const mapStateToProps = state => ({
    ledetekster: state.ledetekster
 });

const mapDispatchToProps = dispatch => ({
    hentTekster: () => dispatch(hentLedetekster())
});

export default connect(mapStateToProps, mapDispatchToProps)(Application);
