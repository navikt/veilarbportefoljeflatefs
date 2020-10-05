import React, {useEffect, useState} from 'react';
import {FiltervalgModell} from '../../../model-interfaces';
import {harGjortEndringer, veilederlisterErLik} from './veileder-gruppe-utils';
import ModalWrapper from 'nav-frontend-modal';
import {Flatknapp, Hovedknapp} from 'nav-frontend-knapper';
import BekreftSlettingModal from '../bekreftelse-modal/bekreft-sletting-modal';
import EndringerIkkeLagretModal from './ulagrede-endringer-modal';
import {useDispatch, useSelector} from 'react-redux';
import {AppState} from '../../../reducer';
import {OrNothing} from '../../../utils/types/types';
import VeilederGruppeForm from './veileder-gruppe-form';
import {logEvent} from '../../../utils/frontend-logger';
import {initialState} from '../../../ducks/filtrering';
import {finnSideNavn} from '../../../middleware/metrics-middleware';
import './modal.less';
import ModalHeader from '../modal-header/modal-header';
import {lukkVeilederGruppeModal} from "../../../ducks/lagret-filter-ui-state";
import {ListevisningType} from "../../../ducks/ui/listevisning";

interface VeilederModalProps {
    onSubmit: (gruppeNavn: string, filterValg: FiltervalgModell) => void
    onSlett?: () => void;
    modalTittel: string,
    lagreKnappeTekst: string
    filtergruppe: ListevisningType;
}

interface VeilederGruppeErrors {
    gruppeNavn: OrNothing<string>,
    filterValg: OrNothing<string>
}

export function VeilederGruppeModal(props: VeilederModalProps) {
    const dispatch = useDispatch();
    const [filterId, setFilterId] = useState<number>();
    const [filterValg, setFilterValg] = useState<FiltervalgModell>(initialState);
    const [gruppeNavn, setGruppeNavn] = useState<string>('');
    const [errors, setErrors] = useState<VeilederGruppeErrors>({} as VeilederGruppeErrors);
    const [harForsoktSubmitte, setHarForsoktSubmitte] = useState(false);

    const [visSletteVeiledergruppeModal, setSletteVeiledergruppeModal] = useState(false);
    const [visEndringerIkkeLagretModal, setEndringerIkkeLagretModal] = useState(false);

    const valgtGruppeEngetensOversikt = useSelector((state: AppState) => state.mineFilterEnhetensOversikt.valgtVeilederGruppe);
    const valgtGruppeVeilederOversikt = useSelector((state: AppState) => state.mineFilterVeilederOversikt.valgtVeilederGruppe);
    const valgtGruppe = (props.filtergruppe === ListevisningType.veilederOversikt ? valgtGruppeVeilederOversikt : valgtGruppeEngetensOversikt)
    const erVeilederGruppeModalApen = useSelector((state:AppState) => (props.filtergruppe === ListevisningType.veilederOversikt ? state.mineFilterVeilederOversikt.erVeilederGruppeModalApen : state.mineFilterEnhetensOversikt.erVeilederGruppeModalApen))

    useEffect(()=>{
        if (valgtGruppe){
            setFilterId(valgtGruppe.filterId)
            setGruppeNavn(valgtGruppe?.filterNavn)
            setFilterValg(valgtGruppe?.filterValg)
        }else{
            setFilterId(-1)
            setGruppeNavn('')
            setFilterValg(initialState)
        }
        setErrors({} as VeilederGruppeErrors);
        setHarForsoktSubmitte(false);
    }, [props.filtergruppe, valgtGruppe]);

    const fjernVeiledereFraListen = (veilederTarget: string) => {
        setFilterValg(prevState => ({...prevState, veiledere: prevState.veiledere.filter(v => v !== veilederTarget)}));
        if (harForsoktSubmitte) {
            validate(gruppeNavn, {...filterValg, veiledere: filterValg.veiledere.filter(v => v !== veilederTarget)});
        }
    };

    const hanterGruppeNavnChange = (nyttNavn: string) => {
        setGruppeNavn(nyttNavn);
        if (harForsoktSubmitte) {
            validate(nyttNavn, filterValg);
        }
    };

    const hanterChange = (erValgt: boolean, veilederTarget: string) => {
        if (erValgt) {
            setFilterValg(prevState => ({...prevState, veiledere: [...prevState.veiledere, veilederTarget]}));
            if (harForsoktSubmitte) {
                validate(gruppeNavn, {...filterValg, veiledere: [...filterValg.veiledere, veilederTarget]});
            }
        } else {
            fjernVeiledereFraListen(veilederTarget);
        }
    };

    function lukkModal() {
        if (valgtGruppe && harGjortEndringer(filterValg.veiledere, valgtGruppe.filterValg.veiledere, valgtGruppe.filterNavn, gruppeNavn)) {
            setEndringerIkkeLagretModal(true);
            return;
        }
        setErrors({} as VeilederGruppeErrors);
        dispatch(lukkVeilederGruppeModal(props.filtergruppe))
    }

    function lagreVeilederGruppeEndringer(e) {
        e.preventDefault();
        e.stopPropagation();

        setHarForsoktSubmitte(true);

        const errors = validate(gruppeNavn, filterValg);

        if (Object.values(errors).find(v => v)) {
            return;
        }
        props.onSubmit(gruppeNavn, filterValg);

        setErrors({} as VeilederGruppeErrors);
        setHarForsoktSubmitte(false);
        dispatch(lukkVeilederGruppeModal(props.filtergruppe))
    }

    function slettVeiledergruppeOgLukkModaler() {
        logEvent('portefolje.metrikker.veiledergrupper.slettknapp', {}, { sideNavn: finnSideNavn() });
        props.onSlett && props.onSlett();
        setSletteVeiledergruppeModal(false);
        dispatch(lukkVeilederGruppeModal(props.filtergruppe))
    }

    function endringerIkkeLagretOgLukkModaler() {
        setEndringerIkkeLagretModal(false);
        setErrors({} as VeilederGruppeErrors);
        setHarForsoktSubmitte(false);
        dispatch(lukkVeilederGruppeModal(props.filtergruppe))
    }

    const lagredeGrupper = useSelector((state: AppState) => state.veiledergrupper.data
        .filter(v => v.filterId !== filterId));

    const lagredeGruppeNavn = lagredeGrupper.map(v => v.filterNavn)
        .map(v => v.trim())
        .map(v => v.toLowerCase());

    const lagredeVeilederGrupper = lagredeGrupper.map(v => ({
        veiledere: v.filterValg.veiledere,
        gruppeNavn: v.filterNavn
    }));

    const validate = (gruppeNavn, filterValg) => {
        let errors: any = {};

        if (!gruppeNavn) {
            errors.gruppeNavn = 'Gruppen mangler navn, legg inn gruppenavn.';
        }
        if (lagredeGruppeNavn.includes(gruppeNavn.trim().toLowerCase())) {
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
        return errors;
    };

    const avbrytSletting = () => {
        logEvent('portefolje.metrikker.veiledergrupper.avbrytknapp', {}, { sideNavn: finnSideNavn() } );
        setSletteVeiledergruppeModal(false);
    };

    return (
        <>
            <ModalWrapper
                isOpen={erVeilederGruppeModalApen}
                contentLabel={props.modalTittel}
                onRequestClose={lukkModal}
                portalClassName="veiledergruppe-modal"
            >
                <ModalHeader tittel={props.modalTittel}/>
                <VeilederGruppeForm
                    filterValg={filterValg}
                    gruppeNavn={gruppeNavn}
                    modalTittel={props.modalTittel}
                    hanterVeilederChange={hanterChange}
                    setGruppeNavn={hanterGruppeNavnChange}
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
            {props.onSlett && <BekreftSlettingModal
                isOpen={visSletteVeiledergruppeModal}
                onRequestClose={avbrytSletting}
                onSubmit={slettVeiledergruppeOgLukkModaler}
                tittel="Slette veiledergruppe"
                infoTekst="Gruppen vil bli slettet for alle på enheten."
                navn={gruppeNavn}
            />}
        </>
    );
}



