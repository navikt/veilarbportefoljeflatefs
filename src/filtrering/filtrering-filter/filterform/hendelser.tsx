import {Normaltekst} from 'nav-frontend-typografi';
import {Collapsible} from '../../../components/collapsible/collapsible';
import {Radio} from 'nav-frontend-skjema';
import * as React from 'react';
import {useEffect, useState} from 'react';
import NullstillValgKnapp from '../../../components/nullstill-valg-knapp';
import {FiltervalgModell} from '../../../model-interfaces';

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

    const labels = {
        NY_STILLING: 'En jobb jeg vil søke på',
        NY_IJOBB: 'Jobb jeg har nå',
        NY_EGEN: 'Jobbrettet egenaktivitet',
        NY_BEHANDLING: 'Medisinsk behandling',
        FULLFORT_STILLING: 'En jobb jeg vil søke på',
        FULLFORT_IJOBB: 'Jobb jeg har nå',
        FULLFORT_EGEN: 'Jobbrettet egenaktivitet',
        FULLFORT_BEHANDLING: 'Medisinsk behandling',
        FULLFORT_SOKEAVTALE: 'Avtale om å søke jobber',
        AVBRUTT_STILLING: 'En jobb jeg vil søke på',
        AVBRUTT_IJOBB: 'Jobb jeg har nå',
        AVBRUTT_EGEN: 'Jobbrettet egenaktivitet',
        AVBRUTT_BEHANDLING: 'Medisinsk behandling',
        AVBRUTT_SOKEAVTALE: 'Avtale om å søke jobber'
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
                <Normaltekst className="hendelser__infotekst">Siste endring gjort av bruker</Normaltekst>

                <Collapsible titel="Siste aktivitet lagt til av bruker" apen={skalApen(lagtTilAvBruker)}>
                    {lagtTilAvBruker.map(key => (
                        <Radio
                            onChange={velgCheckBox}
                            label={labels[key]}
                            name="hendelser"
                            value={key}
                            checked={checkBoxValg.includes(key)}
                            key={key}
                        />
                    ))}
                </Collapsible>
                <Collapsible titel="Siste aktivitet fullført av bruker" apen={skalApen(fullfortAvBruker)}>
                    {fullfortAvBruker.map(key => (
                        <Radio
                            onChange={velgCheckBox}
                            label={labels[key]}
                            name="hendelser"
                            value={key}
                            checked={checkBoxValg.includes(key)}
                            key={key}
                        />
                    ))}
                </Collapsible>
                <Collapsible titel="Siste aktivitet avbrutt av bruker" apen={skalApen(avbruttAvBruker)}>
                    {avbruttAvBruker.map(key => (
                        <Radio
                            onChange={velgCheckBox}
                            label={labels[key]}
                            name="hendelser"
                            value={key}
                            checked={checkBoxValg.includes(key)}
                            key={key}
                        />
                    ))}
                </Collapsible>
                <Radio
                    onChange={velgCheckBox}
                    label="Endring i mål"
                    name="hendelser"
                    value="MAL"
                    checked={checkBoxValg.includes('MAL')}
                    key="MAL"
                />
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
