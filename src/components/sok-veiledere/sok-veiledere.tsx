import React from 'react';
import {useSelector} from 'react-redux';
import {AppState} from '../../reducer';
import '../../filtrering/filtrering-filter/filterform/filterform.css';
import '../../style.css';
import SokFilter from './sok-filter';
import {Button, Checkbox, CheckboxGroup} from '@navikt/ds-react';

interface SokVeiledereProps {
    handterVeiledereValgt: (veilederIdenter: string[]) => void;
    btnOnClick: () => void;
    harValg: boolean;
    valgteVeiledere: string[];
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
                    <CheckboxGroup
                        className="checkbox-filterform__valg"
                        hideLegend
                        legend=""
                        onChange={props.handterVeiledereValgt}
                        value={props.valgteVeiledere}
                    >
                        {liste.map((elem, index) => (
                            <Checkbox
                                data-testid={`sok-veileder_rad_${index}`}
                                key={elem.ident}
                                size="small"
                                value={elem.ident}
                            >{`${elem.etternavn}, ${elem.fornavn}`}</Checkbox>
                        ))}
                    </CheckboxGroup>
                    <div className=" filterform__under-valg">
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
