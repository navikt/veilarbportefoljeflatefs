import * as React from 'react';
import {Input, Label} from 'nav-frontend-skjema';
import {useSelector} from 'react-redux';
import VeilederCheckboxListe from '../components/veileder-checkbox-liste/veileder-checkbox-liste';
import {useRef, useState} from 'react';
import {AppState} from '../reducer';

interface FiltreringVeiledereProps {
    endreFiltervalg: (filterId: string, filterVerdi: any) => void;
}

export default function FiltreringVeiledere({endreFiltervalg}: FiltreringVeiledereProps) {
    const veilederNavnQuerySelector = useSelector(
        (state: AppState) => state.filtreringVeilederoversikt.veilederNavnQuery
    );
    const [veilederNavnQuery, setVeilederNavnQuery] = useState(veilederNavnQuerySelector);

    const wrapperRef = useRef<HTMLDivElement>(null);

    const handleChange = event => {
        const nyQuery = event.target.value;
        setVeilederNavnQuery(nyQuery);
        endreFiltervalg('veilederNavnQuery', nyQuery);
    };

    return (
        <div className="filtrering-veiledere" ref={wrapperRef}>
            <Label htmlFor="sok-veileder" className="veilederoversikt_sok-veileder">
                Søk veileder
            </Label>
            <Input
                placeholder="Navn eller NAV-ident"
                onChange={e => handleChange(e)}
                value={veilederNavnQuery}
                data-testid="veilederoversikt_sok-veileder-input"
                aria-label="Navn eller NAV-ident"
                id="sok-veileder"
            />
            <VeilederCheckboxListe endreFiltervalg={endreFiltervalg}/>
        </div>
    );
}
