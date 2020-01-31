import * as React from 'react';
import '../arbeidsliste-kategori.less';
import { ReactComponentElement } from 'react';

interface ArbeidslisteikonProps {
    value: string;
    arbeidslisteikon: ReactComponentElement<any>;
    name: string;
    tabIndex: number;
    checked: boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function ArbeidslisteIkon({value, arbeidslisteikon, name, checked, onChange, tabIndex}: ArbeidslisteikonProps) {
    return (
        <label className="arbeidslisteikon__container" tabIndex={0}>
            <input
                type="radio"
                name={name}
                className="arbeidslisteikon__input"
                value={value}
                tabIndex={tabIndex}
                checked={checked}
                onChange={onChange}
            />
            {arbeidslisteikon}
        </label>
    );
}

export default ArbeidslisteIkon;

