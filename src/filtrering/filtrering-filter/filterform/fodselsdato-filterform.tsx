import React, {useEffect, useState} from 'react';
import {Dictionary} from '../../../utils/types/types';
import {FiltervalgModell} from '../../../model-interfaces';
import './filterform.css';
import NullstillKnapp from '../../../components/nullstill-valg-knapp/nullstill-knapp';
import {Alert} from '@navikt/ds-react';

interface CheckboxFilterformProps {
    filterId: string;
    valg: Dictionary<string>;
    endreFiltervalg: (filterId: string, filterVerdi: string[]) => void;
    filtervalg: FiltervalgModell;
}

function FodselsdatoFilterform({endreFiltervalg, valg, filterId, filtervalg}: CheckboxFilterformProps) {
    const harValg = Object.keys(valg).length > 0;

    const [checkBoxValg, setCheckBoxValg] = useState<string[]>(filtervalg[filterId]);

    const velgCheckBox = e => {
        e.persist();
        return e.target.checked
            ? endreFiltervalg(filterId, [...checkBoxValg, e.target.value])
            : endreFiltervalg(
                  filterId,
                  checkBoxValg.filter(value => value !== e.target.value)
              );
    };

    useEffect(() => {
        setCheckBoxValg(filtervalg[filterId]);
    }, [filtervalg, filterId]);

    const nullstillValg = () => {
        endreFiltervalg(filterId, []);
    };

    return (
        <form className="skjema checkbox-filterform" data-testid="fodselsdato-filterform">
            {harValg && (
                <div className="fodselsdato__grid">
                    {Object.entries(valg).map(([filterKey, filterValue]) => (
                        <div key={filterKey} className="fodselsdato__container">
                            <input
                                id={filterKey}
                                type="checkbox"
                                className="fodselsdato__checkboks"
                                value={filterKey}
                                checked={checkBoxValg.includes(filterKey)}
                                onChange={velgCheckBox}
                                data-testid={`fodselsdato-filterform_dato-${filterValue}_input`}
                            />
                            <label
                                htmlFor={filterKey}
                                className="fodselsdato__label"
                                data-testid={`fodselsdato-filterform_dato-${filterValue}`}
                            >
                                {filterValue}
                            </label>
                        </div>
                    ))}
                </div>
            )}
            <NullstillKnapp
                dataTestId="fodselsdato-filterform"
                nullstillValg={nullstillValg}
                filterId={filterId}
                disabled={checkBoxValg.length <= 0}
            />
            {!harValg && (
                <Alert variant="info" className="checkbox-filterform__alertstripe" size="small">
                    Ingen veiledere funnet
                </Alert>
            )}
        </form>
    );
}
export default FodselsdatoFilterform;
