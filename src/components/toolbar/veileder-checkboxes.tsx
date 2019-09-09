import React, {useState} from "react";
import {Checkbox} from "nav-frontend-skjema";
import classNames from "classnames";
import {VeilederModell} from "../../model-interfaces";

interface VeilederCheckboxes {
    veilederData: VeilederModell[];
    onSubmit : (valgteVeileder: string[]) => void;
    lukk?: () => void;
    valgteVeilederProps?: string[];
}

function VeilederCheckboxes ({veilederData, onSubmit , lukk, valgteVeilederProps}: VeilederCheckboxes) {
    const [valgteVeileder, setValgteVeileder] = useState<string[]>(valgteVeilederProps || []);
    const harValg = valgteVeileder.length > 0;


    const hanterChange = (event) => {
        const veilederTarget = event.target.value;
        event.target.checked
            ? setValgteVeileder([veilederTarget, ...valgteVeileder])
            : setValgteVeileder(valgteVeileder.filter(veileder => veileder !== veilederTarget))
    };

    const hanterSubmit = () => {
        if (harValg) {
            onSubmit(valgteVeileder);
            setValgteVeileder([]);
        }
        if(lukk) {
            lukk();
        }
    };


    return (
        <div className="checkbox-filterform">
            <div className="checkbox-filterform__valg">
                {veilederData.map(elem =>
                    <Checkbox
                        key={elem.ident}
                        label={`${elem.etternavn}, ${elem.fornavn}`}
                        value={elem.ident}
                        checked={valgteVeileder.includes(elem.ident)}
                        onChange={event => hanterChange(event)}
                    />)}
            </div>
            <div className="checkbox-filterform__valg-knapp knapperad blokk-xxs">
                <button
                    onClick={()=> hanterSubmit()}
                    className={classNames('knapp', 'knapp--mini', {'knapp--hoved': harValg})}
                >
                    {harValg ? "Velg" : "Lukk"}
                </button>
            </div>
        </div>
    )
}

export default VeilederCheckboxes;
