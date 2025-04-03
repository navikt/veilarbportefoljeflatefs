import {ReactNode, useEffect, useState} from 'react';
import {Alert, BodyShort, TextField} from '@navikt/ds-react';

interface SokFilterProps<T> {
    data: T[];
    children: (filteredData: T[]) => ReactNode;
    label: string;
    placeholder: string;
    limitSize?: number;
}

function limit<T>(liste: T[], antall: number) {
    return liste.slice(0, antall);
}

export function SokFilterVeilederliste<T>({data, label, placeholder, limitSize, children}: SokFilterProps<T>) {
    const [query, setQuery] = useState('');
    const [rawfilteredData, setRawfilteredData] = useState(data);

    useEffect(() => {
        setRawfilteredData(
            data.filter(elem => !query || JSON.stringify(elem).toLowerCase().includes(query.toLowerCase()))
        );
    }, [query, data]);

    const filteredData = limitSize === undefined ? rawfilteredData : limit(rawfilteredData, limitSize || 20);

    const harData = filteredData.length > 0;

    return (
        <>
            <div className="sokfilter">
                <TextField
                    label={label}
                    placeholder={placeholder}
                    value={query}
                    className="sokfilter__input"
                    onChange={e => setQuery(e.target.value)}
                    data-testid="veiledergruppe_modal_sok-veileder-input"
                />
            </div>
            <BodyShort size="small" className="text-hide" aria-live="polite" aria-atomic="true">
                {`Viser ${filteredData.length} treff`}
            </BodyShort>
            {harData ? (
                children(filteredData)
            ) : (
                <Alert variant="info" className="checkbox-filterform__alertstripe" size="small">
                    Ingen veiledere funnet
                </Alert>
            )}
        </>
    );
}
