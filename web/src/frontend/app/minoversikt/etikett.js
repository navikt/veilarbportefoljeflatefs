import React, { PropTypes as PT } from 'react';
import Tabelletiketter from './../components/tabelletiketter/tabelletiketter';

function Etikett({ type, child, skalVises }) {
    if (!skalVises) {
        return null;
    }
    return (
        <Tabelletiketter type={type}>
            {child}
        </Tabelletiketter>
    );
}

Etikett.propTypes = {
    type: PT.string.isRequired,
    child: PT.node.isRequired,
    skalVises: PT.bool.isRequired
};

export default Etikett;
