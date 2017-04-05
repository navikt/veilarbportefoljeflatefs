import React, { Component, PropTypes as PT } from 'react';
import { FormattedMessage } from 'react-intl';
import { brukerShape } from '../../proptype-shapes';
import { ytelsevalg } from '../../filtrering/filter-konstanter';
import config from './diagram-config';
import MultiFormattedMessage from '../../components/multiformattedmessage';
import Chart from 'react-highcharts';
import { ledetekster, kvartal, maned } from './util';

const Diagram = ({ brukere, filtreringsvalg }) => {

    const data = filtreringsvalg === ytelsevalg.AAP_MAXTID ? kvartal(brukere) : maned(brukere);
    const tekster = ledetekster(filtreringsvalg);

    return (
        <div>
            <h1>
                <FormattedMessage id={tekster.headertekst}/>
            </h1>
            <MultiFormattedMessage id={tekster.legendtekst}>
                {(tekster) => (
                    <Chart config={config(data, tekster)} />
                )}
            </MultiFormattedMessage>
        </div>
    );
};

Diagram.PropTypes = {
    kategori: PT.string.isRequired,
    brukere: PT.arrayOf(brukerShape).isRequired
};

export default Diagram;
