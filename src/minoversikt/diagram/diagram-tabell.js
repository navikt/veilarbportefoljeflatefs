import React from 'react';

function DiagramTabell({ tekster, data }) {
    return (
        <table>
            <thead>
                <tr>
                    <th>
                        Måned/Kvartal
                    </th>
                    <th>
                        {tekster.legendtekst[0]}
                    </th>
                    <th>
                        tekster.legendtekst[1]}
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
/*
DiagramTabell.propTypes = {
    tekster: PT.object.isRequired,
    data: PT.object.isRequired
};
*/

export default DiagramTabell;
