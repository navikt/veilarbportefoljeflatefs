import React, { PropTypes as PT } from 'react';
import { FormattedMessage } from 'react-intl';
import Chart from 'react-highcharts';
import { brukerShape } from '../../proptype-shapes';
import { ytelsevalg } from '../../filtrering/filter-konstanter';
import config from './config';
import MultiFormattedMessage from '../../components/multiformattedmessage';
import { ledetekster, kvartal, maned } from './utils';

const Diagram = ({ brukere, filtreringsvalg }) => {
    console.log('filtreringsvalg', filtreringsvalg);
    const data = filtreringsvalg === ytelsevalg.AAP_MAXTID ? kvartal(brukere) : maned(brukere);
    const tekster = ledetekster(filtreringsvalg);

    return (
        <div>
            <h1>
                <FormattedMessage id={tekster.headertekst} />
            </h1>
            <MultiFormattedMessage id={tekster.legendtekst}>
                {(diagramtekster) => (
                    <Chart config={config(data, diagramtekster)} pureConfig />
                )}
            </MultiFormattedMessage>
        </div>
    );
};

Diagram.propTypes = {
    filtreringsvalg: PT.string.isRequired,
    brukere: PT.arrayOf(brukerShape).isRequired
};

export default Diagram;
