import React, {PropTypes as PT} from 'react';
import {FormattedMessage} from 'react-intl';

function FiltreringKjonn({filtervalg, handleChange}) {
    return (
        <div className="filtrering-select">
            <div className="selectContainer">
                <label htmlFor="select-kjonn" className="text-hide">Velg kjønn</label>
                <select // eslint-disable-line jsx-a11y/no-onchange
                    id="select-kjonn"
                    name="valgtKjonn"
                    onChange={e => handleChange(e, 'kjonn')}
                    value={filtervalg.kjonn}
                >
                    <FormattedMessage id="filtrering.filtrer-brukere.demografi.kjonn" key="kjonn-ikkeDefinert">
                        {text => <option value="ikke definert">{text}</option>}
                    </FormattedMessage>
                    <FormattedMessage id="filtrering.filtrer-brukere.demografi.mann" key="kjonn-m">
                        {text => <option value="M">{text}</option>}
                    </FormattedMessage>
                    <FormattedMessage id="filtrering.filtrer-brukere.demografi.kvinne" key="kjonn-k">
                        {text => <option value="K">{text}</option>}
                    </FormattedMessage>
                </select>
            </div>
        </div>
    );
}

FiltreringKjonn.propTypes = {
    filtervalg: PT.object,
    handleChange: PT.func.isRequired
};

export default FiltreringKjonn;
