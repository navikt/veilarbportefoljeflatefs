import React from "react";
import {Checkbox} from "nav-frontend-skjema";
import classNames from "classnames";
import {VeilederModell} from "../../model-interfaces";

interface VeilederCheckboxes {
    veilederData: VeilederModell[];
    onSubmit : () => void;
    valgteVeileder: string[];
    onVeilederValgt: (event: React.SyntheticEvent) => void;
}

function VeilederCheckboxes ({veilederData, onSubmit, valgteVeileder, onVeilederValgt}: VeilederCheckboxes) {
    const harValg = valgteVeileder.length > 0;

    return (
        <div className="checkbox-filterform">
            <div className="checkbox-filterform__valg">
                {veilederData.map(elem =>
                    <Checkbox
                        key={elem.ident}
                        label={`${elem.etternavn}, ${elem.fornavn}`}
                        value={elem.ident}
                        checked={valgteVeileder.includes(elem.ident)}
                        onChange={event => onVeilederValgt(event)}
                    />)}
            </div>
            <div className="checkbox-filterform__valg-knapp knapperad blokk-xxs">
                <button
                    onClick={onSubmit}
                    className={classNames('knapp', 'knapp--mini', {'knapp--hoved': harValg})}
                >
                    {harValg ? "Velg" : "Lukk"}
                </button>
            </div>
        </div>
    )
}

export default VeilederCheckboxes;
