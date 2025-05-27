import classNames from 'classnames';
import {Button, Radio, RadioGroup} from '@navikt/ds-react';
import {VeilederModell} from '../../../typer/enhet-og-veiledere-modeller';

interface TildelVeilederRendererProps {
    data: VeilederModell[];
    ident: string | null;
    onChange: (ident: string) => void;
    btnOnClick: () => void;
}

export function TildelVeilederRenderer({data, ident, onChange, btnOnClick}: TildelVeilederRendererProps) {
    return (
        <form className="skjema radio-filterform" data-testid="tildel-veileder_dropdown">
            <RadioGroup hideLegend legend="" className="radio-filterform__valg" onChange={onChange}>
                {data.map((veileder, index) => (
                    <Radio
                        data-testid={`tildel-veileder_valg_${index}`}
                        type={'button'}
                        key={veileder.ident}
                        name="veileder"
                        size="small"
                        value={veileder.ident}
                        className={'navds-radio'}
                    >{`${veileder.etternavn}, ${veileder.fornavn}`}</Radio>
                ))}
            </RadioGroup>
            <div className="filterform__under-valg">
                <Button
                    size="small"
                    onClick={btnOnClick}
                    className={classNames('knapp', 'knapp--mini', {
                        'knapp--hoved': ident
                    })}
                    type={'button'}
                    data-testid={ident ? 'tildel-veileder_velg-knapp' : 'tildel-veileder_lukk-knapp'}
                >
                    {ident ? 'Velg' : 'Lukk'}
                </Button>
            </div>
        </form>
    );
}
