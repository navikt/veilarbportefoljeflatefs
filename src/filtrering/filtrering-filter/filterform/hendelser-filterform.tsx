import {Label, Radio} from 'nav-frontend-skjema';
import * as React from 'react';
import NullstillValgKnapp from '../../../components/nullstill-valg-knapp/nullstill-valg-knapp';
import {FiltervalgModell} from '../../../model-interfaces';
import {hendelserLabels} from '../../filter-konstanter';
import './filterform.less';
import {useEffect, useState} from 'react';
import {kebabCase} from '../../../utils/utils';

interface HendelserFilterformProps {
    form: string;
    endreFiltervalg: (form: string, filterVerdi: string[]) => void;
    filtervalg: FiltervalgModell;
}

export function HendelserFilterform({form, filtervalg, endreFiltervalg}: HendelserFilterformProps) {
    const [hendelserValg, setHendelserValg] = useState<string[]>(filtervalg[form]);

    const nullstillValg = () => {
        endreFiltervalg(form, []);
    };

    useEffect(() => {
        setHendelserValg(filtervalg[form]);
    }, [filtervalg, form]);

    const onChange = e => {
        e.persist();
        endreFiltervalg(form, [e.target.value]);
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
        <form className="skjema hendelser-filterform">
            <div className="hendelser-filterform__valg">
                <Label htmlFor="lagtTilAvBruker">Siste aktivitet lagt til av bruker</Label>
                <div className="hendelser-filterform__radio-gruppe" id="lagtTilAvBruker">
                    {lagtTilAvBruker.map(key => (
                        <Radio
                            onChange={e => onChange(e)}
                            label={hendelserLabels[key]}
                            name="sisteEndringKategori"
                            value={key}
                            checked={hendelserValg.includes(key)}
                            key={key}
                            data-testid={`lagtTilAvBruker_${kebabCase(hendelserLabels[key])}`}
                        />
                    ))}
                </div>

                <Label htmlFor="fullfortAvBruker">Siste aktivitet fullført av bruker</Label>
                <div className="hendelser-filterform__radio-gruppe" id="fullfortAvBruker">
                    {fullfortAvBruker.map(key => (
                        <Radio
                            onChange={e => onChange(e)}
                            label={hendelserLabels[key]}
                            name="sisteEndringKategori"
                            value={key}
                            checked={hendelserValg.includes(key)}
                            key={key}
                            data-testid={`fullfortAvBruker_${kebabCase(hendelserLabels[key])}`}
                        />
                    ))}
                </div>

                <Label htmlFor="avbruttAvBruker">Siste aktivitet avbrutt av bruker </Label>
                <div className="hendelser-filterform__radio-gruppe" id="avbruttAvBruker">
                    {avbruttAvBruker.map(key => (
                        <Radio
                            onChange={e => onChange(e)}
                            label={hendelserLabels[key]}
                            name="sisteEndringKategori"
                            value={key}
                            checked={hendelserValg.includes(key)}
                            key={key}
                            data-testid={`avbruttAvBruker_${kebabCase(hendelserLabels[key])}`}
                        />
                    ))}
                </div>
            </div>
            <NullstillValgKnapp
                dataTestId="hendelser-filterform"
                nullstillValg={nullstillValg}
                form={form}
                disabled={hendelserValg.length <= 0}
            />
        </form>
    );
}
