import React, { Component, PropTypes as PT } from 'react';
import Highcharts from 'highcharts';

export default class Chart extends Component {
    componentDidMount() {
        // Extend Highcharts with modules
        if (this.props.modules) {
            this.props.modules.forEach((module) => {
                module(Highcharts);
            });
        }
        // Set container which the chart should render to.
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
        return React.createElement('div', { id: this.props.container });
    }
}

Chart.propTypes = {
    type: PT.string.isRequired,
    modules: PT.array,
    container: PT.object.isRequired,
    options: PT.array
};

