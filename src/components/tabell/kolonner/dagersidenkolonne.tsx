import * as React from "react";

export function DagerSidenKolonne(props : {skalVises: boolean, dato: number, className: string}) {
    if (!props.skalVises) {
        return null;
    }

    const datoTekst = () => {
        if(props.dato === 0) {
            return "I dag";
        } else if(props.dato === 1) {
            return "1 dag siden"
        } else {
            return `${props.dato} dager siden`
        }
    };

    return (
        <span className={props.className}>
            {datoTekst()}
        </span>
    );
}