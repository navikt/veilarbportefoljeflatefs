import React from 'react';
import Barlabel from './barlabel';
import { guid } from 'nav-frontend-js-utils';
import './barlabel.less';

interface BarInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    labelTekst: React.ReactNode;
    antall: number;
    barClassname: string;
}

function BarInput({labelTekst, antall, barClassname, ...props}: BarInputProps) {
    const htmlFor = props.id || guid();
    return (
        <div className="skjema__input">
            <input {...props} />
            <Barlabel
                htmlFor={htmlFor}
                labelTekst={labelTekst}
                antall={antall}
                className={`${barClassname} skjemaelement__label`}
            />
        </div>
    );
}

export default BarInput;
