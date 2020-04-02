import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { tildelVeileder } from '../../ducks/portefolje';
import { VeilederModell } from '../../model-interfaces';
import { AppState } from '../../reducer';
import SokFilterNy from './sok-filter-ny';
import { useState } from 'react';
import { Radio } from 'nav-frontend-skjema';
import classNames from 'classnames';
import './toolbar.less';

interface TildelVeilederProps {
    filtergruppe?: string;
    gjeldendeVeileder?: string;
}

function TildelVeileder({filtergruppe, gjeldendeVeileder}: TildelVeilederProps) {
    const [ident, setIdent] = useState<string | null>(null);
    const brukere = useSelector((state: AppState) => state.portefolje.data.brukere);
    const veiledere = useSelector((state: AppState) => state.veiledere.data.veilederListe);
    const dispatch = useDispatch();

    const sorterVeiledere = veiledere.sort((a, b) => a.etternavn && b.etternavn ? a.etternavn.localeCompare(b.etternavn) : 1);

    const doTildelTilVeileder = (tilordninger, tilVeileder) => {
        return dispatch(tildelVeileder(tilordninger, tilVeileder, filtergruppe, gjeldendeVeileder));
    };

    const valgteBrukere = brukere.filter((bruker) => bruker.markert === true);

    const onSubmit = () => {
        if (ident) {
            const tilordninger = valgteBrukere
                .map((bruker) => ({
                    fraVeilederId: bruker.veilederId,
                    tilVeilederId: ident,
                    brukerFnr: bruker.fnr
                }));

            doTildelTilVeileder(tilordninger, ident);
        }
    };

    return (
        <SokFilterNy
            placeholder="Søk navn eller NAV-ident"
            data={sorterVeiledere}
        >
            {data =>
                <>
                    <TildelVeilederRenderer
                        ident={ident}
                        onChange={setIdent}
                        data={data}
                        onSubmit={() => onSubmit()}
                    />
                    <div className={classNames('checkbox-filterform__under-valg', 'blokk-xxs')}>
                        <button onClick={() => onSubmit()}
                                className={classNames('knapp', 'knapp--mini', {'knapp--hoved': ident})}>
                            {ident ? 'Velg' : 'Lukk'}
                        </button>
                    </div>
                </>
            }
        </SokFilterNy>

    );
}

interface TildelVeilederRendererProps {
    onSubmit: () => void;
    data: VeilederModell[];
    ident: string | null;
    onChange: (ident: string) => void;
}

function TildelVeilederRenderer({data, onSubmit, ident, onChange}: TildelVeilederRendererProps) {
    return (
        <form className="skjema radio-filterform" onSubmit={onSubmit}>
            <div className="radio-filterform__valg">
                {data.map(veileder =>
                    <Radio
                        name="veileder"
                        key={veileder.ident}
                        label={`${veileder.etternavn}, ${veileder.fornavn}`}
                        value={veileder.ident}
                        checked={ident ? ident === veileder.ident : false}
                        onChange={e => onChange(e.target.value)}
                    />
                )}
            </div>
        </form>
    );
}

export default TildelVeileder;
