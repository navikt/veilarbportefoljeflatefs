import React, {useEffect, useState} from 'react';
import {FiltervalgModell} from '../../../model-interfaces';
import {harGjortEndringer, veilederlisterErLik} from './veileder-gruppe-utils';
import BekreftSlettingModal from '../varselmodal/bekreft-sletting-modal';
import EndringerIkkeLagretModal from './ulagrede-endringer-modal';
import {useSelector} from 'react-redux';
import {AppState} from '../../../reducer';
import {OrNothing} from '../../../utils/types/types';
import VeiledergruppeForm from './veiledergruppe-form';
import {logEvent} from '../../../utils/frontend-logger';
import {initialState} from '../../../ducks/filtrering';
import {finnSideNavn} from '../../../middleware/metrics-middleware';
import './veiledergruppe-modal.css';
import ModalHeader from '../modal-header';
import {erTomtObjekt} from '../mine-filter/mine-filter-utils';
import {Alert, Button, Modal} from '@navikt/ds-react';
import {Delete} from '@navikt/ds-icons';
import classNames from 'classnames';
import {STATUS} from '../../../ducks/utils';
import LasterModal from '../lastermodal/laster-modal';

interface VeilederModalProps {
    initialVerdi: {
        gruppeNavn: string;
        filterValg: FiltervalgModell;
        filterId: number;
        filterCleanup?: boolean;
    };
    onSubmit: (gruppeNavn: string, filterValg: FiltervalgModell) => void;
    onSlett?: () => void;
    onRequestClose: () => void;
    isOpen: boolean;
    modalTittel: string;
    lagreKnappeTekst: string;
    validerGruppenavn?: (gruppenavn: string) => OrNothing<string>;
    filterValg?: FiltervalgModell;
    className?: string;
}

interface VeiledergruppeErrors {
    gruppeNavn: OrNothing<string>;
    filterValg: OrNothing<string>;
}

export function VeiledergruppeModal(props: VeilederModalProps) {
    const [filterValg, setFilterValg] = useState<FiltervalgModell>(initialState);
    const [gruppeNavn, setGruppeNavn] = useState<string>('');
    const [errors, setErrors] = useState<VeiledergruppeErrors>({} as VeiledergruppeErrors);
    const [harForsoktSubmitte, setHarForsoktSubmitte] = useState(false);
    const [alertTekst, setAlertTekst] = useState('');

    const veiledergruppeStatus = useSelector((state: AppState) => state.veiledergrupper.status);
    const statusLaster = veiledergruppeStatus !== undefined && veiledergruppeStatus === STATUS.PENDING;

    const [visSletteVeiledergruppeModal, setSletteVeiledergruppeModal] = useState(false);
    const [visEndringerIkkeLagretModal, setEndringerIkkeLagretModal] = useState(false);

    useEffect(() => {
        setFilterValg(props.initialVerdi.filterValg);
        setGruppeNavn(props.initialVerdi.gruppeNavn);
        setErrors({} as VeiledergruppeErrors);
        setHarForsoktSubmitte(false);
    }, [props.initialVerdi.filterValg, props.initialVerdi.gruppeNavn]);

    const hanterGruppeNavnChange = (nyttNavn: string) => {
        setGruppeNavn(nyttNavn);
        if (harForsoktSubmitte) {
            validate(nyttNavn, filterValg);
        }
    };

    const handleChange = (valgteVeiledere: string[]) => {
        setFilterValg(prevState => ({
            ...prevState,
            veiledere: [...valgteVeiledere]
        }));
        if (harForsoktSubmitte) {
            validate(gruppeNavn, {
                ...filterValg,
                veiledere: [...filterValg.veiledere]
            });
        }
    };

    function lukkModal() {
        if (
            harGjortEndringer(
                filterValg.veiledere,
                props.initialVerdi.filterValg.veiledere,
                props.initialVerdi.gruppeNavn,
                gruppeNavn
            )
        ) {
            setEndringerIkkeLagretModal(true);
            return;
        }
        setErrors({} as VeiledergruppeErrors);
        setAlertTekst('');
        props.onRequestClose();
    }

    function lagreVeiledergruppeEndringer(e) {
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
        setErrors({} as VeiledergruppeErrors);
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
        setErrors({} as VeiledergruppeErrors);
        setHarForsoktSubmitte(false);
        props.onRequestClose();
    }

    const lagredeGrupper = useSelector((state: AppState) =>
        state.veiledergrupper.data.filter(v => v.filterId !== props.initialVerdi.filterId)
    );

    const lagredeGruppeNavn = lagredeGrupper
        .map(v => v.filterNavn)
        .map(v => v.trim())
        .map(v => v.toLowerCase());

    const lagredeVeiledergrupper = lagredeGrupper.map(v => ({
        veiledere: v.filterValg.veiledere,
        gruppeNavn: v.filterNavn
    }));

    useEffect(() => {
        if (lagredeGrupper.length > 0 && erTomtObjekt(errors) && props.isOpen && props.initialVerdi.filterCleanup) {
            const finnLikVeiledergruppe = lagredeGrupper.find(v =>
                veilederlisterErLik(v.filterValg.veiledere, props.initialVerdi.filterValg.veiledere)
            );
            if (finnLikVeiledergruppe !== undefined) {
                const errorTekst = `En eller flere veiledere i gruppen har ikke tilgang lenger, og gruppen er nå lik '${finnLikVeiledergruppe.filterNavn}'. Du må legge til/fjerne veiledere eller slette gruppen.`;
                setAlertTekst(errorTekst);
                setErrors({filterValg: errorTekst} as VeiledergruppeErrors);
            }
        }
    }, [lagredeGrupper, props.initialVerdi, props.isOpen, errors]);

    const validate = (gruppeNavn, filterValg) => {
        let errors: any = {};

        if (!gruppeNavn) {
            errors.gruppeNavn = 'Gruppen mangler navn, legg inn gruppenavn.';
        }
        if (lagredeGruppeNavn.includes(gruppeNavn.trim().toLowerCase())) {
            errors.gruppeNavn = 'Gruppenavn er allerede i bruk.';
        }
        if (filterValg.veiledere.length < 1) {
            errors.filterValg = 'Du må legge til veiledere.';
        }

        const finnLikVeiledergruppe = lagredeVeiledergrupper.find(v =>
            veilederlisterErLik(v.veiledere, filterValg.veiledere)
        );

        if (finnLikVeiledergruppe) {
            errors.filterValg = `Det finnes allerede en gruppe med disse veilederne ved navn "${finnLikVeiledergruppe.gruppeNavn}"`;
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
            {statusLaster ? (
                <LasterModal isOpen={statusLaster} />
            ) : (
                <>
                    <Modal
                        open={props.isOpen}
                        onClose={lukkModal}
                        className={classNames('veiledergruppe-modal', props.className)}
                    >
                        <ModalHeader tittel={props.modalTittel} />
                        {alertTekst.length !== 0 && (
                            <Alert
                                variant="warning"
                                className="alerttext"
                                data-testid="veiledergruppe_modal_alertstripe"
                                size="small"
                            >
                                {alertTekst}
                            </Alert>
                        )}
                        <VeiledergruppeForm
                            filterValg={filterValg}
                            gruppeNavn={gruppeNavn}
                            modalTittel={props.modalTittel}
                            hanterVeilederChange={handleChange}
                            setGruppeNavn={hanterGruppeNavnChange}
                            onSubmit={lagreVeiledergruppeEndringer}
                            errors={errors}
                        >
                            <div className="veiledergruppe-modal__knappegruppe">
                                <Button
                                    className="veiledergruppe-modal__knappegruppe__lagre"
                                    type="submit"
                                    data-testid="veiledergruppe_modal_lagre-knapp"
                                >
                                    {props.lagreKnappeTekst}
                                </Button>
                                <Button
                                    variant="secondary"
                                    className="veiledergruppe-modal__knappegruppe__avbryt"
                                    type="button"
                                    onClick={lukkModal}
                                    data-testid="veiledergruppe_modal_avbryt-knapp"
                                >
                                    Avbryt
                                </Button>
                                {props.onSlett && (
                                    <Button
                                        className="veiledergruppe-modal__knappegruppe__slett"
                                        variant="danger"
                                        type="button"
                                        onClick={() => setSletteVeiledergruppeModal(true)}
                                        icon={<Delete />}
                                        data-testid="veiledergruppe_modal_slette-knapp"
                                    >
                                        Slett gruppe
                                    </Button>
                                )}
                            </div>
                        </VeiledergruppeForm>
                    </Modal>
                    <EndringerIkkeLagretModal
                        isOpen={visEndringerIkkeLagretModal}
                        onRequestClose={() => setEndringerIkkeLagretModal(false)}
                        onSubmit={endringerIkkeLagretOgLukkModaler}
                    />
                    {props.onSlett && (
                        <BekreftSlettingModal
                            isOpen={visSletteVeiledergruppeModal}
                            onRequestClose={avbrytSletting}
                            onSubmit={slettVeiledergruppeOgLukkModaler}
                            tittel="Slette veiledergruppe"
                            infoTekst="Gruppen vil bli slettet for alle på enheten."
                            navn={gruppeNavn}
                        />
                    )}
                </>
            )}
        </>
    );
}
