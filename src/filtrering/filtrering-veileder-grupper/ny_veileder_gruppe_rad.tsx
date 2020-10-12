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
import {markerValgtVeilederGruppe} from "../../ducks/lagret-filter-ui-state";
import {veilederlisterErLik} from "../../components/modal/mine-filter";

interface VeilederGruppeRad {
    veilederGruppe: LagretFilter;
    onClickRedigerKnapp: () => void;
    filtergruppe: ListevisningType;
}

function VeilederGruppeRad({veilederGruppe, onClickRedigerKnapp, filtergruppe}: VeilederGruppeRad) {
    const dispatch = useDispatch();
    const valgtGruppeEnhetensOversikt = useSelector((state: AppState) => state.mineFilterEnhetensOversikt.valgtVeilederGruppe);
    const valgtGruppeVeilederOversikt = useSelector((state: AppState) => state.mineFilterVeilederOversikt.valgtVeilederGruppe);
    const valgtGruppe = (filtergruppe === ListevisningType.veilederOversikt ? valgtGruppeVeilederOversikt : valgtGruppeEnhetensOversikt)

    const lagredeGrupper = useSelector((state: AppState) => state.veiledergrupper.data
        .filter(v => v.filterId !== veilederGruppe.filterId));

    const erDetLikGruppe = () => {
        return lagredeGrupper.find(lagredeGruppe => veilederlisterErLik(lagredeGruppe.filterValg.veiledere, veilederGruppe.filterValg.veiledere))
    }

    function velgGruppe() {
        logEvent('portefolje.metrikker.veiledergrupper.velg-gruppe',
            {}, {gruppeId: veilederGruppe.filterId, sideNavn: finnSideNavn()});
        dispatch(endreFiltervalg('veiledere', veilederGruppe.filterValg.veiledere, filtergruppe))
        dispatch(markerValgtVeilederGruppe(veilederGruppe, filtergruppe));

        //show automatically  modal if veiledergruppe after cleanup is the same as some other veiledergruppe
        if (veilederGruppe.filterCleanup && erDetLikGruppe() !== undefined){
            onClickRedigerKnapp()
        }
    }

    return (
        <div className="ny__veileder-gruppe__rad">
            <Radio
                className="ny__veileder-gruppe__gruppenavn"
                key={veilederGruppe.filterId}
                name="veiledergruppe"
                label={veilederGruppe.filterNavn}
                value={veilederGruppe.filterId}
                onChange={()=> velgGruppe()}
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