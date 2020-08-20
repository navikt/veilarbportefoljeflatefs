import { Checkbox } from 'nav-frontend-skjema';
import React from 'react';
import { useSelector } from 'react-redux';
import { AppState } from '../../reducer';
import '../checkbox-filterform/checkbox-filterform.less';
import '../../ny_style.less';
import SokFilterNy from './sok-filter-ny';
import classNames from 'classnames';

interface SokVeiledereProps {
    erValgt: (ident: string) => boolean;
    hanterVeilederValgt: (erValgt: boolean, veilederIdent: string) => void;
    btnOnClick: () => void;
    harValg: boolean;
}

function SokVeiledere(props: SokVeiledereProps) {
    const veilederePaEnheten = useSelector((state: AppState) => state.veiledere.data.veilederListe);
    const sorterteVeilederePaEtterNavn = veilederePaEnheten.sort((a, b) => a.etternavn && b.etternavn ? a.etternavn.localeCompare(b.etternavn) : 1);

    return (
        <SokFilterNy
            placeholder="Søk veileder"
            data={sorterteVeilederePaEtterNavn}
        >
            {liste =>
                <div className="checkbox-filterform">
                    <div className="checkbox-filterform__valg">
                        {liste.map(elem =>
                            <Checkbox
                                key={elem.ident}
                                label={`${elem.etternavn}, ${elem.fornavn}`}
                                value={elem.ident}
                                checked={props.erValgt(elem.ident)}
                                onChange={e => props.hanterVeilederValgt(e.target.checked, e.target.value)}
                            />)}
                    </div>
                    <div className="blokk-xxs checkbox-filterform__under-valg">
                        <button
                            onClick={props.btnOnClick}
                            className={classNames('knapp', 'knapp--mini', {'knapp--hoved': props.harValg})}
                        >
                            {props.harValg ? 'Velg' : 'Lukk'}
                        </button>
                    </div>
                </div>
            }
        </SokFilterNy>
    );
}

export default SokVeiledere;
