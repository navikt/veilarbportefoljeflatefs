import * as React from 'react';
import Chart from './chart';
import * as moment from 'moment';
import * as Highcharts from 'highcharts';

interface Bruker {
    utlopsdatoFasett?: string
    [propName: string]: any;
}

interface DiagramData {
    labels: Array<string>,
    antallMisterYtelse: Array<number>,
    antallMedYtelse: Array<number>
}

function maned(brukere: Array<Bruker>): DiagramData {
    const labels: Array<string> = new Array(12).fill(0).map((_, i) => moment().add(i + 1, 'month').format('MMMM'));

    const maaneder: Array<string> = Array(12).fill(0).map((_, i) => `MND${i + 1}`);

    let antallMisterYtelse: Array<number> = Array(12).fill(0);
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

    const antallMedYtelse: Array<number> = Array(12)
        .fill(brukere.length)
        .map((antall, i) => antall - runningSum[i]);

    return {
        labels,
        antallMisterYtelse,
        antallMedYtelse
    }
}

function kvartal(brukere: Array<Bruker>): DiagramData {
    const arr = new Array(16).fill(0);

    return {
        labels: [''],
        antallMisterYtelse: arr,
        antallMedYtelse: arr
    };
}

export function Diagram(props: { kategori: string, brukere: Array<Bruker> }) {
    moment.locale('nb_no');

    const data = props.kategori === 'AAP Maxtid' ? kvartal(props.brukere) : maned(props.brukere);

    const options: Highcharts.Options = {
        chart: {
            type: 'column',
            backgroundColor: '#e9e7e7'
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
            align: 'right',
            x: -30,
            verticalAlign: 'top',
            y: 25,
            floating: true,
            backgroundColor: '#CCC',
            borderColor: '#CCC',
            borderWidth: 1,
            shadow: false
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
                data: data.brukereMedYtelse
            },
            {
                index: 0,
                name: 'Brukere med dagpenger som mister ytelse i gjeldende mnd',
                data: data.brukereMisterYtelse
            }
        ]
    };
    return (
        <div>
            <h1>{props.kategori}</h1>
            <Chart type="Chart" options={options} container="chart"/>
        </div>
    );
}

export default Diagram;
