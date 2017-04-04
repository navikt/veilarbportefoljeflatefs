export default (data, tekster) => {
    return {
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
                name: tekster[0],
                data: data.antallMedYtelse
            },
            {
                index: 0,
                name: tekster[1],
                data: data.antallMisterYtelse
            }
        ]
    }
};
