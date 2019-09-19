import ModalWrapper, {ModalProps} from "nav-frontend-modal";
import {Innholdstittel, Normaltekst, Element} from "nav-frontend-typografi";
import React, {useEffect, useState} from "react";
import {VeilederGruppe, VeilederModell} from "../../model-interfaces";
import {Checkbox, Input} from "nav-frontend-skjema";
import {Knapp} from "nav-frontend-knapper";
import "./veilder-gruppe-modal.less"
import {useSelector} from "react-redux";
import {AppState} from "../../reducer";
import SokFilterNy from "../../components/toolbar/sok-filter-ny";

interface VeilederGruppeModalProps {
    veilerderGruppe?: VeilederGruppe;
}

function getVeilederNavn (veilederePaEnheten: VeilederModell[], veilderId ) {
    const finnVeileder = (veilederId) => veilederePaEnheten.find(veiledere => veiledere.ident === veilederId);
}

function VeilederGruppeModalLage (props: VeilederGruppeModalProps & Omit<ModalProps, "contentLabel" | "children">) {
    const [valgteVeileder, setValgteVeileder] = useState<string[]>([]);
    const [gruppeNavn, setGruppeNavn] = useState<string>("");
    const veilederePaEnheten = useSelector((state: AppState) => state.veiledere.data.veilederListe);

    const hanterChange = (event) => {
        const veilederTarget = event.target.value;
        event.target.checked
            ? setValgteVeileder([veilederTarget, ...valgteVeileder])
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
            onRequestClose={props.onRequestClose}
            portalClassName="veildergruppe-modal"
        >
            <form className="veildergruppe-modal__form">
                <div className="modal-header-wrapper">
                    <header className="modal-header"/>
                </div>
                <div className="">
                    <Innholdstittel tag="h1" className="blokk-xs">
                        {modalTittel}
                    </Innholdstittel>
                    <Input
                        label="Gruppe navn:"
                        value={gruppeNavn}
                        bredde="L"
                        onChange={e => setGruppeNavn(e.target.value)}
                    />
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
                <Knapp htmlType="submit">Lagre endringerne</Knapp>
            </form>
        </ModalWrapper>
    )
}


export default VeilederGruppeModalLage;
