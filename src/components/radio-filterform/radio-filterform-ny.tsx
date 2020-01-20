import React, { useState } from 'react';
import classNames from 'classnames';
import { Radio } from 'nav-frontend-skjema';
import './radio-filterform.less';

export function RadioFilterformNy({filterId, onSubmit, valg, closeDropdown, filtervalg}) {

    const [valgtFilterValg, setValgteFilterValg] = useState<string>(filtervalg[filterId]);

    const createHandleOnSubmit = () => {
        if (valgtFilterValg) {
            onSubmit(filterId, valgtFilterValg);
        }
        closeDropdown();
    };

    return (
        <form className="skjema radio-filterform" onSubmit={createHandleOnSubmit}>
            <div className="radio-filterform__valg">
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
                        {valgtFilterValg ? 'Velg' : 'Lukk'}
                    </button>
                </div>
            </div>
        </form>
    );
}
