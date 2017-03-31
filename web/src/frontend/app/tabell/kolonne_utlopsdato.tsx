import * as React from 'react';

export default function (props: { utlopsdato: any}) {
    const { dayOfMonth, monthValue, year } = props.utlopsdato;
    const dato = `${dayOfMonth}.${monthValue}.${year}`;
    return <td>{dato}</td>;
}
