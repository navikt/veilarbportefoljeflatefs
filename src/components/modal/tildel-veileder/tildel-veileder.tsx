import * as React from 'react';
import {useState} from 'react';
import {connect, useDispatch, useSelector} from 'react-redux';
import {tildelVeileder} from '../../../ducks/portefolje';
import {VeilederModell} from '../../../model-interfaces';
import {AppState} from '../../../reducer';
import {Radio} from 'nav-frontend-skjema';
import '../../toolbar/toolbar.less';
import {Knapp} from 'nav-frontend-knapper';
import SokFilter from '../../sok-veiledere/sok-filter';
import classNames from 'classnames';
import {nameToStateSliceMap} from '../../../ducks/utils';
import {useSelectGjeldendeVeileder} from '../../../hooks/portefolje/use-select-gjeldende-veileder';

interface TildelVeilederProps {
    oversiktType?: string;
    btnOnClick: () => void;
}

function TildelVeileder({oversiktType, btnOnClick}: TildelVeilederProps) {
    const [ident, setIdent] = useState<string | null>(null);
    const brukere = useSelector((state: AppState) => state.portefolje.data.brukere);
    const veiledere = useSelector((state: AppState) => state.veiledere.data.veilederListe);
    const dispatch = useDispatch();
    const sorterVeiledere = veiledere.sort((a, b) =>
        a.etternavn && b.etternavn ? a.etternavn.localeCompare(b.etternavn) : 1
    );
    const gjeldendeVeileder = useSelectGjeldendeVeileder();

    const doTildelTilVeileder = (tilordninger, tilVeileder) => {
        return dispatch(tildelVeileder(tilordninger, tilVeileder, oversiktType, gjeldendeVeileder));
    };

    const valgteBrukere = brukere.filter(bruker => bruker.markert === true);

    const onSubmit = () => {
        btnOnClick();
        if (ident) {
            const tilordninger = valgteBrukere.map(bruker => ({
                fraVeilederId: bruker.veilederId,
                tilVeilederId: ident,
                brukerFnr: bruker.fnr
            }));
            doTildelTilVeileder(tilordninger, ident);
        }
    };

    return (
        <SokFilter placeholder="Tildel veileder" data={sorterVeiledere}>
            {data => (
                <TildelVeilederRenderer
                    ident={ident}
                    onChange={setIdent}
                    onSubmit={() => onSubmit()}
                    data={data}
                    btnOnClick={() => onSubmit()}
                />
            )}
        </SokFilter>
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
        <form className="skjema radio-filterform" onSubmit={onSubmit} data-testid="tildel-veileder_dropdown">
            <div className="radio-filterform__valg">
                {data.map((veileder, index) => (
                    <Radio
                        name="veileder"
                        key={veileder.ident}
                        label={`${veileder.etternavn}, ${veileder.fornavn}`}
                        value={veileder.ident}
                        checked={ident ? ident === veileder.ident : false}
                        onChange={e => onChange(e.target.value)}
                        data-testid={`tildel-veileder_valg_${index}`}
                    />
                ))}
            </div>
            <div className="blokk-xxs filterform__under-valg">
                <Knapp
                    onClick={btnOnClick}
                    className={classNames('knapp', 'knapp--mini', {
                        'knapp--hoved': ident
                    })}
                    htmlType={ident ? 'submit' : 'button'}
                    data-testid={ident ? 'tildel-veileder_velg-knapp' : 'tildel-veileder_lukk-knapp'}
                >
                    {ident ? 'Velg' : 'Lukk'}
                </Knapp>
            </div>
        </form>
    );
}

const mapStateToProps = (state, ownProps) => {
    const stateSlice = nameToStateSliceMap[ownProps.oversiktType];
    return {
        filtervalg: state[stateSlice]
    };
};

export default connect(mapStateToProps)(TildelVeileder);
