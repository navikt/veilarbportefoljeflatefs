import * as React from 'react';
import {Input, Label} from 'nav-frontend-skjema';
import VeilederCheckboxListe from '../components/veileder-checkbox-liste/veileder-checkbox-liste';
import {useRef, useState} from 'react';

interface FiltreringVeiledereProps {
    endreFiltervalg: (filterId: string, filterVerdi: React.ReactNode) => void;
}

export default function FiltreringVeiledere({endreFiltervalg}: FiltreringVeiledereProps) {
    const [veilederNavnQuery, setVeilederNavnQuery] = useState('');

    const wrapperRef = useRef<HTMLDivElement>(null);

    const handleChange = event => {
        const nyQuery = event.target.value;
        setVeilederNavnQuery(nyQuery);
        endreFiltervalg('veilederNavnQuery', veilederNavnQuery);
    };

    const nullstillInputfelt = () => {
        setVeilederNavnQuery('');
        endreFiltervalg('veilederNavnQuery', '');
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
            <VeilederCheckboxListe endreFiltervalg={endreFiltervalg} nullstillInputfelt={nullstillInputfelt} />
        </div>
    );
}
