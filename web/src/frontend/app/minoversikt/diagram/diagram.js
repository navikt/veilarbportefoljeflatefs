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
import Diagramtabell from './diagram-tabell';

class Diagram extends Component {
    componentDidMount() {
        const { filtreringsvalg, enhet, veileder, hentDiagram } = this.props;
        hentDiagram(enhet, veileder, filtreringsvalg);
    }

    componentWillUpdate(nextProps) {
        const { filtreringsvalg, enhet, veileder, hentDiagram } = this.props;
        if (JSON.stringify(filtreringsvalg) !== JSON.stringify(nextProps.filtreringsvalg)) {
            hentDiagram(enhet, veileder, nextProps.filtreringsvalg);
        }
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
                            <div aria-hidden="true">
                                <h1>
                                    <FormattedMessage id={tekster.headertekst} />
                                </h1>
                                <MultiFormattedMessage id={tekster.legendtekst}>
                                    {(diagramtekster) => (
                                        <Chart config={config(data, diagramtekster)} pureConfig />
                                    )}
                                </MultiFormattedMessage>
                            </div>
                            <div className="SR__table">
                                <h1>
                                    <FormattedMessage id={tekster.headertekst} />
                                </h1>
                                <Diagramtabell
                                    tekster={tekster}
                                    data={data}
                                />
                            </div>
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
    hentDiagram: PT.func.isRequired,
    diagramdata: PT.object,
    portefolje: PT.object
};
Diagram.defaultProps = {
    veileder: null,
    diagramdata: {},
    portefolje: {}
};

const mapStateToProps = (state) => ({
    diagramdata: state.diagram,
    portefolje: state.portefolje
});

const mapDispatchToProps = (dispatch) => ({
    hentDiagram: (enhet, veileder, filtervalg) => dispatch(hentDiagramdata(enhet, veileder, filtervalg))
});

export default connect(mapStateToProps, mapDispatchToProps)(Diagram);
