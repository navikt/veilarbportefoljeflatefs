import React, { PropTypes as PT } from 'react';

import FiltreringAlder from './filtrering-demografi-alder';
import FiltreringKjonn from './filtrering-demografi-kjonn';
import FiltreringFodselsdag from './filtrering-demografi-fodselsdag';

function Demografi({ filtervalg, handleChange, oppdaterDatagrunnlag }) {
    return (
        <div className="filtrering-demografi panel blokk-m">
            <FiltreringAlder
                filtervalg={filtervalg}
                handleChange={handleChange}
                oppdaterDatagrunnlag={oppdaterDatagrunnlag}
            />
            <FiltreringKjonn
                filtervalg={filtervalg}
                handleChange={handleChange}
            />
            <FiltreringFodselsdag
                filtervalg={filtervalg}
                handleChange={handleChange}
            />
        </div>
    );
}

Demografi.propTypes = {
    filtervalg: PT.object,
    handleChange: PT.func.isRequired,
    oppdaterDatagrunnlag: PT.func.isRequired
};

export default Demografi;
