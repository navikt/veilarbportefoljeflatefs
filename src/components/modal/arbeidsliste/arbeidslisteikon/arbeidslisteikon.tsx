import * as React from 'react';
import '../arbeidsliste-kategori.less';
import { ReactComponentElement } from 'react';

interface ArbeidslisteikonProps {
    value: string;
    arbeidslisteikon: ReactComponentElement<any>;
    name: string;
    checked: boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    index: string;
}

function ArbeidslisteIkon({value, arbeidslisteikon, name, checked, onChange, index}: ArbeidslisteikonProps) {
    return (
        <div className="arbeidslisteikon__container">
            <input
                id={`${value}[${index}]`}
                type="radio"
                name={name}
                value={value}
                checked={checked}
                onChange={onChange}
            />
            <label
                htmlFor={`${value}[${index}]`}
            >{arbeidslisteikon}</label>
        </div>
    );
}

export default ArbeidslisteIkon;

