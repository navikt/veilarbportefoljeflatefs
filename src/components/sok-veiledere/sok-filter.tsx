import {ReactNode, useEffect, useRef, useState} from 'react';
import {Alert, TextField} from '@navikt/ds-react';
import '../toolbar/toolbar.css';

function limit<T>(liste: T[], antall: number) {
    return liste.slice(0, antall);
}

interface SokFilterProps<T> {
    data: T[];
    children: (filteredData: T[]) => ReactNode;
    label?: string;
    placeholder: string;
    limitSize?: number;
}

export function SokFilter<T>({data, children, label, placeholder, limitSize}: SokFilterProps<T>) {
    const [query, setQuery] = useState('');
    const [rawfilteredData, setRawfilteredData] = useState(data);
    const sokKnapp = useRef<HTMLInputElement>(null);

    useEffect(() => {
        sokKnapp.current?.focus();
    }, []);

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
                    data-testid="sok-filter_input"
                    ref={sokKnapp}
                    hideLabel
                />
            </div>
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
