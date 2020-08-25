import React from 'react';
import Barlabel from './barlabel';
import {guid} from 'nav-frontend-js-utils';
import './barlabel.less';

interface BarInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    labelTekst: React.ReactNode;
    antall: number;
    max: number;
    barClassname: string;
}

function BarInput({labelTekst, antall, max, barClassname, ...props}: BarInputProps) {
    const htmlFor = props.id || guid();
    return (
        <div className="skjema__input">
            <input {...props} />
            <Barlabel
                htmlFor={htmlFor}
                labelTekst={labelTekst}
                antall={antall}
                max={max}
                className={`${barClassname} skjemaelement__label`}
            />
        </div>
    );
}

export default BarInput;
