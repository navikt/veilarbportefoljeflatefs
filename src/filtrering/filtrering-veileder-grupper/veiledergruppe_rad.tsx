import {Radio} from 'nav-frontend-skjema';
import RedigerKnapp from '../../components/knapper/rediger-knapp';
import React from 'react';
import {endreFiltervalg} from '../../ducks/filtrering';
import {useDispatch, useSelector} from 'react-redux';
import {LagretFilter} from '../../ducks/lagret-filter';
import {OversiktType} from '../../ducks/ui/listevisning';
import {logEvent} from '../../utils/frontend-logger';
import {finnSideNavn} from '../../middleware/metrics-middleware';
import {AppState} from '../../reducer';
import {markerValgtVeiledergruppe} from '../../ducks/lagret-filter-ui-state';
import {veilederlisterErLik} from '../../components/modal/mine-filter';
import {kebabCase} from '../../utils/utils';

interface VeiledergruppeRadProps {
    veilederGruppe: LagretFilter;
    onClickRedigerKnapp: () => void;
    oversiktType: OversiktType;
}

function VeiledergruppeRad({veilederGruppe, onClickRedigerKnapp, oversiktType}: VeiledergruppeRadProps) {
    const dispatch = useDispatch();
    const valgtGruppeEnhetensOversikt = useSelector(
        (state: AppState) => state.mineFilterEnhetensOversikt.valgtVeiledergruppe
    );
    const valgtGruppeVeilederOversikt = useSelector(
        (state: AppState) => state.mineFilterVeilederOversikt.valgtVeiledergruppe
    );
    const valgtGruppe =
        oversiktType === OversiktType.veilederOversikt ? valgtGruppeVeilederOversikt : valgtGruppeEnhetensOversikt;

    const lagredeGrupper = useSelector((state: AppState) =>
        state.veiledergrupper.data.filter(v => v.filterId !== veilederGruppe.filterId)
    );

    const erDetLikGruppe = () => {
        return lagredeGrupper.find(lagredeGruppe =>
            veilederlisterErLik(lagredeGruppe.filterValg.veiledere, veilederGruppe.filterValg.veiledere)
        );
    };

    function velgGruppe() {
        logEvent(
            'portefolje.metrikker.veiledergrupper.velg-gruppe',
            {},
            {gruppeId: veilederGruppe.filterId, sideNavn: finnSideNavn()}
        );
        dispatch(endreFiltervalg('veiledere', veilederGruppe.filterValg.veiledere, oversiktType));
        dispatch(markerValgtVeiledergruppe(veilederGruppe, oversiktType));

        if (veilederGruppe.filterCleanup && erDetLikGruppe() !== undefined) {
            onClickRedigerKnapp();
        }
    }

    return (
        <div className="veileder-gruppe__rad" data-testid="veiledergruppe_rad-wrapper">
            <Radio
                className="veileder-gruppe__gruppenavn"
                key={veilederGruppe.filterId}
                name="veiledergruppe"
                label={veilederGruppe.filterNavn}
                value={veilederGruppe.filterId}
                onChange={() => velgGruppe()}
                checked={valgtGruppe?.filterId === veilederGruppe.filterId}
                data-testid={`veiledergruppe-rad_${kebabCase(veilederGruppe.filterNavn)}`}
            />
            <RedigerKnapp
                hidden={valgtGruppe?.filterId !== veilederGruppe.filterId}
                aria="Rediger veiledergruppe"
                onClick={onClickRedigerKnapp}
                dataTestid={`rediger-veiledergruppe_knapp_${kebabCase(veilederGruppe.filterNavn)}`}
            />
        </div>
    );
}

export default VeiledergruppeRad;
