import {Button, Checkbox, CheckboxGroup} from '@navikt/ds-react';
import {useSelector} from 'react-redux';
import {AppState} from '../../reducer';
import {SokFilter} from './sok-filter';
import '../../style.css';
import '../../filtrering/filtrering-filter/filterform/filterform.css';

interface SokVeiledereProps {
    handterVeiledereValgt: (veilederIdenter: string[]) => void;
    btnOnClick: () => void;
    harValg: boolean;
    valgteVeiledere: string[];
}

export function SokVeiledere({handterVeiledereValgt, btnOnClick, harValg, valgteVeiledere}: SokVeiledereProps) {
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
                        onChange={handterVeiledereValgt}
                        value={valgteVeiledere}
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
                            size="small"
                            onClick={btnOnClick}
                            data-testid={harValg ? 'sok-veileder_velg-knapp' : 'sok-veileder_lukk-knapp'}
                        >
                            {harValg ? 'Velg' : 'Lukk'}
                        </Button>
                    </div>
                </div>
            )}
        </SokFilter>
    );
}
