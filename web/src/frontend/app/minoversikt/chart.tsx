import * as React from 'react';
import * as Highcharts from 'highcharts';

interface ChartProps {
    type: string,
    container: string,
    options: object,
    modules?: any,
}

export default class Chart extends React.Component<ChartProps, any> {
    chart: Highcharts.ChartObject;

    componentDidMount() {
        if (this.props.modules) {
            this.props.modules.forEach((module) => {
                module(Highcharts);
            });
        }
        if (this.props.options && this.props.type && this.props.container) {
            this.chart = new Highcharts[this.props.type || 'Chart'](
                this.props.container,
                this.props.options
            );
        }
    }

    componentWillUnmount() {
        if (this.chart) {
            this.chart.destroy();
        }
    }

    render() {
        return <div id={this.props.container} />;
    }
}
