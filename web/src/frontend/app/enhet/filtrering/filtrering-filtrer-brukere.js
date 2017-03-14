import React, { PropTypes as PT, Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { endreFiltervalg } from '../../ducks/filtrering';

class FiltreringBrukere extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e, filter) {
        const { endreFilter } = this.props;
        endreFilter(filter, e.target.value);
    }

    render() {
        const aldersIntervaller = [
            '19 og under',
            '20-24',
            '25-29',
            '30-39',
            '40-49',
            '50-59',
            '60-66',
            '67-70'
        ];
        const aldersOptions = aldersIntervaller.map((alderString, index) =>
            <option value={index + 1} key={`option-${alderString}`}>{`${alderString}`}</option>
        );

        const defaultOption = (
            <FormattedMessage id="filtrering.filtrer-brukere.demografi.alder" key="default">
                {text => <option value={0}>{text}</option>}
            </FormattedMessage>);

        aldersOptions.unshift(defaultOption);
        const { filtervalg } = this.props;
        const filtreringAlder = (<div className="select-container">
            <select // eslint-disable-line jsx-a11y/no-onchange
                id="select-alder"
                name="valgtAlder"
                onChange={e => this.handleChange(e, 'alder')}
                value={filtervalg.alder}
            >
                {aldersOptions}
            </select>
        </div>);
        const filtreringKjonn = (<div className="select-container">
            <select // eslint-disable-line jsx-a11y/no-onchange
                id="select-kjonn"
                name="valgtKjonn"
                onChange={e => this.handleChange(e, 'kjonn')}
                value={filtervalg.kjonn}
            >
                <FormattedMessage id="filtrering.filtrer-brukere.demografi.velgkjonn" key="kjonn-ikkeDefinert">
                    {text => <option value="ikke definert">{text}</option>}
                </FormattedMessage>
                <FormattedMessage id="filtrering.filtrer-brukere.demograi.mann" key="kjonn-m">
                    {text => <option value="M">{text}</option>}
                </FormattedMessage>
                <FormattedMessage id="filtrering.filtrer-brukere.demograi.kvinne" key="kjonn-k">
                    {text => <option value="K">{text}</option>}
                </FormattedMessage>
            </select>
        </div>);
        return (
            <div className="filtrering-demografi panel panel-ramme blokk-m">
                {filtreringAlder}
                {filtreringKjonn}
            </div>
        );
    }
}

FiltreringBrukere.propTypes = {
    endreFilter: PT.func.isRequired,
    filtervalg: PT.object
};

const mapStateToProps = state => ({
    filtervalg: state.filtrering.filtervalg
});

const mapDispatchToProps = dispatch => ({
    endreFilter: (filterId, filtervalg) => dispatch(endreFiltervalg(filterId, filtervalg))
});

export default connect(mapStateToProps, mapDispatchToProps)(FiltreringBrukere);
