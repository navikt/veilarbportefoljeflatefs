import * as React from 'react';
import {Input, Label} from 'nav-frontend-skjema';
import {useDispatch, useSelector} from 'react-redux';
import {endreFiltervalg} from '../ducks/filtrering';
import VeilederCheckboxListe from '../components/veileder-checkbox-liste/veileder-checkbox-liste';
import {OversiktType} from '../ducks/ui/listevisning';
import {useRef, useState} from 'react';
import {useEventListener} from '../hooks/use-event-listener';
import {AppState} from '../reducer';

function FiltreringVeiledere() {
    const [hasFocus, setHasFocus] = useState(false);

    const veilederNavnQuerySelector = useSelector(
        (state: AppState) => state.filtreringVeilederoversikt.veilederNavnQuery
    );
    const [veilederNavnQuery, setVeilederNavnQuery] = useState(veilederNavnQuerySelector);

    const wrapperRef = useRef<HTMLDivElement>(null);
    const dispatch = useDispatch();

    const handleClickOutside = e => {
        if (!wrapperRef.current?.contains(e.target)) {
            setHasFocus(false);
        }
    };

    useEventListener('mousedown', handleClickOutside);

    const handleChange = event => {
        const nyQuery = event.target.value;
        setVeilederNavnQuery(nyQuery);
        dispatch(endreFiltervalg('veilederNavnQuery', nyQuery, OversiktType.veilederOversikt));
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
                onFocus={() => setHasFocus(true)}
                data-testid="veilederoversikt_sok-veileder-input"
                aria-label="Navn eller NAV-ident"
                id="sok-veileder"
            />
            {hasFocus && (
                <VeilederCheckboxListe
                    open={hasFocus}
                    onSubmit={() => setHasFocus(false)}
                    onClose={() => setHasFocus(false)}
                />
            )}
        </div>
    );
}

export default FiltreringVeiledere;
