import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { endreFiltervalg } from '../../ducks/filtrering';
import { defaultVeileder } from '../filtrering-container';
import { Radio } from 'nav-frontend-skjema';
import RedigerKnapp from '../../components/knapper/rediger-knapp';
import { LagretFilter } from '../../ducks/lagret-filter';
import {AppState} from "../../reducer";
import {veilederlisterErLik} from "../../modal/veiledergruppe/veileder-gruppe-utils";
import {RedigerVeilederGruppeModal} from "../../modal/veiledergruppe/veileder-gruppe-modal-rediger";

interface VeilederGruppeInnholdProps {
    lagretFilter: LagretFilter[]
}

function VeilederGruppeInnhold(props: VeilederGruppeInnholdProps) {
    const [valgtGruppe, setValgtGruppe] = useState<LagretFilter>();
    const [visEndreGruppeModal, setVisEndreGruppeModal] = useState(false);

    const veiledereFilter = useSelector((state: AppState)=> state.filtrering.veiledere);

    useEffect(() => {
        const harValgtEttLagretFilter = props.lagretFilter.find(v => veilederlisterErLik(v.filterValg.veiledere, veiledereFilter));
        if(harValgtEttLagretFilter) {
            setValgtGruppe(harValgtEttLagretFilter);
        }
    }, [veiledereFilter, valgtGruppe, props.lagretFilter]);

    const dispatch = useDispatch();

    const velgGruppe = (gruppeId: string) => {
        const filterVerdi = finnVeilederGruppe(gruppeId);
        setValgtGruppe(filterVerdi);
        filterVerdi && dispatch(endreFiltervalg('veiledere', filterVerdi.filterValg.veiledere, 'enhet', defaultVeileder));
    };

    const finnVeilederGruppe = (vg) => props.lagretFilter.find((elem) => elem.filterId === parseInt(vg));

    return (
            <div className="veileder-gruppe__valgfelt">
                {props.lagretFilter.map((veilederGruppe) =>
                    <VeilederGruppeRad
                        veilederGruppe={veilederGruppe}
                        onClickRedigerKnapp={() => setVisEndreGruppeModal(true)}
                        hanterVelgGruppe={(e) => velgGruppe(e.target.value)}
                        veiledereFilter={veiledereFilter}
                    />
                )}
                {valgtGruppe &&
                    <RedigerVeilederGruppeModal
                        isOpen={visEndreGruppeModal}
                        redigerGruppe={valgtGruppe}
                        onRequestClose={()=> setVisEndreGruppeModal(false)}
                />}
            </div>
    );
}

interface VeilederGruppeRad {
    hanterVelgGruppe: (e: React.ChangeEvent<HTMLInputElement>) => void;
    veilederGruppe: LagretFilter;
    veiledereFilter: string[];
    onClickRedigerKnapp: () => void;
}

function VeilederGruppeRad({veilederGruppe, hanterVelgGruppe, onClickRedigerKnapp, veiledereFilter}: VeilederGruppeRad) {

    const lagretVeilederGruppe = veilederGruppe.filterValg.veiledere;

    const erValgt = veilederlisterErLik(lagretVeilederGruppe, veiledereFilter);

    return (
        <div className="veileder-gruppe__rad">
            <Radio
                className="veileder-gruppe__gruppenavn"
                key={veilederGruppe.filterId}
                name={`${veilederGruppe.filterNavn}-gruppe`}
                label={veilederGruppe.filterNavn}
                value={veilederGruppe.filterId}
                onChange={hanterVelgGruppe}
                checked={erValgt}
            />
            <RedigerKnapp
                hidden={!erValgt}
                onClick={onClickRedigerKnapp}
            />
        </div>
    );
}

export default VeilederGruppeInnhold;
