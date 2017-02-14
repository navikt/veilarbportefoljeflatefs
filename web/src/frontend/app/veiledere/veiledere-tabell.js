import React, { PropTypes as PT } from 'react';
import { FormattedMessage } from 'react-intl';
import { veilederShape } from './../proptype-shapes';

function VeilederTabell({ veiledere, portefoljestorrelser }) {
    return (
        <table className="tabell tabell-skillestrek">
            <thead>
                <tr>
                    <th scope="col">
                        <FormattedMessage id="enhet.veiledere.tabell.veiledere" />
                    </th>
                    <th scope="col">
                        <FormattedMessage id="enhet.veiledere.tabell.ident" />
                    </th>
                    <th scope="col">
                        <FormattedMessage id="enhet.veiledere.tabell.brukere" />
                    </th>
                </tr>
            </thead>
            <tbody>
                {veiledere.map(veileder =>
                    <tr key={veileder.ident}>
                        <td>{`${veileder.navn}`}</td>
                        <td>{`${veileder.ident}`}</td>

                        {/* Denne må endres til å se på veileder_id (storrelse.value === veileder.veileder_id) når
                        når det er tilgjengelig fra portefølje*/}
                        <td>{portefoljestorrelser.find(storrelse => storrelse.value === 'SKAFFEA').count}</td>
                    </tr>
                )}
            </tbody>
        </table>
    );
}

VeilederTabell.propTypes = {
    veiledere: PT.arrayOf(veilederShape),
    portefoljestorrelser: PT.arrayOf(PT.object)
};

export default VeilederTabell;
