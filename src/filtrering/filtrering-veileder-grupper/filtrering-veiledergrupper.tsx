import {useState} from 'react';
import {useSelector} from 'react-redux';
import {Alert, BodyShort, Button, Heading} from '@navikt/ds-react';
import {PlusCircleIcon} from '@navikt/aksel-icons';
import {AppState} from '../../reducer';
import {VeiledergruppeModal} from '../../components/modal/veiledergruppe/veiledergruppe-modal';
import {endreFiltervalg, initialState} from '../../ducks/filtrering';
import {Filtervalg, FiltervalgModell} from '../../typer/filtervalg-modell';
import {lageNyGruppe} from '../../ducks/veiledergrupper_filter';
import {useEnhetSelector} from '../../hooks/redux/use-enhet-selector';
import {oppdaterKolonneAlternativer, OversiktType} from '../../ducks/ui/valgte-kolonner';
import {STATUS} from '../../ducks/utils';
import {VeiledergruppeInnhold} from './veiledergruppe-innhold';

import {useAppDispatch} from '../../hooks/redux/use-app-dispatch';
import {mapFiltermodellTilAktiveValgOgStringify} from '../../components/modal/mine-filter/mine-filter-mapper';

interface FilteringVeiledergruppeProps {
    oversiktType: OversiktType;
    filtervalg: FiltervalgModell;
}

export function FilteringVeiledergrupper({oversiktType, filtervalg}: FilteringVeiledergruppeProps) {
    const [visVeiledergruppeModal, setVisVeiledergruppeModal] = useState(false);

    const lagretFilterState = useSelector((state: AppState) => state.veiledergrupper);
    const lagretFilter = lagretFilterState.data;

    const dispatch = useAppDispatch();
    const enhet = useEnhetSelector();
    const modalTittel = 'Ny veiledergruppe';

    const submitEndringer = (gruppeNavn: string, filterValg: FiltervalgModell) => {
        enhet &&
            dispatch(
                lageNyGruppe(
                    {
                        filterNavn: gruppeNavn,
                        filterValg: filterValg,
                        aktiveFilterValg: mapFiltermodellTilAktiveValgOgStringify(filterValg)
                    },
                    enhet
                )
            ).then(resp => {
                oppdaterKolonneAlternativer(
                    dispatch,
                    {...filterValg, veiledere: resp.data.filterValg.veiledere},
                    oversiktType
                );
                return dispatch(endreFiltervalg(Filtervalg.veiledere, resp.data.filterValg.veiledere, oversiktType));
            });
    };

    const sortertVeiledergruppe = [...lagretFilter].sort((a, b) =>
        a.filterNavn.toLowerCase().localeCompare(b.filterNavn.toLowerCase(), undefined, {numeric: true})
    );

    const veilederGrupperOK = () => {
        return lagretFilter.length > 0 ? (
            <VeiledergruppeInnhold
                filtervalg={filtervalg}
                lagretFilter={sortertVeiledergruppe}
                oversiktType={oversiktType}
            />
        ) : (
            <BodyShort size="small" spacing>
                <i>Ingen lagrede veiledergrupper på enheten</i>
            </BodyShort>
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
            {oversiktType === OversiktType.veilederOversikt && (
                <Heading spacing size="small">
                    Veiledergrupper
                </Heading>
            )}
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
