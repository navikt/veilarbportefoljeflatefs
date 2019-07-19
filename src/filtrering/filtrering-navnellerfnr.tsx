import * as React from 'react';
import { Input } from 'nav-frontend-skjema';
import { FiltervalgModell } from '../model-interfaces';
import './filtrering-navnellerfnr.less';
import { useEffect, useState } from 'react';
import { useTimeOut } from '../hooks/use-timeout';

interface FiltreringNavnEllerFnrProps {
    filtervalg: FiltervalgModell;
    actions: {
        endreFiltervalg: (filterId: string, filterVerdi: string) => void;
    };
}

function FiltreringNavnellerfnr(props: FiltreringNavnEllerFnrProps) {
    const [navnEllerFnrQuery, setNavnEllerFnrQuery] = useState(props.filtervalg.navnEllerFnrQuery);

    useTimeOut(
        () => props.actions.endreFiltervalg('navnEllerFnrQuery', navnEllerFnrQuery),
        500,
        [navnEllerFnrQuery]
    );

    useEffect(() => {
        const prevQuery = props.filtervalg.navnEllerFnrQuery;
        if (prevQuery === '') {
            setNavnEllerFnrQuery('');
        }
    },[props.filtervalg.navnEllerFnrQuery, navnEllerFnrQuery]);

    return (
        <div className="filtrering-navn-fnr">
            <Input
                label=""
                placeholder="Søk etter navn eller fødselsnummer"
                onChange={(e)=> setNavnEllerFnrQuery(e.target.value)}
                value={navnEllerFnrQuery}
            />
        </div>
    );
}

export default FiltreringNavnellerfnr;
