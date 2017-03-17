import React, {PropTypes as PT} from 'react';
import {FormattedMessage} from 'react-intl';

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

function FiltreringAlder({filtervalg, handleChange}) {
    return (
        <div className="filtrering-select">
            <div className="selectContainer">
                <label htmlFor="select-alder" className="text-hide">Velg alder</label>
                <select // eslint-disable-line jsx-a11y/no-onchange
                    id="select-alder"
                    name="valgtAlder"
                    onChange={e => handleChange(e, 'alder')}
                    value={filtervalg.alder}
                >
                    {aldersOptions}
                </select>
            </div>
        </div>
    );
}

FiltreringAlder.propTypes = {
    filtervalg: PT.object,
    handleChange: PT.func.isRequired
};

export default FiltreringAlder;
