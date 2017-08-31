import React from 'react';
import PT from 'prop-types';

function DatoKolonne({ dato, skalVises }) {
    if (!skalVises) {
        return null;
    }
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    if (!dato) {
        return (
            //  Sørger med dette for at spanen tar akkurat like mye plass som et felt med dato
            <span style={{ visibility: 'hidden' }}>
                {new Date(0).toLocaleDateString(['nb-no', 'nn-no', 'en-gb', 'en-us'], options)}
            </span>);
    }
    const date = new Date(dato);
    return (
        <span>{date.toLocaleDateString(['nb-no', 'nn-no', 'en-gb', 'en-us'], options)}</span>
    );
}

DatoKolonne.propTypes = {
    dato: PT.oneOfType([PT.instanceOf(Date), PT.string]),
    skalVises: PT.bool
};

DatoKolonne.defaultProps = {
    skalVises: true,
    dato: null
};


export default DatoKolonne;
