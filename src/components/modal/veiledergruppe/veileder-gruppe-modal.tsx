import React, { useEffect, useState } from 'react';
import { FiltervalgModell } from '../../../model-interfaces';
import { harGjortEndringer, veilederlisterErLik } from './veileder-gruppe-utils';
import ModalWrapper from 'nav-frontend-modal';
import { Flatknapp, Hovedknapp } from 'nav-frontend-knapper';
import SletteVeiledergruppeModal from './slett-gruppe-modal';
import EndringerIkkeLagretModal from './ulagrede-endringer-modal';
import { useSelector } from 'react-redux';
import { AppState } from '../../../reducer';
import { OrNothing } from '../../../utils/types/types';
import VeilederGruppeForm from './veileder-gruppe-form';

interface VeilederModalProps {
    initialVerdi: {
        gruppeNavn: string,
        filterValg: FiltervalgModell,
        filterId: number
    }

    onSubmit: (gruppeNavn: string, filterValg: FiltervalgModell) => void
    onSlett?: () => void;
    onRequestClose: () => void;
    isOpen: boolean
    modalTittel: string,
    lagreKnappeTekst: string
    validerGruppenavn?: (gruppenavn: string) => OrNothing<string>;
}

export function VeilederGruppeModal(props: VeilederModalProps) {
    const [filterValg, setFilterValg] = useState<FiltervalgModell>(props.initialVerdi.filterValg);
    const [gruppeNavn, setGruppeNavn] = useState<string>(props.initialVerdi.gruppeNavn);
    const [errors, setErrors] = useState({} as any);

    const [visSletteVeiledergruppeModal, setSletteVeiledergruppeModal] = useState(false);
    const [visEndringerIkkeLagretModal, setEndringerIkkeLagretModal] = useState(false);

    useEffect(() => {
        setFilterValg(props.initialVerdi.filterValg);
        setGruppeNavn(props.initialVerdi.gruppeNavn);
    }, [props.initialVerdi]);

    const fjernVeiledereFraListen = (prevState: FiltervalgModell, veilederTarget: string) =>
        // @ts-ignore
        ({...prevState, veiledere: prevState.veiledere.filter(v => v !== veilederTarget)});

    const hanterChange = (erValgt: boolean, veilederTarget: string) =>
        erValgt
            // @ts-ignore
            ? setFilterValg(prevState => ({...prevState, veiledere: [...prevState.veiledere, veilederTarget]}))
            : setFilterValg(prevState => fjernVeiledereFraListen(prevState, veilederTarget));

    function lukkModal() {
        if (harGjortEndringer(filterValg.veiledere, props.initialVerdi.filterValg.veiledere, props.initialVerdi.gruppeNavn, gruppeNavn)) {
            setEndringerIkkeLagretModal(true);
            return;
        }
        props.onRequestClose();
    }

    function lagreVeilederGruppeEndringer(e) {
        e.preventDefault();
        e.stopPropagation();

        if (Object.values(errors).find(v => v)) {
            return;
        }
        props.onSubmit(gruppeNavn, filterValg);
        props.onRequestClose();
    }

    function slettVeiledergruppeOgLukkModaler() {
        props.onSlett && props.onSlett();
        setSletteVeiledergruppeModal(false);
        props.onRequestClose();
    }

    function endringerIkkeLagretOgLukkModaler() {
        setEndringerIkkeLagretModal(false);
        setFilterValg(props.initialVerdi.filterValg);
        setGruppeNavn(props.initialVerdi.gruppeNavn);
        props.onRequestClose();
    }

    const lagradeGrupper = useSelector((state: AppState) => state.lagretFilter.data
        .filter(v => v.filterId !== props.initialVerdi.filterId));

    const lagredeGruppeNavn = lagradeGrupper.map(v => v.filterNavn)
        .map(v => v.trim());

    const lagredeVeilederGrupper = lagradeGrupper.map(v => ({
        veiledere: v.filterValg.veiledere,
        gruppeNavn: v.filterNavn
    }));

    useEffect(() => {
        let errors: any = {};

        if (!gruppeNavn) {
            errors.gruppeNavn = 'Gruppen mangler navn, legg inn gruppenavn.';
        }
        if (lagredeGruppeNavn.includes(gruppeNavn)) {
            errors.gruppeNavn = 'Gruppenavn er allerede i bruk.';
        }
        if (filterValg.veiledere.length <= 1) {
            errors.filterValg = 'Veiledergrupper må ha 2 eller flere veiledere, legg til veiledere.';
        }
        const finnLikVeilederGruppe = lagredeVeilederGrupper.find(v => veilederlisterErLik(v.veiledere, filterValg.veiledere));

        if (finnLikVeilederGruppe) {
            errors.filterValg = `Det finnes allerede en gruppe med disse veilederne ved navn "${finnLikVeilederGruppe.gruppeNavn}"`;
        }
        setErrors(errors);
    }, [filterValg.veiledere, gruppeNavn, lagredeGruppeNavn, lagredeVeilederGrupper]);

    return (
        <>
            <ModalWrapper
                isOpen={props.isOpen}
                contentLabel={props.modalTittel}
                onRequestClose={lukkModal}
                portalClassName="veiledergruppe-modal"
            >
                <VeilederGruppeForm
                    filterValg={filterValg}
                    gruppeNavn={gruppeNavn}
                    modalTittel={props.modalTittel}
                    hanterVeilederChange={hanterChange}
                    setGruppeNavn={setGruppeNavn}
                    onSubmit={lagreVeilederGruppeEndringer}
                    errors={errors}
                >
                    <div className="veiledergruppe-modal__knappegruppe">
                        <Hovedknapp className="veiledergruppe-modal__knappegruppe__lagre" htmlType="submit">
                            {props.lagreKnappeTekst}
                        </Hovedknapp>
                        <Flatknapp className="veiledergruppe-modal__knappegruppe__avbryt" htmlType="button"
                                   onClick={lukkModal}>
                            Avbryt
                        </Flatknapp>
                        {props.onSlett && <Flatknapp
                            className="veiledergruppe-modal__knappegruppe__slett"
                            onClick={() => setSletteVeiledergruppeModal(true)}
                            htmlType="button"
                        >
                            Slett gruppe
                        </Flatknapp>}
                    </div>
                </VeilederGruppeForm>
            </ModalWrapper>
            <EndringerIkkeLagretModal
                isOpen={visEndringerIkkeLagretModal}
                onRequestClose={() => setEndringerIkkeLagretModal(false)}
                onSubmit={endringerIkkeLagretOgLukkModaler}
            />
            {props.onSlett && <SletteVeiledergruppeModal
                isOpen={visSletteVeiledergruppeModal}
                onRequestClose={() => setSletteVeiledergruppeModal(false)}
                onSubmit={slettVeiledergruppeOgLukkModaler}
            />}
        </>
    );
}



