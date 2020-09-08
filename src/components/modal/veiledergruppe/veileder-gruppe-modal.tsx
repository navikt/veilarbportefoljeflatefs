import React, {useEffect, useState} from 'react';
import {FiltervalgModell} from '../../../model-interfaces';
import {harGjortEndringer, veilederlisterErLik} from './veileder-gruppe-utils';
import ModalWrapper from 'nav-frontend-modal';
import {Flatknapp, Hovedknapp} from 'nav-frontend-knapper';
import BekreftSlettingModal from '../bekreftelse-modal/bekreft-sletting-modal';
import EndringerIkkeLagretModal from './ulagrede-endringer-modal';
import {useSelector} from 'react-redux';
import {AppState} from '../../../reducer';
import {OrNothing} from '../../../utils/types/types';
import VeilederGruppeForm from './veileder-gruppe-form';
import {logEvent} from '../../../utils/frontend-logger';
import {initialState} from '../../../ducks/filtrering';
import {finnSideNavn} from '../../../middleware/metrics-middleware';
import './modal.less';
import ModalHeader from '../modal-header/modal-header';

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
    filterValg?: FiltervalgModell;
}

interface VeilederGruppeErrors {
    gruppeNavn: OrNothing<string>,
    filterValg: OrNothing<string>
}

export function VeilederGruppeModal(props: VeilederModalProps) {
    const [filterValg, setFilterValg] = useState<FiltervalgModell>(initialState);
    const [gruppeNavn, setGruppeNavn] = useState<string>('');
    const [errors, setErrors] = useState<VeilederGruppeErrors>({} as VeilederGruppeErrors);
    const [harForsoktSubmitte, setHarForsoktSubmitte] = useState(false);

    const [visSletteVeiledergruppeModal, setSletteVeiledergruppeModal] = useState(false);
    const [visEndringerIkkeLagretModal, setEndringerIkkeLagretModal] = useState(false);

    useEffect(() => {
        setFilterValg(props.initialVerdi.filterValg);
        setGruppeNavn(props.initialVerdi.gruppeNavn);
        setErrors({} as VeilederGruppeErrors);
        setHarForsoktSubmitte(false);
    }, [props.initialVerdi.filterValg, props.initialVerdi.gruppeNavn]);

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
        if (harGjortEndringer(filterValg.veiledere, props.initialVerdi.filterValg.veiledere, props.initialVerdi.gruppeNavn, gruppeNavn)) {
            setEndringerIkkeLagretModal(true);
            return;
        }
        setErrors({} as VeilederGruppeErrors);
        props.onRequestClose();
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

        setFilterValg(initialState);
        setGruppeNavn('');
        setErrors({} as VeilederGruppeErrors);
        setHarForsoktSubmitte(false);
        props.onRequestClose();
    }

    function slettVeiledergruppeOgLukkModaler() {
        logEvent('portefolje.metrikker.veiledergrupper.slettknapp', {}, {sideNavn: finnSideNavn()});
        props.onSlett && props.onSlett();
        setSletteVeiledergruppeModal(false);
        props.onRequestClose();
    }

    function endringerIkkeLagretOgLukkModaler() {
        setEndringerIkkeLagretModal(false);
        setFilterValg(props.initialVerdi.filterValg);
        setGruppeNavn(props.initialVerdi.gruppeNavn);
        setErrors({} as VeilederGruppeErrors);
        setHarForsoktSubmitte(false);
        props.onRequestClose();
    }

    const lagredeGrupper = useSelector((state: AppState) => state.veiledergrupperLagretFilter.data
        .filter(v => v.filterId !== props.initialVerdi.filterId));

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
        logEvent('portefolje.metrikker.veiledergrupper.avbrytknapp', {}, {sideNavn: finnSideNavn()});
        setSletteVeiledergruppeModal(false);
    };

    return (
        <>
            <ModalWrapper
                isOpen={props.isOpen}
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



