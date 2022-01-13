import React from 'react';
import {useSelector} from 'react-redux';
import {AppState} from '../../reducer';
import '../../filtrering/filtrering-filter/filterform/filterform.less';
import '../../style.less';
import SokFilter from './sok-filter';
import classNames from 'classnames';
import {Button, Checkbox, CheckboxGroup} from '@navikt/ds-react';

interface SokVeiledereProps {
    erValgt: (ident: string) => boolean;
    hanterVeilederValgt: (erValgt: boolean, veilederIdent: string) => void;
    btnOnClick: () => void;
    harValg: boolean;
}

function SokVeiledere(props: SokVeiledereProps) {
    const veilederePaEnheten = useSelector((state: AppState) => state.veiledere.data.veilederListe);
    const sorterteVeilederePaEtterNavn = veilederePaEnheten.sort((a, b) =>
        a.etternavn && b.etternavn ? a.etternavn.localeCompare(b.etternavn) : 1
    );

    return (
        <SokFilter placeholder="Søk veileder" data={sorterteVeilederePaEtterNavn}>
            {liste => (
                <div className="checkbox-filterform">
                    <CheckboxGroup legend="" hideLegend className="checkbox-filterform__valg">
                        {liste.map((elem, index) => (
                            <Checkbox
                                key={elem.ident}
                                value={elem.ident}
                                checked={props.erValgt(elem.ident)}
                                onChange={e => props.hanterVeilederValgt(e.target.checked, e.target.value)}
                                data-testid={`sok-veileder_rad_${index}`}
                            >{`${elem.etternavn}, ${elem.fornavn}`}</Checkbox>
                        ))}
                    </CheckboxGroup>
                    <div className="blokk-xxs filterform__under-valg">
                        <Button
                            onClick={props.btnOnClick}
                            data-testid={props.harValg ? 'sok-veileder_velg-knapp' : 'sok-veileder_lukk-knapp'}
                        >
                            {props.harValg ? 'Velg' : 'Lukk'}
                        </Button>
                    </div>
                </div>
            )}
        </SokFilter>
    );
}

export default SokVeiledere;
