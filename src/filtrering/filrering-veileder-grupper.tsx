import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { AppState } from '../reducer';
import SokFilterNy from '../components/toolbar/sok-filter-ny';
import { Radio } from 'nav-frontend-skjema';
import Innholdslaster from '../innholdslaster/innholdslaster';
import { Flatknapp, Hovedknapp, Knapp } from 'nav-frontend-knapper';
import VeilederGruppeModalLage from '../modal/veiledergruppe/veileder-gruppe-modal-lage';
import { VeilederGruppe } from '../model-interfaces';
import { AlertStripeInfo } from 'nav-frontend-alertstriper';
import { RedigerKnapp } from '../components/knapper/rediger-knapp';
import { LeggTilKnapp } from '../components/knapper/legg-til-knapp';

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

function VeilederGruppeInnhold(props: {veilederGrupper: VeilederGruppe[], veilederGruppeModal: boolean, setVeilederGruppeModal: (b: boolean) => void}) {

    const [valgtVeilederGruppe, setValgtVeilederGruppe] = useState<string>('');

    const hanterVelgGruppe = (gruppeId: any) => setValgtVeilederGruppe(gruppeId);

    const finnVeilederGruppe = () => props.veilederGrupper.find((elem) => elem.gruppeId === valgtVeilederGruppe);

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
                            checked={veilederGruppe.gruppeId === valgtVeilederGruppe}
                            onChange={(e) => hanterVelgGruppe(e.target.value)}
                        />
                    )
                }

            </SokFilterNy>
            <div>
                <div>
                    <Hovedknapp mini>Velg</Hovedknapp>
                    <RedigerKnapp onClick={()=> props.setVeilederGruppeModal(true)}/>
                </div>
                <LeggTilKnapp onClick={()=> props.setVeilederGruppeModal(true)}/>
            </div>
            <VeilederGruppeModalLage
                isOpen={props.veilederGruppeModal}
                veilerderGruppe={finnVeilederGruppe()}
                onRequestClose={()=> props.setVeilederGruppeModal(false)}
            />
        </>
    );
}

export default FilteringVeilederGrupper;
