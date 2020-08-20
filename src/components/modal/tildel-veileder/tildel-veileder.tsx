import * as React from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { tildelVeileder } from '../../../ducks/portefolje';
import { VeilederModell } from '../../../model-interfaces';
import { AppState } from '../../../reducer';
import { useState } from 'react';
import { Radio } from 'nav-frontend-skjema';
import '../../toolbar/toolbar.less';
import { Knapp } from 'nav-frontend-knapper';
import SokFilterNy from '../../sok-veiledere/sok-filter-ny';
import classNames from 'classnames';
import { nameToStateSliceMap } from '../../../ducks/utils';

interface TildelVeilederProps {
    filtergruppe?: string;
    gjeldendeVeileder?: string;
    btnOnClick: () => void;
}

function TildelVeileder({filtergruppe, gjeldendeVeileder, btnOnClick}: TildelVeilederProps) {
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
        btnOnClick();
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
            placeholder="Tildel veileder"
            data={sorterVeiledere}
        >
            {data =>
                <TildelVeilederRenderer
                    ident={ident}
                    onChange={setIdent}
                    onSubmit={() => onSubmit()}
                    data={data}
                    btnOnClick={() => onSubmit()}
                />
            }
        </SokFilterNy>
    );
}

interface TildelVeilederRendererProps {
    onSubmit: () => void;
    data: VeilederModell[];
    ident: string | null;
    onChange: (ident: string) => void;
    btnOnClick: () => void;
}

function TildelVeilederRenderer({data, onSubmit, ident, onChange, btnOnClick}: TildelVeilederRendererProps) {
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
            <div className="blokk-xxs radio-filterform__under-valg">
                <Knapp
                    onClick={btnOnClick}
                    className={classNames('knapp', 'knapp--mini', {'knapp--hoved': ident})}
                    htmlType={ident ? 'submit' : 'button'}
                >
                    {ident ? 'Velg' : 'Lukk'}
                </Knapp>
            </div>
        </form>
    );
}

const mapStateToProps = (state, ownProps) => {
    const stateSlice = nameToStateSliceMap[ownProps.filtergruppe] || 'filtrering';
    return ({
        filtervalg: state[stateSlice],
    });
};

export default connect(mapStateToProps)(TildelVeileder);
