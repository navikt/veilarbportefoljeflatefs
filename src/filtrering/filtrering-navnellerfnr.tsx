import React, { useRef } from 'react';
import { Input } from 'nav-frontend-skjema';
import { FiltervalgModell } from '../model-interfaces';
import './filtrering-navnellerfnr.less';
import { useEffect, useState } from 'react';

interface FiltreringNavnEllerFnrProps {
    filtervalg: FiltervalgModell;
    actions: {
        endreFiltervalg: (filterId: string, filterVerdi: string) => void;
    };
}

function FiltreringNavnellerfnr(props: FiltreringNavnEllerFnrProps) {
    const [navnEllerFnrQuery, setNavnEllerFnrQuery] = useState(props.filtervalg.navnEllerFnrQuery);
    const isInitialMount = useRef(true);
    const timer = useRef<number | undefined>();
    const savedCallback = useRef(null);

    useEffect(() => {
        // @ts-ignore
        savedCallback.current = (b) => props.actions.endreFiltervalg('navnEllerFnrQuery', b);
    }, [props.actions]);

    useEffect(
        () => {
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
        const prevQuery = props.filtervalg.navnEllerFnrQuery;
        if (prevQuery === '') {
            setNavnEllerFnrQuery('');
        }
    },[props.filtervalg.navnEllerFnrQuery]);

    return (
        <div className="filtrering-navn-fnr">
            <Input
                label=""
                placeholder="Søk etter navn eller fødselsnummer"
                onChange={(e: React.ChangeEvent<HTMLInputElement>)=> setNavnEllerFnrQuery(e.target.value)}
                value={navnEllerFnrQuery}
            />
        </div>
    );
}

export default FiltreringNavnellerfnr;
