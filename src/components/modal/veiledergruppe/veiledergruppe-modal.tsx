import {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import classNames from 'classnames';
import {Alert, Button, Heading, Modal} from '@navikt/ds-react';
import {TrashIcon} from '@navikt/aksel-icons';
import {FiltervalgModell} from '../../../typer/filtervalg-modell';
import {harGjortEndringer, veilederlisterErLik} from './veileder-gruppe-utils';
import {BekreftSlettingModal} from '../varselmodal/bekreft-sletting-modal';
import {EndringerIkkeLagretModal} from './ulagrede-endringer-modal';
import {AppState} from '../../../reducer';
import {OrNothing} from '../../../utils/types/types';
import {VeiledergruppeForm} from './veiledergruppe-form';
import {logEvent} from '../../../utils/frontend-logger';
import {initialState} from '../../../ducks/filtrering';
import {finnSideNavn} from '../../../middleware/metrics-middleware';
import {erTomtObjekt} from '../mine-filter/mine-filter-utils';
import {STATUS} from '../../../ducks/utils';
import {LasterModal} from '../lastermodal/laster-modal';
import './veiledergruppe-modal.css';

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
    className?: string;
}

interface VeiledergruppeErrors {
    gruppeNavn: OrNothing<string>;
    filterValg: OrNothing<string>;
}

export function VeiledergruppeModal({
    initialVerdi,
    onSubmit,
    onSlett,
    onRequestClose,
    isOpen,
    modalTittel,
    lagreKnappeTekst,
    className
}: VeilederModalProps) {
    const [filterValg, setFilterValg] = useState<FiltervalgModell>(initialState);
    const [gruppeNavn, setGruppeNavn] = useState<string>('');
    const [errors, setErrors] = useState<VeiledergruppeErrors>({} as VeiledergruppeErrors);
    const [harForsoktSubmitte, setHarForsoktSubmitte] = useState(false);
    const [alertTekst, setAlertTekst] = useState('');

    const veiledergruppeStatus = useSelector((state: AppState) => state.veiledergrupper.status);
    const statusLaster = veiledergruppeStatus !== undefined && veiledergruppeStatus === STATUS.PENDING;

    const [visSletteVeiledergruppeModal, setVisSletteVeiledergruppeModal] = useState(false);
    const [visEndringerIkkeLagretModal, setVisEndringerIkkeLagretModal] = useState(false);

    useEffect(() => {
        setFilterValg(initialVerdi.filterValg);
        setGruppeNavn(initialVerdi.gruppeNavn);
        setErrors({} as VeiledergruppeErrors);
        setHarForsoktSubmitte(false);
    }, [initialVerdi.filterValg, initialVerdi.gruppeNavn]);

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
                initialVerdi.filterValg.veiledere,
                initialVerdi.gruppeNavn,
                gruppeNavn
            )
        ) {
            setVisEndringerIkkeLagretModal(true);
            return;
        }
        setErrors({} as VeiledergruppeErrors);
        setAlertTekst('');
        onRequestClose();
    }

    function lagreVeiledergruppeEndringer(e) {
        e.preventDefault();
        e.stopPropagation();

        setHarForsoktSubmitte(true);

        const errors = validate(gruppeNavn, filterValg);

        if (Object.values(errors).find(v => v)) {
            return;
        }
        onSubmit(gruppeNavn, filterValg);

        setFilterValg(initialState);
        setGruppeNavn('');
        setErrors({} as VeiledergruppeErrors);
        setHarForsoktSubmitte(false);
        onRequestClose();
    }

    function slettVeiledergruppeOgLukkModaler() {
        logEvent('portefolje.metrikker.veiledergrupper.slettknapp', {}, {sideNavn: finnSideNavn()});
        onSlett && onSlett();
        setVisSletteVeiledergruppeModal(false);
        onRequestClose();
    }

    function endringerIkkeLagretOgLukkModaler() {
        setVisEndringerIkkeLagretModal(false);
        setFilterValg(initialVerdi.filterValg);
        setGruppeNavn(initialVerdi.gruppeNavn);
        setErrors({} as VeiledergruppeErrors);
        setHarForsoktSubmitte(false);
        onRequestClose();
    }

    const lagredeGrupper = useSelector((state: AppState) =>
        state.veiledergrupper.data.filter(v => v.filterId !== initialVerdi.filterId)
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
        if (lagredeGrupper.length > 0 && erTomtObjekt(errors) && isOpen && initialVerdi.filterCleanup) {
            const finnLikVeiledergruppe = lagredeGrupper.find(v =>
                veilederlisterErLik(v.filterValg.veiledere, initialVerdi.filterValg.veiledere)
            );
            if (finnLikVeiledergruppe !== undefined) {
                const errorTekst = `En eller flere veiledere i gruppen har ikke tilgang lenger, og gruppen er nå lik '${finnLikVeiledergruppe.filterNavn}'. Du må legge til/fjerne veiledere eller slette gruppen.`;
                setAlertTekst(errorTekst);
                setErrors({filterValg: errorTekst} as VeiledergruppeErrors);
            }
        }
    }, [lagredeGrupper, initialVerdi, isOpen, errors]);

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
        setVisSletteVeiledergruppeModal(false);
    };

    if (!isOpen) {
        return null;
    }

    return (
        <>
            {statusLaster ? (
                <LasterModal isOpen={statusLaster} />
            ) : (
                <>
                    <Modal
                        open={isOpen}
                        onClose={lukkModal}
                        closeOnBackdropClick={true}
                        className={classNames('veiledergruppe-modal', className)}
                        width="medium"
                        aria-labelledby="veiledergruppe-modal-overskrift"
                    >
                        <Modal.Header>
                            <Heading id="veiledergruppe-modal-overskrift" size="medium" level="1">
                                {modalTittel}
                            </Heading>
                        </Modal.Header>
                        <Modal.Body>
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
                                handterVeilederChange={handleChange}
                                setGruppeNavn={hanterGruppeNavnChange}
                                onSubmit={lagreVeiledergruppeEndringer}
                                errors={errors}
                            >
                                <div className="veiledergruppe-modal__knappegruppe">
                                    <Button
                                        size="small"
                                        className="veiledergruppe-modal__knappegruppe__lagre"
                                        type="submit"
                                        data-testid="veiledergruppe_modal_lagre-knapp"
                                    >
                                        {lagreKnappeTekst}
                                    </Button>
                                    <Button
                                        size="small"
                                        variant="secondary"
                                        className="veiledergruppe-modal__knappegruppe__avbryt"
                                        type="button"
                                        onClick={lukkModal}
                                        data-testid="veiledergruppe_modal_avbryt-knapp"
                                    >
                                        Avbryt
                                    </Button>
                                    {onSlett && (
                                        <Button
                                            size="small"
                                            className="veiledergruppe-modal__knappegruppe__slett"
                                            variant="danger"
                                            type="button"
                                            onClick={() => setVisSletteVeiledergruppeModal(true)}
                                            icon={<TrashIcon aria-hidden={true} />}
                                            data-testid="veiledergruppe_modal_slette-knapp"
                                        >
                                            Slett gruppe
                                        </Button>
                                    )}
                                </div>
                            </VeiledergruppeForm>
                        </Modal.Body>
                    </Modal>
                    <EndringerIkkeLagretModal
                        isOpen={visEndringerIkkeLagretModal}
                        onRequestClose={() => setVisEndringerIkkeLagretModal(false)}
                        onSubmit={endringerIkkeLagretOgLukkModaler}
                    />
                    {onSlett && (
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
