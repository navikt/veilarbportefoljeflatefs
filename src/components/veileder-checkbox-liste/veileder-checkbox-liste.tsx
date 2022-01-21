import * as React from 'react';
import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {VeiledereState} from '../../ducks/veiledere';
import {FiltervalgModell, VeilederModell} from '../../model-interfaces';
import './veileder-checkbox-liste.less';
import {AppState} from '../../reducer';
import NullstillKnapp from '../nullstill-valg-knapp/nullstill-knapp';
import {endreFiltervalg} from '../../ducks/filtrering';
import {OversiktType} from '../../ducks/ui/listevisning';
import {Alert, Checkbox, CheckboxGroup} from '@navikt/ds-react';

interface VeilederCheckboxListeProps {
    nullstillInputfelt: () => void;
}

function VeilederCheckboxListe({nullstillInputfelt}: VeilederCheckboxListeProps) {
    const filtervalg: FiltervalgModell = useSelector((state: AppState) => state.filtreringVeilederoversikt);
    const veiledere: VeiledereState = useSelector((state: AppState) => state.veiledere); //SAMME SOM VALG
    const veilederNavnQuery = useSelector((state: AppState) => state.filtreringVeilederoversikt.veilederNavnQuery);
    const [valgteVeiledere, setValgteVeiledere] = useState<string[]>([]);
    const form = 'veiledere';
    const dispatch = useDispatch();

    useEffect(() => {
        setValgteVeiledere(filtervalg.veiledere);
    }, [filtervalg]);

    const erValgt = (ident: string | undefined): boolean => {
        return !!ident && !!valgteVeiledere.find(valgtElement => ident === valgtElement);
    };

    const getFiltrerteVeiledere = (): VeilederModell[] => {
        const query = veilederNavnQuery ? veilederNavnQuery.toLowerCase().trim() : '';

        return veiledere.data.veilederListe.filter(
            veileder =>
                veileder.navn?.toLowerCase().indexOf(query) >= 0 || veileder.ident?.toLowerCase().indexOf(query) >= 0
        );
    };

    const handleCheckboxOnClick = (e, value: string | undefined) => {
        e.persist();
        const valueErValgt = erValgt(value);
        let valgteElem;
        if (!valueErValgt) {
            valgteElem = [...valgteVeiledere, value];
            setValgteVeiledere(valgteElem);
        } else if (valueErValgt) {
            valgteElem = valgteVeiledere.filter(valgtElement => value !== valgtElement);
            setValgteVeiledere(valgteElem);
        }
        dispatch(endreFiltervalg(form, valgteElem, OversiktType.veilederOversikt));
    };

    const nullstillValg = () => {
        nullstillInputfelt();
        dispatch(endreFiltervalg(form, [], OversiktType.veilederOversikt));
    };

    const mapVeiledereToCheckboxList = (veiledere?: VeilederModell[]) => {
        if (!veiledere) {
            return null;
        }

        return veiledere
            .sort((a, b) => (a.etternavn && b.etternavn ? a.etternavn.localeCompare(b.etternavn) : 1))
            .filter(veileder => veileder.ident && veileder.navn)
            .map((veileder, index) => {
                const identErValgt = erValgt(veileder.ident);
                return (
                    <Checkbox
                        key={veileder.ident}
                        value={veileder.navn}
                        checked={identErValgt}
                        onChange={e => handleCheckboxOnClick(e, veileder.ident)}
                        data-testid={`veilederoversikt_sok-veileder_veilederliste_element_${index}`}
                    >
                        {veileder.navn}{' '}
                    </Checkbox>
                );
            });
    };

    const valgCheckboxListe = mapVeiledereToCheckboxList(getFiltrerteVeiledere());
    const harValg = valgCheckboxListe && valgCheckboxListe.length > 0;

    if (harValg) {
        return (
            <form className="checkbox-liste">
                <CheckboxGroup
                    legend=""
                    hideLegend
                    className="checkbox-liste__valg"
                    data-testid="veilederoversikt_sok-veileder_veilederliste"
                >
                    {valgCheckboxListe}
                </CheckboxGroup>
                <NullstillKnapp
                    dataTestId="veileder-checkbox-filterform"
                    nullstillValg={nullstillValg}
                    form={form}
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
            >
                Ingen veiledere funnet
            </Alert>
        );
    }
}

export default VeilederCheckboxListe;
