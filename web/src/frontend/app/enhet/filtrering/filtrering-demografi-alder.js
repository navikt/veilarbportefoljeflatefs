import React from 'react';
import { FormattedMessage } from 'react-intl';

const aldersIntervaller = [
    '19 og under',
    '20-24',
    '25-29',
    '30-39',
    '40-49',
    '50-59',
    '60-66',
    '67-70'
];

const defaultAlderOption = (
    <FormattedMessage id="filtrering.filtrer-brukere.demografi.alder" key="default">
        {text => <option value={0}>{text}</option>}
    </FormattedMessage>
);

const aldersOptions = [
    defaultAlderOption,
    ...aldersIntervaller.map(
        (alderString, index) => <option value={index + 1} key={`option-${alderString}`}>{`${alderString}`}</option>
    )
];

function FiltreringAlder(filtervalg, handleChange) {
    return (
        <div className="select-container">
            <select // eslint-disable-line jsx-a11y/no-onchange
                id="select-alder"
                name="valgtAlder"
                onChange={e => handleChange(e, 'alder')}
                value={filtervalg.alder}
            >
                {aldersOptions}
            </select>
        </div>
    );
}

export default FiltreringAlder;
