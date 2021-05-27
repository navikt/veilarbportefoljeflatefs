import * as React from 'react';
import {Input, Label} from 'nav-frontend-skjema';
import VeilederCheckboxListe from '../components/veileder-checkbox-liste/veileder-checkbox-liste';
import {useRef, useState} from 'react';
import {useFeatureSelector} from '../hooks/redux/use-feature-selector';
import {GJEM_HOVEDMAL, SOK_VEILEDER} from '../konstanter';
import GammelVeilederCheckboxListe from '../components/veileder-checkbox-liste/gammel_veileder-checkbox-liste';
import {useEventListener} from '../hooks/use-event-listener';

interface FiltreringVeiledereProps {
    endreFiltervalg: (filterId: string, filterVerdi: React.ReactNode) => void;
}

export default function FiltreringVeiledere({endreFiltervalg}: FiltreringVeiledereProps) {
    const [veilederNavnQuery, setVeilederNavnQuery] = useState('');
    const [hasFocus, setHasFocus] = useState(false);

    const wrapperRef = useRef<HTMLDivElement>(null);
    const erSokVeilederFeatureTogglePa = useFeatureSelector()(SOK_VEILEDER);

    const handleChange = event => {
        const nyQuery = event.target.value;
        setVeilederNavnQuery(nyQuery);
        endreFiltervalg('veilederNavnQuery', veilederNavnQuery);
    };

    const handleClickOutside = e => {
        if (!wrapperRef.current?.contains(e.target)) {
            setHasFocus(false);
        }
    };

    useEventListener('mousedown', handleClickOutside);

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
                onFocus={() => !erSokVeilederFeatureTogglePa && setHasFocus(true)}
                aria-label="Navn eller NAV-ident"
                id="sok-veileder"
            />
            {erSokVeilederFeatureTogglePa ? (
                <VeilederCheckboxListe endreFiltervalg={endreFiltervalg} nullstillInputfelt={nullstillInputfelt} />
            ) : (
                hasFocus && (
                    <>
                        <GammelVeilederCheckboxListe
                            open={hasFocus}
                            onSubmit={() => setHasFocus(false)}
                            onClose={() => setHasFocus(false)}
                        />
                    </>
                )
            )}
        </div>
    );
}
