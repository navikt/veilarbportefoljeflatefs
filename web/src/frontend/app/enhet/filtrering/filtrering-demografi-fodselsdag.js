import React, { PropTypes as PT } from 'react';
import { FormattedMessage } from 'react-intl';

import { range, lag2Sifret } from '../../utils/utils';

const alleDager = range(1, 31, true);

const datoOptions = alleDager.map(x => <option value={x} key={`option-${x}`}>{lag2Sifret(x)}</option>);

function FiltreringFodselsdag({ filtervalg, handleChange }) {
    return (
        <div className="filtrering-select">
            <div className="selectContainer">
                <label htmlFor="select-fodselsdagIMnd" className="text-hide">Velg fødselsdato</label>
                <select // eslint-disable-line jsx-a11y/no-onchange
                    id="select-fodselsdagIMnd"
                    name="valgtfodselsdagIMnd"
                    onChange={e => handleChange(e, 'fodselsdagIMnd')}
                    value={filtervalg.fodselsdagIMnd}
                >
                    <FormattedMessage id="filtrering.filtrer-brukere.demografi.fodselsdato" key="fodselsdato">
                        {text => <option value={0}>{text}</option>}
                    </FormattedMessage>
                    {datoOptions}
                </select>
            </div>
        </div>
    );
}

FiltreringFodselsdag.propTypes = {
    filtervalg: PT.object,
    handleChange: PT.func.isRequired
};

export default FiltreringFodselsdag;
