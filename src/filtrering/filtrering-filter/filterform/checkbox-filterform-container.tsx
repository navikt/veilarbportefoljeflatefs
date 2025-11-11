import {NullstillKnapp} from '../../../components/nullstill-valg-knapp/nullstill-knapp';
import {FiltervalgModell} from '../../../typer/filtervalg-modell';
import {CheckboxFilterMap} from '../../filter-konstanter';
import './filterform.css';
import {CheckboxFilterform} from './checkbox-filterform';

export interface CheckboxContainerFormConfig {
    form: string;
    valg: CheckboxFilterMap;
    className?: string;
    emptyCheckboxFilterFormMessage?: string;
}

interface CheckboxFilterformContainerProps {
    grupper: CheckboxContainerFormConfig[];
    filtervalg: FiltervalgModell;
    endreFiltervalg: (form: string, filterVerdi: string[]) => void;
    dataTestId?: string;
}

export function CheckboxFilterformContainer({
    grupper,
    filtervalg,
    endreFiltervalg,
    dataTestId = 'checkbox-filterform'
}: CheckboxFilterformContainerProps) {
    const nullstillAlle = () => {
        grupper.forEach(({form}) => endreFiltervalg(form, []));
    };

    const harValg = grupper.some(({form}) => (filtervalg[form]?.length ?? 0) > 0);

    return (
        <form className="skjema checkbox-filterform" data-testid={dataTestId}>
            {grupper.map(({form, valg, className, emptyCheckboxFilterFormMessage}) => (
                <CheckboxFilterform
                    key={form}
                    form={form}
                    valg={valg}
                    filtervalg={filtervalg}
                    endreFiltervalg={endreFiltervalg}
                    className={className}
                    emptyCheckboxFilterFormMessage={emptyCheckboxFilterFormMessage}
                />
            ))}

            <NullstillKnapp dataTestId={dataTestId} nullstillValg={nullstillAlle} form="combined" disabled={!harValg} />
        </form>
    );
}
