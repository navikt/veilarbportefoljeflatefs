import {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {AnyAction} from 'redux';
import {ThunkDispatch} from 'redux-thunk';
import {Alert, BodyShort, Button} from '@navikt/ds-react';
import {PlusCircleIcon} from '@navikt/aksel-icons';
import {AppState} from '../../reducer';
import {VeiledergruppeModal} from '../../components/modal/veiledergruppe/veiledergruppe-modal';
import {endreFiltervalg, initialState} from '../../ducks/filtrering';
import {FiltervalgModell} from '../../typer/filtervalg-modell';
import {lageNyGruppe} from '../../ducks/veiledergrupper_filter';
import {useEnhetSelector} from '../../hooks/redux/use-enhet-selector';
import {oppdaterKolonneAlternativer, OversiktType} from '../../ducks/ui/listevisning';
import {STATUS} from '../../ducks/utils';
import {VeiledergruppeInnhold} from './veiledergruppe-innhold';

interface FilteringVeiledergruppeProps {
    oversiktType: OversiktType;
}

export function FilteringVeiledergrupper({oversiktType}: FilteringVeiledergruppeProps) {
    const [visVeiledergruppeModal, setVisVeiledergruppeModal] = useState(false);

    const lagretFilterState = useSelector((state: AppState) => state.veiledergrupper);
    const lagretFilter = lagretFilterState.data;

    const dispatch: ThunkDispatch<AppState, any, AnyAction> = useDispatch();
    const enhet = useEnhetSelector();
    const modalTittel = 'Ny veiledergruppe';

    const submitEndringer = (gruppeNavn: string, filterValg: FiltervalgModell) => {
        enhet &&
            dispatch(
                lageNyGruppe(
                    {
                        filterNavn: gruppeNavn,
                        filterValg
                    },
                    enhet
                )
            ).then(resp => {
                oppdaterKolonneAlternativer(
                    dispatch,
                    {...filterValg, veiledere: resp.data.filterValg.veiledere},
                    oversiktType
                );
                return dispatch(endreFiltervalg('veiledere', resp.data.filterValg.veiledere, oversiktType));
            });
    };

    const sortertVeiledergruppe = lagretFilter.sort((a, b) =>
        a.filterNavn.toLowerCase().localeCompare(b.filterNavn.toLowerCase(), undefined, {numeric: true})
    );

    const veilederGrupperOK = () => {
        return lagretFilter.length > 0 ? (
            <VeiledergruppeInnhold lagretFilter={sortertVeiledergruppe} oversiktType={oversiktType} />
        ) : (
            <div className="veiledergruppe-emptystate">
                <BodyShort size="small" className="veiledergruppe-emptystate__tekst">
                    Ingen lagrede veiledergrupper på enheten
                </BodyShort>
            </div>
        );
    };
    const veilederGrupperError = () => {
        return (
            <Alert variant="error" size="small">
                Det oppsto en feil, og veiledergrupper kunne ikke hentes fram. Prøv igjen senere.
            </Alert>
        );
    };

    return (
        <>
            {lagretFilterState.status === STATUS.ERROR ? veilederGrupperError() : veilederGrupperOK()}
            <Button
                variant="tertiary"
                icon={<PlusCircleIcon aria-hidden={true} />}
                onClick={() => {
                    setVisVeiledergruppeModal(true);
                }}
                data-testid="veiledergruppe_ny-gruppe_knapp"
                size="small"
            >
                Ny gruppe
            </Button>
            <VeiledergruppeModal
                initialVerdi={{
                    gruppeNavn: '',
                    filterValg: initialState,
                    filterId: -1
                }}
                onSubmit={submitEndringer}
                onRequestClose={() => setVisVeiledergruppeModal(false)}
                isOpen={visVeiledergruppeModal}
                modalTittel={modalTittel}
                lagreKnappeTekst="Lagre"
            />
        </>
    );
}
