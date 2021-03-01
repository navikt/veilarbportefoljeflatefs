import {Label, Radio} from 'nav-frontend-skjema';
import * as React from 'react';
import {useEffect, useState} from 'react';
import NullstillValgKnapp from '../../../components/nullstill-valg-knapp/nullstill-valg-knapp';
import {FiltervalgModell} from '../../../model-interfaces';
import {hendelserLabels, ulesteEndringer} from '../../filter-konstanter';
import './filterform.less';
import {kebabCase} from '../../../utils/utils';
import {useFeatureSelector} from '../../../hooks/redux/use-feature-selector';
import {HENDELSE_MEDISINSKBEHANDLING, ULESTE_ENDRINGER} from '../../../konstanter';
import Hjelpetekst from 'nav-frontend-hjelpetekst';
import {PopoverOrientering} from 'nav-frontend-popover';
import {OversiktType} from '../../../ducks/ui/listevisning';

interface HendelserFilterformProps {
    form: string;
    endreFiltervalg: (form: string, filterVerdi: string[]) => void;
    filtervalg: FiltervalgModell;
    oversiktType: OversiktType;
}

export function HendelserFilterform({form, filtervalg, endreFiltervalg, oversiktType}: HendelserFilterformProps) {
    const erMedisinskBehandlingFeatureTogglePa = useFeatureSelector()(HENDELSE_MEDISINSKBEHANDLING);
    const erUlesteEndringerFeatureTogglePa = useFeatureSelector()(ULESTE_ENDRINGER);

    const [hendelserValg, setHendelserValg] = useState<string[]>(filtervalg[form]);
    const [checkboxValg, setCheckboxValg] = useState<string[]>(filtervalg[form]);

    const ulestTittel = ulesteEndringer.ULESTE_ENDRINGER;

    const nullstillValg = () => {
        endreFiltervalg(form, []);
        endreFiltervalg('ulesteEndringer', []);
    };

    useEffect(() => {
        setHendelserValg(filtervalg[form]);
    }, [filtervalg, form]);

    useEffect(() => {
        setCheckboxValg(filtervalg['ulesteEndringer']);
    }, [filtervalg]);

    const onChange = e => {
        e.persist();
        endreFiltervalg(form, [e.target.value]);
    };

    const lagtTilAvBruker = erMedisinskBehandlingFeatureTogglePa
        ? ['NY_STILLING', 'NY_IJOBB', 'NY_EGEN', 'NY_BEHANDLING']
        : ['NY_STILLING', 'NY_IJOBB', 'NY_EGEN'];
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

    const velgCheckBox = e => {
        e.persist();
        return e.target.checked
            ? endreFiltervalg('ulesteEndringer', [...checkboxValg, e.target.value])
            : endreFiltervalg(
                  'ulesteEndringer',
                  checkboxValg.filter(value => value !== e.target.value)
              );
    };

    return (
        <form className="skjema hendelser-filterform">
            <div className="hendelser-filterform__valg">
                {erUlesteEndringerFeatureTogglePa && oversiktType === OversiktType.minOversikt ? (
                    <div className="hendelser-filterform__checkbox-gruppe">
                        <div className={kebabCase(ulestTittel)}>
                            <input
                                id={kebabCase(ulestTittel)}
                                type="checkbox"
                                className="skjemaelement__input checkboks"
                                value={ulestTittel}
                                checked={checkboxValg.includes(ulestTittel)}
                                onChange={velgCheckBox}
                                data-testid={`filter_${kebabCase(ulestTittel)}`}
                            />
                            <label htmlFor={kebabCase(ulestTittel)} className="skjemaelement__label">
                                {ulestTittel}
                            </label>
                        </div>
                        <Hjelpetekst
                            type={PopoverOrientering.Hoyre}
                            className={`hjelpetekst__${kebabCase(ulestTittel)}`}
                        >
                            Filteret viser brukere som har endret målet, lagt til, fullført
                            <br />
                            eller avbrutt en aktivitet siden du sist var inne på aktivitetsplanen.
                        </Hjelpetekst>
                    </div>
                ) : (
                    <></>
                )}

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

                <Label htmlFor="andreMuligheter">Andre </Label>
                <div className="hendelser-filterform__radio-gruppe" id="andreMuligheter">
                    <Radio
                        onChange={e => onChange(e)}
                        label={hendelserLabels['MAL']}
                        name="sisteEndringKategori"
                        value={'MAL'}
                        checked={hendelserValg.includes('MAL')}
                        key={'MAL'}
                        data-testid={`andreMuligheter_${kebabCase(hendelserLabels['MAL'])}`}
                    />
                </div>
            </div>
            <NullstillValgKnapp
                dataTestId="hendelser-filterform"
                nullstillValg={nullstillValg}
                form={form}
                disabled={hendelserValg.length <= 0 && checkboxValg.length <= 0}
            />
        </form>
    );
}
