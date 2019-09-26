import ModalWrapper, {ModalProps} from "nav-frontend-modal";
import { Innholdstittel } from "nav-frontend-typografi";
import React, {useEffect, useState} from "react";
import {VeilederGruppe, VeilederModell} from "../../model-interfaces";
import {Checkbox, Input} from "nav-frontend-skjema";
import {Flatknapp, Hovedknapp } from "nav-frontend-knapper";
import {useSelector} from "react-redux";
import {AppState} from "../../reducer";
import SokFilterNy from "../../components/toolbar/sok-filter-ny";
import Grid from "../../components/grid/grid";
import {  ReactComponent as FjernIkon } from './fjern-sirkel-ikon.svg';

interface VeilederGruppeModalProps {
    veilerderGruppe?: VeilederGruppe;
}

function VeilederGruppeModalLage (props: VeilederGruppeModalProps & Omit<ModalProps, "contentLabel" | "children">) {
    const [valgteVeileder, setValgteVeileder] = useState<string[]>([]);
    const [gruppeNavn, setGruppeNavn] = useState<string>("");
    const veilederePaEnheten = useSelector((state: AppState) => state.veiledere.data.veilederListe);

    const hanterChange = (event) => {
        const veilederTarget = event.target.value;
        event.target.checked
            ? setValgteVeileder([...valgteVeileder, veilederTarget])
            : setValgteVeileder(valgteVeileder.filter(veileder => veileder !== veilederTarget))
    };

    useEffect(() => {
        if(props.veilerderGruppe) {
            setValgteVeileder(props.veilerderGruppe.veileder);
            setGruppeNavn(props.veilerderGruppe.gruppeNavn);
        }
    },[props.veilerderGruppe]);


    const modalTittel = props.veilerderGruppe ? "Rediger veiledergruppe": "Lage veiledergruppe";

    return (
        <ModalWrapper
            isOpen={props.isOpen}
            contentLabel="Lage veildergruppe"
            onRequestClose={()=> {
                props.onRequestClose();
                props.veilerderGruppe ? setValgteVeileder(props.veilerderGruppe.veileder): setValgteVeileder([]);

            }}
            portalClassName="veildergruppe-modal"
        >
            <div className="veildergruppe-modal__form">
                <Innholdstittel tag="h1" className="blokk-xs">
                    {modalTittel}
                </Innholdstittel>
                <div className="veildergruppe-modal__content">
                    <Input
                        label="Gruppe navn:"
                        value={gruppeNavn}
                        bredde="L"
                        onChange={e => setGruppeNavn(e.target.value)}
                    />
                    <ValgtVeilederGruppeListe
                        valgteVeileder={valgteVeileder}
                        veilederePaEnheten={veilederePaEnheten}
                        fjernValgtVeileder={(veilederTarget) =>
                            setValgteVeileder(valgteVeileder.filter(veileder => veileder !== veilederTarget))
                        }
                    />
                    <div className="veildergruppe-modal__sokefilter">
                        <SokFilterNy
                            label="Velg veiledere"
                            placeholder="Søk veileder"
                            data={veilederePaEnheten}
                        >
                            {liste =>
                                <div className="checkbox-filterform">
                                    <div className="checkbox-filterform__valg">
                                        {liste.map( elem =>
                                            <Checkbox
                                                key={elem.ident}
                                                label={`${elem.etternavn}, ${elem.fornavn}`}
                                                value={elem.ident}
                                                checked={valgteVeileder.includes(elem.ident)}
                                                onChange={event => hanterChange(event)}
                                            />)}
                                    </div>
                                </div>
                            }
                        </SokFilterNy>
                    </div>
                </div>
                <div>
                    <div>
                        <Hovedknapp htmlType="submit">Lagre endringerne</Hovedknapp>
                        <Flatknapp>Avbryt</Flatknapp>
                    </div>
                    <Flatknapp>Slett gruppe</Flatknapp>
                </div>
            </div>
        </ModalWrapper>
    )
}

interface ValgtVeilederGruppeListeProps {
    valgteVeileder : string[],
    veilederePaEnheten: VeilederModell[],
    fjernValgtVeileder: (veilederId: string) => void;
}


function ValgtVeilederGruppeListe (props: ValgtVeilederGruppeListeProps) {
    const finnVeilederNavn = (veilederId) => {
        const veileder = props.veilederePaEnheten.find(v => v.ident === veilederId);
        return veileder
            ? `${veileder.etternavn}, ${veileder.fornavn}`
            : veilederId;
    };

    return (
        <Grid columns={2} className="veildergruppe-modal__valgteveileder">
            {
                props.valgteVeileder.map(veileder =>
                    <div className="veildergruppe-modal__valgteveileder__elem">
                        <span>{ finnVeilederNavn(veileder) }</span>
                        <Flatknapp
                            className="fjern--knapp"
                            htmlType="button"
                            onClick={() => props.fjernValgtVeileder(veileder)}
                        >
                            <FjernIkon/>
                        </Flatknapp>
                    </div>
                )}
        </Grid>
    )
}


export default VeilederGruppeModalLage;
