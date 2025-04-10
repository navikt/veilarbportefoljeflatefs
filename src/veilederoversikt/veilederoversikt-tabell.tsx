import classNames from 'classnames';
import {Button, Table} from '@navikt/ds-react';
import {ArrowDownIcon, ArrowUpIcon} from '@navikt/aksel-icons';
import {VeilederoversiktTabellrad} from './veilederoversikt-tabellrad';
import './veilederoversikt-tabell.css';

interface VeiledereTabellProps {
    veiledere: any;
    currentSortering: {
        property: string;
        direction: string;
    };

    sorterPaaEtternavn: () => void;
    sorterPaaPortefoljestorrelse: () => void;
}

export function VeilederoversiktTabell({
    veiledere,
    currentSortering,
    sorterPaaEtternavn,
    sorterPaaPortefoljestorrelse
}: VeiledereTabellProps) {
    const sorterEtternavn = currentSortering.property === 'etternavn';
    const sorterPaaPortefoljeStr = currentSortering.property === 'portefoljestorrelse';

    const sorteringspil = sorterPaa => {
        const className = 'tabellheader__pil';
        if (sorterPaa) {
            if (currentSortering.direction === 'stigende') {
                return (
                    <ArrowUpIcon title="Sortert stigende" className={className} data-testid="sorteringspil_stigende" />
                );
            } else if (currentSortering.direction === 'synkende') {
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
        <Table className="veileder-tabell" zebraStripes={true}>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>
                        <div className="veiledertabell__sorteringskolonne">
                            <Button
                                size="xsmall"
                                variant="tertiary"
                                onClick={sorterPaaEtternavn}
                                className={classNames({'valgt-sortering': sorterEtternavn})}
                                aria-pressed={sorterEtternavn}
                                aria-label={
                                    sorterEtternavn
                                        ? `Etternavn, ${currentSortering.direction} rekkefølge`
                                        : 'Etternavn, ingen sortering'
                                }
                            >
                                Etternavn
                            </Button>
                            , Fornavn
                            {sorteringspil(sorterEtternavn)}
                        </div>
                    </Table.HeaderCell>
                    <Table.HeaderCell>Nav-ident</Table.HeaderCell>
                    <Table.HeaderCell>
                        <div
                            className="veiledertabell__sorteringskolonne"
                            data-testid="veilederoversikt_sortering_antall-brukere"
                        >
                            <Button
                                size="xsmall"
                                variant="tertiary"
                                onClick={sorterPaaPortefoljestorrelse}
                                className={classNames({'valgt-sortering': sorterPaaPortefoljeStr})}
                                aria-pressed={sorterPaaPortefoljeStr}
                                aria-label={
                                    sorterPaaPortefoljeStr
                                        ? `Antall brukere, ${currentSortering.direction} rekkefølge`
                                        : 'Antall brukere, ingen sortering'
                                }
                            >
                                Antall brukere
                            </Button>
                            {sorteringspil(sorterPaaPortefoljeStr)}
                        </div>
                    </Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body data-testid="veilederoversikt_veilederliste_tbody">
                {veiledere.map((veileder: any) => (
                    <VeilederoversiktTabellrad veileder={veileder} key={veileder.ident} />
                ))}
            </Table.Body>
        </Table>
    );
}
