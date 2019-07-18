import * as React from 'react';
import Stegindikator from 'nav-frontend-stegindikator';

interface StegviserProps {
    antallSteg: number;
    valgtSteg: number;
}

function Stegviser (props: StegviserProps){
    const mapIndexTilSteg = (antall: number, selectedIdx: number) => {
        return new Array(props.antallSteg)
        .fill(0)
        .map((_, i) => (
          {"label": "steg: "+i, "index":i}
        ));
    };

    return (
        <Stegindikator 
            steg={mapIndexTilSteg(props.antallSteg,props.valgtSteg)}
            aktivtSteg={props.valgtSteg}
            kompakt
        />
    );
}

export default Stegviser;
