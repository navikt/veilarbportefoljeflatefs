import * as React from 'react';
import {useEffect, useState} from 'react';
import NullstillKnapp from '../../../components/nullstill-valg-knapp/nullstill-knapp';
import {FilterId, FiltervalgModell} from '../../../model-interfaces';
import {hendelserLabels, ulesteEndringer} from '../../filter-konstanter';
import './filterform.css';
import {kebabCase} from '../../../utils/utils';
import {OversiktType} from '../../../ducks/ui/listevisning';
import {OrNothing} from '../../../utils/types/types';
import {HelpText, Checkbox, CheckboxGroup, Radio, RadioGroup} from '@navikt/ds-react';

interface HendelserFilterformProps {
    filterId: FilterId;
    endreFiltervalg: (filterId: FilterId, filterVerdi: string[]) => void;
    endreCheckboxFiltervalg: (filterId: FilterId, filterVerdi: OrNothing<string>) => void;
    filtervalg: FiltervalgModell;
    oversiktType: OversiktType;
}

export function HendelserFilterform({
    filterId,
    filtervalg,
    endreFiltervalg,
    endreCheckboxFiltervalg,
    oversiktType
}: HendelserFilterformProps) {
    const [hendelserValg, setHendelserValg] = useState<string | null>('');
    const [checkboxValg, setCheckboxValg] = useState<string | null>(null);

    const nullstillValg = () => {
        endreFiltervalg(filterId, []);
        endreCheckboxFiltervalg('ulesteEndringer', null);
    };

    useEffect(() => {
        if (filtervalg[filterId]) {
            setHendelserValg((filtervalg[filterId] as string[])[0]);
        } else {
            setHendelserValg('');
        }
    }, [filtervalg, hendelserValg, filterId]);

    useEffect(() => {
        setCheckboxValg(filtervalg['ulesteEndringer']);
    }, [filtervalg]);

    const onRadioChange = e => {
        e.persist();
        endreFiltervalg(filterId, [e.target.value]);
    };

    const onCheckboxChange = e => {
        e.persist();
        return e.target.checked
            ? endreCheckboxFiltervalg('ulesteEndringer', e.target.value)
            : endreCheckboxFiltervalg('ulesteEndringer', null);
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
                {oversiktType === OversiktType.minOversikt && (
                    <div className="hendelser-filterform__checkbox-gruppe">
                        <CheckboxGroup hideLegend legend="">
                            <Checkbox
                                id={kebabCase(ulesteEndringer.ULESTE_ENDRINGER)}
                                value="ULESTE_ENDRINGER"
                                checked={checkboxValg === 'ULESTE_ENDRINGER'}
                                onChange={e => onCheckboxChange(e)}
                                data-testid={`filter_${kebabCase(ulesteEndringer.ULESTE_ENDRINGER)}`}
                            >
                                {ulesteEndringer.ULESTE_ENDRINGER}
                            </Checkbox>
                        </CheckboxGroup>
                        <HelpText
                            strategy="fixed"
                            placement="right"
                            className={`hjelpetekst__${kebabCase(ulesteEndringer.ULESTE_ENDRINGER)}`}
                        >
                            Filteret viser brukere som har endret målet, lagt til, fullført eller avbrutt en aktivitet
                            siden du sist var inne på aktivitetsplanen.
                        </HelpText>
                    </div>
                )}

                <div className="hendelser-filterform__radio-gruppe" id="lagtTilAvBruker">
                    <RadioGroup legend="Siste aktivitet lagt til av bruker" value={hendelserValg ?? ''} size="small">
                        {lagtTilAvBruker.map(key => (
                            <Radio
                                onChange={e => onRadioChange(e)}
                                name="sisteEndringKategori"
                                value={key}
                                key={key}
                                data-testid={`lagtTilAvBruker_${kebabCase(hendelserLabels[key])}`}
                            >
                                {hendelserLabels[key]}
                            </Radio>
                        ))}
                    </RadioGroup>
                    <RadioGroup legend="Siste aktivitet fullført av bruker" value={hendelserValg ?? ''} size="small">
                        {fullfortAvBruker.map(key => (
                            <Radio
                                onChange={e => onRadioChange(e)}
                                name="sisteEndringKategori"
                                value={key}
                                key={key}
                                data-testid={`fullfortAvBruker_${kebabCase(hendelserLabels[key])}`}
                            >
                                {hendelserLabels[key]}
                            </Radio>
                        ))}
                    </RadioGroup>
                    <RadioGroup legend="Siste aktivitet avbrutt av bruker" value={hendelserValg ?? ''} size="small">
                        {avbruttAvBruker.map(key => (
                            <Radio
                                onChange={e => onRadioChange(e)}
                                name="sisteEndringKategori"
                                value={key}
                                key={key}
                                data-testid={`avbruttAvBruker_${kebabCase(hendelserLabels[key])}`}
                            >
                                {hendelserLabels[key]}
                            </Radio>
                        ))}
                    </RadioGroup>
                    <RadioGroup legend="Andre" value={hendelserValg ?? ''} size="small">
                        <Radio
                            onChange={e => onRadioChange(e)}
                            name="sisteEndringKategori"
                            value={'MAL'}
                            key={'MAL'}
                            data-testid={`andreMuligheter_${kebabCase(hendelserLabels['MAL'])}`}
                        >
                            {hendelserLabels['MAL']}
                        </Radio>
                    </RadioGroup>
                </div>
            </div>
            <NullstillKnapp
                dataTestId="hendelser-filterform"
                nullstillValg={nullstillValg}
                filterId={filterId}
                disabled={hendelserValg === undefined && checkboxValg === null}
            />
        </form>
    );
}
