import React, {PropTypes as PT} from 'react';
import {veilederShape} from './../proptype-shapes';
import { FormattedMessage } from 'react-intl';

function VeilederTabell({ veiledere }) {
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
                        <td>{`${veileder.brukere}`}</td>
                    </tr>
                )}
            </tbody>
        </table>
    );
}

VeilederTabell.propTypes = {
    veiledere: PT.arrayOf(veilederShape),
};

export default VeilederTabell;
