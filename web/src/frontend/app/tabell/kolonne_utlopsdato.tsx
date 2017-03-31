import * as React from 'react';

export default function (props: { utlopsdato: string}) {
    const dato: Date = new Date(props.utlopsdato);
    const options = {day: '2-digit', month: '2-digit', year: 'numeric'};
    return <td>{dato.toLocaleDateString(['nb-no', 'nn-no', 'en-gb', 'en-us'], options)}</td>;
}
