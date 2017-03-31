import * as React from 'react';
import * as Highcharts from 'highcharts';

interface ChartProps {
    type: string,
    modules: any,
    container: string,
    options: object
}

export default class Chart extends React.Component<any, any> {
    chart: Highcharts.ChartObject

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
