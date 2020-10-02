import {Radio} from "nav-frontend-skjema";
import RedigerKnapp from "../../components/knapper/rediger-knapp";
import React from "react";
import {endreFiltervalg} from "../../ducks/filtrering";
import {useDispatch, useSelector} from "react-redux";
import {LagretFilter} from "../../ducks/lagretFilter";
import {ListevisningType} from "../../ducks/ui/listevisning";
import {logEvent} from "../../utils/frontend-logger";
import {finnSideNavn} from "../../middleware/metrics-middleware";
import {AppState} from "../../reducer";
import {markerValgtVeilederGruppe} from "../../ducks/mine-filter-ui";

interface VeilederGruppeRad {
    veilederGruppe: LagretFilter;
    onClickRedigerKnapp: () => void;
    filtergruppe: ListevisningType;
}

function VeilederGruppeRad({veilederGruppe, onClickRedigerKnapp, filtergruppe}: VeilederGruppeRad) {
    const dispatch = useDispatch();
    const valgtGruppeEngetensOversikt = useSelector((state: AppState) => state.lagretFilterEnhetensOversikt.valgtVeilederGruppe);
    const valgtGruppeVeilederOversikt = useSelector((state: AppState) => state.lagretFilterVeilederOversikt.valgtVeilederGruppe);
    const valgtGruppe = (filtergruppe === ListevisningType.veilederOversikt ? valgtGruppeVeilederOversikt : valgtGruppeEngetensOversikt)

    function velgFilter() {
        logEvent('portefolje.metrikker.veiledergrupper.velg-gruppe',
            {}, {gruppeId: veilederGruppe.filterId, sideNavn: finnSideNavn()});
        dispatch(endreFiltervalg('veiledere', veilederGruppe.filterValg.veiledere, filtergruppe))
        dispatch(markerValgtVeilederGruppe(veilederGruppe, filtergruppe));
    }

    return (
        <div className="ny__veileder-gruppe__rad">
            <Radio
                className="ny__veileder-gruppe__gruppenavn"
                key={veilederGruppe.filterId}
                name="veiledergruppe"
                label={veilederGruppe.filterNavn}
                value={veilederGruppe.filterId}
                onChange={()=> velgFilter()}
                checked={valgtGruppe?.filterId === veilederGruppe.filterId}
            />
            <RedigerKnapp
                hidden={valgtGruppe?.filterId !== veilederGruppe.filterId}
                aria="Rediger veiledergruppe"
                onClick={onClickRedigerKnapp}
            />
        </div>
    );
}

export default VeilederGruppeRad;