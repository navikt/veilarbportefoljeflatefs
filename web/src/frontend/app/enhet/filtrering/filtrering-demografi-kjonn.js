import React from 'react';
import { FormattedMessage } from 'react-intl';

function FiltreringKjonn(filtervalg, handleChange) {
    return (
        <div className="select-container">
            <select // eslint-disable-line jsx-a11y/no-onchange
                id="select-kjonn"
                name="valgtKjonn"
                onChange={e => handleChange(e, 'kjonn')}
                value={filtervalg.kjonn}
            >
                <FormattedMessage id="filtrering.filtrer-brukere.demografi.kjonn" key="kjonn-ikkeDefinert">
                    {text => <option value="ikke definert">{text}</option>}
                </FormattedMessage>
                <FormattedMessage id="filtrering.filtrer-brukere.demograi.mann" key="kjonn-m">
                    {text => <option value="M">{text}</option>}
                </FormattedMessage>
                <FormattedMessage id="filtrering.filtrer-brukere.demograi.kvinne" key="kjonn-k">
                    {text => <option value="K">{text}</option>}
                </FormattedMessage>
            </select>
        </div>
    );
}

export default FiltreringKjonn;
