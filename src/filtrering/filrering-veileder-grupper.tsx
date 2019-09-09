import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { AppState } from '../reducer';
import SokFilterNy from '../components/toolbar/sok-filter-ny';
import { Radio } from 'nav-frontend-skjema';
import Innholdslaster from '../innholdslaster/innholdslaster';
import { Knapp } from 'nav-frontend-knapper';
import VeilederGruppeModalLage from '../modal/veiledergruppe/veileder-gruppe-modal-lage';
import { VeilederGruppe } from '../model-interfaces';

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
                : <Knapp onClick={()=> setVeilederGruppeModal(true)}>
                    Lage veiledergruppe
                </Knapp>

            }
        </Innholdslaster>
    );
}

function VeilederGruppeInnhold(props: {veilederGrupper: VeilederGruppe[], veilederGruppeModal: boolean, setVeilederGruppeModal: (b: boolean) => void}) {

    const [valgtVeilederGruppe, setValgtVeilederGruppe] = useState<VeilederGruppe | undefined>();

    const veilederGrupperNavn  = props.veilederGrupper.map((veilederGruppe) => Object.keys(veilederGruppe)[0]);

    const hanterVelgGruppe = (gruppeNavn: string) => {
        setValgtVeilederGruppe(props.veilederGrupper.find((elem) => Object.keys(elem)[0] === gruppeNavn));
    };

    return (
        <>
            <SokFilterNy
                data={veilederGrupperNavn}
                label="Velg veiledergruppe"
                placeholder="Søk veiledergruppe"
            >
                {(filteredData) =>
                    filteredData.map((veilederGruppe) =>
                        <Radio
                            key={veilederGruppe}
                            name={`${veilederGruppe}-gruppen`}
                            label={veilederGruppe}
                            value={veilederGruppe}
                            onChange={(e) => hanterVelgGruppe(e.target.value)}
                        />
                    )
                }

            </SokFilterNy>
            <div>
                <Knapp>Velg</Knapp>
                <Knapp onClick={()=> props.setVeilederGruppeModal(true)}>Rediger</Knapp>
                <Knapp onClick={()=> props.setVeilederGruppeModal(true)}>Lage</Knapp>
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
