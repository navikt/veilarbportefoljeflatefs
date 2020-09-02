import React, {useEffect, useState} from "react";
import Modal from "../modal";
import {useDispatch, useSelector} from "react-redux";
import {AppState} from "../../../reducer";
import "./mine-filter.less"
import {OppdaterMineFilter} from "./mine-filter-oppdater";
import {LagreNyttMineFilter} from "./mine-filter-nytt";
import {OrNothing} from "../../../utils/types/types";
import hiddenIf from "../../hidden-if/hidden-if";
import {Meny} from "./mine-filter-meny";
import {MineFilterFnrFeil} from "./mine-filter-fnr-feil";
import {lukkMineFilterModal} from "../../../ducks/mine-filter-ui";

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
const HiddenIfLagreNytt = hiddenIf(LagreNyttMineFilter)
const HiddenIfOppdaterFilter = hiddenIf(OppdaterMineFilter);
const HiddenIfFnrFeil = hiddenIf(MineFilterFnrFeil)

export function MineFilterModal(props: { filtergruppe: string }) {
    const {sisteValgteMineFilter, valgtMineFilter, erModalApen} = useSelector((state: AppState) => (props.filtergruppe === 'minOversikt') ? state.lagretFilterMinOversikt : state.lagretFilterEnhetensOversikt)
    const data = useSelector((state: AppState) => state.lagretFilter.data)
    const lagretFilterNavn = (filterId) => data.filter(elem => elem.filterId === filterId).map(elem => elem.filterNavn).toString()
    const filtreringMinOversikt = useSelector((state: AppState) => state.filtreringMinoversikt);
    const [valgtVisningstype, setValgtVisningstype] = useState<Visningstype>(Visningstype.MENY)

    const dispatch = useDispatch();

    const lukkModal = () => {
        dispatch(lukkMineFilterModal(props.filtergruppe))
    }

    useEffect(() => {
        if (filtreringMinOversikt.navnEllerFnrQuery.trim().length > 0) setValgtVisningstype(Visningstype.FNR_FEIL)
        else if (valgtMineFilter) setValgtVisningstype(Visningstype.OPPDATER)
        else if (!sisteValgteMineFilter) setValgtVisningstype(Visningstype.LAGRE_NYTT)
        else setValgtVisningstype(Visningstype.MENY)
    }, [filtreringMinOversikt, valgtMineFilter, sisteValgteMineFilter, erModalApen])

    return (
        <Modal
            className="mine-filter-meny-modal"
            contentLabel="Mine filter meny modal"
            isOpen={erModalApen}
            onRequestClose={lukkModal}
            tittel={VisningstypeToTittel.get(valgtVisningstype)}
        >
            <div className="modal-visningstype">
                <HiddenIfMeny hidden={valgtVisningstype !== Visningstype.MENY}
                              setValgtVisningstype={setValgtVisningstype}
                              sisteFilterNavn={lagretFilterNavn(sisteValgteMineFilter!)}
                />
                <HiddenIfLagreNytt hidden={valgtVisningstype !== Visningstype.LAGRE_NYTT}
                                   lukkModal={lukkModal}
                                   filtergruppe={props.filtergruppe}
                />
                <HiddenIfOppdaterFilter hidden={valgtVisningstype !== Visningstype.OPPDATER}
                                        gammeltFilterNavn={lagretFilterNavn(sisteValgteMineFilter!)}
                                        filterId={sisteValgteMineFilter!}
                                        lukkModal={lukkModal}
                                        filtergruppe={props.filtergruppe}
                />
                <HiddenIfFnrFeil hidden={valgtVisningstype !== Visningstype.FNR_FEIL}/>
            </div>
        </Modal>
    );
}


