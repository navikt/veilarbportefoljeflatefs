import * as React from 'react';
import {useEffect, useState} from 'react';
import NullstillKnapp from '../../../components/nullstill-valg-knapp/nullstill-knapp';
import {FiltervalgModell} from '../../../model-interfaces';
import {hendelserLabels, ulesteEndringer} from '../../filter-konstanter';
import './filterform.less';
import {kebabCase} from '../../../utils/utils';
import {OversiktType} from '../../../ducks/ui/listevisning';
import {OrNothing} from '../../../utils/types/types';
import {Checkbox, CheckboxGroup, HelpText, Label, Radio, RadioGroup} from '@navikt/ds-react';

interface HendelserFilterformProps {
    form: string;
    endreFiltervalg: (form: string, filterVerdi: string[]) => void;
    endreCheckboxFiltervalg: (form: string, filterVerdi: OrNothing<string>) => void;
    filtervalg: FiltervalgModell;
    oversiktType: OversiktType;
}

export function HendelserFilterform({
    form,
    filtervalg,
    endreFiltervalg,
    endreCheckboxFiltervalg,
    oversiktType
}: HendelserFilterformProps) {
    const [hendelserValg, setHendelserValg] = useState<string[]>(filtervalg[form]);
    const [checkboxValg, setCheckboxValg] = useState<string | null>(null);

    const nullstillValg = () => {
        endreFiltervalg(form, []);
        endreCheckboxFiltervalg('ulesteEndringer', null);
    };

    useEffect(() => {
        setHendelserValg(filtervalg[form]);
    }, [filtervalg, form]);

    useEffect(() => {
        setCheckboxValg(filtervalg['ulesteEndringer']);
    }, [filtervalg]);

    const onRadioChange = e => {
        e.persist();
        endreFiltervalg(form, [e.target.value]);
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
                        <CheckboxGroup legend="" hideLegend className={kebabCase(ulesteEndringer.ULESTE_ENDRINGER)}>
                            <Checkbox
                                id={kebabCase(ulesteEndringer.ULESTE_ENDRINGER)}
                                type="checkbox"
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
                            Filteret viser brukere som har endret målet, lagt til, fullført
                            <br />
                            eller avbrutt en aktivitet siden du sist var inne på aktivitetsplanen.
                        </HelpText>
                    </div>
                )}

                <RadioGroup legend="" hideLegend className="hendelser-filterform__radio-gruppe" id="lagtTilAvBruker">
                    <Label className="hendelser-filterform__radio-gruppe__label">
                        Siste aktivitet lagt til av bruker
                    </Label>
                    {lagtTilAvBruker.map(key => (
                        <>
                            {console.log(hendelserValg)}
                            <Radio
                                onChange={e => onRadioChange(e)}
                                name="sisteEndringKategori"
                                value={key}
                                checked={hendelserValg.includes(key)}
                                key={key}
                                data-testid={`lagtTilAvBruker_${kebabCase(hendelserLabels[key])}`}
                            >
                                {hendelserLabels[key]}
                            </Radio>
                        </>
                    ))}

                    <Label className="hendelser-filterform__radio-gruppe__label">
                        Siste aktivitet fullført av bruker
                    </Label>
                    {fullfortAvBruker.map(key => (
                        <Radio
                            onChange={e => onRadioChange(e)}
                            name="sisteEndringKategori"
                            value={key}
                            checked={hendelserValg.includes(key)}
                            key={key}
                            data-testid={`fullfortAvBruker_${kebabCase(hendelserLabels[key])}`}
                        >
                            {hendelserLabels[key]}
                        </Radio>
                    ))}

                    <Label className="hendelser-filterform__radio-gruppe__label">
                        Siste aktivitet avbrutt av bruker
                    </Label>
                    {avbruttAvBruker.map(key => (
                        <Radio
                            onChange={e => onRadioChange(e)}
                            name="sisteEndringKategori"
                            value={key}
                            checked={hendelserValg.includes(key)}
                            key={key}
                            data-testid={`avbruttAvBruker_${kebabCase(hendelserLabels[key])}`}
                        >
                            {hendelserLabels[key]}
                        </Radio>
                    ))}

                    <Label className="hendelser-filterform__radio-gruppe__label">Andre</Label>
                    <Radio
                        onChange={e => onRadioChange(e)}
                        name="sisteEndringKategori"
                        value={'MAL'}
                        checked={hendelserValg.includes('MAL')}
                        key={'MAL'}
                        data-testid={`andreMuligheter_${kebabCase(hendelserLabels['MAL'])}`}
                    >
                        {hendelserLabels['MAL']}
                    </Radio>
                </RadioGroup>
            </div>
            <NullstillKnapp
                dataTestId="hendelser-filterform"
                nullstillValg={nullstillValg}
                form={form}
                disabled={hendelserValg.length <= 0 && checkboxValg !== null}
            />
        </form>
    );
}
