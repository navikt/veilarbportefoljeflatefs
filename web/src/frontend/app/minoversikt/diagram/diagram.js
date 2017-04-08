import React, { Component, PropTypes as PT } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import Chart from 'react-highcharts';
import { filtervalgShape } from '../../proptype-shapes';
import { hentDiagramdata } from './../../ducks/diagram';
import { ytelsevalg } from '../../filtrering/filter-konstanter';
import config from './config';
import MultiFormattedMessage from '../../components/multiformattedmessage';
import { ledetekster, kvartal, maned } from './util';
import Innholdslaster from './../../innholdslaster/innholdslaster';

class Diagram extends Component {
    componentDidMount() {
        const { filtreringsvalg, enhet, veileder, hentDiagramdata } = this.props;
        hentDiagramdata(enhet, veileder, filtreringsvalg);
    }

    render() {
        const { diagramdata, portefolje, filtreringsvalg } = this.props;

        return (
            <Innholdslaster avhengigheter={[diagramdata]}>
                {() => {
                    const antallBrukere = portefolje.data.antallTotalt;
                    const tekster = ledetekster(filtreringsvalg.ytelse);
                    const data = filtreringsvalg.ytelse === ytelsevalg.AAP_MAXTID ?
                        kvartal(antallBrukere, diagramdata.data) :
                        maned(antallBrukere, diagramdata.data);

                    return (
                        <div>
                            <h1>
                                <FormattedMessage id={tekster.headertekst} />
                            </h1>
                            <MultiFormattedMessage id={tekster.legendtekst}>
                            {(diagramtekster) => (
                                <Chart config={config(data, diagramtekster)} pureConfig />
                            )}
                            </MultiFormattedMessage>
                        </div>
                    );
                }}
            </Innholdslaster>
        );
    }
}

Diagram.propTypes = {
    filtreringsvalg: filtervalgShape.isRequired,
    enhet: PT.string.isRequired,
    veileder: PT.string,
    hentDiagramdata: PT.func.isRequired,
};
Diagram.defaultProps = {
    veileder: null
};

const mapStateToProps = (state) => ({
    diagramdata: state.diagram,
    portefolje: state.portefolje
});

const mapDispatchToProps = (dispatch) => ({
    hentDiagramdata: (enhet, veileder, filtervalg) => dispatch(hentDiagramdata(enhet, veileder, filtervalg)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Diagram);
