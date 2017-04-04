import React, {Component, PropTypes as PT} from 'react';
import Chart from './chart';
import moment from 'moment';
import {brukerShape} from '../proptype-shapes';
import { headertekst } from './diagram-konstanter';
import { FormattedMessage } from 'react-intl';
import { ytelsevalg } from '../filtrering/filter-konstanter'
import config from './diagram-config';

function maned(brukere) {

    const labels = new Array(12).fill(0).map((_, i) => moment().add(i + 1, 'month').format('MMMM'));

    const maaneder = new Array(12).fill(0).map((_, i) => `MND${i + 1}`);

    let antallMisterYtelse = new Array(12).fill(0);
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

    const antallMedYtelse = new Array(12)
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

    const kvartaler = new Array(16).fill(0).map((_, i) => `KV${i + 1}`);
    let antallMisterYtelse = new Array(16).fill(0);
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

    const antallMedYtelse = new Array(16)
        .fill(brukere.length)
        .map((antall, i) => antall - runningSum[i]);

    return {
        labels,
        antallMisterYtelse,
        antallMedYtelse
    };
}

function utledHeaderTekst(filtreringvalg) {
    switch (filtreringvalg) {
        case ytelsevalg.DAGPENGER:
        case ytelsevalg.DAGPENGER_MED_PERMITTERING:
        case ytelsevalg.ORDINARE_DAGPENGER:
            return headertekst.DAGPENGER;
        case ytelsevalg.TILTAKSPENGER:
            return headertekst.TILTAKSPENGER;
        case ytelsevalg.AAP_MAXTID:
            return headertekst.AAP_MAXTID;
        case ytelsevalg.AAP:
        case ytelsevalg.AAP_UNNTAK:
            return headertekst.AAP;
        default:
            return 'minoversikt.diagram.header.feil';
    }
}

const Diagram = ({brukere, filtreringsvalg}) => {
    moment.locale('nb_no');

    const data = filtreringsvalg === ytelsevalg.AAP_MAXTID ? kvartal(brukere) : maned(brukere);
    const options = config(data);
    const headerTekst = utledHeaderTekst(filtreringsvalg);

    return (
        <div>
            <h1>
                <FormattedMessage id={headerTekst} />
            </h1>
            <Chart type="Chart" options={options} container="chart"/>
        </div>
    );
};

Diagram.PropTypes = {
    kategori: PT.string.isRequired,
    brukere: PT.arrayOf(brukerShape).isRequired
};

export default Diagram;
