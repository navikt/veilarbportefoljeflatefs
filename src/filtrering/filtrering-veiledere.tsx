import {ChangeEvent, useEffect, useRef, useState} from 'react';
import {TextField} from '@navikt/ds-react';
import {VeilederCheckboxListe} from '../components/veileder-checkbox-liste/veileder-checkbox-liste';
import {FiltervalgModell} from '../typer/filtervalg-modell';

interface FiltreringVeiledereProps {
    filtervalg: FiltervalgModell;
    endreFiltervalg: (filterId: string, filterVerdi: string) => void;
}

export function FiltreringVeiledere({endreFiltervalg, filtervalg}: FiltreringVeiledereProps) {
    const [veilederNavnQuery, setVeilederNavnQuery] = useState(filtervalg.veilederNavnQuery);
    const wrapperRef = useRef<HTMLDivElement>(null);
    const isInitialMount = useRef(true);
    const timer = useRef<number | undefined>();
    const savedCallback = useRef(null);

    useEffect(() => {
        // @ts-ignore
        savedCallback.current = filterverdi => endreFiltervalg('veilederNavnQuery', filterverdi);
    }, [endreFiltervalg]);

    useEffect(() => {
        if (filtervalg.veilederNavnQuery === '') {
            setVeilederNavnQuery('');
        }
    }, [filtervalg.veilederNavnQuery]);

    useEffect(() => {
        function functionCall() {
            // @ts-ignore
            savedCallback.current(veilederNavnQuery);
        }

        if (isInitialMount.current) {
            isInitialMount.current = false;
        } else {
            if (!timer.current) {
                timer.current = window.setTimeout(functionCall, 500);
            }
            return () => {
                clearTimeout(timer.current);
                timer.current = undefined;
            };
        }
    }, [veilederNavnQuery]);

    const nullstillInputfelt = () => {
        setVeilederNavnQuery('');
        endreFiltervalg('veilederNavnQuery', '');
    };

    return (
        <div className="filtrering-veiledere" ref={wrapperRef}>
            <TextField
                label="Søk veileder"
                placeholder="Navn eller Nav-ident"
                onChange={(e: ChangeEvent<HTMLInputElement>) => setVeilederNavnQuery(e.target.value)}
                value={veilederNavnQuery}
                data-testid="veilederoversikt_sok-veileder-input"
                aria-label="Navn eller Nav-ident"
            />
            <VeilederCheckboxListe nullstillInputfelt={nullstillInputfelt} />
        </div>
    );
}
