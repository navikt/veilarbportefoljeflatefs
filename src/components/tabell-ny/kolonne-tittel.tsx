import * as React from "react";

interface KolonneTittel {
    skalVises?: boolean;
    className?: string;
    tekst?: string;
}

function KolonneTittel({className= '', tekst }: KolonneTittel) {
    return (
        <span className={className}>
            {tekst}
        </span>
    );
}

export default KolonneTittel;
