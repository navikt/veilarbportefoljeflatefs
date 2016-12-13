import React, { Component, PropTypes as PT } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { IntlProvider, addLocaleData } from 'react-intl';
import nb from 'react-intl/locale-data/nb';
// import { hentLedetekster } from '../ducks/ledetekster';
// import Innholdslaster from '../innholdslaster/innholdslaster';
// import Hode from '../hodefot/hode';
// import Fot from '../hodefot/fot';
import DevTools from './../devtools';

addLocaleData(nb);
class Application extends Component {

    render() {

        return (
            <IntlProvider defaultLocale="nb" locale="nb" messages={}>
                <div className="portefolje">
                    <div className="pagewrapper">
                       Hello
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

 });

// const mapDispatchToProps = dispatch => ({ actions: bindActionCreators({ hentLedetekster }, dispatch) });

export default connect(mapStateToProps)(Application);
//export default (Application);
