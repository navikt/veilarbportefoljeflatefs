import React, {useEffect, useState} from 'react';
import AlertStripe from 'nav-frontend-alertstriper';
import './filterform.less';
import {Dictionary} from '../../../utils/types/types';
import {FiltervalgModell} from '../../../model-interfaces';
import VelgLukkKnapp from '../../../components/velg-lukk-knapp';
import NullstillValgKnapp from '../../../components/nullstill-valg-knapp/nullstill-valg-knapp';

interface CheckboxFilterformProps {
    form: string;
    valg: Dictionary<string>;
    endreFiltervalg: (form: string, filterVerdi: string[]) => void;
    closeDropdown: () => void;
    filtervalg: FiltervalgModell;
}

function GammelFodselsdatoFilterform({
    endreFiltervalg,
    valg,
    closeDropdown,
    form,
    filtervalg
}: CheckboxFilterformProps) {
    const harValg = Object.keys(valg).length > 0;
    const [checkBoxValg, setCheckBoxValg] = useState<string[]>(filtervalg[form]);

    const velgCheckBox = e => {
        e.persist();
        return e.target.checked
            ? setCheckBoxValg(prevState => [...prevState, e.target.value])
            : setCheckBoxValg(prevState => prevState.filter(value => value !== e.target.value));
    };

    useEffect(() => {
        setCheckBoxValg(filtervalg[form]);
    }, [filtervalg, form]);

    const nullstillValg = () => {
        endreFiltervalg(form, []);
    };

    return (
        <form
            className="skjema checkbox-filterform"
            onSubmit={e => {
                e.preventDefault();
                if (checkBoxValg.length > 0) {
                    endreFiltervalg(form, checkBoxValg);
                }
                closeDropdown();
            }}
        >
            {harValg && (
                <div className="checkbox-filterform__valg fodselsdato__grid">
                    <RenderFields valg={valg} velgCheckBox={velgCheckBox} checkBoxValg={checkBoxValg} />
                </div>
            )}
            <div className='filterform__gammel'>
                <VelgLukkKnapp harValg={checkBoxValg.length > 0} dataTestId="checkbox-filterform" />
                <NullstillValgKnapp
                    dataTestId="fodselsdato-filterform"
                    nullstillValg={nullstillValg}
                    form={form}
                    disabled={checkBoxValg.length <= 0}
                />
                {!harValg && (
                    <AlertStripe type="info" className="checkbox-filterform__alertstripe">
                        Ingen veiledere funnet
                    </AlertStripe>
                )}
            </div>
        </form>
    );
}

function RenderFields(props: {valg: Dictionary<string>; velgCheckBox: (e) => void; checkBoxValg: string[]}) {
    return (
        <>
            {Object.entries(props.valg).map(([filterKey, filterValue]) => (
                <div key={filterKey} className="fodselsdato__container">
                    <input
                        id={filterKey}
                        type="checkbox"
                        className="fodselsdato__checkboks"
                        value={filterKey}
                        checked={props.checkBoxValg.includes(filterKey)}
                        onChange={props.velgCheckBox}
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
        </>
    );
}

export default GammelFodselsdatoFilterform;
