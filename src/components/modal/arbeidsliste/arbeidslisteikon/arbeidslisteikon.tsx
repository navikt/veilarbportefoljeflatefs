import * as React from 'react';
import '../arbeidsliste-kategori.less';
import { ReactComponentElement } from 'react';

interface ArbeidslisteIkonProps {
    value: string;
    arbeidslisteikon: ReactComponentElement<any>;
    name: string;
    checked?: boolean;
}

function ArbeidslisteIkon({value, arbeidslisteikon, checked, name}: ArbeidslisteIkonProps) {
    return (
        <label className="arbeidslisteikon__container">
            <input
                type="radio"
                name={name}
                className="arbeidslisteikon__input"
                value={value}
                checked={checked}
            />
            {arbeidslisteikon}
        </label>
    );
}

export default ArbeidslisteIkon;
