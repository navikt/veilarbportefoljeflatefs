import {NullstillKnapp} from '../../../components/nullstill-valg-knapp/nullstill-knapp';
import {Filtervalg, FiltervalgModell} from '../../../typer/filtervalg-modell';
import {CheckboxFilterMap} from '../../filter-konstanter';
import './filterform.css';
import {CheckboxFilterformValg} from './checkbox-filterform-valg';
import {Alert} from '@navikt/ds-react';

export interface CheckboxFormConfig {
    form: Filtervalg;
    checkboxValg: CheckboxFilterMap;
}

interface CheckboxFilterformProps {
    filterformOgValgListe: CheckboxFormConfig[];
    filtervalgModell: FiltervalgModell;
    endreFiltervalg: (form: string, filterVerdi: string[]) => void;
    dataTestId?: string;
    emptyCheckboxFilterFormMessage?: string;
    className?: string;
}

export function CheckboxFilterform({
    filterformOgValgListe,
    filtervalgModell,
    endreFiltervalg,
    dataTestId = 'checkbox-filterform',
    emptyCheckboxFilterFormMessage,
    className
}: CheckboxFilterformProps) {
    const nullstillAlle = () => {
        filterformOgValgListe.forEach(({form}) => endreFiltervalg(form, []));
    };

    const harValg = filterformOgValgListe.some(({checkboxValg}) => Object.keys(checkboxValg).length > 0);

    return (
        <form className="skjema checkbox-filterform" data-testid={dataTestId}>
            {harValg && (
                <>
                    {filterformOgValgListe.map(({form, checkboxValg}) => (
                        <CheckboxFilterformValg
                            key={form}
                            form={form}
                            valg={checkboxValg}
                            filtervalg={filtervalgModell}
                            endreFiltervalg={endreFiltervalg}
                            className={className}
                        />
                    ))}
                    <NullstillKnapp
                        dataTestId={dataTestId}
                        nullstillValg={nullstillAlle}
                        form="combined"
                        disabled={!harValg}
                    />
                </>
            )}
            {!harValg && (
                <Alert variant="info" className="checkbox-filterform__alertstripe" size="small">
                    {emptyCheckboxFilterFormMessage ??
                        'Får ikke til å vise avhukingsbokser. Meld sak i Porten om problemet varer lenge.'}
                </Alert>
            )}
        </form>
    );
}
