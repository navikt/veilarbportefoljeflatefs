import React, {useEffect, useState} from 'react';
import {Alert, BodyShort, TextField} from '@navikt/ds-react';

interface SokFilterProps<T> {
    data: T[];
    children: (filteredData: T[]) => React.ReactNode;
    label: string;
    placeholder: string;
    limitSize?: number;
}

function limit<T>(liste: T[], antall: number) {
    return liste.slice(0, antall);
}

function SokFilterVeilederliste<T>(props: SokFilterProps<T>) {
    const {data, limitSize, children} = props;
    const [query, setQuery] = useState('');
    const [rawfilteredData, setRawfilteredData] = useState(data);

    useEffect(() => {
        setRawfilteredData(
            data.filter(
                elem =>
                    !query ||
                    JSON.stringify(elem)
                        .toLowerCase()
                        .includes(query.toLowerCase())
            )
        );
    }, [query, data]);

    const filteredData = limitSize === undefined ? rawfilteredData : limit(rawfilteredData, limitSize || 20);

    const harData = filteredData.length > 0;

    return (
        <>
            <div className="sokfilter">
                <TextField
                    label={props.label}
                    placeholder={props.placeholder}
                    value={query}
                    className="sokfilter__input"
                    onChange={e => setQuery(e.target.value)}
                    data-testid="veiledergruppe_modal_sok-veileder-input"
                />
            </div>
            <BodyShort className="text-hide" aria-live="polite" aria-atomic="true">
                {`Viser ${filteredData.length} treff`}
            </BodyShort>
            {harData ? (
                children(filteredData)
            ) : (
                <Alert variant="info" className="checkbox-filterform__alertstripe">
                    Ingen veiledere funnet
                </Alert>
            )}
        </>
    );
}

export default SokFilterVeilederliste;
