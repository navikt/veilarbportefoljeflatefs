import React, {useEffect, useState} from 'react';
import {Dictionary} from '../../../utils/types/types';
import {FiltervalgModell} from '../../../model-interfaces';
import Grid from '../../../components/grid/grid';
import './filterform.css';
import classNames from 'classnames';
import NullstillKnapp from '../../../components/nullstill-valg-knapp/nullstill-knapp';
import {Alert, Checkbox, CheckboxGroup, Tooltip} from '@navikt/ds-react';
import {CheckboxFilter, CheckboxFilterMap} from '../../filter-konstanter';

interface CheckboxFilterformProps {
    filterId: string;
    valg: CheckboxFilterMap;
    endreFiltervalg: (filterId: string, filterVerdi: string[]) => void;
    filtervalg: FiltervalgModell;
    gridColumns?: number;
    className?: string;
    emptyCheckboxFilterFormMessage?: string;
    tooltips?: Dictionary<string>;
}

function CheckboxFilterform({
    endreFiltervalg,
    valg,
    filterId,
    filtervalg,
    gridColumns = 1,
    className,
    emptyCheckboxFilterFormMessage,
    tooltips
}: CheckboxFilterformProps) {
    const harValg = Object.keys(valg).length > 0;
    const [checkBoxValg, setCheckBoxValg] = useState<string[]>(filtervalg[filterId]);

    useEffect(() => {
        setCheckBoxValg(filtervalg[filterId]);
    }, [filtervalg, filterId]);

    const nullstillValg = () => {
        endreFiltervalg(filterId, []);
    };

    const checkBoxKomponent = ([filterKey, filterValue]: [string, CheckboxFilter | string]) => {
        return typeof filterValue === 'string' ? (
            <Checkbox data-testid={`filter_${filterKey}`} value={filterKey}>
                {filterValue}
            </Checkbox>
        ) : (
            <Checkbox
                className={filterValue.className}
                data-testid={`filter_${filterKey}`}
                indeterminate={filterValue.indeterminate && filterValue.indeterminate()}
                value={filterKey}
            >
                {filterValue.label}
            </Checkbox>
        );
    };

    return (
        <form className="skjema checkbox-filterform" data-testid="checkbox-filterform">
            {harValg && (
                <div className={classNames('checkbox-filterform__valg', className)}>
                    <Grid columns={gridColumns}>
                        <CheckboxGroup
                            hideLegend
                            legend=""
                            onChange={(filtre: string[]) => endreFiltervalg(filterId, filtre)}
                            size="small"
                            value={checkBoxValg}
                        >
                            {Object.entries(valg).map(([filterKey, filterValue]: [string, CheckboxFilter | string]) => (
                                <div key={filterKey}>
                                    {tooltips && tooltips[filterKey] ? (
                                        <Tooltip
                                            content={tooltips[filterKey]}
                                            placement="right"
                                            offset={-130}
                                            maxChar={999}
                                        >
                                            {checkBoxKomponent([filterKey, filterValue])}
                                        </Tooltip>
                                    ) : (
                                        checkBoxKomponent([filterKey, filterValue])
                                    )}
                                </div>
                            ))}
                        </CheckboxGroup>
                    </Grid>
                </div>
            )}
            <NullstillKnapp
                dataTestId="checkbox-filterform"
                nullstillValg={nullstillValg}
                filterId={filterId}
                disabled={checkBoxValg?.length <= 0}
            />
            {!harValg && (
                <Alert variant="info" className="checkbox-filterform__alertstripe" size="small">
                    {emptyCheckboxFilterFormMessage || 'Ingen veiledere funnet'}
                </Alert>
            )}
        </form>
    );
}

export default CheckboxFilterform;
