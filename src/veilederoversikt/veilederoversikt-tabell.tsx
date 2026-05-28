import {Table} from '@navikt/ds-react';
import {VeilederoversiktTabellrad} from './veilederoversikt-tabellrad';
import {sortBy, VeilederoversiktSortering, VeilederoversiktSorteringsfelt} from '../ducks/sortering';
import {VeilederMedPortefoljestorrelse} from './veilederoversikt-sidevisning';

import {useAppDispatch} from '../hooks/redux/use-app-dispatch';

interface VeiledereTabellProps {
    veiledere: VeilederMedPortefoljestorrelse[];
    currentSortering: VeilederoversiktSortering;
}

export function VeilederoversiktTabell({veiledere, currentSortering}: VeiledereTabellProps) {
    const dispatch = useAppDispatch();

    const sortering = {
        orderBy: currentSortering.property,
        direction: currentSortering.direction as 'ascending' | 'descending'
    };

    const handleSortChange = (sortKey?: string) => {
        if (sortKey) {
            dispatch(sortBy(sortKey));
        }
    };

    return (
        <Table
            zebraStripes={true}
            data-testid="veilederoversikt-tabell"
            bgcolor="white"
            sort={sortering}
            onSortChange={handleSortChange}
        >
            <Table.Header>
                <Table.Row>
                    <Table.ColumnHeader
                        sortable
                        sortKey={VeilederoversiktSorteringsfelt.ETTERNAVN}
                        data-testid="veiledertabell__etternavn-overskrift"
                    >
                        Etternavn, Fornavn
                    </Table.ColumnHeader>
                    <Table.HeaderCell>Nav-ident</Table.HeaderCell>
                    <Table.ColumnHeader
                        sortable
                        sortKey={VeilederoversiktSorteringsfelt.PORTEFOLJESTORRELSE}
                        data-testid="veiledertabell__antall-brukere-overskrift"
                    >
                        Antall brukere
                    </Table.ColumnHeader>
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
