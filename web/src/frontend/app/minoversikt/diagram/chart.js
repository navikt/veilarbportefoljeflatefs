import React, { Component } from 'react';
import Highcharts from 'highcharts';

export default class Chart extends Component {

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
        return <div id={this.props.container}/>;
    }
}
