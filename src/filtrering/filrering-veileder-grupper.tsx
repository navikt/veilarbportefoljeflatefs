import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { AppState } from '../reducer';
import SokFilterNy from '../components/toolbar/sok-filter-ny';
import { Radio } from 'nav-frontend-skjema';
import Innholdslaster from '../innholdslaster/innholdslaster';
import { Hovedknapp } from 'nav-frontend-knapper';
import VeilederGruppeModalLage from '../modal/veiledergruppe/veileder-gruppe-modal-lage';
import { VeilederGruppe } from '../model-interfaces';
import { AlertStripeInfo } from 'nav-frontend-alertstriper';
import { RedigerKnapp } from '../components/knapper/rediger-knapp';
import { LeggTilKnapp } from '../components/knapper/legg-til-knapp';
import {endreFiltervalg} from "../ducks/filtrering";
import {defaultVeileder} from "./filtrering-container";

function FilteringVeilederGrupper() {
    const [veilederGruppeModal, setVeilederGruppeModal] = useState(false);
    const veilederGrupper = useSelector((state: AppState) => state.veilederGrupper);
    const veilederGrupperData = veilederGrupper.data;
    return (
        <Innholdslaster avhengigheter={[veilederGrupper]}>
            {veilederGrupperData.length > 0
                ? <VeilederGruppeInnhold
                    veilederGrupper={veilederGrupperData}
                    veilederGruppeModal={veilederGruppeModal}
                    setVeilederGruppeModal={setVeilederGruppeModal}
                />
                :
                <>
                    <AlertStripeInfo>Fante inge grupper før enheten. Legg til grupper genom att trykke på pluss-knappen.</AlertStripeInfo>
                    <LeggTilKnapp onClick={()=> setVeilederGruppeModal(true)}/>
                </>

            }
        </Innholdslaster>
    );
}


interface VeilederGruppeInnholdProps {
    veilederGrupper: VeilederGruppe[],
    veilederGruppeModal: boolean,
    setVeilederGruppeModal: (b: boolean) => void
}

function VeilederGruppeInnhold(props: VeilederGruppeInnholdProps ) {

    const [valgtVeilederGruppe, setValgtVeilederGruppe] = useState<VeilederGruppe | undefined>();

    const dispatch = useDispatch();

    const velgGruppe = (filterVerdi)=>
        dispatch(endreFiltervalg("veiledere", filterVerdi, "enhet", defaultVeileder));

    const hanterVelgGruppe = (gruppeId: any) => {
        const veilederGruppe = finnVeilederGruppe(gruppeId);
        setValgtVeilederGruppe(veilederGruppe);
    }

    const finnVeilederGruppe = (vg) => props.veilederGrupper.find((elem) => elem.gruppeId === vg);

    return (
        <>
            <SokFilterNy
                data={props.veilederGrupper}
                label="Velg veiledergruppe"
                placeholder="Søk veiledergruppe"
            >
                {(filteredData) =>
                    filteredData.map((veilederGruppe) =>
                        <Radio
                            key={veilederGruppe.gruppeId}
                            name={`${veilederGruppe.gruppeNavn}-gruppe`}
                            label={veilederGruppe.gruppeNavn}
                            value={veilederGruppe.gruppeId}
                            checked={ valgtVeilederGruppe ? valgtVeilederGruppe.gruppeId === veilederGruppe.gruppeId  : false}
                            onChange={(e) => hanterVelgGruppe(e.target.value)}
                        />
                    )
                }

            </SokFilterNy>
            <div>
                <LeggTilKnapp onClick={()=> {
                    setValgtVeilederGruppe(undefined);
                    props.setVeilederGruppeModal(true)
                }}/>
                <div>
                    <Hovedknapp mini onClick={()=> velgGruppe(valgtVeilederGruppe ? valgtVeilederGruppe.veileder : [])}>
                        Velg
                    </Hovedknapp>
                    <RedigerKnapp onClick={()=> props.setVeilederGruppeModal(true)}/>
                </div>
            </div>
            <VeilederGruppeModalLage
                isOpen={props.veilederGruppeModal}
                veilerderGruppe={valgtVeilederGruppe}
                onRequestClose={()=> props.setVeilederGruppeModal(false)}
            />
        </>
    );
}

export default FilteringVeilederGrupper;
