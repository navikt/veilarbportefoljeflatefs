import {Collapsible} from '../../../components/collapsible/collapsible';
import {Radio} from 'nav-frontend-skjema';
import * as React from 'react';
import {useEffect, useState} from 'react';
import NullstillValgKnapp from '../../../components/nullstill-valg-knapp';
import {FiltervalgModell} from '../../../model-interfaces';
import {hendelserLabels} from '../../filter-konstanter';

interface HendelserFilterformProps {
    form: string;
    endreFiltervalg: (form: string, filterVerdi: string[]) => void;
    filtervalg: FiltervalgModell;
}

export function Hendelser({form, filtervalg, endreFiltervalg}: HendelserFilterformProps) {
    const [checkBoxValg, setCheckBoxValg] = useState<string[]>(filtervalg[form]);

    const nullstillValg = () => {
        endreFiltervalg(form, []);
    };

    useEffect(() => {
        setCheckBoxValg(filtervalg[form]);
    }, [filtervalg, form]);

    const velgCheckBox = e => {
        e.persist();
        endreFiltervalg(form, [e.target.value]);
    };

    const skalApen = (keys: string[]) => {
        return keys.filter(x => checkBoxValg.includes(x)).length > 0;
    };

    const lagtTilAvBruker = ['NY_STILLING', 'NY_IJOBB', 'NY_EGEN', 'NY_BEHANDLING'];
    const fullfortAvBruker = [
        'FULLFORT_STILLING',
        'FULLFORT_IJOBB',
        'FULLFORT_EGEN',
        'FULLFORT_BEHANDLING',
        'FULLFORT_SOKEAVTALE'
    ];
    const avbruttAvBruker = [
        'AVBRUTT_STILLING',
        'AVBRUTT_IJOBB',
        'AVBRUTT_EGEN',
        'AVBRUTT_BEHANDLING',
        'AVBRUTT_SOKEAVTALE'
    ];

    return (
        <form className="skjema checkbox-filterform">
            <div className="hendelser__content">
                <Collapsible tittel="Siste aktivitet lagt til av bruker" apen={skalApen(lagtTilAvBruker)}>
                    {lagtTilAvBruker.map(key => (
                        <Radio
                            onChange={velgCheckBox}
                            label={hendelserLabels[key]}
                            name="sisteEndringKategori"
                            value={key}
                            checked={checkBoxValg.includes(key)}
                            key={key}
                            tabIndex={1}
                        />
                    ))}
                </Collapsible>
                <Collapsible tittel="Siste aktivitet fullført av bruker" apen={skalApen(fullfortAvBruker)}>
                    {fullfortAvBruker.map(key => (
                        <Radio
                            onChange={velgCheckBox}
                            label={hendelserLabels[key]}
                            name="sisteEndringKategori"
                            value={key}
                            checked={checkBoxValg.includes(key)}
                            key={key}
                            tabIndex={1}
                        />
                    ))}
                </Collapsible>
                <Collapsible tittel="Siste aktivitet avbrutt av bruker" apen={skalApen(avbruttAvBruker)}>
                    {avbruttAvBruker.map(key => (
                        <Radio
                            onChange={velgCheckBox}
                            label={hendelserLabels[key]}
                            name="sisteEndringKategori"
                            value={key}
                            checked={checkBoxValg.includes(key)}
                            key={key}
                            tabIndex={1}
                        />
                    ))}
                </Collapsible>
                {/*<Radio
                    onChange={velgCheckBox}
                    label={hendelserLabels['MAL']}
                    name="sisteEndringKategori"
                    value="MAL"
                    checked={checkBoxValg.includes('MAL')}
                    key="MAL"
                />*/}
            </div>
            <div className={'filterform__under-valg'}>
                <NullstillValgKnapp
                    dataTestId="checkbox-filterform"
                    nullstillValg={nullstillValg}
                    form={form}
                    disabled={checkBoxValg.length <= 0}
                />
            </div>
        </form>
    );
}
