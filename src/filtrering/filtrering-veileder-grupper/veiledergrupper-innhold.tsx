import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { endreFiltervalg } from '../../ducks/filtrering';
import { defaultVeileder } from '../filtrering-container';
import { LeggTilKnapp } from '../../components/knapper/legg-til-knapp';
import VeilederGruppeModalLage from '../../modal/veiledergruppe/veileder-gruppe-modal-lage';
import { Radio } from 'nav-frontend-skjema';
import RedigerKnapp from '../../components/knapper/rediger-knapp';
import { LagretFilter } from '../../ducks/lagret-filter';
import {AppState} from "../../reducer";

interface VeilederGruppeInnholdProps {
    lagretFilter: LagretFilter[],
    veilederGruppeModal: boolean,
    setVeilederGruppeModal: (b: boolean) => void
}

function VeilederGruppeInnhold(props: VeilederGruppeInnholdProps) {


    const dispatch = useDispatch();

    const velgGruppe = (gruppeId: string) => {
        const filterVerdi = finnVeilederGruppe(gruppeId);
        filterVerdi && dispatch(endreFiltervalg('veiledere', filterVerdi.filterValg.veiledere, 'enhet', defaultVeileder));
    };

    const finnVeilederGruppe = (vg) => props.lagretFilter.find((elem) => elem.filterId === parseInt(vg));

    return (
        <div>
            <div className="veileder-gruppe__valgfelt">
                {props.lagretFilter.map((veilederGruppe) =>
                    <VeilederGruppeRad
                        veilederGruppe={veilederGruppe}
                        onClickRedigerKnapp={() => props.setVeilederGruppeModal(true)}
                        hanterVelgGruppe={(e) => velgGruppe(e.target.value)}
                    />
                )}
            </div>
            <div className="veileder-gruppe__knapperad">
                <LeggTilKnapp onClick={() => {
                    //må fikses: hvis denne er valgtVeilederGruppe: hvis en gruppe er valgt, så trykker man "ny gruppe" blir den valgte gruppen valgt her.
                    //gruppen som er valgt skal stå som valgt i listen, men ny gruppe skal være tom
                    props.setVeilederGruppeModal(true);
                }}/>
            </div>
            <VeilederGruppeModalLage
                isOpen={props.veilederGruppeModal}
                lagretFilter={undefined}
                onRequestClose={() => props.setVeilederGruppeModal(false)}
            />
        </div>
    );
}

interface VeilederGruppeRad {
    hanterVelgGruppe: (e: React.ChangeEvent<HTMLInputElement>) => void;
    veilederGruppe: LagretFilter;
    onClickRedigerKnapp: () => void;
}

function VeilederGruppeRad({veilederGruppe, hanterVelgGruppe, onClickRedigerKnapp}: VeilederGruppeRad) {
    const veiledereFilter = useSelector((state: AppState)=> state.filtrering.veiledere);

    const lagretVeilederGruppe = veilederGruppe.filterValg.veiledere;
    const erValgt = lagretVeilederGruppe.length === veiledereFilter.length  && lagretVeilederGruppe.every((v) =>veiledereFilter.includes(v));

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
                onClick={onClickRedigerKnapp}/>
        </div>
    );
}

export default VeilederGruppeInnhold;
