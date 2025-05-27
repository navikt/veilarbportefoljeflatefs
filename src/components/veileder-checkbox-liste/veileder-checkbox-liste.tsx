import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Alert, Checkbox, CheckboxGroup} from '@navikt/ds-react';
import {VeiledereState} from '../../ducks/veiledere';
import {VeilederModell} from '../../typer/enhet-og-veiledere-modeller';
import {FiltervalgModell} from '../../typer/filtervalg-modell';
import {AppState} from '../../reducer';
import {NullstillKnapp} from '../nullstill-valg-knapp/nullstill-knapp';
import {endreFiltervalg} from '../../ducks/filtrering';
import {oppdaterKolonneAlternativer, OversiktType} from '../../ducks/ui/listevisning';
import './veileder-checkbox-liste.css';

interface VeilederCheckboxListeProps {
    nullstillInputfelt: () => void;
}

export function VeilederCheckboxListe({nullstillInputfelt}: VeilederCheckboxListeProps) {
    const filtervalg: FiltervalgModell = useSelector((state: AppState) => state.filtreringVeilederoversikt);
    const veiledere: VeiledereState = useSelector((state: AppState) => state.veiledere); //SAMME SOM VALG
    const veilederNavnQuery = useSelector((state: AppState) => state.filtreringVeilederoversikt.veilederNavnQuery);
    const [valgteVeiledere, setValgteVeiledere] = useState<string[]>([]);
    const formNavn = 'veiledere';
    const dispatch = useDispatch();

    useEffect(() => {
        setValgteVeiledere(filtervalg.veiledere);
    }, [filtervalg]);

    const getFiltrerteVeiledere = (): VeilederModell[] => {
        const query = veilederNavnQuery ? veilederNavnQuery.toLowerCase().trim() : '';

        return veiledere.data.veilederListe
            .filter(
                veileder =>
                    veileder.navn?.toLowerCase().indexOf(query) >= 0 ||
                    veileder.ident?.toLowerCase().indexOf(query) >= 0
            )
            .filter(veileder => veileder.ident && veileder.navn);
    };

    const handterValgteVeiledere = (valgteVeiledere: string[]) => {
        setValgteVeiledere(valgteVeiledere);
        dispatch(endreFiltervalg(formNavn, valgteVeiledere, OversiktType.veilederOversikt));
        oppdaterKolonneAlternativer(
            dispatch,
            {...filtervalg, [formNavn]: valgteVeiledere},
            OversiktType.veilederOversikt
        );
    };

    const nullstillValg = () => {
        nullstillInputfelt();
        dispatch(endreFiltervalg(formNavn, [], OversiktType.veilederOversikt));
        oppdaterKolonneAlternativer(dispatch, {...filtervalg, [formNavn]: []}, OversiktType.veilederOversikt);
    };

    const mapToCheckboxList = (veiledere?: VeilederModell[]) => {
        if (!veiledere) {
            return null;
        }

        return veiledere
            .sort((a, b) => (a.etternavn && b.etternavn ? a.etternavn.localeCompare(b.etternavn) : 1))
            .map((veileder, index) => {
                return (
                    <Checkbox
                        data-testid={`veilederoversikt_sok-veileder_veilederliste_element_${index}`}
                        key={veileder.ident}
                        size="small"
                        value={veileder.ident}
                    >
                        {veileder.navn}
                    </Checkbox>
                );
            });
    };

    const valgCheckboxListe = mapToCheckboxList(getFiltrerteVeiledere());
    const harValg = valgCheckboxListe && valgCheckboxListe.length > 0;

    if (harValg) {
        return (
            <form className="checkbox-liste">
                <CheckboxGroup
                    className="checkbox-liste__valg"
                    data-testid="veilederoversikt_sok-veileder_veilederliste"
                    hideLegend
                    legend=""
                    onChange={handterValgteVeiledere}
                    value={valgteVeiledere}
                >
                    {valgCheckboxListe}
                </CheckboxGroup>
                <NullstillKnapp
                    dataTestId="veileder-checkbox-filterform"
                    nullstillValg={nullstillValg}
                    form={formNavn}
                    disabled={valgteVeiledere.length <= 0}
                    className="veilederoversikt-nullstill-knapp"
                />
            </form>
        );
    } else {
        return (
            <Alert
                variant="info"
                className="checkbox-filterform__alertstripe"
                data-testid="veilederoversikt_alertstripe_info"
                size="small"
            >
                Ingen veiledere funnet
            </Alert>
        );
    }
}
