import React, { PropTypes as PT } from 'react';
import { FormattedMessage } from 'react-intl';

function DiagramTabell({ tekster, data }) {
    return (
        <table>
            <thead>
                <tr>
                    <th>
                        <h1>
                        Fasett
                    </h1>
                    </th>
                    <th>
                        <h1>
                            <FormattedMessage id={tekster.legendtekst[0]} />
                        </h1>
                    </th>
                    <th>
                        <h1>
                            <FormattedMessage id={tekster.legendtekst[1]} />
                        </h1>
                    </th>
                </tr>
            </thead>
            <tbody>
                {
                data.labels.map((mnd, index) => <tr key={mnd}>
                    <td>
                        {mnd}
                    </td>
                    <td>
                        {data.antallMedYtelse[index]}
                    </td>
                    <td>
                        {data.antallMisterYtelse[index]}
                    </td>
                </tr>)
            }
            </tbody>
        </table>
    );
}

DiagramTabell.propTypes = {
    tekster: PT.object.isRequired,
    data: PT.object.isRequired
};

export default DiagramTabell;
