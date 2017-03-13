import React, { PropTypes as PT, Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { endreFiltervalg, hentPortefoljeForEnhet } from '../../ducks/filtrering';

class FiltreringBrukere extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidUpdate() {
        this.oppdaterDatagrunnlag();
    }

    oppdaterDatagrunnlag() {
        const { hentPortefolje, filtervalg, sorteringsrekkefolge, fraIndex, antall, valgtEnhet } = this.props;
        hentPortefolje(valgtEnhet, sorteringsrekkefolge, fraIndex, antall, filtervalg);
    }

    handleChange(e, filter) {
        const { endreFilter } = this.props;
        endreFilter(filter, e.target.value);
    }

    render() {
        const { filtervalg } = this.props;
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

        const defaultOption = (<option value={0} key={'default'}>
            <FormattedMessage id="filtrering.filtrer-brukere.demografi.alder" />
        </option>);

        aldersOptions.unshift(defaultOption);

        return (
            <div className="filtrering-demografi panel panel-ramme blokk-m">
                <div className="select-container">
                    <select // eslint-disable-line jsx-a11y/no-onchange
                        id="select-alder"
                        name="valgtAlder"
                        onChange={this.handleChange('alder')}
                        value={filtervalg.alder}
                    >
                        {aldersOptions}
                    </select>
                </div>
                <div className="select-container">
                    <select // eslint-disable-line jsx-a11y/no-onchange
                        id="select-kjonn"
                        name="valgtKjonn"
                        onChange={this.handleChange('kjonn')}
                        value={filtervalg.kjonn}
                    >
                        <option value="ikke definert" key="kjonn-ikkeDefinert" selected>
                            <FormattedMessage id="filtrering.filtrer-brukere.demografi.velgkjonn" />
                        </option>
                        <option value="M" key="kjonn-m">
                            <FormattedMessage id="filtrering.filtrer-brukere.demograi.mann" />
                        </option>
                        <option value="K" key="kjonn-k">
                            <FormattedMessage id="filtrering.filtrer-brukere.demograi.kvinne" />
                        </option>
                    </select>
                </div>
            </div>
        );
    }
}

FiltreringBrukere.propTypes = {
    endreFilter: PT.func.isRequired,
    filtervalg: PT.object,
    sorteringsrekkefolge: PT.string,
    fraIndex: PT.number,
    antall: PT.number,
    valgtEnhet: PT.string,
    hentPortefolje: PT.func.isRequired
};

const mapStateToProps = state => ({
    filtervalg: state.filtrering.filtervalg,
    sorteringsrekkefolge: state.portefolje.sorteringsrekkefolge,
    fraIndex: state.portefolje.data.fraIndex,
    antall: state.paginering.sideStorrelse,
    valgtEnhet: state.enheter.valgtEnhet.enhetId
});

const mapDispatchToProps = dispatch => ({
    endreFilter: (filterId, filtervalg) => dispatch(endreFiltervalg(filterId, filtervalg)),
    hentPortefolje: (enhet, rekkefolge, fra, antall, filtervalg) =>
        dispatch(hentPortefoljeForEnhet(enhet, rekkefolge, fra, antall, filtervalg))
});

export default connect(mapStateToProps, mapDispatchToProps)(FiltreringBrukere);
