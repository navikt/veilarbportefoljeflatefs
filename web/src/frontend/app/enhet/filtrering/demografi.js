import React from 'react';

import FiltreringAlder from './filtrering-demografi-alder';
import FiltreringKjonn from './filtrering-demografi-kjonn';
import FiltreringFodselsdag from './filtrering-demografi-fodselsdag';

function Demografi(filtervalg, handleChange) {
    return (
        <div className="filtrering-demografi panel panel-ramme blokk-m">
            <FiltreringAlder
                filtervalg={filtervalg}
                handleChange={handleChange}
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

export default Demografi;
