import React, {useEffect, useState} from "react";
import Modal from "../modal";
import {useDispatch, useSelector} from "react-redux";
import {AppState} from "../../../reducer";
import "./lagret-filter.less"
import {OppdaterFilter} from "./lagrede-filter-oppdater";
import {LagreNytt} from "./lagrede-filter-nytt";
import {OrNothing} from "../../../utils/types/types";
import hiddenIf from "../../hidden-if/hidden-if";
import {Meny} from "./lagrede-filter-meny";
import {FnrFeil} from "./lagrede-filter-fnr-feil";
import {lukkLagreFilterModal} from "../../../ducks/lagret-filter";

export enum Visningstype {
    MENY,
    LAGRE_NYTT,
    OPPDATER,
    FNR_FEIL
}

export interface LagretFilterValideringsError {
    filterNavn: OrNothing<string>
}

const VisningstypeToTittel = new Map<Visningstype, string>([
    [Visningstype.LAGRE_NYTT, 'Lagre nytt filter'],
    [Visningstype.OPPDATER, 'Endre filter'],
    [Visningstype.MENY, 'Lagre filter'],
    [Visningstype.FNR_FEIL, 'Lagre filter']
]);

const HiddenIfMeny = hiddenIf(Meny);
const HiddenIfLagreNytt = hiddenIf(LagreNytt)
const HiddenIfOppdaterFilter = hiddenIf(OppdaterFilter);
const HiddenIfFnrFeil = hiddenIf(FnrFeil)

export function LagreFilterModal(props: { filtergruppe: string }) {
    const {sisteValgteLagredeFilter, data, valgtLagretFilter, erModalApen} = useSelector((state: AppState) => state.lagretFilter)
    const lagretFilterNavn = (filterId) => data.filter(elem => elem.filterId === filterId).map(elem => elem.filterNavn).toString()
    const filtreringMinOversikt = useSelector((state: AppState) => state.filtreringMinoversikt);
    const [valgtVisningstype, setValgtVisningstype] = useState<Visningstype>(Visningstype.MENY)

    const dispatch = useDispatch();

    const lukkModal = () => {
        dispatch(lukkLagreFilterModal(props.filtergruppe))
    }

    useEffect(() => {
        if (filtreringMinOversikt.navnEllerFnrQuery.trim().length > 0) setValgtVisningstype(Visningstype.FNR_FEIL)
        else if (valgtLagretFilter) setValgtVisningstype(Visningstype.OPPDATER)
        else if (!sisteValgteLagredeFilter) setValgtVisningstype(Visningstype.LAGRE_NYTT)
        else setValgtVisningstype(Visningstype.MENY)
    }, [filtreringMinOversikt, valgtLagretFilter, sisteValgteLagredeFilter, erModalApen])

    return (
        <Modal
            className="lagret-filter-meny-modal"
            contentLabel="Lagre filter meny modal"
            isOpen={erModalApen}
            onRequestClose={lukkModal}
            tittel={VisningstypeToTittel.get(valgtVisningstype)}
        >
            <div className="modal-visningstype">
                <HiddenIfMeny hidden={valgtVisningstype !== Visningstype.MENY}
                              setValgtVisningstype={setValgtVisningstype}
                              sisteFilterNavn={lagretFilterNavn(sisteValgteLagredeFilter!)}
                />
                <HiddenIfLagreNytt hidden={valgtVisningstype !== Visningstype.LAGRE_NYTT}
                                   lukkModal={lukkModal}
                                   filtergruppe={props.filtergruppe}
                />
                <HiddenIfOppdaterFilter hidden={valgtVisningstype !== Visningstype.OPPDATER}
                                        gammeltFilterNavn={lagretFilterNavn(sisteValgteLagredeFilter!)}
                                        filterId={sisteValgteLagredeFilter!}
                                        lukkModal={lukkModal}
                                        filtergruppe={props.filtergruppe}
                />
                <HiddenIfFnrFeil hidden={valgtVisningstype !== Visningstype.FNR_FEIL}/>
            </div>
        </Modal>
    );
}


