import React, {Component, PropTypes as PT} from 'react';
import Chart from './chart';
import moment from 'moment';
import {brukerShape} from '../proptype-shapes';

function maned(brukere) {

    const labels = new Array(12).fill(0).map((_, i) => moment().add(i + 1, 'month').format('MMMM'));

    const maaneder = Array(12).fill(0).map((_, i) => `MND${i + 1}`);

    let antallMisterYtelse = Array(12).fill(0);
    brukere
        .filter(bruker => bruker.utlopsdatoFasett)
        .map(bruker => {
            let index = maaneder.findIndex(element => element === bruker.utlopsdatoFasett);
            let value = antallMisterYtelse[index];
            antallMisterYtelse[index] = value + 1;
        });


    let runningSum = new Array(12);
    antallMisterYtelse.reduce((acc, val, i) => {
        return runningSum[i] = acc + val;
    }, 0);

    const antallMedYtelse = Array(12)
        .fill(brukere.length)
        .map((antall, i) => antall - runningSum[i]);

    return {
        labels,
        antallMisterYtelse,
        antallMedYtelse
    }
}

function kvartal(brukere) {

    const labels = new Array(16).fill(0).map((_, i) => {
        const quarter = moment().add(i, 'quarter');
        return `Q${quarter.quarter()}.${quarter.year()}`
    });

    const kvartaler = Array(16).fill(0).map((_, i) => `KV${i + 1}`);
    let antallMisterYtelse = Array(16).fill(0);
    brukere
        .filter(bruker => bruker.aapMaxtidFasett)
        .map(bruker => {
            let index = kvartaler.findIndex(element => element === bruker.aapMaxtidFasett);
            let value = antallMisterYtelse[index];
            antallMisterYtelse[index] = value + 1;
        });

    let runningSum = new Array(16);
    antallMisterYtelse.reduce((acc, val, i) => {
        return runningSum[i] = acc + val;
    }, 0);

    const antallMedYtelse = Array(16)
        .fill(brukere.length)
        .map((antall, i) => antall - runningSum[i]);

    return {
        labels,
        antallMisterYtelse,
        antallMedYtelse
    };
}

const Diagram = ({brukere, filtreringsvalg}) => {
    moment.locale('nb_no');

    const data = filtreringsvalg === 'AAP_MAXTID' ? kvartal(brukere) : maned(brukere);

    const options = {
        chart: {
            type: 'column',
            backgroundColor: null,
            spacingBottom: 60
        },
        colors: [
            '#669db4',
            '#d6897d'
        ],
        title: {
            text: ''
        },
        xAxis: {
            categories: data.labels
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Antall personer'
            },
            stackLabels: {
                enabled: false,
            }
        },
        legend: {
            align: 'left',
            x: 0,
            verticalAlign: 'bottom',
            y: 50,
            floating: true,
            backgroundColor: null,
            borderColor: null,
            borderWidth: 0,
            shadow: false,
            layout: 'vertical',
            symbolRadius: 0
        },
        tooltip: {
            headerFormat: '<b>{point.x}</b><br/>',
            pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}'
        },
        plotOptions: {
            column: {
                stacking: 'normal',
                dataLabels: {
                    enabled: false
                }
            }
        },
        series: [
            {
                index: 1,
                name: 'Brukere med dagpenger',
                data: data.antallMedYtelse
            },
            {
                index: 0,
                name: 'Brukere med dagpenger som mister ytelse i gjeldende mnd',
                data: data.antallMisterYtelse
            }
        ]
    };
    return (
        <div>
            <h1>{filtreringsvalg}</h1>
            <Chart type="Chart" options={options} container="chart"/>
        </div>
    );
};

Diagram.PropTypes = {
    kategori: PT.string.isRequired,
    brukere: PT.arrayOf(brukerShape).isRequired
};

export default Diagram;
