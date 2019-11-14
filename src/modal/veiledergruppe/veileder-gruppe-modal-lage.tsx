import ModalWrapper, {ModalProps} from "nav-frontend-modal";
import { Innholdstittel } from "nav-frontend-typografi";
import React, {useEffect, useState} from "react";
import {FiltervalgModell} from "../../model-interfaces";
import { Input } from "nav-frontend-skjema";
import {Flatknapp, Hovedknapp } from "nav-frontend-knapper";
import {useSelector} from "react-redux";
import {AppState} from "../../reducer";
import {  ReactComponent as FjernIkon } from './fjern-sirkel-ikon.svg';
import {LagretFilter} from "../../ducks/lagret-filter";
import {initialState} from "../../ducks/filtrering";
import SokVeiledere from "../../components/sok-veiledere/sok-veiledere";

interface VeilederGruppeModalProps {
    lagretFilter?: LagretFilter;
}

function VeilederGruppeModalLage (props: VeilederGruppeModalProps & Omit<ModalProps, "contentLabel" | "children">) {

    const [filterValg, setFilterValg] = useState<FiltervalgModell>(initialState);

    const [gruppeNavn, setGruppeNavn] = useState<string>("");

    const fjernVeiledereFraListen = (prevState: FiltervalgModell, veilederTarget: string) => prevState.veiledere
        ? {...prevState, veiledere: prevState.veiledere.filter(v => v !== veilederTarget)}
        : {...prevState, veiledere: []};

    const hanterChange = (event) => {
        const veilederTarget = event.target.value;
        event.target.checked
            ? setFilterValg(prevState => {
                if(prevState.veiledere) {
                    return ({...prevState, veiledere: [...prevState.veiledere, veilederTarget]});
                } else {
                    return ({...prevState, veiledere: [veilederTarget]})
                }})
            : setFilterValg( prevState => fjernVeiledereFraListen(prevState, veilederTarget))
    };

    useEffect(() => {
        setFilterValg(props.lagretFilter ? props.lagretFilter.filterValg : initialState);
        setGruppeNavn(props.lagretFilter? props.lagretFilter.filterNavn : "");
    },[props.lagretFilter]);


    const modalTittel = props.lagretFilter ? "Rediger veiledergruppe": "Lage veiledergruppe";

    return (
        <ModalWrapper
            isOpen={props.isOpen}
            contentLabel="Lage veildergruppe"
            onRequestClose={()=> {
                props.onRequestClose();
                props.lagretFilter ? setFilterValg(props.lagretFilter.filterValg): setFilterValg(initialState);

            }}
            portalClassName="veildergruppe-modal"
        >
            <div className="veildergruppe-modal__form">
                <Innholdstittel tag="h1" className="blokk-xs">
                    {modalTittel}
                </Innholdstittel>
                <div className="veildergruppe-modal__content">
                    <Input
                        label="Gruppenavn:"
                        value={gruppeNavn}
                        bredde="L"
                        onChange={e => setGruppeNavn(e.target.value)}
                    />
                    <ValgtVeilederGruppeListe
                        valgteVeileder={filterValg.veiledere || []}
                        fjernValgtVeileder={(veilederTarget) =>
                            setFilterValg(prevState => fjernVeiledereFraListen(prevState, veilederTarget))
                        }
                    />
                    <div className="veildergruppe-modal__sokefilter">
                        <SokVeiledere
                            erValgt={(ident)=> filterValg.veiledere ? filterValg.veiledere.includes(ident): false}
                            hanterChange={event => hanterChange(event)}
                        />
                    </div>
                </div>
                <div>
                    <Hovedknapp htmlType="submit">Lagre endringene</Hovedknapp>
                    <Flatknapp>Avbryt</Flatknapp>
                    <Flatknapp>Slett gruppe</Flatknapp>
                </div>
            </div>
        </ModalWrapper>
    )
}

interface ValgtVeilederGruppeListeProps {
    valgteVeileder : string[],
    fjernValgtVeileder: (veilederId: string) => void;
}


function ValgtVeilederGruppeListe (props: ValgtVeilederGruppeListeProps) {
    const veilederePaEnheten = useSelector((state: AppState) => state.veiledere.data.veilederListe);

    const veiledere = veilederePaEnheten
        .filter(veilederPaEnhet =>
            props.valgteVeileder.includes(veilederPaEnhet.ident))
        .sort((veileder1, veiledere2) => veileder1.etternavn.localeCompare(veiledere2.etternavn));


    const splitArrayITo = [veiledere.slice(0, Math.ceil(veiledere.length/2)), veiledere.slice(Math.ceil(veiledere.length/2), veiledere.length)]

    return (
        <div className="veildergruppe-modal__valgteveileder">
            {
                splitArrayITo.map(listeMedVeileder =>
                    <div>
                        {listeMedVeileder.map(veileder => {
                            return (
                                <div className="veildergruppe-modal__valgteveileder__elem">
                                    <span>{`${veileder.etternavn}, ${veileder.fornavn}`}</span>
                                    <Flatknapp
                                        className="fjern--knapp"
                                        htmlType="button"
                                        onClick={() => props.fjernValgtVeileder(veileder.ident)}
                                    >
                                        <FjernIkon/>
                                    </Flatknapp>
                                </div>
                            )
                        })}
                    </div>
                )
            }
        </div>
    )
}


export default VeilederGruppeModalLage;
