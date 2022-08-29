import React from 'react';
import {useSelector} from 'react-redux';
import '../../../style.css';
import {AppState} from '../../../reducer';
import SokFilterVeilederliste from './sok-filter-veilederliste';
import {CheckboxGroup, Checkbox} from '@navikt/ds-react';

interface SokVeiledereProps {
    handterVeiledereValgt: (veilederIdenter: string[]) => void;
    valgteVeiledere: string[];
}

function SokVeiledereVeiledergrupper({handterVeiledereValgt, valgteVeiledere}: SokVeiledereProps) {
    const veilederePaEnheten = useSelector((state: AppState) => state.veiledere.data.veilederListe);
    const sorterteVeilederePaEtterNavn = veilederePaEnheten.sort((a, b) =>
        a.etternavn && b.etternavn ? a.etternavn.localeCompare(b.etternavn) : 1
    );

    return (
        <SokFilterVeilederliste data={sorterteVeilederePaEtterNavn} label="Velg veiledere:" placeholder="Søk veileder">
            {liste => (
                <CheckboxGroup
                    className="checkbox-filterform__valg"
                    hideLegend
                    legend=""
                    onChange={handterVeiledereValgt}
                    value={valgteVeiledere}
                >
                    {liste.map((elem, index) => (
                        <Checkbox
                            data-testid={`veiledergruppe_modal_veileder-checkbox_${index}`}
                            key={elem.ident}
                            value={elem.ident}
                            size="small"
                        >{`${elem.etternavn}, ${elem.fornavn}`}</Checkbox>
                    ))}
                </CheckboxGroup>
            )}
        </SokFilterVeilederliste>
    );
}

export default SokVeiledereVeiledergrupper;
