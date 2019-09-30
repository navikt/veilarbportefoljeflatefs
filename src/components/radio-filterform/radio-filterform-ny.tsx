import React, {useState} from 'react';
import classNames from 'classnames';
import {Radio} from "nav-frontend-skjema";

export function RadioFilterformNy({ filterId, onSubmit, valg, closeDropdown, filtervalg, kolonner = 1 }) {

    const [valgtFilterValg, setValgteFilterValg] = useState<string>(filtervalg[filterId]);


    const createHandleOnSubmit = () => {
        closeDropdown();
        if(valgtFilterValg) {
            onSubmit(filterId, valgtFilterValg);
        }
    };

    return (
        <div className = "skjema checkbox-filterform">
            <div className="checkbox-filterform__valg">
                {Object.keys(valg).map(v =>
                    <Radio
                        label={valg[v].label}
                        value={v}
                        name={valg[v].label}
                        className={valg[v].className}
                        checked={valgtFilterValg === v}
                        onChange={e => setValgteFilterValg(e.target.value)}
                />)}
            </div>
            <div className="checkbox-filterform__under-valg">
                <div
                    className={classNames('checkbox-filterform__valg-knapp', 'knapperad', 'blokk-xxs')}
                >
                    <button onClick={createHandleOnSubmit}
                            className={classNames('knapp', 'knapp--mini', {'knapp--hoved': valgtFilterValg})}>
                        {valgtFilterValg ? "Velg" : "Lukk"}
                    </button>
                </div>
            </div>
        </div>
    );
}
