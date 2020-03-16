import * as React from 'react';
import '../arbeidsliste-kategori.less';
import { ReactComponentElement } from 'react';

interface ArbeidslisteikonProps {
    value: string;
    arbeidslistekategori: ReactComponentElement<any>;
    name: string;
    checked: boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    index: string;
    title: string;
}

function Arbeidslistekategori({value, arbeidslistekategori, name, checked, onChange, index, title}: ArbeidslisteikonProps) {
    return (
        <div className="arbeidslistekategori__container" title={title}>
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
            >{arbeidslistekategori}</label>
        </div>
    );
}

export default Arbeidslistekategori;

