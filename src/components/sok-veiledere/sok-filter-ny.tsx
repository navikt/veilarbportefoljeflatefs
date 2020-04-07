import React, { useEffect, useState } from 'react';
import { Input } from 'nav-frontend-skjema';
import AlertStripe from 'nav-frontend-alertstriper';
import '../toolbar/toolbar.less';
import { useFocus } from '../../hooks/use-focus';

interface SokFilterProps<T> {
    data: T[];
    children: (filteredData: T[]) => React.ReactNode;
    label?: string;
    placeholder: string;
    limitSize?: number;
}

function limit<T>(liste: T[], antall: number) {
    return liste.slice(0, antall);
}

function SokFilterNy<T>(props: SokFilterProps<T>) {
    const {data, limitSize, children} = props;
    const [query, setQuery] = useState('');
    const [rawfilteredData, setRawfilteredData] = useState(data);

    useEffect(() => {
        setRawfilteredData(data.filter(elem => !query || JSON.stringify(elem).toLowerCase().includes(query.toLowerCase())));
    }, [query, data]);

    const filteredData =
        limitSize === undefined
            ? rawfilteredData
            : limit(rawfilteredData, limitSize || 20);

    const harData = filteredData.length > 0;
    const {focusRef} = useFocus();

    return (
        <>
            <div className="sokfilter">
                <Input
                    label={props.label}
                    placeholder={props.placeholder}
                    value={query}
                    inputClassName="sokfilter__input"
                    onChange={e => setQuery(e.target.value)}
                    inputRef={inputRef => (focusRef.current = inputRef)}
                />
            </div>
            <span className="text-hide" aria-live="polite" aria-atomic="true">
                {`Viser ${filteredData.length} treff`}
            </span>
            {harData
                ? children(filteredData)
                : <AlertStripe type="info" className="checkbox-filterform__alertstripe">
                    Ingen veiledere funnet
                </AlertStripe>
            }
        </>
    );
}

export default SokFilterNy;
