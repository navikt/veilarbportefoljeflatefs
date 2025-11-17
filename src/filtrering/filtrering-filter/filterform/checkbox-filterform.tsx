import {NullstillKnapp} from '../../../components/nullstill-valg-knapp/nullstill-knapp';
import {FiltervalgModell} from '../../../typer/filtervalg-modell';
import {CheckboxFilterMap} from '../../filter-konstanter';
import './filterform.css';
import {CheckboxFilterformValg} from './checkbox-filterform-valg';
import {Alert} from '@navikt/ds-react';

export interface CheckboxFormConfig {
    form: string;
    checkboxValg: CheckboxFilterMap;
}

interface CheckboxFilterformProps {
    filterformOgValgListe: CheckboxFormConfig[];
    filtervalg: FiltervalgModell;
    endreFiltervalg: (form: string, filterVerdi: string[]) => void;
    dataTestId?: string;
    emptyCheckboxFilterFormMessage?: string;
    className?: string;
}

export function CheckboxFilterform({
    filterformOgValgListe,
    filtervalg,
    endreFiltervalg,
    dataTestId = 'checkbox-filterform',
    emptyCheckboxFilterFormMessage,
    className
}: CheckboxFilterformProps) {
    const nullstillAlle = () => {
        filterformOgValgListe.forEach(({form}) => endreFiltervalg(form, []));
    };

    const harMuligeValg = filterformOgValgListe.some(({checkboxValg}) => Object.keys(checkboxValg).length > 0);
    const harValgtMinstEnCheckbox = filterformOgValgListe.some(
        ({form}) => filtervalg[form] && filtervalg[form].length > 0
    );

    return (
        <form className="skjema checkbox-filterform" data-testid={dataTestId}>
            {harMuligeValg && (
                <>
                    <div className="checkbox-filterform__valg">
                        {filterformOgValgListe.map(({form, checkboxValg}) => (
                            <CheckboxFilterformValg
                                key={form}
                                form={form}
                                checkboxValg={checkboxValg}
                                filtervalg={filtervalg}
                                endreFiltervalg={endreFiltervalg}
                                className={className}
                            />
                        ))}
                    </div>
                    <NullstillKnapp
                        dataTestId={dataTestId}
                        nullstillValg={nullstillAlle}
                        disabled={!harValgtMinstEnCheckbox}
                    />
                </>
            )}
            {!harMuligeValg && (
                <Alert variant="info" className="checkbox-filterform__alertstripe" size="small">
                    {emptyCheckboxFilterFormMessage ??
                        'Får ikke til å vise avhukingsbokser. Meld sak i Porten om problemet varer lenge.'}
                </Alert>
            )}
        </form>
    );
}
