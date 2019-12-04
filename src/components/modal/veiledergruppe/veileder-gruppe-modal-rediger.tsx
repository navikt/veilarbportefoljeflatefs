import { VeilederGruppeForm } from "./veileder-gruppe-form";
import React, { useEffect, useState } from 'react';
import {FiltervalgModell} from "../../../model-interfaces";
import { useDispatch, useSelector } from 'react-redux';
import {
    lagreEndringer,
    LagretFilter,
    RedigerGruppe,
    slettGruppe
} from "../../../ducks/lagret-filter";
import {harGjortEndringer} from "./veileder-gruppe-utils";
import ModalWrapper from "nav-frontend-modal";
import {Flatknapp, Hovedknapp} from "nav-frontend-knapper";
import SletteVeiledergruppeModal from "./slett-gruppe-modal";
import EndringerIkkeLagretModal from "./ulagrede-endringer-modal";
import SlettingFeiletModal from './sletting-feilet-modal';
import LagringFeiletModal from './lagring-feilet-modal';
import { initialState } from '../../../ducks/filtrering';
import { AppState } from '../../../reducer';
import { useEnhetIdSelector } from '../../../hooks/redux/use-enhetid-selector';

interface RedigerVeilederGruppeModalProps {
    isOpen: boolean
    redigerGruppe: LagretFilter;
    onRequestClose: ()=> void;
    lagretFilter?: LagretFilter;

}

export function RedigerVeilederGruppeModal (props: RedigerVeilederGruppeModalProps) {

    const [filterValg, setFilterValg] = useState<FiltervalgModell>(initialState);
    const [gruppeNavn, setGruppeNavn] = useState<string>('');

    const [visSletteVeiledergruppeModal, setSletteVeiledergruppeModal] = useState(false);
    const [visEndringerIkkeLagretModal, setEndringerIkkeLagretModal] = useState(false);
    const [visSlettingFeiletModal, setSlettingFeiletModal] = useState(false);
    const [visLagringFeiletModal, setLagringFeiletModal] = useState(false);
    const [visSpinner, setSpinner] = useState(false);

    const lagretFilterState = useSelector((state: AppState) => state.lagretFilter);
    const enhetId = useEnhetIdSelector();
    const dispatch = useDispatch();
    const modalTittel = props.lagretFilter ? 'Rediger veiledergruppe' : 'Ny veiledergruppe';

    useEffect(() => {
        if(props.redigerGruppe) {
            setFilterValg(props.redigerGruppe.filterValg);
            setGruppeNavn(props.redigerGruppe.filterNavn);
        }
    }, [props.redigerGruppe]);



    const fjernVeiledereFraListen = (prevState: FiltervalgModell, veilederTarget: string) =>
    // @ts-ignore
        ({...prevState, veiledere: prevState.veiledere.filter(v => v !== veilederTarget)});

    const hanterChange = (erValgt: boolean, veilederTarget: string) =>
        erValgt
    // @ts-ignore
            ? setFilterValg(prevState => ({...prevState, veiledere: [...prevState.veiledere, veilederTarget]}))
            : setFilterValg(prevState => fjernVeiledereFraListen(prevState, veilederTarget));


    function lukkModal () {
        // @ts-ignore
        if (harGjortEndringer(filterValg.veiledere, props.redigerGruppe.filterValg.veiledere, props.redigerGruppe.filterNavn, gruppeNavn)) {
            setEndringerIkkeLagretModal(true);
            return;
        }
        props.onRequestClose();
    }

    function lagreVeilederGruppeEndringer () {
        const endringer: RedigerGruppe = {
            filterNavn: gruppeNavn,
            filterValg,
            filterId: props.redigerGruppe!.filterId,
        };

        dispatch(lagreEndringer(endringer, enhetId));

        props.onRequestClose();
    }

    function slettVeiledergruppeOgLukkModaler() {
        dispatch(slettGruppe(enhetId, props.redigerGruppe!.filterId));
        setSletteVeiledergruppeModal(false);
        props.onRequestClose();
    }

    function endringerIkkeLagretOgLukkModaler() {
        setEndringerIkkeLagretModal(false);
        setFilterValg(props.redigerGruppe.filterValg);
        setGruppeNavn(props.redigerGruppe.filterNavn);
        props.onRequestClose();
    }

    return (
        <>
            <ModalWrapper
                isOpen={props.isOpen}
                contentLabel="Ny veiledergruppe"
                onRequestClose={lukkModal}
                portalClassName="veiledergruppe-modal"
            >
                <VeilederGruppeForm
                    filterValg={filterValg}
                    gruppeNavn={gruppeNavn}
                    modalTittel="Rediger veiledergruppe"
                    hanterVeilederChange={hanterChange}
                    setGruppeNavn={setGruppeNavn}
                    onSubmit={lagreVeilederGruppeEndringer}
                >
                    <div className="veiledergruppe-modal__knappegruppe">
                        <Hovedknapp className="veiledergruppe-modal__knappegruppe__lagre" htmlType="submit">
                            Lagre endringene
                        </Hovedknapp>
                        <Flatknapp className="veiledergruppe-modal__knappegruppe__avbryt" htmlType="button" onClick={lukkModal}>
                            Avbryt
                        </Flatknapp>
                        <Flatknapp
                            className="veiledergruppe-modal__knappegruppe__slett"
                            onClick={()=> setSletteVeiledergruppeModal(true)}
                            htmlType="button"
                        >
                            Slett gruppe
                        </Flatknapp>
                    </div>
                </VeilederGruppeForm>
            </ModalWrapper>
            <SletteVeiledergruppeModal
                isOpen={visSletteVeiledergruppeModal}
                onRequestClose={() => setSletteVeiledergruppeModal(false)}
                onSubmit={slettVeiledergruppeOgLukkModaler}
            />
            <EndringerIkkeLagretModal
                isOpen={visEndringerIkkeLagretModal}
                onRequestClose={() => setEndringerIkkeLagretModal(false)}
                onSubmit={endringerIkkeLagretOgLukkModaler}
            />
            <SlettingFeiletModal
                isOpen={visSlettingFeiletModal}
                onRequestClose={() => setSlettingFeiletModal(false)}
            />
            <LagringFeiletModal
                isOpen={visLagringFeiletModal}
                onRequestClose={() => setLagringFeiletModal(false)}
            />
        </>
    )
}



