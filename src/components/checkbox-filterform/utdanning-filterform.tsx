import * as React from 'react';
import {FiltervalgModell} from '../../model-interfaces';
import {utdanningBeståttSvar, utdanningGodkjentSvar} from '../../filtrering/filter-konstanter';
import DoubleCheckboxFilterform from './double-checkbox-filterform';

interface DoubleCheckboxFilterformProps {
    endreFilterValg: (form: string, filterVerdi: string[]) => void;
    closeDropdown?: () => void;
    filtervalg: FiltervalgModell;
}

function UtdanningFilterform({endreFilterValg, closeDropdown, filtervalg}: DoubleCheckboxFilterformProps) {
    return (
        <DoubleCheckboxFilterform
            valgCol1={utdanningGodkjentSvar}
            valgCol2={utdanningBeståttSvar}
            titleCol1={'Er utdanningen godkjent i Norge?'}
            titleCol2={'Er utdanningen bestått?'}
            filtervalg={filtervalg}
            closeDropdown={closeDropdown}
            formCol1="utdanningGodkjentSvar"
            formCol2="utdanningBestattSvar"
            endreFilterValg={endreFilterValg}
        />
    );
}

export default UtdanningFilterform;
