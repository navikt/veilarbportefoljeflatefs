import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { tildelVeileder } from '../../ducks/portefolje';
import { VeilederModell } from '../../model-interfaces';
import { AppState } from '../../reducer';
import DropdownNy from '../dropdown/dropdown-ny';
import SokFilterNy from './sok-filter-ny';
import { useState } from 'react';
import { Radio } from 'nav-frontend-skjema';
import classNames from 'classnames';

interface TildelVeilederProps {
    skalVises: boolean;
    filtergruppe?: string;
    gjeldendeVeileder?: VeilederModell;
}

function TildelVeileder({skalVises, filtergruppe, gjeldendeVeileder}: TildelVeilederProps) {
    const [ident, setIdent] = useState<string | null>(null);
    const brukere = useSelector((state: AppState) => state.portefolje.data.brukere);
    const veiledere = useSelector((state: AppState) => state.veiledere.data.veilederListe);
    const dispatch = useDispatch();

    const sorterVeiledere = veiledere.sort((a, b) => a.etternavn && b.etternavn ? a.etternavn.localeCompare(b.etternavn) : 1);

    const doTildelTilVeileder = (tilordninger, tilVeileder) => {
        return dispatch(tildelVeileder(tilordninger, tilVeileder, filtergruppe, gjeldendeVeileder));
    };

    if (!skalVises) {
        return null;
    }

    const valgteBrukere = brukere.filter((bruker) => bruker.markert === true);
    const aktiv = valgteBrukere.length > 0;

    const onSubmit = (lukkDropdown) => {
        if (ident) {
            const tilordninger = valgteBrukere
                .map((bruker) => ({
                    fraVeilederId: bruker.veilederId,
                    tilVeilederId: ident,
                    brukerFnr: bruker.fnr
                }));

            doTildelTilVeileder(tilordninger, ident);
        }
        lukkDropdown();
    };

    return (
        <DropdownNy
            name="Tildel veileder"
            className="dropdown--fixed dropdown--toolbar"
            disabled={!aktiv}
            render={lukkDropdown =>
                <SokFilterNy
                    label="Tildel veileder"
                    placeholder="Tildel veileder"
                    data={sorterVeiledere}
                >
                    {data =>
                        <>
                            <TildelVeilederRenderer
                                ident={ident}
                                onChange={setIdent}
                                data={data}
                                onSubmit={() => onSubmit(lukkDropdown)}
                            />
                            <div className="checkbox-filterform__under-valg">
                                <div
                                    className={classNames('checkbox-filterform__valg-knapp', 'knapperad', 'blokk-xxs')}
                                >
                                    <button onClick={() => onSubmit(lukkDropdown)}
                                            className={classNames('knapp', 'knapp--mini', {'knapp--hoved': ident})}>
                                        {ident ? 'Velg' : 'Lukk'}
                                    </button>
                                </div>
                            </div>
                        </>
                    }
                </SokFilterNy>
            }
        />
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
