import {ChangeEvent, useEffect, useRef, useState} from 'react';
import {TextField} from '@navikt/ds-react';
import {FiltervalgModell} from '../typer/filtervalg-modell';

interface FiltreringNavnEllerFnrProps {
    filtervalg: FiltervalgModell;
    endreFiltervalg: (filterId: string, filterVerdi: string) => void;
}

export function FiltreringNavnellerfnr({filtervalg, endreFiltervalg}: FiltreringNavnEllerFnrProps) {
    const [navnEllerFnrQuery, setNavnEllerFnrQuery] = useState(filtervalg.navnEllerFnrQuery);
    const isInitialMount = useRef(true);
    const timer = useRef<number | undefined>();
    const savedCallback = useRef(null);

    useEffect(() => {
        // @ts-ignore
        savedCallback.current = filterverdi => endreFiltervalg('navnEllerFnrQuery', filterverdi);
    }, [endreFiltervalg]);

    useEffect(() => {
        function functionCall() {
            // @ts-ignore
            savedCallback.current(navnEllerFnrQuery);
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
    }, [navnEllerFnrQuery]);

    useEffect(() => {
        const prevQuery = filtervalg.navnEllerFnrQuery;
        if (prevQuery === '') {
            setNavnEllerFnrQuery('');
        }
    }, [filtervalg.navnEllerFnrQuery]);

    return (
        <div className="filtrering-navn-fnr" role="search">
            <TextField
                label=""
                hideLabel
                placeholder="Søk etter navn eller fødselsnummer"
                onChange={(e: ChangeEvent<HTMLInputElement>) => setNavnEllerFnrQuery(e.target.value)}
                value={navnEllerFnrQuery}
                data-testid="sok-navn-fnr_input"
                id="sok-navn-fnr_input"
                aria-label="Søk etter navn eller fødselsnummer"
            />
        </div>
    );
}
