import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { endreFiltervalg } from '../../ducks/filtrering';
import { defaultVeileder } from '../filtrering-container';
import { Hovedknapp } from 'nav-frontend-knapper';
import { LeggTilKnapp } from '../../components/knapper/legg-til-knapp';
import VeilederGruppeModalLage from '../../modal/veiledergruppe/veileder-gruppe-modal-lage';
import { Radio } from 'nav-frontend-skjema';
import RedigerKnapp from '../../components/knapper/rediger-knapp';
import { LagretFilter } from '../../ducks/lagret-filter';

interface VeilederGruppeInnholdProps {
    lagretFilter: LagretFilter[],
    veilederGruppeModal: boolean,
    setVeilederGruppeModal: (b: boolean) => void
}

function VeilederGruppeInnhold(props: VeilederGruppeInnholdProps) {

    const [valgtVeilederGruppe, setValgtVeilederGruppe] = useState<LagretFilter | undefined>();

    const dispatch = useDispatch();

    const velgGruppe = () => {
        if (valgtVeilederGruppe) {
            const filterVerdi = valgtVeilederGruppe.filterValg.veiledere;
            dispatch(endreFiltervalg('veiledere', filterVerdi, 'enhet', defaultVeileder));
        }
    };

    const hanterVelgGruppe = (gruppeId: any) => {
        const veilederGruppe = finnVeilederGruppe(gruppeId);
        setValgtVeilederGruppe(veilederGruppe);
    };

    const finnVeilederGruppe = (vg) => props.lagretFilter.find((elem) => elem.filterId === parseInt(vg));

    return (
        <div>
            {props.lagretFilter.map((veilederGruppe) =>
                <VeilederGruppeRad
                    veilederGruppe={veilederGruppe}
                    valgtVeilederGruppe={valgtVeilederGruppe}
                    onClickRedigerKnapp={() => props.setVeilederGruppeModal(true)}
                    hanterVelgGruppe={(e) => hanterVelgGruppe(e.target.value)}
                />
            )}
            <div className="veileder-gruppe__knapperad">
                <Hovedknapp mini onClick={velgGruppe}>
                    Velg
                </Hovedknapp>
                <LeggTilKnapp onClick={() => {
                    setValgtVeilederGruppe(undefined);
                    props.setVeilederGruppeModal(true);
                }}/>
            </div>
            <VeilederGruppeModalLage
                isOpen={props.veilederGruppeModal}
                lagretFilter={valgtVeilederGruppe}
                onRequestClose={() => props.setVeilederGruppeModal(false)}
            />
        </div>
    );
}

interface VeilederGruppeRad {
    valgtVeilederGruppe?: LagretFilter;
    hanterVelgGruppe: (e: React.ChangeEvent<HTMLInputElement>) => void;
    veilederGruppe: LagretFilter;
    onClickRedigerKnapp: () => void;
}

function VeilederGruppeRad({valgtVeilederGruppe, veilederGruppe, hanterVelgGruppe, onClickRedigerKnapp}: VeilederGruppeRad) {
    const erValgt = valgtVeilederGruppe ? valgtVeilederGruppe.filterId === veilederGruppe.filterId : false;

    return (
        <div className="veileder-gruppe__rad">
            <Radio
                key={veilederGruppe.filterId}
                name={`${veilederGruppe.filterNavn}-gruppe`}
                label={veilederGruppe.filterNavn}
                value={veilederGruppe.filterId}
                checked={erValgt}
                onChange={hanterVelgGruppe}
            />
            <RedigerKnapp
                hidden={!erValgt}
                onClick={onClickRedigerKnapp}/>
        </div>
    );
}

export default VeilederGruppeInnhold;
