import SokFilterNy from "../toolbar/sok-filter-ny";
import {Checkbox} from "nav-frontend-skjema";
import React from "react";
import {useSelector} from "react-redux";
import {AppState} from "../../reducer";

interface SokVeiledereProps {
    erValgt: (ident: string)=> boolean;
    hanterChange: (event: React.SyntheticEvent)=> void;
}

function SokVeiledere({erValgt, hanterChange}: SokVeiledereProps) {
    const veilederePaEnheten = useSelector((state: AppState) => state.veiledere.data.veilederListe);
    return (
        <SokFilterNy
            label="Velg veiledere"
            placeholder="Søk veileder"
            data={veilederePaEnheten}
        >
            {liste =>
                <div className="checkbox-filterform">
                    <div className="checkbox-filterform__valg">
                        {liste.map( elem =>
                            <Checkbox
                                key={elem.ident}
                                label={`${elem.etternavn}, ${elem.fornavn}`}
                                value={elem.ident}
                                checked={erValgt(elem.ident)}
                                onChange={hanterChange}
                            />)}
                    </div>
                </div>
            }
        </SokFilterNy>
    )
}

export default SokVeiledere;
