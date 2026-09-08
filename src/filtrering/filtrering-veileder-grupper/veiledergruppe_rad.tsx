import {Radio} from '@navikt/ds-react';
import {RedigerKnapp} from '../../components/rediger-knapp/rediger-knapp';
import {endreFiltervalg} from '../../ducks/filtrering';
import {LagretFilter} from '../../ducks/lagret-filter';
import {oppdaterKolonneAlternativer, OversiktType} from '../../ducks/ui/valgte-kolonner';
import {markerValgtVeiledergruppe} from '../../ducks/lagret-filter-ui-state';
import {kebabCase} from '../../utils/utils';
import {Filtervalg, FiltervalgModell} from '../../typer/filtervalg-modell';
import {useAppDispatch} from '../../hooks/redux/use-app-dispatch';

interface VeiledergruppeRadProps {
    veilederGruppe: LagretFilter;
    onClickRedigerKnapp: () => void;
    oversiktType: OversiktType;
    erValgt: boolean;
    filtervalg: FiltervalgModell;
}

export function VeiledergruppeRad({
    veilederGruppe,
    onClickRedigerKnapp,
    oversiktType,
    erValgt,
    filtervalg
}: VeiledergruppeRadProps) {
    const dispatch = useAppDispatch();

    function velgGruppe() {
        dispatch(endreFiltervalg(Filtervalg.veiledere, veilederGruppe.filterValg.veiledere, oversiktType));
        dispatch(markerValgtVeiledergruppe(veilederGruppe, oversiktType));
        oppdaterKolonneAlternativer(
            dispatch,
            {...filtervalg, veiledere: veilederGruppe.filterValg.veiledere},
            oversiktType
        );
    }

    return (
        <div className="veileder-gruppe__rad" data-testid="veiledergruppe_rad-wrapper">
            <Radio
                data-testid={`veiledergruppe-rad_${kebabCase(veilederGruppe.filterNavn)}`}
                key={veilederGruppe.filterId}
                name="veiledergruppe"
                onChange={() => velgGruppe()}
                value={veilederGruppe.filterId}
            >
                {veilederGruppe.filterNavn}
            </Radio>
            {erValgt && (
                <RedigerKnapp
                    aria="Rediger veiledergruppe"
                    onClick={onClickRedigerKnapp}
                    dataTestid={`rediger-veiledergruppe_knapp_${kebabCase(veilederGruppe.filterNavn)}`}
                />
            )}
        </div>
    );
}
