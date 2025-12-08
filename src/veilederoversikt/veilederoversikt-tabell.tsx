import classNames from 'classnames';
import {useDispatch} from 'react-redux';
import {Button, Table} from '@navikt/ds-react';
import {ArrowDownIcon, ArrowUpIcon} from '@navikt/aksel-icons';
import {VeilederoversiktTabellrad} from './veilederoversikt-tabellrad';
import {
    sortBy,
    SorteringsrekkefolgeVeilederoversikt,
    VeilederoversiktSortering,
    VeilederoversiktSorteringsfelt
} from '../ducks/sortering';
import {VeilederMedPortefoljestorrelse} from './veilederoversikt-sidevisning';
import './veilederoversikt-tabell.css';

interface VeiledereTabellProps {
    veiledere: VeilederMedPortefoljestorrelse[];
    currentSortering: VeilederoversiktSortering;
}

export function VeilederoversiktTabell({veiledere, currentSortering}: VeiledereTabellProps) {
    const dispatch = useDispatch();
    const sorterPaaEtternavn = () => dispatch(sortBy(VeilederoversiktSorteringsfelt.ETTERNAVN));
    const sorterPaaPortefoljestorrelse = () => dispatch(sortBy(VeilederoversiktSorteringsfelt.PORTEFOLJESTORRELSE));

    const gjeldendeSorteringErEtternavn = currentSortering.property === VeilederoversiktSorteringsfelt.ETTERNAVN;
    const gjeldendeSorteringErPortefoljestorrelse =
        currentSortering.property === VeilederoversiktSorteringsfelt.PORTEFOLJESTORRELSE;

    const sorteringspil = sorterPaa => {
        const className = 'tabellheader__pil';
        if (sorterPaa) {
            if (currentSortering.direction === SorteringsrekkefolgeVeilederoversikt.STIGENDE) {
                return (
                    <ArrowUpIcon title="Sortert stigende" className={className} data-testid="sorteringspil_stigende" />
                );
            } else if (currentSortering.direction === SorteringsrekkefolgeVeilederoversikt.SYNKENDE) {
                return (
                    <ArrowDownIcon
                        title="Sortert synkende"
                        className={className}
                        data-testid="sorteringspil_synkende"
                    />
                );
            }
        }
        return null;
    };

    return (
        <Table className="veileder-tabell" zebraStripes={true} data-testid="veilederoversikt-tabell">
            <Table.Header className="sticky-tabelloverskrift">
                <Table.Row>
                    <Table.HeaderCell>
                        <div className="veiledertabell__sorteringskolonne navnkolonne">
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
                        </div>
                    </Table.HeaderCell>
                    <Table.HeaderCell>Nav-ident</Table.HeaderCell>
                    <Table.HeaderCell data-testid="veiledertabell__antall-brukere-overskrift">
                        <div
                            className="veiledertabell__sorteringskolonne"
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
                        </div>
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
