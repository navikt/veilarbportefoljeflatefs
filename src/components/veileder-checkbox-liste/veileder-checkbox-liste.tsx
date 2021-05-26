import * as React from 'react';
import {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import AlertStripe from 'nav-frontend-alertstriper';
import {Checkbox} from 'nav-frontend-skjema';
import {VeiledereState} from '../../ducks/veiledere';
import {FiltervalgModell, VeilederModell} from '../../model-interfaces';
import './veileder-checkbox-liste.less';
import {AppState} from '../../reducer';
import NullstillValgKnapp from '../nullstill-valg-knapp/nullstill-valg-knapp';

interface VeilederCheckboxListeProps {
    endreFiltervalg: (filterId: string, filterVerdi: any) => void;
}

function VeilederCheckboxListe({endreFiltervalg}: VeilederCheckboxListeProps) {
    const filtervalg: FiltervalgModell = useSelector((state: AppState) => state.filtreringVeilederoversikt);
    const veiledere: VeiledereState = useSelector((state: AppState) => state.veiledere); //SAMME SOM VALG
    const veilederNavnQuery = useSelector((state: AppState) => state.filtreringVeilederoversikt.veilederNavnQuery);
    const [valgteElementer, setValgteElementer] = useState<string[]>([]);
    const form = 'veiledere';

    useEffect(() => {
        setValgteElementer(filtervalg.veiledere);
    }, [filtervalg]);

    const erValgt = (ident: string | undefined): boolean => {
        return !!ident && !!valgteElementer.find(valgtElement => ident === valgtElement);
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
            valgteElem = [...valgteElementer, value];
            setValgteElementer(valgteElem);
        } else if (valueErValgt) {
            valgteElem = valgteElementer.filter(valgtElement => value !== valgtElement);
            setValgteElementer(valgteElem);
        }
        endreFiltervalg(form, valgteElem);
    };

    const nullstillValg = () => {
        endreFiltervalg(form, []);
    };

    const mapVeiledereToCheckboxList = (veiledere?: VeilederModell[]) => {
        if (!veiledere) {
            return null;
        }

        return veiledere
            .filter(vlg => vlg.ident && vlg.navn)
            .map((vlg, index) => {
                const identErValgt = erValgt(vlg.ident);
                return (
                    <Checkbox
                        key={vlg.ident}
                        label={vlg.navn}
                        checked={identErValgt}
                        onChange={e => handleCheckboxOnClick(e, vlg.ident)}
                        data-testid={`veilederoversikt_sok-veileder_veilederliste_element_${index}`}
                    />
                );
            });
    };

    const valgCheckboxListe = mapVeiledereToCheckboxList(getFiltrerteVeiledere());
    const harValg = valgCheckboxListe && valgCheckboxListe.length > 0;

    if (harValg) {
        return (
            <form className="checkbox-liste">
                <div className="checkbox-liste__valg" data-testid="veilederoversikt_sok-veileder_veilederliste">
                    {valgCheckboxListe}
                </div>
                {/*<div className="checkbox-liste__valg-footer">*/}
                <NullstillValgKnapp
                    dataTestId="veileder-checkbox-filterform"
                    nullstillValg={nullstillValg}
                    form={form}
                    disabled={valgteElementer.length <= 0}
                    className="veilederoversikt-nullstill-knapp"
                />
                {/*</div>*/}
            </form>
        );
    } else {
        return (
            <div className="checkbox-liste__valg-footer">
                <AlertStripe
                    type="info"
                    className="checkbox-filterform__alertstripe"
                    data-testid="veilederoversikt_alertstripe_info"
                >
                    Ingen veiledere funnet
                </AlertStripe>
            </div>
        );
    }
}

export default VeilederCheckboxListe;
