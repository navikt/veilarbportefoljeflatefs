import React, {useState} from "react";
import Modal from "../modal";
import {useSelector} from "react-redux";
import {AppState} from "../../../reducer";
import "./lagret-filter.less"
import {OppdaterFilter} from "./lagrede-filter-oppdater";
import {LagreNytt} from "./lagrede-filter-nytt";
import {OrNothing} from "../../../utils/types/types";
import hiddenIf from "../../hidden-if/hidden-if";
import {Meny} from "./lagrede-filter-meny";


export enum Visningstype {
    MENY,
    LAGRE_NYTT,
    OPPDATER
}

export interface LagretFilterValideringsError {
    filterNavn: OrNothing<string>
}

const VisningstypeToTittel = new Map<Visningstype, string>([
    [Visningstype.LAGRE_NYTT, 'Lagre nytt filter'],
    [Visningstype.OPPDATER, 'Endre filter'],
    [Visningstype.MENY, 'Lagre filter']
]);

const HiddenIfMeny = hiddenIf(Meny);
const HiddenIfLagreNytt = hiddenIf(LagreNytt)
const HiddenIfOppdaterFilter = hiddenIf(OppdaterFilter);

export function LagreFilterModal(props: { velgVisningstype: Visningstype, isOpen: boolean, onRequestClose: () => void, erNavnEllerFnrBrukt? }) {
    const {sisteValgteLagredeFilter, data} = useSelector((state: AppState) => state.lagretFilter)
    const [valgtVisningstype, setValgtVisningstype] = useState<Visningstype>(props.velgVisningstype)
    const lagretFilterNavn = (filterId) => data.filter(elem => elem.filterId === filterId).map(elem => elem.filterNavn).toString()

    const lukkModal = () => {
        props.onRequestClose();
        setValgtVisningstype(props.velgVisningstype)
    }

    return (
        <>
            <Modal
                className="lagret-filter-meny-modal"
                contentLabel="Lagre filter meny modal"
                isOpen={props.isOpen}
                onRequestClose={lukkModal}
                tittel={VisningstypeToTittel.get(valgtVisningstype)}
            >
                <div className="modal-visningstype">
                    <HiddenIfMeny hidden={valgtVisningstype !== Visningstype.MENY}
                                  setValgtVisningstype={setValgtVisningstype}
                                  sisteFilterNavn={lagretFilterNavn(sisteValgteLagredeFilter!)}
                                  erNavnEllerFnrBrukt={props.erNavnEllerFnrBrukt}
                    />

                    <HiddenIfLagreNytt hidden={valgtVisningstype !== Visningstype.LAGRE_NYTT}
                        lukkModal={lukkModal}/>

                    <HiddenIfOppdaterFilter hidden={valgtVisningstype !== Visningstype.OPPDATER}
                        gammeltFilterNavn={lagretFilterNavn(sisteValgteLagredeFilter!)}
                        filterId={sisteValgteLagredeFilter!}
                        lukkModal={lukkModal}
                    />
                </div>
            </Modal>
        </>
    );
}


