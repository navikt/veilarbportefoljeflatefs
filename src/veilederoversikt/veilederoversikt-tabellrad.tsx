import {Link} from 'react-router-dom';
import {BodyShort, Table} from '@navikt/ds-react';

interface Props {
    veileder: any;
}

export const VeilederoversiktTabellrad = ({veileder}: Props) => {
    return (
        <Table.Row key={veileder.ident}>
            <Table.DataCell>
                <Link to={`/portefolje/${veileder.ident}`} data-testid="veilederoversikt_navn_lenke">
                    <BodyShort size="small">{`${veileder.navn}`}</BodyShort>
                </Link>
            </Table.DataCell>
            <Table.DataCell>
                <BodyShort size="small">{`${veileder.ident}`}</BodyShort>
            </Table.DataCell>
            <Table.DataCell>
                <BodyShort size="small">{veileder.portefoljestorrelse}</BodyShort>
            </Table.DataCell>
        </Table.Row>
    );
};
