import classNames from 'classnames';
import {Button, HStack, Table} from '@navikt/ds-react';
import {ArrowDownIcon, ArrowUpIcon} from '@navikt/aksel-icons';
import {VeilederoversiktTabellrad} from './veilederoversikt-tabellrad';
import {
    sortBy,
    SorteringsrekkefolgeVeilederoversikt,
    VeilederoversiktSortering,
    VeilederoversiktSorteringsfelt
} from '../ducks/sortering';
import {VeilederMedPortefoljestorrelse} from './veilederoversikt-sidevisning';

import {useAppDispatch} from '../hooks/redux/use-app-dispatch';

interface VeiledereTabellProps {
    veiledere: VeilederMedPortefoljestorrelse[];
    currentSortering: VeilederoversiktSortering;
}

export function VeilederoversiktTabell({veiledere, currentSortering}: VeiledereTabellProps) {
    const dispatch = useAppDispatch();
    const sorterPaaEtternavn = () => dispatch(sortBy(VeilederoversiktSorteringsfelt.ETTERNAVN));
    const sorterPaaPortefoljestorrelse = () => dispatch(sortBy(VeilederoversiktSorteringsfelt.PORTEFOLJESTORRELSE));

    const gjeldendeSorteringErEtternavn = currentSortering.property === VeilederoversiktSorteringsfelt.ETTERNAVN;
    const gjeldendeSorteringErPortefoljestorrelse =
        currentSortering.property === VeilederoversiktSorteringsfelt.PORTEFOLJESTORRELSE;

    const sorteringspil = sorterPaa => {
        if (sorterPaa) {
            if (currentSortering.direction === SorteringsrekkefolgeVeilederoversikt.STIGENDE) {
                return <ArrowUpIcon title="Sortert stigende" data-testid="sorteringspil_stigende" aria-hidden />;
            } else if (currentSortering.direction === SorteringsrekkefolgeVeilederoversikt.SYNKENDE) {
                return <ArrowDownIcon title="Sortert synkende" data-testid="sorteringspil_synkende" aria-hidden />;
            }
        }
        return null;
    };

    return (
        <Table zebraStripes={true} data-testid="veilederoversikt-tabell" bgcolor="white">
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>
                        <HStack as="span" gap="space-2" align="center" wrap={false}>
                            Fornavn
                            <Button
                                size="xsmall"
                                variant="tertiary"
                                onClick={sorterPaaEtternavn}
                                className={classNames({'valgt-sortering': gjeldendeSorteringErEtternavn})}
                                aria-pressed={gjeldendeSorteringErEtternavn}
                                aria-label={
                                    gjeldendeSorteringErEtternavn
                                        ? `Etternavn, ${currentSortering.direction} rekkefølge`
                                        : 'Etternavn, ingen sortering'
                                }
                            >
                                Etternavn
                            </Button>
                            {sorteringspil(gjeldendeSorteringErEtternavn)}
                        </HStack>
                    </Table.HeaderCell>
                    <Table.HeaderCell>Nav-ident</Table.HeaderCell>
                    <Table.HeaderCell data-testid="veiledertabell__antall-brukere-overskrift">
                        <HStack
                            as="span"
                            gap="space-2"
                            align="center"
                            data-testid="veilederoversikt_sortering_antall-brukere"
                        >
                            <Button
                                size="xsmall"
                                variant="tertiary"
                                onClick={sorterPaaPortefoljestorrelse}
                                className={classNames({'valgt-sortering': gjeldendeSorteringErPortefoljestorrelse})}
                                aria-pressed={gjeldendeSorteringErPortefoljestorrelse}
                                aria-label={
                                    gjeldendeSorteringErPortefoljestorrelse
                                        ? `Antall brukere, ${currentSortering.direction} rekkefølge`
                                        : 'Antall brukere, ingen sortering'
                                }
                            >
                                Antall brukere
                            </Button>
                            {sorteringspil(gjeldendeSorteringErPortefoljestorrelse)}
                        </HStack>
                    </Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body data-testid="veilederoversikt_veilederliste_tbody">
                {veiledere.map(veileder => (
                    <VeilederoversiktTabellrad veileder={veileder} key={veileder.ident} />
                ))}
            </Table.Body>
        </Table>
    );
}
