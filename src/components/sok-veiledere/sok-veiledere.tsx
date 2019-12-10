import SokFilterNy from '../toolbar/sok-filter-ny';
import { Checkbox } from 'nav-frontend-skjema';
import React from 'react';
import { useSelector } from 'react-redux';
import { AppState } from '../../reducer';

interface SokVeiledereProps {
    erValgt: (ident: string) => boolean;
    hanterVeilederValgt: (erValgt: boolean, veilederIdent: string) => void;
}

function SokVeiledere({erValgt, hanterVeilederValgt}: SokVeiledereProps) {
    const veilederePaEnheten = useSelector((state: AppState) => state.veiledere.data.veilederListe);

    const sorterteVeilederePaEtterNavn = veilederePaEnheten.sort((a, b) => a.etternavn.localeCompare(b.etternavn));

    return (
        <SokFilterNy
            label="Velg veiledere:"
            placeholder="Søk veileder"
            data={sorterteVeilederePaEtterNavn}
        >
            {liste =>
                <div className="checkbox-filterform">
                    <div className="checkbox-filterform__valg">
                        {liste.map(elem =>
                            <Checkbox
                                key={elem.ident}
                                label={`${elem.etternavn}, ${elem.fornavn}`}
                                value={elem.ident}
                                checked={erValgt(elem.ident)}
                                onChange={e => hanterVeilederValgt(e.target.checked, e.target.value)}
                            />)}
                    </div>
                </div>
            }
        </SokFilterNy>
    );
}

export default SokVeiledere;
