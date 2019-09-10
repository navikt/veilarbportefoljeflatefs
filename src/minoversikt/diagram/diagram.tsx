import * as React from 'react';
import { connect } from 'react-redux';
import Chart from 'react-highcharts';
import { hentDiagramdata } from '../../ducks/diagram';
import config from './config';
import { ledetekster, lagYtelseDataFraFasett } from './util';
import Innholdslaster from '../../innholdslaster/innholdslaster';
import Diagramtabell from './diagram-tabell';

interface DiagramProps {
    filtreringsvalg: any;
    enhet: string;
    veileder?: string;
}

interface StateProps {
    diagramdata: any;
    portefolje: any;
}

interface DispatchProps {
    hentDiagram: (enhet: string, filtreringsvalg: string, veileder?: string) => any;
}

type AllProps = DiagramProps & StateProps & DispatchProps;

class Diagram extends React.Component<AllProps> {
    componentDidMount() {
        const { filtreringsvalg, enhet, veileder, hentDiagram } = this.props;
        hentDiagram(enhet, filtreringsvalg, veileder);
    }

    componentWillUpdate(nextProps) {
        const { filtreringsvalg, enhet, veileder, hentDiagram } = this.props;
        if (JSON.stringify(filtreringsvalg) !== JSON.stringify(nextProps.filtreringsvalg)) {
            hentDiagram(enhet, nextProps.filtreringsvalg, veileder);
        }
    }

    render() {
        const { diagramdata, portefolje, filtreringsvalg } = this.props;

        return (
            <Innholdslaster avhengigheter={[diagramdata]}>
                {() => {
                    const antallBrukere = portefolje.data.antallTotalt;
                    const tekster = ledetekster(filtreringsvalg.ytelse);
                    const data = lagYtelseDataFraFasett(antallBrukere, filtreringsvalg.ytelse, diagramdata.data);

                    return (
                        <div>
                            <div aria-hidden="true">
                                <h1>
                                    {tekster.headertekst}
                                </h1>
                                <Chart config={config(data, tekster.legendtekst)} pureConfig />
                            </div>
                            <div className="SR__table">
                                <h1>
                                    {tekster.headertekst}
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

const mapStateToProps = (state) => ({
    diagramdata: state.diagram,
    portefolje: state.portefolje
});

const mapDispatchToProps = (dispatch) => ({
    hentDiagram: (enhet, filtervalg, veileder) => dispatch(hentDiagramdata(enhet, filtervalg, veileder))
});

export default connect(mapStateToProps, mapDispatchToProps)(Diagram);
